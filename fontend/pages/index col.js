import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import styles from '@/styles/homepage02.module.scss'
import HomeLayout from '@/components/layout/home-layout'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useLoader } from '@/hooks/use-loader'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { ScrollMotionContainer, ScrollMotionItem } from '../ScrollMotion'
import Location from '@/components/icons/location'
import Star from '@/components/icons/star'
import FavStoreBtn3 from '@/components/icons/fav-store-btn3'
import GoTop from '@/components/home/go-top'
import Header from '@/components/home/header'
import Section05 from '@/components/home/section05'
// import FavFcon from '@/components/fav-test/fav-icon'

export default function Home() {
  const [products, setProducts] = useState([])
  const [blog, setBlog] = useState([])
  const [tag, setTag] = useState([])
  const [tag2, setTag2] = useState([])
  const [tag3, setTag3] = useState([])
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [swiperInstances, setSwiperInstances] = useState([])
  const [swiperInstances2, setSwiperInstances2] = useState([])

  const [autoplayStatus, setAutoplayStatus] = useState('自動切換暫停了')
  const { showLoader, hideLoader, loading, delay } = useLoader()
  const [fav, setFav] = useState(true)

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
    showLoader()
    getProducts(),
      getBlog(),
      getTag(),
      getTag2(),
      getTag3()
        .then(delay(3000)) // 延時3秒後再停止載入器，只有手動控制有用，自動關閉會無用
        .then(hideLoader)
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
        amount={0.1}
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
        <ScrollMotionItem element="div" type="up" className="title">
          {/* <div className="title"> */}
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
          {/* </div> */}
        </ScrollMotionItem>
        <ScrollMotionItem element="div" type="up" className="container">
          {/* <div className="container"> */}
          <div className="cards">
            <div className={`row ${styles.myRow}`}>
              {products.map((v, i) => (
                <div className="col-12 col-sm-4" key={i}>
                  <div
                    className={`card ${styles.productCard}`}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    <div className={styles.favor}>
                      <FavStoreBtn3
                        width={45}
                        onClick={() => {
                          setFav(!fav)
                          console.log(fav)
                        }}
                        fav={fav}
                      />
                      {/* <FavFcon id={v.id} /> */}
                    </div>
                    <Link href={`/detail-test/${v.stores_id}`}>
                      <Swiper
                        onSwiper={(swiper) => onSwiperInit(swiper, i)}
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                          delay: 2000,
                          disableOnInteraction: false,
                          enabled: false, // 初始化時禁用自動播放
                        }}
                        pagination={true}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper1"
                      >
                        {v.img_name
                          .split(',')
                          .slice(0, 6)
                          .map((img, index) => (
                            <SwiperSlide key={index}>
                              <Image
                                src={`/detail/${img}`}
                                className={styles.cardImage}
                                alt="tents"
                                width={640}
                                height={427}
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
          {/* </div> */}
        </ScrollMotionItem>
        {/* </div> */}
      </ScrollMotionContainer>

      <ScrollMotionContainer
        once={true}
        // amount={0.4}
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
        <ScrollMotionItem element="div" type="up" className="title">
          {/* <div className="title"> */}
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
          {/* </div> */}
        </ScrollMotionItem>
        <Image
          className={styles.section03Bg}
          src="/images/homepage/home-bg01.jpg"
          alt="section03Bg"
          width={1920}
          height={1080}
          style={{ width: '100%' }}
        />
        <ScrollMotionItem
          element="div"
          type="up"
          className={`row justify-content-center ${styles.rowActivity1}`}
        >
          {/* <div className={`row justify-content-center ${styles.rowActivity1}`}> */}
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
                          src={
                            v.img_name
                              ? `http://localhost:3005/img-blog/${v.img_name}`
                              : `http://localhost:3005/img-blog/2e0910f14f50dfb9901999ab4dcb50db.webp`
                          }
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
          {/* </div> */}
        </ScrollMotionItem>
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
        {/* </div> */}
      </ScrollMotionContainer>

      <ScrollMotionContainer
        once={true}
        // amount={0.6}
        element="div"
        className={`${styles.myCardList} ${styles.section04}`}
      >
        {/* <div className={`${styles.myCardList} ${styles.section04}`}> */}
        {/* 代辦事項: like hover，輪播動畫*/}
        <ScrollMotionItem element="div" type="up" className="title">
          {/* <div className="title"> */}
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
          {/* </div> */}
        </ScrollMotionItem>

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
          allowTouchMove={false}
        >
          {tags.map((tagSet, idx) => (
            <SwiperSlide key={idx}>
              <div className="container">
                <div className={styles.cards}>
                  <div className={`row ${styles.myRow}`}>
                    {tagSet.data.map((v, i) => (
                      <div className="col-12 col-sm-4" key={i}>
                        <div className={`card ${styles.productCard}`}>
                          <div className={styles.favor}>
                            <FavStoreBtn3
                              width={45}
                              onClick={() => {
                                setFav(!fav)
                                console.log(fav)
                              }}
                              fav={fav}
                            />
                          </div>
                          <Link href={`/detail-test/${v.stores_id}`}>
                            <Swiper
                              spaceBetween={30}
                              centeredSlides={true}
                              loop={true}
                              pagination={true}
                              modules={[Pagination]}
                              className="mySwiper1"
                            >
                              {v.img_name
                                .split(',')
                                .slice(0, 6)
                                .map((img, index) => (
                                  <SwiperSlide key={index}>
                                    <Image
                                      src={`/detail/${img}`}
                                      className={styles.cardImage}
                                      alt="tents"
                                      width={640}
                                      height={427}
                                      style={{
                                        width: '100%',
                                        height: 'auto',
                                        objectFit: 'contain',
                                      }}
                                    />
                                  </SwiperSlide>
                                ))}
                            </Swiper>
                            {/* <Image
                              src={`/detail/${v.img_name.split(',')[0]}`}
                              className={styles.cardImage}
                              alt="tents"
                              width={300}
                              height={200}
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                              }} */}
                            {/* /> */}
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

      <Section05 />

      <GoTop />
    </>
  )
}
Home.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>
}
