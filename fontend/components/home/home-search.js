import styles from '@/components/home/header.module.scss'
import { Select, DatePicker, Input } from 'antd'
const { RangePicker } = DatePicker
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'


export default function HomeSearch() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState([])
  const [nameLike, setNameLike] = useState('')
  const [location, setLocation] = useState('')
  const [tag, setTag] = useState([])

  const tagOptions = [
    { label: '草地', value: '草地' },
    { label: '遠景', value: '遠景' },
    { label: '獨立包區', value: '獨立包區' },
    { label: '森林系', value: '森林系' },
    { label: '櫻花祭', value: '櫻花祭' },
    { label: '親子同遊', value: '親子同遊' },
    { label: '雨棚', value: '雨棚' },
    { label: '小木屋', value: '小木屋' },
    { label: '山景雲海', value: '山景雲海' },
    { label: '海景', value: '海景' },
  ]

  const locationOptions = [
    '全台灣',
    '苗栗縣',
    '南投縣',
    '嘉義縣',
    '屏東縣',
    '花蓮縣',
  ]

  const handleChange = (value) => {
    setTag(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const startDate = dateRange[0] ? dateRange[0].format('YYYY-MM-DD') : ''
    const endDate = dateRange[1] ? dateRange[1].format('YYYY-MM-DD') : ''

    const query = `?name_like=${nameLike}&location=${location}&tag=${tag}&startDate=${startDate}&endDate=${endDate}`

    router.push(`/products${query}`)
  }

  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day')
  }
  useEffect(() => {
    if (!router.isReady) return
  }, [router])

  return (
    <div className={styles.glassCardSection}>
      <div className={styles.glassCard}>
        <form
          className={styles.searchForm}
          action=""
          onSubmit={handleSubmit}
          id="searchForm"
        >
          <label className={styles.formTitle} htmlFor="goWhere">
            <h5>你想去哪裡 ?</h5>
          </label>
          <Select
            defaultValue="全台灣"
            style={{ width: '100%' }}
            onChange={(value) => setLocation(value)}
            options={locationOptions.map((v, i) => ({
              key: i,
              value: v,
              label: v,
            }))}
          />
          <label htmlFor="date" className={styles.formTitle}>
            <h5>入住日期區間</h5>
          </label>
          <RangePicker
            disabledDate={disabledDate}
            onChange={(e) => {
              setDateRange(e)
            }}
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
            placeholder="選擇類型"
            onChange={handleChange}
            options={tagOptions.map((v, i) => {
              return {
                key: i,
                value: v.value,
                label: v.label,
              }
            })}
          />

          {/* <label htmlFor="date" className={styles.formTitle}>
            <h5>關鍵字搜尋</h5>
          </label> */}
          <Input
            placeholder="輸入關鍵字"
            value={nameLike}
            onChange={(e) => {
              setNameLike(e.target.value)
            }}
          />
          <button
            className="btnGreenPc transition"
            onClick={(e) => {
              handleSubmit(e)
            }}
          >
            開始探索
          </button>
        </form>
      </div>
    </div>
  )
}
