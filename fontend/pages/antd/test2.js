import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Select, Button, Tag } from 'antd';

const { Option } = Select;

const MyComponent = dynamic(() => import('@/components/blog/test'), {
  ssr: false,
});

export default function Test() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [blogId, setBlogId] = useState(0);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      setBlogId(router.query.bcid);
    }
    // eslint-disable-next-line
  }, [router.isReady]);

  useEffect(() => {
    // Fetch tags from the backend API
    async function fetchTags() {
      const response = await fetch('/api/tags');
      const data = await response.json();
      setTags(data);
    }
    fetchTags();
  }, []);

  const handleAddTag = (value) => {
    const tag = tags.find(t => t.id === value);
    if (tag && !selectedTags.some(t => t.id === tag.id)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleRemoveTag = (id) => {
    setSelectedTags(selectedTags.filter(tag => tag.id !== id));
  };

  const handleSubmit = async () => {
    const payload = {
      blogId,
      content: value,
      tags: selectedTags.map(tag => tag.id),
    };

    await fetch('/api/blog/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div>
      <MyComponent value={value} setValue={setValue} blogId={blogId} />

      <div>
        <h3>Tags</h3>
        <Select
          style={{ width: 200 }}
          placeholder="Select a tag"
          onChange={handleAddTag}
          value={undefined}
        >
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.name}
            </Option>
          ))}
        </Select>
        <div style={{ marginTop: 16 }}>
          {selectedTags.map((tag) => (
            <Tag
              key={tag.id}
              closable
              onClose={() => handleRemoveTag(tag.id)}
            >
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>

      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 16 }}>
        Submit
      </Button>
    </div>
  );
}
