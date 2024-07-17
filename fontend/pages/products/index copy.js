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
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import Image from 'next/image'

export default function Products() {
  const router = useRouter()
  const query = router.query
  const [products, setProducts] = useState([])
  const [total, setTotal] = useState(0) // 總筆數
  const [pageCount, setPageCount] = useState(0) // 總頁數
  const [page, setPage] = useState(1) // 起始頁
  const [perpage, setPerpage] = useState(12) // 每頁12筆
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('asc')

  // 查詢條件用(這裡用的初始值都與伺服器的預設值一致)
  const [dateRange, setDateRange] = useState([])
  const [nameLike, setNameLike] = useState(router.query.nameLike || '')
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState([])
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
  const locationOptions = ['全台灣', '南投縣', '屏東縣', '花蓮縣']

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

  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day')
  }

  const handleChange = (value) => {
    const [sortValue, orderValue] = value.split(',')
    setSort(sortValue)
    setOrder(orderValue)
  }

  const handlePageClick = (event) => {
    setPage(event.selected + 1)
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  const handleTagChecked = (e) => {
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
  const handleDateChange = (e) => {
    setDateRange(e)
  }

  const handleChangeSelect = (value) => {
    if (value === '全台灣') {
      setLocation([])
    } else {
      setLocation(value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    const startDate = dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : ''
    const endDate = dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : ''

    // router.push(`?startDate=${startDate}&endDate=${endDate}`)
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
      startDate: dateRange[0]?.format('YYYY-MM-DD'),
      endDate: dateRange[1]?.format('YYYY-MM-DD'),
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
    if (!router.isReady) return
    // const { location, tag, startDate, endDate, nameLike } = router.query
    if (router.query.tag) {
      setTag(router.query.tag.split(','))
    }
    if (router.query.startDate && router.query.endDate) {
      setDateRange([
        dayjs(router.query.startDate, 'YYYY-MM-DD'),
        dayjs(router.query.endDate, 'YYYY-MM-DD'),
      ])
    }
    const params = { page, perpage, sort, order }
    getProducts(params)
  }, [page, perpage, sort, order, router])

  return (
    <>
      <div className={styles.searchBar}>
        <form
          className={styles.productSearchForm}
          action=""
          onSubmit={handleSearch}
          id="productSearchForm"
        >
          <div className={styles.calendarTeam}>
            <label htmlFor="date" className={styles.formTitle}>
              <h5>入住日期區間</h5>
            </label>
            <RangePicker
              value={dateRange}
              disabledDate={disabledDate}
              onChange={handleDateChange}
            />
          </div>
          <div className={styles.searchBarSort}>
            <div className={styles.keyword}>
              <label htmlFor="search" className={styles.formTitle}>
                <h5>關鍵字搜尋</h5>
              </label>
              <Input
                value={nameLike}
                onChange={(e) => {
                  setNameLike(e.target.value)
                }}
              />
            </div>
            <div className={styles.price}>
              <label htmlFor="range">
                <h5>價格區間</h5>
              </label>
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
              <h5>類型</h5>
              <div className="row">
                {tagOptions.map((v, i) => {
                  return (
                    <div className="col-6" key={i}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id={v}
                          type="checkbox"
                          value={v}
                          checked={tag.includes(v)}
                          onChange={handleTagChecked}
                        />
                        <label className="form-check-label" htmlFor={v}>
                          {v}
                        </label>
                      </div>
                    </div>
                  )
                })}
              </div>
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
            <Select
              defaultValue="排序-價格-低到高排序"
              style={{
                width: '100%',
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'lowest_normal_price,asc',
                  label: '排序-價格-低到高排序',
                },
                {
                  value: 'lowest_normal_price,desc',
                  label: '排序-價格-高到低排序',
                },
              ]}
            />
          </div>
          <div className="row">
            <div className="col-sm-2 col-12">
              <form
                className={styles.sort}
                onSubmit={(e) => {
                  e.preventDefault()
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
                <div className={styles.goWhereTeam}>
                  <label className={styles.formTitle} htmlFor="goWhere">
                    <p>你想去哪裡?</p>
                  </label>
                  <Select
                    defaultValue={router.query.location || '全台灣'}
                    style={{ width: '100%' }}
                    onChange={handleChangeSelect}
                    options={locationOptions.map((value, i) => ({
                      key: i,
                      value: value,
                      label: value,
                    }))}
                  />
                </div>
                <div className="keyword">
                  <label htmlFor="search" className={styles.formTitle}>
                    <p>關鍵字搜尋</p>
                  </label>
                  <Input
                    // defaultValue="123"
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

                  {tagOptions.map((v, i) => {
                    return (
                      <div className="form-check" key={i}>
                        <input
                          className="form-check-input"
                          id={v}
                          type="checkbox"
                          value={v}
                          checked={tag.includes(v)}
                          onChange={handleTagChecked}
                        />
                        <label className="form-check-label" htmlFor={v}>
                          {v}
                        </label>
                      </div>
                    )
                  })}

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
