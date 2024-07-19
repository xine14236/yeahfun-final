import ListLayout from '@/components/layout/list-layout'
import { P_LIST } from '@/configs/api-path'
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
import { set } from 'lodash'

export default function Products() {
  const router = useRouter()
  const query = router.query
  const [products, setProducts] = useState({
    success: false,
    total: 0,
    pageCount: 0,
    page: 0,
    perPage: 0,
    stores: [],
  })
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('asc')
  const [nameLike, setNameLike] = useState(query.name_like || '')
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState([])
  const [dateRange, setDateRange] = useState([])
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
  const locationOptions = [
    '全台灣',
    '苗栗縣',
    '南投縣',
    '嘉義縣',
    '屏東縣',
    '花蓮縣',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    const startDate = dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : ''
    const endDate = dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : ''

    let locationQuery = location
    if (location === '全台灣') {
      locationQuery = ''
    }

    const queryParams = {
      name_like: nameLike,
      location: locationQuery,
      tag: tag.join(','),
      startDate,
      endDate,
      sort,
      order,
      lowest_normal_price_gte: priceRange[0],
      lowest_normal_price_lte: priceRange[1],
    }
    const queryString = new URLSearchParams(queryParams).toString()
    // router.push(`?${queryString}`)
    router.push(`?${queryString}`).then(() => {
      // Scroll to 300px from the top
      window.scrollTo({ top: 300, behavior: 'smooth' })
    })
  }
  const handleChangeSelect1 = (e) => {
    setLocation(e)
  }
  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day')
  }
  const handleDateChange = (e) => {
    setDateRange(e)
  }
  const handleTagChange = (e) => {
    setTag(e)
  }
  const handleChange = (value) => {
    const [sortValue, orderValue] = value.split(',')
    setSort(sortValue)
    setOrder(orderValue)
  }

  const handlePageClick = (selectedPage) => {
    const page = selectedPage.selected + 1 // react-paginate selected page is zero-indexed
    const queryParams = { ...router.query, page }
    const queryString = new URLSearchParams(queryParams).toString()
    router.push(`?${queryString}`)
  }

  useEffect(() => {
    if (!router.isReady) return
    if (router.query.location) {
      setLocation(router.query.location)
    }
    if (router.query.keyword) {
      setNameLike(router.query.keyword)
    }
    if (router.query.tag) {
      setTag(router.query.tag.split(',')) // 確保從 query 字串分割並設置為陣列
    }
    if (router.query.startDate && router.query.endDate) {
      {
        setDateRange([
          dayjs(router.query.startDate),
          dayjs(router.query.endDate),
        ])
      }
    }

    fetch(`${P_LIST}?${new URLSearchParams(router.query)}`)
      .then((r) => r.json())
      .then((resData) => {
        setProducts(resData)
        // setPageCount(resData.data.pageCount)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [router])

  return (
    <>
      {/* <pre>{JSON.stringify(products, null, 4)}</pre>; */}
      <div className={styles.searchBar}>
        <form
          className={styles.productSearchForm}
          action=""
          onSubmit={handleSubmit}
          id="productSearchForm"
        >
          <div className={styles.goWhereTeam}>
            <label className={styles.formTitle} htmlFor="goWhere">
              <h5>你想去哪裡?</h5>
            </label>
            <Select
              defaultValue={query.location || '全台灣'}
              style={{ width: '100%' }}
              onChange={handleChangeSelect1}
              options={locationOptions.map((value, i) => ({
                key: i,
                value: value,
                label: value,
              }))}
            />
          </div>
          <div className={styles.calendarTeam}>
            <label htmlFor="date" className={styles.formTitle}>
              <h5>入住日期區間</h5>
            </label>
            <RangePicker
              defaultValue={
                query.startDate && query.endDate
                  ? [dayjs(query.startDate), dayjs(query.endDate)]
                  : [dayjs(), dayjs().add(1, 'day')]
              }
              disabledDate={disabledDate}
              onChange={handleDateChange}
            />
          </div>
          <div className={styles.types}>
            <h5>類型</h5>
            <Select
              className={styles.typesSelect}
              defaultValue={query.tag || []}
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="請選擇類型"
              value={tag}
              maxTagCount="responsive"
              onChange={handleTagChange}
              options={tagOptions.map((value) => ({
                value: value,
                label: value,
              }))}
            />
          </div>
          <div className={styles.keyword}>
            <h5>搜尋</h5>
            <Input
              placeholder="輸入關鍵字"
              // defaultValue={query.name_like || ''}
              value={nameLike}
              onChange={(e) => {
                setNameLike(e.target.value)
              }}
            />
          </div>
          {/* 
          <div className={styles.searchBarSort}>
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
          </div> */}
          <div className={styles.orderBys}>
            <label htmlFor="orderBy" className={styles.formTitle}>
              <h5>排序方式</h5>
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
          <button
            type="submit"
            className={`btnGreenPc transition`}
            // onClick={handleSearch}
          >
            開始探索
          </button>
        </form>
      </div>
      <div className={`${styles.myCardList} ${styles.section02}`}>
        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="blog"
            width={66}
            height={33}
          />
          <div className="titleContent">
            <h3 className="titleText">List</h3>
            <p>目錄</p>
          </div>
        </div>
        <div className={`container-fluid ${styles.listContainer}`}>
          {/* <div className={styles.orderByNone}>
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
          </div> */}
          <div className="row">
            {/* <div className="col-sm-2 col-12">
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
                <div>
                  <button
                    className="btnGreenPc"
                    // onClick={handleSearch}
                  >
                    搜尋
                  </button>
                </div>
              </form>
            </div> */}
            <div className="col-sm-12 col-12">
              {/* {productChunks.map((chunk, chunkIndex) => ( */}
              <div className="row">
                {products.stores.map((v) => (
                  <div className="col-12 col-sm-4" key={v.stores_id}>
                    <div className={`card ${styles.productCard}`}>
                      <Link href={`/detail-test/${v.stores_id}`}>
                        <Image
                          src={`/detail/${v.img_name.split(',')[0]}`}
                          className={styles.cardImage}
                          alt="tents"
                          width={300}
                          height={200}
                          style={{
                            width: '100%',
                            height: 'auto',
                          }}
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
                            <Link href={`/detail-test/${v.stores_id}`}>
                              {v.name}
                            </Link>
                          </h4>
                          <h5>${v.lowest_normal_price}/每晚</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              aria-label="Page navigation example"
              className={styles.pageBtn}
            >
              <ReactPaginate
                previousLabel={<LeftArrow />}
                nextLabel={<RightArrow />}
                breakLabel={'...'}
                breakClassName={'breakItem item'}
                pageCount={products.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'pageItem item'}
                pageLinkClassName={'pageLink link'}
                previousClassName={'previousItem item'}
                previousLinkClassName={'previousLink link'}
                nextClassName={'nextItem item'}
                nextLinkClassName={'nextLink link'}
                breakLinkClassName={'breakLink link'}
                activeClassName={'active'}
                disabledClassName={'disabledItem'}
                disabledLinkClassName={'disabledLink link'}
              />

              {/* <div className="row">
                <div className="col">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      {Array(11)
                        .fill(1)
                        .map((v, i) => {
                          const p = products.page - 5 + i
                          if (p < 1 || p > products.totalPages) return null
                          const qs = { ...router.query }
                          qs.page = p
                          return (
                            <li
                              className={`page-item ${
                                p === products.page ? 'active' : ''
                              } `}
                              key={p}
                            >
                              <Link
                                class="page-link"
                                href={`?${new URLSearchParams(qs)}`}
                              >
                                {p}
                              </Link>
                            </li>
                          )
                        })}
                    </ul>
                  </nav>
                </div>
              </div> */}
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
