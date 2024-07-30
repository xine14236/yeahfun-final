import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import blogCategory from '@/data/blog/BlogCategory.json'
import { Select, Button, Tag } from 'antd';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import GoTop from '@/components/home/go-top'


const MyComponent = dynamic(() => import('@/components/blog/test'), {
  ssr: false,
})

const { Option } = Select;

export default function EditBlog() {

  const router = useRouter();
  const [value, setValue] = useState('')
  const [blogId, setBlogId] = useState(null)
  const initialCate = blogCategory.filter((v) => v.id > 5)
  const [tags, setTags] = useState(initialCate);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState('')
  const MySwal = withReactContent(Swal)

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
      title,
      content: value,
      tags: selectedTags.map(tag => tag.id),
    };

    console.log(payload)
    try {
      await fetch('http://localhost:3005/api/blog/update', { // 使用 update API
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            MySwal.fire({
              title: '成功!',
              text: 'BLOG文章已更新',
              icon: 'success',
            }).then(() => {
              // Navigate to another page
              router.push(`/blog/${blogId}`);
            });
          } else {
            MySwal.fire({
              title: '錯誤!',
              text: data.info,
              icon: 'error',
            });
          }
        })
    } catch (error) {
      console.error('Error updating blog:', error);
      MySwal.fire({
        title: '錯誤!',
        text: '更新時出現錯誤!',
        icon: 'error',
        confirmButtonText: '確認',
      });
    }
  };

  useEffect(() => {
    if (router.isReady && router.query.bid) {
      setBlogId(router.query.bid);
      fetchBlogData(router.query.bid);
    }
  }, [router.isReady, router.query.bid]);

  const fetchBlogData = async (blogId) => {
    try {
      const response = await fetch(`http://localhost:3005/api/blog/edit/${blogId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        const blog = data.data.blog;
        setTitle(blog.title);
        setValue(blog.content);
        const blogTags = blog.category_ids ? blog.category_ids.split(',').map(Number) : [];
        setSelectedTags(blogTags.map(tagId => tags.find(tag => tag.id === tagId)).filter(tag => tag));
      } else {
        console.error('Error fetching blog data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  return (
    <>
      <div className="my-5">
        <label htmlFor="">
          <h3 className='mb-3'>Title:</h3>
          <input type="text" className='form-control' value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </label>
      </div>
      <div className='my-5'>
        <h3 className='mb-3'>Tags:</h3>
        <Select
          style={{ width: 200 }}
          placeholder="Select a tag"
          onChange={handleAddTag}
          value={undefined}
        >
          {tags.map((tag) => (
            <Option key={tag.id} value={tag.id}>
              {tag.blog_category_name}
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
              {tag.blog_category_name}
            </Tag>
          ))}
        </div>
      </div>
      <div className="my-5">
        {blogId && <MyComponent value={value} setValue={setValue} blogId={blogId} />}
      </div>
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 16 }}>
        Submit
      </Button>
      <GoTop />
    </>
  )
}
