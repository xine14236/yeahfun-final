import React, { useEffect, useState } from 'react'
import styles from '@/styles/blogDetail.module.scss'
import Carousel from '@/components/blog/carousel'
import { useRouter } from 'next/router'
import { FaPencil } from "react-icons/fa6";

import { FaRegClock, FaTrashCan } from "react-icons/fa6";


import Image from 'next/image'
import heart from '@/assets/heart.svg'
import chiiLikes from '@/assets/chiiLike.svg'
export default function blogDetail() {
  const [blog, setBlog] = useState({
    id: 0,
    title: '',
    author: '',
    name:'',
    content: '',
    create_at: '2024-01-01T00:00:00.000Z',
    category_ids: '0',
    category_names: '',
    favorite_count: 0,
    likes_count: 0,
  })
  const [favBlog, setFavBlog] = useState([])
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const getBlog = async (bid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/blog/${bid}`)
      const resData = await res.json()
      if (resData.success === true) {
        setFavBlog(resData.data.favBlog)
        setBlog(resData.data.blog)
       
  
        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  useEffect(() => {
    if (router.isReady) {
      // 這裡可以得到router.query

      getBlog(router.query.bid)
    }
    // 以下為注解掉eslint的警告一行
    // eslint-disable-next-line
  }, [router.isReady])

  return (
    <>
      <div className="row ">
        <Carousel />
      </div>
      <div className="row " >
        <div className={`col-12 col-md-9 border ${styles.cc} `}>
        <div className="col-12">
      <h2>{blog.title}</h2>
      <div className="col-12 mt-4">
<div className="">
  <p > 
  <span>

  <FaRegClock className='me-3'/>
  </span>
  <span className='lh-sm me-5'>
  {blog.create_at}
 
  
  </span>
  <span>BY</span>
  {blog.name} 
  </p>
</div>
<div className="col-12 mt-4 ">
<div className="px-md-5">

{blog.content}
</div>

<div className={`col-12 border likeContainer d-flex ${styles.likeContainer}`}>

  <span className={`${styles.span1} fs-3 me-md-5 ms-md-5 ms-3 me-3 `}>

   <Image src={heart} height={20} width={20} className='me-2'/>{blog.likes_count}
  </span>
  <span className={`${styles.span1} fs-3 `}>

   <Image src={chiiLikes} height={20} width={20} className='me-2'/>{blog.likes_count}
  </span>
 
  <span className={`${styles.span3} ${styles.meAuto} fs-3 me-md-5   me-3`}>
  <FaPencil  />

</span>
  <span className={`${styles.span3}  fs-3 `}>
  <FaTrashCan  />

</span>
  
</div>
<hr />
<div className="col-12"></div>
</div>
      </div>
      </div>
        </div>
    
        <div className="col-12 col-md-3 border ">
        <div className="container ">
        <div className="div text-center">

            <h2 className="mt-5 mb-4">相關文章推薦</h2>
        </div>
            {favBlog.map((item) => (
              <div className="card mb-3" key={item.id}>
                <div className="row g-0">
                  <div className="col-md-4">

                  <Image
                      src="http://localhost:3005/img-blog/2e0910f14f50dfb9901999ab4dcb50db.webp"
                      className="img-fluid"
                      alt="..."
                      width={400}
                      height={350}
                      style={{
                        width: '100%',
                        height: 'auto',
                        // minHeight: '280px',
                        objectFit: 'cover',
                      }}
                    />
                    {/* If you have an image URL, replace the placeholder */}
                    {/* <img
                      src="https://via.placeholder.com/150"
                      className="img-fluid rounded-start"
                      alt={item.title}
                    /> */}
                  </div>
                  <div className="col-md-8">
                    <div className="card-body pt-0">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">
                        <small className="text-muted me-3">{item.create_at}</small>
                        <small className="text-muted d-md-none ">
                          Likes: <Image src={heart} height={10} width={10} className='me-2'/>{item.likes_count}
                        </small>
                      </p>
                      <p className="card-text">
                      <small className="text-muted d-none d-md-block">
                          Likes: <Image src={heart} height={10} width={10}  /> {item.likes_count}
                        </small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
