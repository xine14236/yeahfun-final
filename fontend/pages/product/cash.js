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
      <div className={`d-flex flex-row m-5 ${styles.box}`}>
  <div className={`${styles.detailRight}`}>
    <form className="d-flex flex-column">
      <label className="form-label mb-3 fs-5">
        訂購人姓名
        <input type="text" className="form-control mt-3" placeholder="CRO" />
      </label>
      <label className="form-label mb-3 fs-5">
        e-mail 信箱
        <input type="email" className="form-control mt-3" placeholder="CRO" />
      </label>
      <label className="form-label mb-3 fs-5">
        行動電話
        <input type="text" className="form-control mt-3" placeholder="CRO" />
      </label>
      <label className="form-label mb-3 fs-5">
        特別需求
        <textarea
          className="form-control mt-3"
          rows={9}
          placeholder="請問可以....."
          defaultValue={""}
        />
      </label>
      <div className="d-flex justify-content-end w-100">
        <button type="submit" className="btn btn-outline-info">
          下一頁
        </button>
      </div>
    </form>
  </div>
  <div className={`${styles.detailLeft}`}>
    <div className="d-flex flex-column mb-3">
      <div className="fs-5">地點 </div>
      <div className="d-flex flex-row my-2">
        <div>logo</div>
        <div className="fs-6">556南投縣信義鄉信筆巷170-5號</div>
      </div>
    </div>
    <div className="d-flex flex-column mb-3">
      <div className="fs-5">時間 </div>
      <div className={`d-flex flex-column ${styles.box} my-2`}>
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
    <div className="d-flex flex-column mb-3">
      <div className="fs-5">明細 </div>
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
</div>
{/* <style jsx>
        {`
          .box {
  background-color: rgba(146, 189, 205, 0.485);
  padding: 20px;

  & div {
    margin-bottom: 10px;
  }
}

.detailRight {
  width: 70%;
  padding: 20px;
  padding-inline-end: 100px;
}
.detailLeft {
  width: 30%;
  background-color: rgba(255, 253, 253, 0.46);
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
}
        `}
      </style> */}

    </>
  )
}
