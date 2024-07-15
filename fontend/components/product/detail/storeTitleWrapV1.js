import React from 'react'
// import Link from 'next'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
// eslint-disable-next-line import/no-unresolved
// import Loader from '@/components/loader'

const images = [
  {
    src: '/detail/campGallery1.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery2.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery3.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery4.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery5.jpg',
    alt: 'camp',
  },
]
// 修正後的程式碼
// const imageElements = images.map((image, index) => (
//   <Image key={index} src={image.src} alt={image.alt} />
// ));

// 資料範例:
// {
//   "status": "success",
//   "data": {
//     "store": {
//       "stores_id": 1,
//       "owners_id": 1,
//       "name": "吉伊卡哇",
//       "mobile": "0924566789",
//       "address": "吉伊卡哇市",
//       "longitude": "23.22222N",
//       "latitude": "150.2522222E",
//       "altitude": "500m",
//       "precautions": "chiikawa",
//       "introduction": "chiikawa cute",
//       "update_time": "2024-05-03 10:57:01"
//     }
//   }
// }

export default function StoreTitleWrap() {
  // const router = useRouter()
  // 宣告store狀態
  // const [store, setStore] = useState({
  //   stores_id: 0,
  //   owners_id: 0,
  //   name: '',
  //   mobile: '',
  //   address: '',
  //   longitude: '',
  //   latitude: '',
  //   altitude: '',
  //   precautions: '',
  //   introduction: '',
  //   update_time: '',
  // })

  // 宣告一個載入的狀態信號值
  // 設定一開始進入此頁面就要向伺服器獲取資料，不出現初始值
  // const [isLoading, setIsLoading] = useState(true)

  // 與伺服器作fetch獲得資料
  // const getProduct = async (pid) => {
  //   const url = 'http://localhost:3005/api/detail/' + pid

  //   // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
  //   try {
  //     const res = await fetch(url)
  //     const resData = await res.json()

  //     // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
  //     // 確定資料是純物件資料類型才設定到狀態中(最基本的保護)
  //     if (resData.status === 'success') {
  //       setStore(resData.data.store)
  //       // 關閉載入動畫，1.5再關閉
  //       setTimeout(() => {
  //         setIsLoading(false)
  //       }, 1500)
  //     }
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // useEffect(() => {
  //   console.log('render router.query=', router.query)
  // })

  // 樣式3: didMount+didUpdate
  // useEffect(() => {
  //   if (router.isReady) {
  //     // 這裡可以得到router.query
  //     console.log(router.query)
  //     // 向伺服器要求資料
  //     getProduct(router.query.pid)
  //   }
  //   // eslint-disable-next-line
  // }, [router.isReady])

  return (
    <>
      <div className="storeTitleWrap">
        <div className="storeTitle">
          <h1>123</h1>
          <div className="campShare">
            <div>share</div>
            <div>add</div>
          </div>
        </div>
        <div className="storeIntroduce">
          <div className="briefIntroduce">
            <p>
              布農語在這裡休息。海拔900公尺環境優雅清靜，群山環繞鳥語草香，遠眺玉山、郡大山、望鄉山，舉目所見盡是超寬角的山野景觀。除了提供露營場地、民宿及信義鄉旅遊諮詢，還可在此進行烤肉、營火晚會、體驗布農相關文化等活動，不論是家族出遊，同學會或戶外研習活動甚至想偷一點清靜閒適的朋友們都相當適合
            </p>
          </div>
          <div className="campTags">
            <h4>高雄市桃源區</h4>
            <div>
              <div>/草地</div>
              <div>/親子</div>
              <div>/夜衝</div>
            </div>
            <div className="campTag"></div>
          </div>
        </div>
        <div className="storeGallery">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: 10,
              padding: 10,
            }}
          >
            <div style={{ gridRow: 'span 2' }}>
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* <div>{imageElements}</div> */}
            </div>
            <div>
              <Image
                src={images[1].src}
                alt={images[1].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <Image
                src={images[2].src}
                alt={images[2].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <Image
                src={images[3].src}
                alt={images[3].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <Image
                src={images[4].src}
                alt={images[4].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
