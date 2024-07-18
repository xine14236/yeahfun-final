import React from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/detail.module.css'
// import Image from 'next/image'
// eslint-disable-next-line import/no-unresolved
// import Loader from '@/components/loader'

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

  //宣告tag狀態
  const [tag, setTag] = useState([
    // {
    //   stores_id: 0,
    //   store_name: '',
    //   tag_name: '',
    //   tagId: 0,
    // },
  ])

  // 宣告一個載入的狀態信號值
  // 設定一開始進入此頁面就要向伺服器獲取資料，不出現初始值
  // const [isLoading, setIsLoading] = useState(true)

  // 與伺服器作fetch獲得資料
  const getProduct = async (pid) => {
    const url = 'http://localhost:3005/api/detail/' + pid

    try {
      const res = await fetch(url)
      const resData = await res.json()
      // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
      // 確定資料是純物件資料類型才設定到狀態中(最基本的保護)
      if (resData.status === 'success') {
        setStore(resData.data.store)
        setTag(resData.data.tag)
        console.log(`"標籤"：${resData.data.tag}`)
        // 關閉載入動畫，1.5再關閉
        // setTimeout(() => {
        //   setIsLoading(false)
        // }, 1500)
      }
    } catch (e) {
      console.error(e)
    }
  }

  //將取得tag資料map
  const tags = tag.map((item, index) => {
    return (
      <>
        <span style={{ color: 'grey' }} key={index}>
          #{item.tag_name}
        </span>
        <br />
      </>
    )
  })

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
        <div className={styles.storeTitle}>
          <h1>{store.name}</h1>
          <div className="storeShare">
            <div>share</div>
            <div>add</div>
          </div>
        </div>
        <div className="storeIntroduce row">
          <div className="briefIntroduce col-6">
            <p>{store.introduction}</p>
          </div>
          <div className="campTags col-2">
            <h5>{store.address}</h5>
            {tags}
          </div>
        </div>
      </div>
      {/* )} */}
      <style jsx>
        {`
          .storeIntroduce {
            justify-content: space-between;
            align-items: center;
          }
          .briefIntroduce {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 18px;
            flex-shrink: 0;
            padding: 10px;
          }
          .campTags {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
            flex-shrink: 0;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}
