import React, { useEffect, useState } from 'react'
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import './styles.css'

// import required modules
import { Navigation, Pagination, History } from 'swiper/modules'

export default function Carousel() {
  // ＲＷＤ：useState hook 創建一個狀態變量 slidesPerView 和一個設定該狀態的函數 setSlidesPerView
  const [slidesPerView, setSlidesPerView] = useState(3)

  //ＲＷＤ：使用 useEffect hook 來添加一個視窗大小變化的事件監聽器。當視窗的寬度小於或等於 640px 時，我們將 slidesPerView 設定為 1；否則，我們將 slidesPerView 設定為 3。最後，我們將 slidesPerView 傳遞給 Swiper 組件。
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSlidesPerView(1)
      } else {
        setSlidesPerView(3)
      }
    }

    window.addEventListener('resize', handleResize)

    // 初始設定
    handleResize()

    // 在組件卸載時移除事件監聽器
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={slidesPerView}
        navigation={true}
        centeredSlides={true}
        loop={true}
        pagination={{
          type: 'fraction',
          el: '.non-existent-element',
        }}
        modules={[Navigation, Pagination, History]}
        className="mySwiper"
      >
        <SwiperSlide
          data-history="1"
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            width: '600px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Image
            src="/detail/attractionsNearby1.jpg"
            // className={styles.cardImage}
            alt="tents"
            width={300}
            height={200}
            style={{
              display: 'flex',
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          />
          <p
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              size: '20px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              zIndex: '1',
              background: 'rgba(255, 255, 255, 0.2)' /* 半透明白色背景 */,
              backdropFilter: 'blur(10px)' /* 应用模糊效果 */,
            }}
          >
            台江國家公園
          </p>
        </SwiperSlide>
        <SwiperSlide
          data-history="1"
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            width: '600px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Image
            src="/detail/attractionsNearby2.jpg"
            // className={styles.cardImage}
            alt="tents"
            width={300}
            height={200}
            style={{
              display: 'flex',
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          />
          <p
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              size: '20px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              zIndex: '1',
              background: 'rgba(255, 255, 255, 0.2)' /* 半透明白色背景 */,
              backdropFilter: 'blur(10px)' /* 应用模糊效果 */,
            }}
          >
            孔廟
          </p>
        </SwiperSlide>
        <SwiperSlide
          data-history="1"
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            width: '600px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Image
            src="/detail/attractionsNearby3.jpg"
            // className={styles.cardImage}
            alt="tents"
            width={300}
            height={200}
            style={{
              display: 'flex',
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          />
          <p
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              size: '20px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              zIndex: '1',
              background: 'rgba(255, 255, 255, 0.2)' /* 半透明白色背景 */,
              backdropFilter: 'blur(10px)' /* 应用模糊效果 */,
            }}
          >
            奇美博物館
          </p>
        </SwiperSlide>
        <SwiperSlide
          data-history="1"
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            width: '600px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Image
            src="/detail/attractionsNearby4.jpg"
            // className={styles.cardImage}
            alt="tents"
            width={300}
            height={200}
            style={{
              display: 'flex',
              position: 'absolute',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          />
          <p
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              size: '20px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              zIndex: '1',
              background: 'rgba(255, 255, 255, 0.2)' /* 半透明白色背景 */,
              backdropFilter: 'blur(10px)' /* 应用模糊效果 */,
            }}
          >
            月世界
          </p>
        </SwiperSlide>

        <SwiperSlide
          data-history="1"
          style={{
            // display: 'flex',
            // justifyContent: 'center',
            width: '600px',
            height: 'auto',
            objectFit: 'contain',

            position: 'relative',
          }}
        >
          <Image
            src="/detail/attractionsNearby5.jpg"
            // className={styles.cardImage}
            alt="tents"
            width={300}
            height={200}
            style={{
              display: 'flex',
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              justifyContent: 'center',
              borderRadius: '10px',
            }}
          />
          <p
            style={{
              position: 'absolute',
              bottom: '5px',
              left: '5px',
              size: '20px',
              padding: '5px',
              borderRadius: '10px',
              color: 'white',
              zIndex: '1',
              background: 'rgba(255, 255, 255, 0.2)' /* 半透明白色背景 */,
              backdropFilter: 'blur(10px)' /* 应用模糊效果 */,
            }}
          >
            流行音樂中心
          </p>
        </SwiperSlide>
      </Swiper>
      <style jsx>{`
        #app {
          height: 100%;
        }
        html,
        body {
          position: relative;
          height: 100%;
        }

        body {
          background: #eee;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          color: #000;
          margin: 0;
          padding: 0;
        }

        .swiper {
          width: 100%;
          height: 100%;
        }

        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;

          /* Center slide text vertically */
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
