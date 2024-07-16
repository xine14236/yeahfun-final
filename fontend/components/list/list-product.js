import styles from '@/styles/list.module.scss'
import Link from 'next/link'
import Location from '@/components/icons/location'
import Star from '@/components/icons/star'
import { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import LeftArrow from '@/components/icons/left-arrow'
import RightArrow from '@/components/icons/right-arrow'

// antd
import { Select, Input, Slider, Checkbox } from 'antd'


export default function ListProduct() {
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0) // 總筆數
  const [pageCount, setPageCount] = useState(0) // 總頁數
  const [page, setPage] = useState(1) // 起始頁
  const [perpage, setPerpage] = useState(12) // 每頁12筆
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('asc')

  // 查詢條件用(這裡用的初始值都與伺服器的預設值一致)
  const [nameLike, setNameLike] = useState('')
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState([]) // 字串陣列
  const [priceRange, setPriceRange] = useState([0, 5000])

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

  const handleChange = (value) => {
    const [sortValue, orderValue] = value.split(',')
    setSort(sortValue)
    setOrder(orderValue)
  }

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  // 品牌複選時使用(使用字串陣列狀態)
  const handleBrandChecked = (e) => {
    // 宣告方便使用的tv名稱，取得觸發事件物件的目標值
    const tv = e.target.value
    // 判斷是否有在陣列中
    if (tag.includes(tv)) {
      // 如果有===>移出陣列
      const nextTag = tag.filter((v) => v !== tv)
      setTag(nextTag)
    } else {
      // 否則===>加入陣列
      const nextTag = [...tag, tv]
      setTag(nextTag)
    }
  }

  // 按下搜尋按鈕
  const handleSearch = () => {
    // 每次搜尋條件後，因為頁數和筆數可能不同，所以要導向第1頁
    setPage(1)
    const params = {
      page: 1, // 每次搜尋條件後，因為頁數和筆數可能不同，所以要導向第1頁，向伺服器要第1頁的資料
      perpage,
      sort: sort,
      order: order,
      name_like: nameLike,
      location: location,
      tag: tag.join(','),
      lowest_normal_price_gte: priceRange[0],
      lowest_normal_price_lte: priceRange[1],
    }

    getProducts(params)
  }

  // 初始和頁數或每頁數變化時獲取數據
  useEffect(() => {
    const params = { page, perpage, sort, order }
    getProducts(params)
  }, [page, perpage, sort, order])

  return (
    <>
      <div className="col-sm-2 col-12">
        <div className={styles.sort}>
          <div className={styles.orderBys}>
            <label htmlFor="orderBy" className={styles.formTitle}>
              <p>排序方式</p>
            </label>
            <Select
              defaultValue="價格-低到高排序"
              style={{
                width: '100%',
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'lowest_normal_price,asc',
                  label: '價格-低到高排序',
                },
                {
                  value: 'lowest_normal_price,desc',
                  label: '價格-高到低排序',
                },
              ]}
            />
          </div>
          <div className="keyword">
            <label htmlFor="search" className={styles.formTitle}>
              <p>關鍵字搜尋</p>
            </label>
            <Input
              value={nameLike}
              onChange={(e) => {
                setNameLike(e.target.value)
              }}
            />
          </div>
          <div className={styles.price}>
            <label htmlFor="range">價格區間</label>
            <Slider
              range
              value={priceRange}
              defaultValue={[0, 3000]}
              min={0}
              max={5000}
              step={100}
              onChange={(value) => {
                setPriceRange(value)
              }}
            />
          </div>
          <div className={styles.types}>
            <p>類型</p>
            {tag.map((v, i) => {
              return (
                <label key={i}>
                  <input
                    type="checkbox"
                    value={v}
                    checked={tag.includes(v)}
                    onChange={handleBrandChecked}
                  />
                  {v}
                </label>
              )
            })}
            <div>
              <button onClick={handleSearch}>搜尋</button>
            </div>
          </div>
        </div>
      </div>
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
        <ReactPaginate
          breakLabel="..."
          nextLabel=<RightArrow size={13} className={styles.rightArrow} />
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel=<LeftArrow size={13} />
          renderOnZeroPageCount={null}
          containerClassName={'pagination'}
          pageClassName={'pageItem item'}
          pageLinkClassName={'pageLink link'}
          previousClassName={'previousItem item'}
          previousLinkClassName={'previousLink link'}
          nextClassName={'nextItem item'}
          nextLinkClassName={'nextLink link'}
          breakClassName={'breakItem item'}
          breakLinkClassName={'breakLink link'}
          activeClassName={'active'}
          disabledClassName={'disabledItem'}
          disabledLinkClassName={'disabledLink link'}
        />
      </div>
    </>
  )
}
