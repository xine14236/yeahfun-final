import React, { useEffect, useState } from 'react'
import styles from '@/styles/blog.module.css'
import heart from '@/assets/heart.svg'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export default function Blog() {


  const [blogs, setBlogs] = useState([])
  const [total, setTotal] = useState(0) //總筆數
  const [pageCount, setPageCount] = useState(0) //總頁數
  const [page, setPage] = useState(1)
  const [perpage, setPerPage] = useState(10)

   // 排序
   const [sort, setSort] = useState('id')
   const [order, setOrder] = useState('asc')

   const [selectedRange, setSelectedRange] = useState([null, null]);

   const handleRangeChange = (dates, dateStrings) => {
    console.log('Selected Range:', dates);
    setSelectedRange(dates); // 更新状态变量
    if(dates){

      console.log(dates[0].$d)
    }
  };

  const getLists = async (params = {}) => {
    const baseUrl = 'http://localhost:3005/api/blog'
    // 轉換params為查詢字串(預設字串)
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseUrl}?${qs}`

    // 使用tyy-catch語句，真的要執行，不同的電腦上，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()
console.log(resData)

      if (resData.success === true) {
        setPageCount(resData.data.pageCount)
        setTotal(resData.data.total)
        if (Array.isArray(resData.data.blogs)) {
         
          setBlogs(resData.data.blogs)
        }
        
      }

      // 設定到狀態中 ===>進入update階段，觸發重新渲染(re-render)，呈現資料
      // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
    } catch (e) {
      console.error(e)
    }
  }
  const stripHtmlTags = (str) => {
    return str.replace(/<[^>]*>/g, '');  // 使用正則表達式去除所有 HTML 標籤
  };





  useEffect(() => {
    //  建立搜尋參數物件
    const params = {
      page,
      perpage,
      sort,
      order,
    }
    // 向伺服器fetch
    getLists(params)
  }, [ page,
    perpage,
    sort,
    order,])


  
  return (
    <>
      <div className="container">
        <div id="blogFilter">
          <div className="row  ">
            <div
              className={`col-12 col-sm-4 col-lg-5 border d-flex flex-column  ${styles.filterControl1}`}
              style={{ height: 100 }}
            >
              <input
                type="text"
                className={`form-control  ${styles.filterWidth1}`}
                placeholder=""
              />
              <div className="form-text text-center">
                透過部落格標題搜尋 <FaSearch />
              </div>
            </div>
            <div
              className="col-12 col-sm-6  col-lg-5 border d-flex justify-content-evenly align-items-center"
              style={{ height: 100 }}
            >
               <RangePicker showTime  onChange={handleRangeChange}/>
            </div>
            <div
              className="col-12 col-sm-2 col-lg  border d-flex  align-items-center justify-content-sm-center "
              style={{ height: 100 }}
            >
              <FaSearch />
            </div>
          </div>
        </div>
        <div className="row" id="card-container"></div>
      </div>
      <div className="container">
        {
          blogs.map((v, i) => {
            return (
              <div className="row " id="card-container" key={v.id}>
                {/* 卡片内容会在这里动态生成 */}
                <div
                  className={`card col-md-12 ${styles.cardWrapper} col-lg-9 ${
                    i % 2 === 1 ? `${styles.cardRight}` : `${styles.cardLeft}`
                  }`}
                >
                  <div className="row g-0 ">
                    <div
                      className={`col-md-5 d-flex flex-column ${
                        i % 2 === 1 ? `${styles.order1}` : ''
                      } `}
                    >
                      <img
                        src="https://via.placeholder.com/300x200"
                        className="img-fluid"
                        alt="..."
                      />
                    </div>
                    <div className="col-md-7 d-flex flex-column">
                      <div className={`card-body ${styles.order0}`}>
                        <div className="d-flex flex-column">
                          <h3
                            className={`card-title ${styles.color1} ${styles.textTruncate2}`}
                          >
                           {v.title}
                          </h3>
                          <div className="d-flex justify-content-between">
                            <p className="card-text ">
                              <small className="text-muted">
                               { v.date}
                              </small>
                            </p>
                            <div>
                              <Image src={heart} />
                              <span className="ms-3">{v.likes_count}</span>
                            </div>
                          </div>
                          <p className="card-text text-muted">
                            <small className="text-muted">{v.author}</small>
                          </p>
                          <div
                            className={`card-content ${styles.textTruncate4}`}
                          >
                            <h5 className="card-text">
                            { stripHtmlTags(v.content).replace(/\\r\\n/g, '').replace(/\s+/g, '')}
                            </h5>
                          </div>
                        </div>
                        <a href="" className="text-decoration-none text-end">
                          <p className={`card-text ${styles.color2}`}>
                            查看更多
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </>
  )
}
