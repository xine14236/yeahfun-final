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

export default function Products() {
  const router = useRouter()
  const [products, setProducts] = useState({
    success: false,
    data: {
      total: 0,
      pageCount: 0,
      page: 0,
      perPage: 0,
      stores: [],
    },
  })
  const handlePageClick = (data) => {
    const selectedPage = data.selected + 1 // ReactPaginate starts indexing from 0
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: selectedPage },
    })
  }

  useEffect(() => {
    // if (!router.isReady) return
    fetch(`${P_LIST}`)
      .then((r) => r.json())
      .then((resData) => {
        setProducts(resData.data.stores)
        // setPageCount(resData.data.pageCount)
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [router])

  return (
    <>
      <pre>{JSON.stringify(products, null, 4)}</pre>;
      <div className={styles.searchBar}>
        <form
          className={styles.productSearchForm}
          action=""
          // onSubmit={handleSubmit}
          id="productSearchForm"
        >
          <div className={styles.goWhereTeam}>
            <label className={styles.formTitle} htmlFor="goWhere">
              <h5>你想去哪裡?</h5>
            </label>
            <Select
              // defaultValue={query.location || '全台灣'}
              defaultValue={'全台灣'}
              style={{ width: '100%' }}
              // onChange={handleChangeSelect1}
              // options={locationOptions.map((value, i) => ({
              //   key: i,
              //   value: value,
              //   label: value,
              // }))}
            />
          </div>
          <div className={styles.calendarTeam}>
            <label htmlFor="date" className={styles.formTitle}>
              <h5>入住日期區間</h5>
            </label>
            <RangePicker
            // defaultValue={
            //   query.startDate && query.endDate
            //     ? [dayjs(query.startDate), dayjs(query.endDate)]
            //     : [dayjs(), dayjs().add(1, 'day')]
            // }
            // disabledDate={disabledDate}
            // onChange={handleDateChange}
            />
          </div>
          <div className={styles.types}>
            <h5>類型</h5>
            {/* <Select
              className={styles.typesSelect}
              // defaultValue={tag || []}
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="請選擇"
              value={tag}
              maxTagCount="responsive"
              onChange={handleTagChange}
              options={tagOptions.map((value) => ({
                value: value,
                label: value,
              }))}
            /> */}
          </div>
          <div className={styles.keyword}>
            {/* <Input
              placeholder="輸入關鍵字"
              value={nameLike}
              onChange={(e) => {
                setNameLike(e.target.value)
              }}
            /> */}
          </div>

          <div className={styles.searchBarSort}>
            <div className={styles.price}>
              <label htmlFor="range">
                <h5>價格區間</h5>
              </label>
              {/* <Slider
                range
                value={priceRange}
                defaultValue={[0, 3000]}
                min={0}
                max={5000}
                step={100}
                onChange={(value) => {
                  setPriceRange(value)
                }}
              /> */}
            </div>
          </div>
          <button
            className={`btnGreenPc transition`}
            // onClick={handleSearch}
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
              // onChange={handleChange}
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
                    // onChange={handleChange}
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
                    // value={priceRange}
                    defaultValue={[0, 3000]}
                    min={0}
                    max={5000}
                    step={100}
                    onChange={(value) => {
                      // setPriceRange(value)
                    }}
                  />
                </div>
                <div>
                  {/* <button className="btnGreenPc" onClick={handleSearch}>
                    搜尋
                  </button> */}
                </div>
              </form>
            </div>
            <div className="col-sm-10 col-12">
              {/* {productChunks.map((chunk, chunkIndex) => ( */}
              <div className="row">
                {/* {products.map((v) => (
                  <div className="col-12 col-sm-4" key={v.stores_id}>
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
                          <h5>${v.lowest_normal_price}/每晚</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
            <div
              aria-label="Page navigation example"
              className={styles.pageBtn}
            >
              <ReactPaginate
                // pageCount={products.pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                onPageChange={handlePageClick}
                // forcePage={products.page - 1} // Force current page to be active
                nextLabel={<RightArrow size={13} />}
                previousLabel={<LeftArrow size={13} />}
                breakLabel="..."
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
