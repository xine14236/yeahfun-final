import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import styles from '@/styles/homepage02.module.scss'
import HomeLayout from '@/components/layout/home-layout'
import { useState } from 'react'
import { useEffect } from 'react'

import Location from '@/components/icons/location'
import Star from '@/components/icons/star'

export default function Home() {
  const [products, setProducts] = useState([])
  const [blog, setBlog] = useState([])
  const [tag, setTag] = useState([])

  const getProducts = async () => {
    const url = 'http://localhost:3005/api/home'

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.stores)) {
          setProducts(resData.data.stores)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getBlog = async () => {
    const url = 'http://localhost:3005/api/home-blog'
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        if (Array.isArray(resData.data.blogs)) {
          setBlog(resData.data.blogs)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getTag = async () => {
    const url = 'http://localhost:3005/api/home02'

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.stores)) {
          setProducts(resData.data.stores)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getProducts(), getBlog(), getTag()
  }, [])

  return (
    <>
      <div className="myCardList section02">
        {/* 代辦事項:hover like */}
        <div className="title">
          <img src="/images/homepage/title-tree.png" alt="" />
          <div className="titleContent">
            <h3 className="titleText">HOT</h3>
            <p>熱門營地</p>
          </div>
        </div>
        <div className="container">
          <div className="cards">
            <div className={`row ${styles.myRow}`}>
              {products.map((v, i) => {
                return (
                  <div className="col-12 col-sm-4" key={i}>
                    <div className="card">
                      <a href="#/">
                        {/* <svg className={styles.iconLike}>
                      <use href="#like" />
                    </svg> */}
                      </a>
                      <Link href="#/">
                        <Image
                          src="/images/homepage/tent13.jpg"
                          className={styles.cardImage}
                          alt="Image 2"
                          width={300}
                          height={200}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Link>
                      <div className={styles.cardBody}>
                        <div className={styles.cardTags}>
                          <div className={styles.cardTagLocation}>
                            <Location className={styles.iconLocation} />
                            <p>{v.address}</p>
                          </div>
                          <div className={styles.cardTagStar}>
                            <Star className={styles.iconStar} />
                            <p>{v.comment_star}</p>
                          </div>
                        </div>
                        <div className={styles.cardTitle}>
                          <h4>
                            <Link href="#/">{v.name}</Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section03}>
        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="blog"
            width={66}
            height={33}
          />
          <div className="titleContent">
            <h3 className="titleText">Activity</h3>
            <p>最新消息</p>
          </div>
        </div>
        <Image
          className={styles.section03Bg}
          src="/images/homepage/home-bg01.jpg"
          alt="section03Bg"
          width={1920}
          height={1080}
          style={{ width: '100%' }}
        />
        <div className={`row justify-content-center ${styles.rowActivity}`}>
          {blog.map((v, i) => {
            return (
              <div
                className={`col-12 col-sm-3 p-0 ${styles.customCol}`}
                key={i}
              >
                <div className={`card ${styles.activityCard}`}>
                  <Image
                    src="/images/homepage/tent02.jpg"
                    className={styles.activityImg}
                    alt="blog"
                    width={400}
                    height={600}
                    style={{ width: 'auto', height: '600px' }}
                  />
                  <div className={`card-body ${styles.cardBody}`}>
                    <a href="#/">
                      <h4 className={`card-title m-0 ${styles.cardTitle}`}>
                        {v.title}
                      </h4>
                    </a>
                    <a href="#/">
                      <h6 className={`card-text ${styles.cardText}`}>
                        {v.content}
                      </h6>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={styles.myCardList}>
        {/* 代辦事項: like hover，輪播動畫*/}
        <div className="title">
          <img src="/images/homepage/title-tree.png" alt="" />
          <div className="titleContent">
            <h3 className="titleText">theme</h3>
            <div className="d-flex align-items-center justify-content-center">
              <a href="#/" className={styles.theme}>
                櫻花祭
              </a>
              <a href="#/" className={styles.theme}>
                主題營地
              </a>
              <a href="#/" className={styles.theme1}>
                主題二營地
              </a>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="cards">
            <div className={`row ${styles.myRow}`}>
              {tag.map((v, i) => {
                return (
                  <div className="col-12 col-sm-4" key={i}>
                    <div className="card">
                      <a href="#/">
                        {/* <svg className={styles.iconLike}>
                      <use href="#like" />
                    </svg> */}
                      </a>
                      <Link href="#/">
                        <Image
                          src="/images/homepage/tent13.jpg"
                          className={styles.cardImage}
                          alt="Image 2"
                          width={300}
                          height={200}
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </Link>
                      <div className={styles.cardBody}>
                        <div className={styles.cardTags}>
                          <div className={styles.cardTagLocation}>
                            <Location className={styles.iconLocation} />
                            <p>{v.address}</p>
                          </div>
                          <div className={styles.cardTagStar}>
                            <Star className={styles.iconStar} />
                            <p>{v.comment_star}</p>
                          </div>
                        </div>
                        <div className={styles.cardTitle}>
                          <h4>
                            <Link href="#/">{v.name}</Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
Home.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>
}
