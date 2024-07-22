import React, { useEffect, useState } from 'react'
import styles from '@/styles/blogDetail.module.scss'
import Carousel from '@/components/blog/carousel'
import { useRouter } from 'next/router'
import { FaPencil } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link'

import { FaRegClock, FaTrashCan } from "react-icons/fa6";


import Image from 'next/image'
import heart from '@/assets/heart.svg'
import chiiLikes from '@/assets/chiiLike.svg'
export default function blogDetail() {
  const { auth } = useAuth()
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

  const handleLinkClick = (id) => {
    router.push(`/blog/${id}`)
      .then(() => router.reload())
  }

  
  const handleClickStar = async (id)=>{
    const res = await fetch(`http://localhost:3005/api/blog/fav/${id}?customer=1`,{
      credentials: 'include', 
    method: 'GET', // or POST/PUT depending on your use case
    headers: {
      'Content-Type': 'application/json',
    },
 
  })
    const resData = await res.json()
    console.log(resData.action)
    if (resData.action === 'add') {
      toast.success('已收藏此文章！');
    } else if (resData.action === 'remove') {
      toast.error('已取消收藏此文章！');
    }
    getBlog(router.query.bid)
  }

  const handleClickHeart = async (id)=>{
    const res = await fetch(`http://localhost:3005/api/blog/like/${id}?customer=1`,{
      credentials: 'include', 
    method: 'GET', // or POST/PUT depending on your use case
    headers: {
      'Content-Type': 'application/json',
    },
 
  })
    const resData = await res.json()
    console.log(resData.action)
    if (resData.action === 'add') {
      toast.success('已喜歡此文章！');
    } else if (resData.action === 'remove') {
      toast.error('已取消喜歡此文章！');
    }
    getBlog(router.query.bid)
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
      <Toaster  reverseOrder={false} />
        <div className={`col-12 col-md-9 border ${styles.cc} `}>
        <div className="col-12">
      <h2>{blog.title}</h2>
      <div className="col-12 mt-4">
<div className="">
  <p > 
  <span>

  <FaRegClock className='me-3'/>
  </span>
  <span  className={` lh-sm me-5 ${styles.color1}`}>
  {blog.create_at}
 
  
  </span>
  <span className={`${styles.color1}`}>BY  {blog.name} </span>

  </p>
</div>
<div className="col-12 mt-4 ">
<div className={`px-md-5 ${styles.contentWrapper} `} dangerouslySetInnerHTML={{ __html: blog.content }}>


</div>

<div className={`col-12 border likeContainer d-flex ${styles.likeContainer}`}>

  <span className={`${styles.span1} fs-3 me-md-5 ms-md-5 ms-3 me-3 `} onClick={()=>{handleClickHeart(blog.id)}}>

   <Image src={heart} height={20} width={20} className='me-2'/>{blog.likes_count}
  </span>
 
  <span className={`${styles.span1} fs-3 `}  onClick={()=>{handleClickStar(blog.id)}}>

   <Image src={chiiLikes} height={20} width={20} className='me-2'/>{blog.favorite_count}
  </span>
 
  <span className={auth.userData.id==blog.author? `${styles.span3X} ${styles.meAuto} fs-3 me-md-5   me-3`:`${styles.span3} ${styles.meAuto} fs-3 me-md-5   me-3`}>
  <FaPencil  />

</span>
  <span className={auth.userData.id==blog.author? `${styles.span3X}  fs-3 `:`${styles.span3}  fs-3 `}>
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
              <div className={`card mb-3 ${styles.card1}`} key={item.id} onClick={() => handleLinkClick(item.id)}>
                <div className="row g-0">
                  <div className="col-md-4">
                 
                  <Image
                      src={item.img_name? `http://localhost:3005/img-blog/${item.img_name}` :`http://localhost:3005/img-blog/2e0910f14f50dfb9901999ab4dcb50db.webp`}
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
