import { useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/pagination' // 確保引入 pagination 的樣式

// import required modules
import {
  Autoplay,
  FreeMode,
  Navigation,
  Thumbs,
  Pagination,
} from 'swiper/modules'

// 範例出處
// https://swiperjs.com/demos#thumbs-gallery
// https://codesandbox.io/s/k3cyyc
export default function Carousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null)

  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          maxHeight: 300,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Autoplay, FreeMode, Navigation, Thumbs, Pagination]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <Image
            src="http://localhost:3005/img-blog/202407191533198466884.png"
            className="img-fluid"
            alt="..."
            width={400}
            height={350}
            style={{
              height: '100%',
              width: '100%',
              maxHeight: '350px',
              objectFit: 'cover',
              objectPosition: 'bottom',
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <Image
            src="http://localhost:3005/img-blog/202407191533198466884.png"
            className="img-fluid"
            alt="..."
            width={400}
            height={350}
            style={{
              height: '100%',
              width: '100%',
              maxHeight: '350px',
              objectFit: 'cover',
              objectPosition: 'bottom',
            }}
          />
        </SwiperSlide>

        <SwiperSlide>
          <Image
            src="http://localhost:3005/img-blog/202407191533198466884.png"
            className="img-fluid"
            alt="..."
            width={400}
            height={350}
            style={{
              height: '100%',
              width: '100%',
              maxHeight: '350px',
              objectFit: 'cover',
              objectPosition: 'bottom',
            }}
          />
        </SwiperSlide>
      </Swiper>
    </>
  )
}
