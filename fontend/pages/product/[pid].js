import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import StoreTitleWrap from '@/components/product//detail/storeTitleWrap'
import StoreNormalInfo from '@/components/product/detail/storeNormalInfo'
import CampAreaSearchBar from '@/components/product/detail/campAreaSearchBar'
import CampGallery from '@/components/product/detail/campGallery.js'
// import CampAreasList from '@/components/product/detail/campAreasList'
// import AttractionsNearby from '@/components/product/detail/attractionsNearby'

export default function Detail() {
  return (
    <>
      <StoreTitleWrap />
      <CampGallery />
      <StoreNormalInfo />
      <CampAreaSearchBar />
      {/* <CampAreasList /> */}
      {/* <AttractionsNearby /> */}
      <Link href="/product/cart">我是購物車請點擊我</Link>
      {/* 輸入日期、人數 */}

      <div className="campAreaSearchBar" style={{ border: '1px solid red' }}>
        <form className="inputDateAndNumber" action="">
          <div className="inputDate">
            <div
              htmlFor=""
              style={{
                color: 'var(--white, #FFF)',
                fontFamily: 'Inter',
                fontSize: 18,
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
              請選擇入住日期：
            </div>
            <input type="text" />
          </div>

          <div className="inputNumber">
            入住人數
            <select
              htmlFor=""
              style={
                {
                  // color: 'var(--white, #FFF)',
                  // fontFamily: 'Inter',
                  // fontSize: 18,
                  // fontStyle: 'normal',
                  // fontWeight: 500,
                  // lineHeight: 'normal',
                }
              }
              value={people}
              onChange={(e) => {
                setPeople(e.target.value)
              }}
            >
              {/* 為了要對應初始的city狀態，加入這個初始或未選擇的選項 */}
              <option value="">請選擇人數</option>
              {peopleOptions.map((v, i) => {
                return (
                  <option key={i} value={v}>
                    {v}人以上
                  </option>
                )
              })}
            </select>
          </div>
        </form>
      </div>

      {/* pid && ( ... )：条件判断，避免在 pid 不存在时出现渲染错误或异常情况。 */}
      {pid && (
        <>
          <div>
            <StoreDetail
              title="房型選擇"
              type="bed"
              pid={pid}
              people={people}
            />
            <StoreDetail
              title="營區選擇"
              type="tent"
              pid={pid}
              people={people}
            />
          </div>
        </>
      )}
    </>
  )
}
