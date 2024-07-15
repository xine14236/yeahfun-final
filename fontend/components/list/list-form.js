import React from 'react'
import styles from '@/components/list/list-form.module.scss'
import { Select, DatePicker } from 'antd'
const { RangePicker } = DatePicker

export default function ListForm() {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <>
      <div className={styles.searchBar}>
        <form
          className={styles.productSearchForm}
          action=""
          onSubmit={(e) => e.preventDefault()}
          id="productSearchForm"
        >
          <div className={styles.goWhereTeam}>
            <label className={styles.formTitle} htmlFor="goWhere">
              <h5>你想去哪裡 ?</h5>
            </label>
            <Select
              defaultValue="all"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'all',
                  label: '全台灣',
                },
                {
                  value: 'nantou',
                  label: '南投縣',
                },
                {
                  value: 'Pingtung',
                  label: '屏東縣',
                },
                {
                  value: 'Miaoli',
                  label: '苗栗縣',
                },
              ]}
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
          <button className={`btnGreenPc styles.transition`}>開始探索</button>
        </form>
      </div>
    </>
  )
}
