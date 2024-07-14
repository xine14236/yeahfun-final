import ListLayout from '@/components/layout/list-layout'
import { useState, useEffect } from 'react'
import styles from '@/styles/list.module.scss'
import Link from 'next/link'
import Image from 'next/image'

//icons
import Location from '@/components/icons/location'
import Star from '@/components/icons/star'

export default function List() {
  // 注意1: 初始值至少要空白陣列。初次render是使用初始值，需要對應伺服器的資料模型
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(務必一定要是陣列)
  const [products, setProducts] = useState([])

  // 與伺服器作fetch獲得資料
  const getProducts = async () => {
    const url = 'http://localhost:3005/api/stores2'

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
      <div className={`${styles.myCardList} ${styles.section02}`}>
        <div className={styles.title}>
          <img src="/images/homepage/title-tree.png" alt="" />
          <div className={styles.titleContent}>
            <h3 className={styles.titleText}>List</h3>
            <p>目錄</p>
          </div>
        </div>
        <div className={`container-fluid ${styles.listContainer}`}>
          <div className={styles.orderByNone}>
            <label htmlFor="orderBy" className={styles.formTitle}>
              <p>排序方式</p>
            </label>
            <select name="orderBy" id="orderBy">
              <option value="desc">價格依高到低排序</option>
              <option value="asc">價格依低到高排序</option>
            </select>
          </div>
          <div className="row">
            <div className="col-sm-2 col-12">
              <div className={styles.sort}>
                <div>
                  <label htmlFor="orderBy" className={styles.formTitle}>
                    <p>排序方式</p>
                  </label>
                  <select name="orderBy" id="orderBy">
                    <option value="desc">價格依高到低排序</option>
                    <option value="asc">價格依低到高排序</option>
                  </select>
                </div>
                <div className="keyword">
                  <label htmlFor="search" className={styles.formTitle}>
                    <p>關鍵字搜尋</p>
                  </label>
                  <input type="text" id="search" name="search" placeholder="" />
                </div>
                <div className={styles.price}>
                  <label htmlFor="">今天的預算</label>
                  <input type="text" placeholder="最小價格" />
                  <input type="text" placeholder="最大價格" />
                </div>
                <div className={styles.types}>
                  <p>類型</p>
                  <label htmlFor="type">
                    <input type="checkbox" name="type" id="type" />
                    <span>森林系</span>
                  </label>
                  <label htmlFor="type2">
                    <input type="checkbox" name="type" id="type2" />
                    <span>森林系</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-12">
              <div className="row">
                <div className="col-md-4 mb-4">
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
                          <p>花蓮縣</p>
                        </div>
                        <div className={styles.cardTagStar}>
                          <Star className={styles.iconStar} />
                          <p>4.5</p>
                        </div>
                      </div>
                      <div className={`card-title ${styles.cardTitle}`}>
                        <h4>
                          <Link href="#/">星空營地</Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div aria-label="Page navigation example" className={styles.pageBtn}>
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#/" aria-label="Previous">
                  <span aria-hidden="true">«</span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#/">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#/">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#/">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#/" aria-label="Next">
                  <span aria-hidden="true">»</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* {products.map((v, i) => {
        return (
          <div className="card" key={v.id}>
            <p>{v.name}</p>
            <p>{v.address}</p>
            <p>{v.stores_id}</p>
            <p>{v.my_tag_id}</p>
            <p>{v.tag_name}</p>
            <p>{v.comment_star}</p>
            <p>{v.lowest_normal_price}</p>
            <p>{v.img_name}</p>
          </div>
        )
      })} */}
    </>
  )
}

List.getLayout = function (page) {
  return <ListLayout>{page}</ListLayout>
}
