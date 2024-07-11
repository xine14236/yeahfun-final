import React from 'react'
import styles from '@/styles/blog.module.css'
import heart from '@/assets/heart.svg'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'

export default function Blog() {
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
              <select
                className={`"form-select" ${styles.filterControl2}`}
                aria-label="Default select example"
              >
                <option selected="">選擇起始時間</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
              <select
                className={`"form-select" ${styles.filterControl2}`}
                aria-label="Default select example"
              >
                <option selected="">選擇最後時間</option>
                <option value={1}>One</option>
                <option value={2}>Two</option>
                <option value={3}>Three</option>
              </select>
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
        {Array(10)
          .fill(0)
          .map((v, i) => {
            return (
              <div className="row " id="card-container" key={i}>
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
                      <div className="card-body order0">
                        <div className="d-flex flex-column">
                          <h3
                            className={`card-title ${styles.color1} ${styles.textTruncate2}`}
                          >
                            需要考慮周詳露營的影響及因應對策
                          </h3>
                          <div className="d-flex justify-content-between">
                            <p className="card-text ">
                              <small className="text-muted">
                                2024年5月31日
                              </small>
                            </p>
                            <div>
                              <Image src={heart} />
                              <span className="ms-3">4</span>
                            </div>
                          </div>
                          <p className="card-text text-muted">
                            <small className="text-muted">陳李鑫</small>
                          </p>
                          <div
                            className={`card-content ${styles.textTruncate4}`}
                          >
                            <h5 className="card-text">
                              回過神才發現，思考露營的存在意義，已讓我廢寢忘食。可是，即使是這樣，露營的出現仍然代表了一定的意義。在人生的歷程中，露營的出現是必然的。曹禺說過一句著名的話，一個真正的人，應該為人民用儘自己的才智，專長和精力，再離開人間。不然，他總會感受到遺憾，浪費了有限的生命。我希望諸位也能好好地體會這句話。
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
