import ListLayout from '@/components/layout/list-layout'
import { useState, useEffect } from 'react'
import styles from '@/styles/list.module.scss'

import Image from 'next/image'

// 組合
import ListSort from '@/components/list/list-sort'
import ListProduct from '@/components/list/list-product'

export default function List() {
  return (
    <>
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
          <div className="row">
            <div className="col-sm-2 col-12">
              <ListSort />
            </div>
            <ListProduct />
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
