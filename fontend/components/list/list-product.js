import styles from '@/styles/list.module.scss'
import Link from 'next/link'
//icons
import Location from '@/components/icons/location'
import Star from '@/components/icons/star'
import { useEffect, useState } from 'react'

export default function ListProduct() {
  // 注意1: 初始值至少要空白陣列。初次render是使用初始值，需要對應伺服器的資料模型
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(務必一定要是陣列)
  const [products, setProducts] = useState([])

  // 與伺服器作fetch獲得資料
  const getProducts = async () => {
    const url = 'http://localhost:3005/api/stores'

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

  // 樣式2 didMount
  // 首次渲染(render)之後(after)，執行一次第一傳入參數函式其中程式碼，之後不會再執行
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      {products.map((v, i) => {
        return (
          <div className="col-12 col-sm-4" key={v.id}>
            <div className={`card ${styles.productCard}`}>
              <Link href="#/">
                <img
                  src="/images/homepage/tent13.jpg"
                  className={styles.cardImage}
                  alt="tents"
                />
              </Link>
              <div className={`card-body ${styles.cardBody}`}>
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
                <div className={`card-title ${styles.cardTitle}`}>
                  <h4>
                    <Link href="#/">{v.name}</Link>
                  </h4>
                  <h6>${v.lowest_normal_price}</h6>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
