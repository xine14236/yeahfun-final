import ListLayout from '@/components/layout/list-layout'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from '@/styles/list.module.scss'
import { Select, Input, Slider, Checkbox, DatePicker } from 'antd'
const { RangePicker } = DatePicker
import ReactPaginate from 'react-paginate'
import LeftArrow from '@/components/icons/left-arrow'
import RightArrow from '@/components/icons/right-arrow'
import Link from 'next/link'
import Location from '@/components/icons/location'
import Star from '@/components/icons/star'

import Image from 'next/image'

// 組合
import ListProduct from '@/components/list/list-product'

export default function Products() {
  const router = useRouter()
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

  const tagOptions = [
    '草地',
    '遠景',
    '獨立包區',
    '森林系',
    '櫻花祭',
    '親子同遊',
    '雨棚',
    '小木屋',
    '山景雲海',
    '海景',
  ]
  const locationOptions = ['全台灣', '南投縣', '屏東縣', '苗栗縣']

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
  const handleTagChecked = (value) => {
    if (tag.includes(value)) {
      // 如果有===>移出陣列
      const nextTag = tag.filter((v) => v !== value)
      setTag(nextTag)
    } else {
      // 否則===>加入陣列
      const nextTag = [...tag, value]
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

  const handleChangeSelect = (value) => {
    if (value === '全台灣') {
      setLocation([])
    } else {
      setLocation(value)
    }
  }

  // 初始和頁數或每頁數變化時獲取數據
  useEffect(() => {
    if (!router.isReady) return // router 還沒準備好, 就什麼都不做
    const params = { page, perpage, sort, order }
    getProducts(params)
  }, [page, perpage, sort, order, router])

  return (
    <>
      <div className={styles.searchBar}>
        <form
          className={styles.productSearchForm}
          action=""
          onSubmit={(e) => {
            e.preventDefault()
            router.push(`?location=${location}`)
          }}
          id="productSearchForm"
        >
          <div className={styles.goWhereTeam}>
            <label className={styles.formTitle} htmlFor="goWhere">
              <h5>你想去哪裡 ?</h5>
            </label>
            <Select
              defaultValue="全台灣"
              style={{ width: 120 }}
              onChange={handleChangeSelect}
              options={locationOptions.map((value) => ({
                key: value,
                value: value,
                label: value,
              }))}
            />
          </div>

          <div className={styles.calendarTeam}>
            <label htmlFor="date" className={styles.formTitle}>
              <h5>入住日期區間</h5>
            </label>
            <RangePicker />
          </div>
          <div className={styles.searchBarSort}>
            <div className={styles.keyword}>
              <label htmlFor="search" className={styles.formTitle}>
                <p>關鍵字搜尋</p>
              </label>
              <input type="text" id="search" name="search" placeholder="" />
            </div>
            <div className={styles.price}>
              <label htmlFor="minPrice">今天的預算</label>
              <input type="text" id="minPrice" placeholder="最小價格" />
              <input type="text" id="maxPrice" placeholder="最大價格" />
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
          <button
            className={`btnGreenPc styles.transition`}
            onClick={handleSearch}
          >
            開始探索
          </button>
        </form>
      </div>
      <div className={`${styles.myCardList} ${styles.section02}`}>
        <div className="title">
          <img src="/images/homepage/title-tree.png" alt="" />
          <div className="titleContent">
            <h3 className="titleText">List</h3>
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
          <div className="row g-5">
            <div className="col-sm-2 col-12">
              <form
                className={styles.sort}
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push(
                    `?nameLike=${nameLike}&lowest_normal_price=${priceRange[0]}&lowest_normal_price=${priceRange[1]}&tag=${tag}`
                  ) // 變更 qs 參數, 觸發 router 的變更
                }}
              >
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
                  <Checkbox.Group
                    style={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '5px',
                    }}
                    options={tagOptions.map((v, i) => ({
                      key: i,
                      label: v,
                      value: v,
                    }))}
                    onChange={handleTagChecked}
                  />
                  <div>
                    <button className="btnGreenPc" onClick={handleSearch}>
                      搜尋
                    </button>
                  </div>
                </div>
              </form>
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
            <div
              aria-label="Page navigation example"
              className={styles.pageBtn}
            >
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
          </div>
        </div>
      </div>
    </>
  )
}

Products.getLayout = function (page) {
  return <ListLayout>{page}</ListLayout>
}
