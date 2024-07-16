import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import Image from 'next/image'
// eslint-disable-next-line import/no-unresolved
// import Loader from '@/components/loader'

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
  const router = useRouter()
  // 宣告store狀態
  const [store, setStore] = useState({
    stores_id: 0,
    owners_id: 0,
    name: '',
    mobile: '',
    address: '',
    longitude: '',
    latitude: '',
    altitude: '',
    precautions: '',
    introduction: '',
    created_at: '',
    update_time: '',
  })

  // 宣告一個載入的狀態信號值
  // 設定一開始進入此頁面就要向伺服器獲取資料，不出現初始值
  // const [isLoading, setIsLoading] = useState(true)

  // 與伺服器作fetch獲得資料
  const getProduct = async (pid) => {
    const url = 'http://localhost:3005/api/detail/' + pid
    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url) //undefined
      const resData = await res.json()
      // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
      // 確定資料是純物件資料類型才設定到狀態中(最基本的保護)
      if (resData.status === 'success') {
        setStore(resData.data.store)
        console.log(url)
        console.log(resData)
        console.log(resData.data)
        console.log(resData.data.store) //undefined
        // 關閉載入動畫，1.5再關閉
        // setTimeout(() => {
        //   setIsLoading(false)
        // }, 1500)
      }
    } catch (e) {
      console.error(e)
      console.error(pid)
      console.log(url)
    }
  }

  useEffect(() => {
    console.log('render router.query=', router.query)
  })

  // 樣式3: didMount+didUpdate
  useEffect(() => {
    if (router.isReady) {
      // 這裡可以得到router.query
      console.log(router.query)
      // 向伺服器要求資料
      getProduct(router.query.pid)
    }
    // eslint-disable-next-line
  }, [router.isReady])

  return (
    <>
      {/* {isLoading ? ( */}
      {/* <Loader /> */}
      {/* ) : ( */}
      <div className="storeTitleWrap">
        <div className="storeTitle">
          <h1>{store.name}</h1>
          <div className="campShare">
            <div>share</div>
            <div>add</div>
          </div>
        </div>
        <div className="storeIntroduce">
          <div className="briefIntroduce">
            <p>{store.introduction}</p>
          </div>
          <div className="campTags">
            <h4>{store.address}</h4>
            <div>
              <div>/草地</div>
              <div>/親子</div>
              <div>/夜衝</div>
            </div>
            <div className="campTag">/夜衝</div>
          </div>
        </div>
        <div>暫時拿掉gallery</div>
      </div>
      {/* )} */}
    </>
  )
}
