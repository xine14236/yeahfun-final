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




export default function Test() {
    const router = useRouter();
    const [value, setValue] = useState('')
    const [blogId,setBlogId]=useState(null)
    const initialCate = blogCategory.filter((v)=>v.id>7)
    const [tags, setTags] = useState(initialCate);
    const [selectedTags, setSelectedTags] = useState([]);
    const [title, setTitle]=useState('')
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
    try{
      await fetch('http://localhost:3005/api/blog/save', {
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
              text: 'BLOG文章已創建',
              icon: 'success',
            }).then(() => {
              // Navigate to another page with insertId in the route
              router.push(`/blog`);
            });
          } else {
            MySwal.fire({
              title: '錯誤!',
              text: data.info,
              icon: 'error',
            });
          }
    })
    }catch(error){
      console.error('Error saving blog:', error);
      MySwal.fire({
        title: '錯誤!',
        text: '保存時出現錯誤!',
        icon: 'error',
        confirmButtonText: '確認',
      });
    }
    };


    useEffect(() => {
     
    

        if (router.isReady && router.query.bcid) {
          // 這裡可以得到router.query
    
          setBlogId(router.query.bcid)
        }
        // 以下為注解掉eslint的警告一行
        // eslint-disable-next-line
      }, [router.isReady, router.query.bcid])
   
    
  return(  <>
  <div className="my-5">
  <label htmlFor="">
  <h3 className='mb-3'>Title:</h3>
  <input type="text" className='form-control' value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
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
   </>)
 

}
