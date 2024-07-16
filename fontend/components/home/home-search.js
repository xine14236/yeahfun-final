import styles from '@/components/layout/home-layout/header.module.scss'
import { Select, DatePicker, Input } from 'antd'
const { RangePicker } = DatePicker
import dayjs from 'dayjs'
import { useState, useRouter } from 'react'

export default function HomeSearch() {
  // const router = useRouter()
  const [dateRange, setDateRange] = useState([])
  const [nameLike, setNameLike] = useState('')
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState([])

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

  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day')
  }

  return (
    <div className={styles.glassCardSection}>
      <div className={styles.glassCard}>
        <form
          className={styles.searchForm}
          action=""
          onSubmit={() => false}
          id="searchForm"
        >
          <label className={styles.formTitle} htmlFor="goWhere">
            <h5>你想去哪裡 ?</h5>
          </label>
          <Select
            defaultValue="全台灣"
            style={{ width: '100%' }}
            // onChange={handleChangeSelect}
            // options={locationOptions.map((value, i) => ({
            //   key: i,
            //   value: value,
            //   label: value,
            // }))}
          />
          <label htmlFor="type" className={styles.formTitle}>
            <h5>營地類型</h5>
          </label>

          <Select
            mode="multiple"
            allowClear
            style={{
              width: '100%',
            }}
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={(e) => false}
            // options={}
          />

          <label htmlFor="date" className={styles.formTitle}>
            <h5>入住日期區間</h5>
          </label>
          <RangePicker
            disabledDate={disabledDate}
            // onChange={handleDateChange}
          />
          <label htmlFor="date" className={styles.formTitle}>
            <h5>關鍵字搜尋</h5>
          </label>
          <Input
            value={nameLike}
            onChange={(e) => {
              setNameLike(e.target.value)
            }}
          />
          <button className="btnGreenPc transition">開始探索</button>
        </form>
      </div>
    </div>
  )
}
