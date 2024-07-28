import React, { useRef, useState } from 'react'
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
  return (
    <>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
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
