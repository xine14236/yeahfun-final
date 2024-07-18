import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { DatePicker, Space } from 'antd'//Ant Design日期套件
import { createRoot } from 'react-dom/client'
// import ReactDOM from 'react-dom';//使用 ReactDOM.render 方法來將一個 React 元素渲染到 DOM 中的某個節點
// import DatePickerApp from './DatePickerApp'; // 請根據你的檔案結構調整路徑

import StoreDetail from '@/components/product/storeDetail'
import { set } from 'lodash'

export default function CampAreaSearchBar() {
  const router = useRouter()
  const { pid } = router.query

  //引入Ant Design日期套件
  const { RangePicker } = DatePicker
  const DatePickerApp = () => (
    <Space direction="vertical" size={12}>
      <RangePicker
        id={{
          start: 'startInput',
          end: 'endInput',
        }}
        onFocus={(_, info) => {
          console.log('Focus:', info.range)
        }}
        onBlur={(_, info) => {
          console.log('Blur:', info.range)
        }}
      />
      {/* <RangePicker showTime /> */}
      {/* <RangePicker picker="week" /> */}
      {/* <RangePicker picker="month" /> */}
      {/* <RangePicker picker="quarter" /> */}
      {/* <RangePicker picker="year" /> */}
    </Space>
  )
  const handleClick = () => {
    const inputDate = document.getElementById('inputDate')
    const root = createRoot(inputDate)
    root.render(<DatePickerApp />)
  }

  //追蹤用戶輸入的日期
  const [date, setDate] = useState('');
  const handleDateChange = (date,dateString) => {
    setDate(date);
    console.log('Date:', dateString);
  }

  // 人數選擇
  const [people, setPeople] = useState(1)
  const peopleOptions = new Array(12).fill().map((_, i) => i + 1)

  return (
    <>
      {/* 輸入日期、人數 */}
      <div className="campAreaSearchBar" style={{ border: '1px solid red' }}>
        <form className="inputDateAndNumber" action="">
          <div className="inputDate" id="inputDate">
            <DatePickerApp
              type="text"
              value={date}
              onChange={handleDateChange}
            />
            <button onClick={handleClick}>選擇日期</button>
            {/* <div
              htmlFor=""
              style={{
                color: 'var(--white, /FFF)',
                fontFamily: 'Inter',
                fontSize: 18,
                fontStyle: 'normal',
                fontWeight: 500,
                lineHeight: 'normal',
              }}
            >
            </div> */}
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
