import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import styles from '@/styles/cash.module.scss'

export default function ECPayIndex() {
  return (
    <>
      <div className="container my-5">
        <div className={`row row-spacing ${styles.mt20} `}>
          <div className={`col-lg-5 col-md-12 ${styles.detailLeft}`}>
            <div className="d-flex flex-column mb-3">
              <div className={`fs-5 ${styles.textColor}`}>地點 </div>
              <div className="d-flex flex-row my-2">
                <div>logo</div>
                <div className={`fs-6 ${styles.textColor}`}>
                  556南投縣信義鄉信筆巷170-5號
                </div>
              </div>
              <div className={`fs-5 ${styles.textColor}`}>房號 </div>
              <div className="d-flex flex-row my-2">
                <div>logo</div>
                <div className={`fs-6 ${styles.textColor}`}>00000000000000</div>
              </div>
              <img
                className="w-100"
                src="/try/1651651.png"
                alt="camping image"
              />
            </div>
            <div className="d-flex flex-column mb-3">
              <div className={`fs-5 ${styles.textColor}`}>時間 </div>
              <div className="d-flex flex-column flex-md-row">
                <div
                  className={`d-flex flex-column ${styles.box} my-2 me-md-2`}
                >
                  <div>2024</div>
                  <div>02月05日(一)</div>
                  <div>入住時間：13:00</div>
                </div>
                <div className={`d-flex flex-column ${styles.box} my-2`}>
                  <div>2024</div>
                  <div>02月05日(一)</div>
                  <div>退住時間：13:00</div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column mb-3">
              <div className={`fs-5 ${styles.textColor}`}>總明細 </div>
              <div className="mt-2">
                <div className="d-flex flex-row justify-content-between mb-1">
                  <div className="">$500 * 5 天 =</div>
                  <div className="">$2500</div>
                </div>
                <div className="d-flex flex-row justify-content-between mb-1">
                  <div className="">$500 * 5 天 =</div>
                  <div className="">$2500</div>
                </div>
              </div>
              <hr />
              <div className="d-flex flex-row justify-content-between">
                <div className="">總金額</div>
                <div className="">$2000</div>
              </div>
            </div>
          </div>
          <div
            className={`col-lg-7 col-md-12 col-spacing ${styles.mb20} ${styles.noPadding}`}
          >
            <div className={`${styles.detailRight}`}>
              <form className="d-flex flex-column">
                <label className={`${styles.formLabel} mb-3 fs-5`}>
                  訂購人姓名
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="CRO"
                  />
                </label>
                <label
                  className={`${styles.formLabel} mb-3 fs-5 ${styles.textColor}`}
                >
                  e-mail 信箱
                  <input
                    type="email"
                    className="form-control mt-3"
                    placeholder="CRO"
                  />
                </label>
                <label className={`${styles.formLabel} mb-3 fs-5`}>
                  行動電話
                  <input
                    type="text"
                    className="form-control mt-3"
                    placeholder="CRO"
                  />
                </label>
                <label
                  className={`${styles.formLabel} mb-3 fs-5 ${styles.textColor}`}
                >
                  特別需求
                  <textarea
                    className="form-control mt-3"
                    rows={9}
                    placeholder="請問可以....."
                    defaultValue={''}
                  />
                </label>
                <div className="d-flex justify-content-end w-100">
                  <button
                    type="submit"
                    className={`btn ${styles.btnOutlineInfo}`}
                  >
                    下一頁
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
