import React, { useEffect, useState } from 'react'
import styles from '@/styles/blogDetail.module.scss'
import Carousel from '@/components/blog/carousel'
import { useRouter } from 'next/router'
import { FaPencil } from 'react-icons/fa6'
import toast, { Toaster } from 'react-hot-toast'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import CommentList from '@/components/blog/commentList'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import GoTop from '@/components/home/go-top'

import { FaRegClock, FaTrashCan } from 'react-icons/fa6'

import Image from 'next/image'
import heart from '@/assets/heart.svg'
import chiiLikes from '@/assets/chiiLike4.svg'
import { clearConfig } from 'dompurify'
export default function blogDetail() {
  const { auth } = useAuth()
  const [blog, setBlog] = useState({
    id: 0,
    title: '',
    author: '',
    name: '',
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
  const [comments, setComments] = useState([])
  const MySwal = withReactContent(Swal)
  const [comText, setComText] = useState('')

  const getBlog = async (bid) => {
    try {
      const res = await fetch(`http://localhost:3005/api/blog/${bid}`)
      const resData = await res.json()
      if (resData.success === true) {
        setFavBlog(resData.data.favBlog)
        setBlog(resData.data.blog)
        setComments(resData.data.comment)

        setTimeout(() => {
          setIsLoading(false)
        }, 1000)
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleLinkClick = (id) => {
    router.push(`/blog/${id}`).then(() => router.reload())
  }

  const handleClickStar = async (id) => {
    const res = await fetch(
      `http://localhost:3005/api/blog/fav/${id}?customer=1`,
      {
        credentials: 'include',
        method: 'GET', // or POST/PUT depending on your use case
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const resData = await res.json()
    console.log(resData.action)
    if (resData.action === 'add') {
      toast.success('已收藏此文章！')
    } else if (resData.action === 'remove') {
      toast.error('已取消收藏此文章！')
    }
    getBlog(router.query.bid)
  }

  const handleClickHeart = async (id) => {
    const res = await fetch(
      `http://localhost:3005/api/blog/like/${id}?customer=1`,
      {
        credentials: 'include',
        method: 'GET', // or POST/PUT depending on your use case
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const resData = await res.json()
    console.log(resData.action)
    if (resData.action === 'add') {
      toast.success('已喜歡此文章！')
    } else if (resData.action === 'remove') {
      toast.error('已取消喜歡此文章！')
    }
    getBlog(router.query.bid)
  }

  const handleEdit = async (id, newText) => {
    const payload = { comment: newText, BCId: id }
    try {
      await fetch('http://localhost:3005/api/blog/Cedit', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success == true) {
            MySwal.fire({
              title: '成功!',
              text: 'BLOG留言編輯成功',
              icon: 'success',
            }).then(
              // Navigate to another page with insertId in the route
              getBlog(router.query.bid)
            )
          } else {
            MySwal.fire({
              title: '錯誤!',
              text: data.message,
              icon: 'error',
            })
          }
        })
    } catch (ex) {
      console.log(ex)
    }
  }

  // const handleDelete = (id) => {
  //   setComments(comments.filter(comment => comment.id !== id));
  // };

  const handleAddImage = async (id, files) => {
    const formData = new FormData()
    for (const file of files) {
      formData.append('photos', file)
    }
    try {
      const response = await fetch(
        `http://localhost:3005/api/blog/Cuploads/${id}`,
        {
          method: 'POST',
          body: formData,
        }
      )
      const data = await response.json()

      if (data.success) {
        MySwal.fire({
          title: '成功!',
          text: '圖片上傳成功',
          icon: 'success',
        }).then(() => {
          fetchComments() // Refresh the comments
        })
      } else {
        MySwal.fire({
          title: '錯誤!',
          text: '圖片上傳失敗',
          icon: 'error',
        })
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleSubmit = async () => {
    const payload = {
      comText,
      blogId: router.query.bid,
    }

    console.log(payload)
    try {
      await fetch('http://localhost:3005/api/blog/createCom', {
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
              text: 'BLOG留言已創建',
              icon: 'success',
            }).then(() => {
              // Navigate to another page with insertId in the route
              setComText('')
              getBlog(router.query.bid)
            })
          } else {
            MySwal.fire({
              title: '錯誤!',
              text: 'BLOG留言失敗',
              icon: 'error',
            })
          }
        })
    } catch (error) {
      console.error('Error saving blog:', error)
      MySwal.fire({
        title: '錯誤!',
        text: '保存時出現錯誤!',
        icon: 'error',
        confirmButtonText: '確認',
      })
    }
  }

  const handleDelete = (postId) => {
    MySwal.fire({
      title: '您確定要刪除嗎?',
      text: '按下確認將刪除此文章!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the fetch operation
        fetch(`http://localhost:3005/api/blog/delete/${postId}`, {
          credentials: 'include',
          method: 'DELETE', // Use DELETE method for deletion
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              MySwal.fire({
                title: '已刪除!',
                text: 'Blog文章已刪除',
                icon: 'success',
              }).then(() => {
                // Navigate to another page after deletion
                router.push('/blog') // Redirect to the blog list page
              })
            } else {
              MySwal.fire({
                title: '錯誤!',
                text: data.message,
                icon: 'error',
              })
            }
          })
          .catch((error) => {
            // Handle fetch error
            console.error('Error:', error)
            Swal.fire({
              title: '錯誤!',
              text: '發生了一些錯誤，請稍後再試。',
              icon: 'error',
            })
          })
      }
    })
  }

  const handleDelete2 = (postId) => {
    MySwal.fire({
      title: '您確定要刪除嗎?',
      text: '按下確認將刪除此留言!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定刪除!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the fetch operation
        fetch(`http://localhost:3005/api/blog/Cdelete/${postId}`, {
          credentials: 'include',
          method: 'DELETE', // Use DELETE method for deletion
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              MySwal.fire({
                title: '已刪除!',
                text: '留言已刪除',
                icon: 'success',
              }).then(() => {
                // Navigate to another page after deletion
                getBlog(router.query.bid) // Redirect to the blog list page
              })
            } else {
              MySwal.fire({
                title: '錯誤!',
                text: data.message,
                icon: 'error',
              })
            }
          })
          .catch((error) => {
            // Handle fetch error
            console.error('Error:', error)
            Swal.fire({
              title: '錯誤!',
              text: '發生了一些錯誤，請稍後再試。',
              icon: 'error',
            })
          })
      }
    })
  }

  useEffect(() => {
    if (router.isReady ) {
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

      <div className="row ">
        <Toaster reverseOrder={false} />
        <div className={`col-12 col-md-9 border ${styles.cc} `}>
          <div className="col-12">
            <h2>{blog.title}</h2>
            <div className="col-12 mt-4">
              <div className="">
                <p>
                  <span>
                    <FaRegClock className="me-3" />
                  </span>
                  <span className={` lh-sm me-5 ${styles.color1}`}>
                    {blog.create_at}
                  </span>
                  <span className={`${styles.color1}`}>BY {blog.name} </span>
                </p>
              </div>
              <div className="col-12 mt-4 ">
                <div
                  className={`px-md-5 ${styles.contentWrapper} `}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                ></div>

                <div
                  className={`col-12 border likeContainer d-flex ${styles.likeContainer}`}
                >
                  <span
                    className={`${styles.span1} fs-3 me-md-5 ms-md-5 ms-3 me-3 `}
                    onClick={() => {
                      handleClickHeart(blog.id)
                    }}
                  >
                    <Image
                      src={heart}
                      height={20}
                      width={20}
                      className="me-2"
                    />
                    {blog.likes_count}
                  </span>

                  <span
                    className={`${styles.span1} fs-3  d-flex align-items-center`}
                    onClick={() => {
                      handleClickStar(blog.id)
                    }}
                  >
                    <Image
                      src={chiiLikes}
                      height={24}
                      width={24}
                      className="me-2 "
                    />
                    {blog.favorite_count}
                  </span>

                  <span
                    className={
                      auth.userData.id == blog.author
                        ? `${styles.span3X} ${styles.meAuto} fs-3 me-md-5   me-3`
                        : `${styles.span3} ${styles.meAuto} fs-3 me-md-5   me-3`
                    }
                  >
                    <Link href={`/blog/edit/${blog.id}`}>
                      <FaPencil />
                    </Link>
                  </span>

                  <span
                    className={
                      auth.userData.id == blog.author
                        ? `${styles.span3X}  fs-3 `
                        : `${styles.span3}  fs-3 `
                    }
                    onClick={(e) => {
                      handleDelete(router.query.bid)
                    }}
                  >
                    <FaTrashCan />
                  </span>
                </div>
                <hr />
                <div className={`col-12 ${styles.paddingEnd}`}>
                  <CommentList
                    comments={comments}
                    setComments={setComments}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete2}
                    handleAddImage={handleAddImage}
                    getBlog={getBlog}
                    forBId={router.query.bid}
                    comText={comText}
                    setComText={setComText}
                    handleSubmit={handleSubmit}
                  />
                </div>
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
              <div
                className={`card mb-3 ${styles.card1}`}
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
              >
                <div className="row g-0">
                  <div className="col-md-4">
                    <Image
                      src={
                        item.img_name
                          ? `http://localhost:3005/img-blog/${item.img_name}`
                          : `http://localhost:3005/img-blog/2e0910f14f50dfb9901999ab4dcb50db.webp`
                      }
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
                        <small className="text-muted me-3">
                          {item.create_at}
                        </small>
                        <small className="text-muted d-md-none ">
                          Likes:{' '}
                          <Image
                            src={heart}
                            height={10}
                            width={10}
                            className="me-2"
                          />
                          {item.likes_count}
                        </small>
                      </p>
                      <p className="card-text">
                        <small className="text-muted d-none d-md-block">
                          Likes: <Image src={heart} height={10} width={10} />{' '}
                          {item.likes_count}
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
      <GoTop />
    </>
  )
}
