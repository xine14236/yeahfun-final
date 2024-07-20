import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import styles from '@/styles/homepage02.module.scss'
import HomeLayout from '@/components/layout/home-layout'
import Header from '@/components/home/header'
import { useState } from 'react'
import { useEffect, useRef } from 'react'

import { motion } from 'framer-motion'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { ScrollMotionContainer, ScrollMotionItem } from '../ScrollMotion'

import Location from '@/components/icons/location'
import Star from '@/components/icons/star'

import GoTop from '@/components/home/go-top'

export default function Home() {
  const [products, setProducts] = useState([])
  const [blog, setBlog] = useState([])
  const [tag, setTag] = useState([])
  const [tag2, setTag2] = useState([])
  const [tag3, setTag3] = useState([])
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [swiperInstances, setSwiperInstances] = useState([])
  const [autoplayStatus, setAutoplayStatus] = useState('自動切換暫停了')

  const tags = [
    {
      data: tag,
      name: '櫻花祭',
    },
    {
      data: tag2,
      name: '親子共遊',
    },
    {
      data: tag3,
      name: '森林系',
    },
  ]

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
  }

  const handleButtonClick = (index) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index)
    }
  }

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
        if (Array.isArray(resData.data.tag)) {
          setTag(resData.data.tag)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  const getTag2 = async () => {
    const url = 'http://localhost:3005/api/home03'

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.tag)) {
          setTag2(resData.data.tag)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }
  const getTag3 = async () => {
    const url = 'http://localhost:3005/api/home04'

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.tag)) {
          setTag3(resData.data.tag)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getProducts(), getBlog(), getTag(), getTag2(), getTag3()
  }, [])

  useEffect(() => {
    setSwiperInstances((prevInstances) =>
      prevInstances.slice(0, products.length)
    )
  }, [products])

  const handleMouseEnter = (index) => {
    if (swiperInstances[index]) {
      swiperInstances[index].autoplay.start()
      setAutoplayStatus('自動切換進行中')
    }
  }

  const handleMouseLeave = (index) => {
    if (swiperInstances[index]) {
      swiperInstances[index].autoplay.stop()
      setAutoplayStatus('自動切換暫停了')
    }
  }

  const onSwiperInit = (swiper, index) => {
    setSwiperInstances((prevInstances) => {
      const newInstances = [...prevInstances]
      newInstances[index] = swiper
      return newInstances
    })
  }

  return (
    <>
      <Header />
      <ScrollMotionContainer
        once={true}
        element="div"
        className={`${styles.myCardList} ${styles.section02}`}
      >
        {/* <div className={`${styles.myCardList} ${styles.section02}`}> */}

        <Image
          className={styles.section02DecorateTop}
          src="/images/homepage/decorate.png"
          alt="decorate"
          width={1920}
          height={80}
        />

        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="tree"
            width={66}
            height={33}
          />
          <div className="titleContent">
            <h3 className="titleText">HOT</h3>
            <p>熱門營地</p>
          </div>
        </div>

        <div className="container">
          <div className="cards">
            <div className={`row ${styles.myRow}`}>
              {products.map((v, i) => (
                <div className="col-12 col-sm-4" key={i}>
                  <div
                    className="card"
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    <Link href={`/detail-test/${v.stores_id}`}>
                      <Swiper
                        onSwiper={(swiper) => onSwiperInit(swiper, i)}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                          enabled: false, // 初始化時禁用自動播放
                        }}
                        // pagination={true}
                        modules={[Autoplay]}
                        className="mySwiper1"
                      >
                        {v.img_name.split(',').map((img, index) => (
                          <SwiperSlide key={index}>
                            <Image
                              src={`/detail/${img}`}
                              className={styles.cardImage}
                              alt="tents"
                              width={300}
                              height={200}
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                              }}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Link>
                    {/* <div id="showhtml">{autoplayStatus}</div> */}
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
                          <Link href={`/detail-test/${v.stores_id}`}>
                            {v.name}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollMotionContainer>
      {/* </div> */}

      <ScrollMotionContainer
        once={true}
        element="div"
        className={styles.section03}
      >
        {/* <div className={styles.section03}> */}
        <Image
          className={styles.section04DecorateTop}
          src="/images/homepage/decorate.png"
          alt="decorate"
          width={1920}
          height={80}
        />
        <Image
          className={styles.section03Bg}
          src="/images/homepage/home-bg01.jpg"
          alt="section03Bg"
          width={1920}
          height={1080}
          style={{ width: '100%' }}
        />

        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="tree"
            width={66}
            height={33}
          />
          <div className="titleContent">
            <h3 className="titleText">Activity</h3>
            <p>最新消息</p>
          </div>
        </div>

        <div className={`row justify-content-center ${styles.rowActivity1}`}>
          <Swiper
            loop={true}
            watchSlidesProgress={true}
            slidesPerView={4}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper2"
          >
            {blog.map((v, i) => {
              return (
                <div
                  className={`col-12 col-sm-3 p-0 ${styles.customCol}`}
                  key={i}
                >
                  <SwiperSlide>
                    <Link href={`/blog/${v.id}`}>
                      <div className={`card ${styles.activityCard}`}>
                        <Image
                          src="/images/homepage/tent02.jpg"
                          className={styles.activityImg}
                          alt="blog"
                          width={400}
                          height={800}
                          style={{ width: '100%', height: '100%' }}
                        />
                        <div className={`card-body ${styles.cardBody}`}>
                          <h4 className={`card-title m-0 ${styles.cardTitle}`}>
                            {v.title}
                          </h4>
                          <Link href={`/blog/${v.id}`}>
                            <h6 className={`card-text ${styles.cardText}`}>
                              {v.content}
                            </h6>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </div>
              )
            })}
          </Swiper>
        </div>
        <div className={`row justify-content-center ${styles.rowActivity2}`}>
          {blog.map((v, i) => {
            return (
              <div
                className={`col-12 col-sm-3 p-0 ${styles.customCol}`}
                key={i}
              >
                <Link href={`/blog/${v.id}`}>
                  <div className={`card ${styles.activityCard} `}>
                    <Image
                      src="/images/homepage/tent02.jpg"
                      className={styles.activityImg}
                      alt="blog"
                      width={400}
                      height={600}
                    />
                    <div className={`card-body  ${styles.cardBody} `}>
                      <h4 className={`card-title m-0 ${styles.cardTitle}`}>
                        {v.title}
                      </h4>
                      <Link href={`/blog/${v.id}`}>
                        <h6 className={`card-text ${styles.cardText}`}>
                          {v.content}
                        </h6>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </ScrollMotionContainer>
      {/* </div> */}

      <ScrollMotionContainer
        element="div"
        className={`${styles.myCardList} ${styles.section04}`}
      >
        {/* <div className={`${styles.myCardList} ${styles.section04}`}> */}
        {/* 代辦事項: like hover，輪播動畫*/}
        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="blog"
            width={66}
            height={33}
          />
          <div className={`titleContent  ${styles.titleTheme}`}>
            <h3 className="titleText">theme</h3>
            <p>主題營地</p>
          </div>
        </div>

        <div className={styles.paginationButtons}>
          {tags.map((tagSet, index) => (
            <button
              key={index}
              className={
                index === activeIndex ? styles.themeBtnActive : styles.themeBtn
              }
              onClick={() => handleButtonClick(index)}
            >
              {tagSet.name}
            </button>
          ))}
        </div>
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={1}
          loop={true}
          onSlideChange={handleSlideChange}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper3"
        >
          {tags.map((tagSet, idx) => (
            <SwiperSlide key={idx}>
              <div className="container">
                <div className={styles.cards}>
                  <div className={`row ${styles.myRow}`}>
                    {tagSet.data.map((v, i) => (
                      <div className="col-12 col-sm-4" key={i}>
                        <div className="card">
                          <Link href="#/">
                            {/* <svg className={styles.iconLike}>
                            <use href="#like" />
                          </svg> */}
                          </Link>
                          <Link href={`/detail-test/${v.stores_id}`}>
                            <Image
                              src={`/detail/${v.img_name.split(',')[0]}`}
                              className={styles.cardImage}
                              alt="tents"
                              width={300}
                              height={200}
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                              }}
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
                                <Link href={`/detail-test/${v.stores_id}`}>
                                  {v.name}
                                </Link>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
      </ScrollMotionContainer>

      <ScrollMotionContainer element="div" className={styles.section05}>
        {/* <div className={styles.section05}> */}
        {/* 代辦事項: 卡片展開 */}
        <Image
          className={styles.section05DecorateTop}
          src="/images/homepage/decorate.png"
          alt="decorate"
          width={1920}
          height={80}
        />
        <Image
          className={styles.section05Bg}
          src="/images/homepage/section05Bg.jpg"
          alt="section05Bg"
          width={1900}
          height={655}
        />

        <ScrollMotionItem element="div" type="up" className="title">
          {/* <div className="title"> */}
          <Image
            src="/images/homepage/title-tree.png"
            alt="blog"
            width={66}
            height={33}
          />
          <div className="titleContent">
            <h3 className="titleText">about us</h3>
            <p>關於我們</p>
          </div>
          {/* </div> */}
        </ScrollMotionItem>
        <div className="container">
          <ScrollMotionItem
            element="div"
            type="up"
            className={`row ${styles.aboutRow}`}
          >
            {/* <div className={`row ${styles.aboutRow}`}> */}
            <div className="col-12 col-sm-4 p-0">
              <div className={`card ${styles.aboutCard}`}>
                <a href="#/">
                  <Image
                    src="/images/homepage/stone3.png"
                    className={`card-img-top ${styles.stone}`}
                    alt="減碳慢活"
                    width={300}
                    height={300}
                  />
                </a>

                <motion.div
                  className={`card-body ${styles.aboutCardBody}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {/* <div className={`card-body ${styles.aboutCardBody}`}> */}
                  <div className={`card-title m-0 ${styles.aboutCardTitle}`}>
                    <h3>
                      <a href="#/" className={styles.aboutCardTitleA}>
                        減碳慢活
                      </a>
                    </h3>
                  </div>
                  <p className={styles.aboutCardText}>
                    <a href="#/" className={styles.aboutCardTextA}>
                      減碳慢活不僅是一種生活方式的選擇，更是對當前全球環境挑戰的一種積極回應。通過實踐這些原則，每個人都能為減少碳足跡、保護地球做出自己的貢獻，同時享受到更加豐富和有意義的生活。
                    </a>
                  </p>
                  {/* </div> */}
                </motion.div>
              </div>
            </div>
            <div className="col-12 col-sm-4 p-0">
              <div className={`card ${styles.aboutCard}`}>
                <a href="#/">
                  <Image
                    src="/images/homepage/stone1.png"
                    className={`card-img-top ${styles.stone}`}
                    alt="響應無痕山林"
                    width={300}
                    height={300}
                  />
                </a>
                <motion.div
                  className={`card-body ${styles.aboutCardBody}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {/* <div className={`card-body ${styles.aboutCardBody}`}> */}
                  <div className={`card-title m-0 ${styles.aboutCardTitle}`}>
                    <h3>
                      <a href="#/" className={styles.aboutCardTitleA}>
                        響應無痕山林
                      </a>
                    </h3>
                  </div>
                  <p className={styles.aboutCardText}>
                    <a href="#/" className={styles.aboutCardTextA}>
                      守護自然，從我做起，無痕山林不僅是一種環保行為，更是一種生活態度。每個人都應該從自身做起，響應無痕山林的號召，在享受大自然美景的同時，保護我們共同的家園。讓我們一起行動，守護地球的未來！
                    </a>
                  </p>
                  {/* </div> */}
                </motion.div>
              </div>
            </div>
            <div className="col-12 col-sm-4 p-0">
              <div className={`card ${styles.aboutCard}`}>
                <a href="#/">
                  <Image
                    src="/images/homepage/stone02.png"
                    className={`card-img-top ${styles.stone}`}
                    alt="親子探索教育"
                    width={300}
                    height={300}
                  />
                </a>
                <motion.div
                  className={`card-body ${styles.aboutCardBody}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  {/* <div className={`card-body ${styles.aboutCardBody}`}> */}
                  <div className={`card-title m-0 ${styles.aboutCardTitle}`}>
                    <h3>
                      <a href="#/" className={styles.aboutCardTitleA}>
                        親子探索教育
                      </a>
                    </h3>
                  </div>
                  <p className={styles.aboutCardText}>
                    <a href="#/" className={styles.aboutCardTextA}>
                      親子探索教育是一種寓教於樂的教育方式，通過豐富多樣的活動，讓孩子在親身體驗中學習和成長。不僅促進了親子關係，還培養了孩子的各種素質和能力。讓我們一起參與到親子探索教育中來，與孩子一起探索世界，共同成長。
                    </a>
                  </p>
                  {/* </div> */}
                </motion.div>
              </div>
            </div>
          </ScrollMotionItem>
          {/* </div> */}
        </div>
        {/* </div> */}
      </ScrollMotionContainer>
      <GoTop />
    </>
  )
}
Home.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>
}
