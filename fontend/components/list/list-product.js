import styles from '@/styles/list.module.scss'
import Link from 'next/link'
import Location from '@/components/icons/location'
import Star from '@/components/icons/star'
import { useEffect, useState } from 'react'

export default function ListProduct() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0) // 總筆數
  const [pageCount, setPageCount] = useState(0) // 總頁數
  const [page, setPage] = useState(1) // 起始頁
  const [perpage, setPerpage] = useState(12) // 每頁12筆

  // 獲取產品數據
  const getProducts = async (params = {}) => {
    const baseUrl = 'http://localhost:3005/api/stores'
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseUrl}?${qs}`

    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        setPageCount(resData.data.pageCount)
        setTotal(resData.data.total)
        if (Array.isArray(resData.data.stores)) {
          setProducts(resData.data.stores)
        }
      }
    } catch (e) {
      console.error('Fetch error:', e)
    }
  }

  // 初始和頁數或每頁數變化時獲取數據
  useEffect(() => {
    const params = { page, perpage }
    getProducts(params)
  }, [page, perpage])

  // 將陣列分成小塊的函數
  const chunkArray = (array, size) => {
    const chunkedArr = []
    for (let i = 0; i < array.length; i += size) {
      chunkedArr.push(array.slice(i, i + size))
    }
    return chunkedArr
  }

  // 將 products 分成每組三個的小塊
  const productChunks = chunkArray(products, 3)

  return (
    <>
      <div className="col-sm-10 col-12">
        {productChunks.map((chunk, chunkIndex) => (
          <div className="row" key={chunkIndex}>
            {chunk.map((v) => (
              <div className="col-12 col-sm-4" key={v.id}>
                <div className={`card ${styles.productCard}`}>
                  <Link href="#">
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
                        <Link href="#">{v.name}</Link>
                      </h4>
                      <h6>${v.lowest_normal_price}</h6>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div aria-label="Page navigation example" className={styles.pageBtn}>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" onClick={() => setPage(1)}>
              1
            </a>
          </li>
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1)
              }
            }}
          >
            上一頁
          </button>{' '}
          <button
            onClick={() => {
              if (page < pageCount) {
                setPage(page + 1)
              }
            }}
          >
            下一頁
          </button>
        </ul>
      </div>
    </>
  )
}
