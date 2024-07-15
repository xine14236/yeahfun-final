import { Select, Input, Slider, Checkbox } from 'antd'
import styles from '@/styles/list.module.scss'

export default function ListSort() {
  const handleChange = (value) => {
    console.log(`selected ${value}`)
  }
  return (
    <>
      <div className={styles.sort}>
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
                value: 'priceDesc',
                label: '價格-低到高排序',
              },
              {
                value: 'priceAsc',
                label: '價格-高到低排序',
              },
            ]}
          />
        </div>
        <div className="keyword">
          <label htmlFor="search" className={styles.formTitle}>
            <p>關鍵字搜尋</p>
          </label>
          <Input />
        </div>
        <div className={styles.price}>
          <label htmlFor="range">今天的預算</label>
          <Slider
            range
            defaultValue={[0, 3000]}
            min={0}
            max={5000}
            step={100}
          />
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
    </>
  )
}
