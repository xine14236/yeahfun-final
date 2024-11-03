import ListLayout from '@/components/layout/list-layout'
import { P_LIST } from '@/configs/api-path'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLoader } from '@/hooks/use-loader'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
import styles from '@/styles/list.module.scss'
import { Select, Input, Slider, DatePicker } from 'antd'
const { RangePicker } = DatePicker
import dayjs from 'dayjs'

import Pagination from '@/components/list/pagination'
import ProductList from '@/components/list/product-list'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)
import { ScrollMotionContainer, ScrollMotionItem } from '../../ScrollMotion'

import GoTop from '@/components/home/go-top'
import Loading from '@/components/list/loading'
import CardLoading from '@/components/loader/card-loading'

import Image from 'next/image'

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
  const { showLoader, hideLoader, loading, delay } = useLoader()

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
    showLoader()
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
      })
      .then(delay(3000)) // 延時3秒後再停止載入器，只有手動控制有用，自動關閉會無用
      .then(hideLoader)
      .catch((error) => console.error('Error fetching data:', error))
  }, [router])

  return (
    <>
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
          <div className={styles.orderBys}>
            <label htmlFor="orderBy" className={styles.formTitle}>
              <h5>排序方式</h5>
            </label>
            <Select
              placeholder="請選擇排列方式"
              // defaultValue=""
              style={{
                width: '170px',
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
            {/* <p>目錄</p> */}
            <NextBreadCrumb isHomeIcon isChevron bgClass="" />
          </div>
        </div>

        <div className={`container-fluid ${styles.listContainer}`}>
          <div className="row">
            <ProductList products={products} query={query} />

            <div
              aria-label="Page navigation example"
              className={styles.pageBtn}
            >
              <Pagination
                pageCount={products.pageCount}
                onPageChange={handlePageClick}
                page={products.page}
              />
            </div>
          </div>
        </div>
      </div>
      <GoTop />
    </>
  )
}

Products.getLayout = function (page) {
  return <ListLayout>{page}</ListLayout>
}
