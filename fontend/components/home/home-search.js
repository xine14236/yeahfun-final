import styles from '@/components/layout/home-layout/header.module.scss'

export default function HomeSearch() {
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
          <select name="goWhere" id="goWhere">
            <option value="taiwan">全台灣</option>
            <option value="north">北區</option>
            <option value="central">中區</option>
            <option value="south">南區</option>
            <option value="east">東區</option>
          </select>
          <select name="type" id="type" placeholder="類型選擇">
            <option value="tainan">森林系</option>
            <option value="tainan">森林系</option>
          </select>
          <label htmlFor="date" className={styles.formTitle}>
            <h5>入住日期區間</h5>
          </label>
          <div className={styles.calendarTeam}>
            <input
              id="date"
              type="date"
              name="date"
              placeholder="點擊選擇日期"
            />
          </div>
          <label htmlFor="date" className={styles.formTitle}>
            <h5>關鍵字搜尋</h5>
          </label>
          <input type="text" id="search" name="search" placeholder="" />
          <button className="btnGreenPc transition">開始探索</button>
        </form>
      </div>
    </div>
  )
}
