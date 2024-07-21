import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axiosInstance from '@/services/axios-instance'
import { useAuth } from '@/hooks/use-auth'
import Link from 'next/link'
import toast, { Toaster } from 'react-hot-toast'
import styles from '@/styles/cash.module.scss'
import { useCart } from '@/hooks/cart-hook'
import { FaLocationDot, FaHouseChimney } from 'react-icons/fa6'
import Image from 'next/image'

export default function ECPayIndex() {
  const router = useRouter()
  const { auth } = useAuth()
  const { cartItems } = useCart()

  const [sum, setSum] = useState(0)
  // 建立訂單用，格式參考主控台由伺服器回傳
  const [order, setOrder] = useState({})
  // 載入狀態(控制是否顯示載入中的訊息，和伺服器回傳時間點未完成不同步的呈現問題)
  const [isLoading, setIsLoading] = useState(true)

  // confirm回來用的，在記錄確認之後，line-pay回傳訊息與代碼，例如
  // {returnCode: '1172', returnMessage: 'Existing same orderId.'}
  const [result, setResult] = useState({
    returnCode: '',
    returnMessage: '',
  })

  // 格式化日期函數
  const formatDate = (dateString, includeWeekday = true) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = `0${date.getMonth() + 1}`.slice(-2)
    const day = `0${date.getDate()}`.slice(-2)
    const weekday = includeWeekday
      ? `(${['日', '一', '二', '三', '四', '五', '六'][date.getDay()]})`
      : ''
    return {
      year,
      day: `${month}月${day}日${weekday}`,
    }
  }

  // 计算总金额的函数
  const sumTotal = () => {
    const total = cartItems.reduce((acc, v) => {
      const startDate = new Date(v.startDate)
      const endDate = new Date(v.endDate)

      let totalDays = 0
      let holidays = 0
      let normals = 0

      for (
        let d = new Date(startDate);
        d <= endDate;
        d.setDate(d.getDate() + 1)
      ) {
        totalDays++
        const dayOfHoliday = d.getDay()
        if (dayOfHoliday === 6 || dayOfHoliday === 0) {
          // 0: Sunday, 6: Saturday
          holidays++
        } else {
          normals++
        }
      }

      const holidaysPrice = holidays * v.holiday_price
      const normalsPrice = normals * v.normal_price
      const subtotal = holidaysPrice + normalsPrice

      return acc + subtotal
    }, 0)
    setSum(total)
  }

  useEffect(() => {
    sumTotal()
  }, [cartItems])

  // 每次cartItems变化时重新计算总金额
  useEffect(() => {
    sumTotal()
  }, [cartItems])

  //const userid = auth?.useData?.id

  const createOrderAndPay = async () => {
    const products = cartItems.map((v) => ({
      store_id: v.stores_id,
      room_id: v.rooms_campsites_id,
      startdate: v.startDate,
      enddate: v.endDate,
      normal_price: v.normal_price,
      holiday_price: v.holiday_price
    }))

    const res = await axiosInstance.post('/line-pay/create-order', {
      userid: 20,
      products: products,
      amount: sum,
    })

    console.log(res.data)

    if (res.data.status === 'success') {
      setOrder(res.data.data.order)
      toast.success('已成功建立訂單')

      if (window.confirm('確認要導向至ECPay進行付款?')) {
        window.location.href = `http://localhost:3005/api/ecpay/payment?orderId=${res.data.data.order.orderId}`
      }
    } else {
      toast.error('建立訂單失敗')
    }
  }

  // // 導向至ECPay付款頁面
  // const goECPay = () => {
  //   if (window.confirm('確認要導向至ECPay進行付款?')) {
  //     // 先連到node伺服器後，導向至ECPay付款頁面
  //     window.location.href = `http://localhost:3005/api/ecpay/payment?orderId=${order.orderId}`
  //   }
  // }

  // // 建立訂單，送至server建立訂單，packages與order id由server產生
  // const createOrder = async () => {
  //   const products = cartItems.map((v) => ({
  //     store_id: 1,
  //     room_id: 100, // 确保这里包含 room_id
  //     startdate: v.startDate,
  //     enddate: v.endDate,
  //     normal_price: v.normal_price,
  //     holiday_price: v.holiday_price,
  //     totalday: v.totalDays,
  //   }))

  //   const res = await axiosInstance.post('/line-pay/create-order', {
  //     userid: 99,
  //     products: products,
  //     amount: sum,
  //   })

  //   console.log(res.data)

  //   if (res.data.status === 'success') {
  //     setOrder(res.data.data.order)
  //     toast.success('已成功建立訂單')
  //   }
  // }

  // 確認交易，處理伺服器通知已確認付款，為必要流程
  const handleConfirm = async (transactionId) => {
    const res = await axiosInstance.get(
      `/line-pay/confirm?transactionId=${transactionId}`
    )

    console.log(res.data)

    if (res.data.status === 'success') {
      toast.success('付款成功')
    } else {
      toast.error('付款失敗')
    }

    if (res.data.data) {
      setResult(res.data.data)
    }

    // 處理完畢，關閉載入狀態
    setIsLoading(false)
  }

  // confirm回來用的
  useEffect(() => {
    if (router.isReady) {
      // 這裡確保能得到router.query值
      console.log(router.query)
      // http://localhost:3000/order?transactionId=2022112800733496610&orderId=da3b7389-1525-40e0-a139-52ff02a350a8
      // 這裡要得到交易id，處理伺服器通知line pay已確認付款，為必要流程
      // TODO: 除非為不需登入的交易，為提高安全性應檢查是否為會員登入狀態
      const { transactionId, orderId } = router.query

      // 如果沒有帶transactionId或orderId時，導向至首頁(或其它頁)
      if (!transactionId || !orderId) {
        // 關閉載入狀態
        setIsLoading(false)
        // 不繼續處理
        return
      }

      // 向server發送確認交易api
      handleConfirm(transactionId)
    }
    // eslint-disable-next-line
  }, [router.isReady])

  const orderDisplay = (
    <>
      <div className="container my-5">
        <div className={`row row-spacing ${styles.mt20} `}>
          <div className={`col-lg-5 col-md-12 ${styles.detailLeft}`}>
            {cartItems.map((v, i) => {
              const startDate = formatDate(v.startDate)
              const endDate = formatDate(v.endDate)

              return (
                <div key={i}>
                  <div className="d-flex flex-column mb-3">
                    <div className="d-flex align-items-center my-2">
                      <FaLocationDot className="me-2" />
                      <div>
                        <span className={`fs-5 ${styles.textColor}`}>
                          地點：
                        </span>
                        <span className={`fs-6 ${styles.textColor}`}>
                        {v.store_name}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center my-2">
                      <FaHouseChimney className="me-2" />
                      <div>
                        <span className={`fs-5 ${styles.textColor}`}>
                          房號：
                        </span>
                        <span className={`fs-6 ${styles.textColor}`}>
                          {v.rooms_campsites_name}
                        </span>
                      </div>
                    </div>
                    <img
                      className="w-50"
                      src={`/productDetail/${v.storeImage}`}
                      alt="camping image"
                    />
                  </div>

                  <div className="d-flex flex-column mb-3">
                    <div className={`fs-5 ${styles.textColor}`}>時間 </div>
                    <div className="d-flex flex-column flex-md-row">
                      <div
                        className={`d-flex flex-column ${styles.box} my-2 me-md-2`}
                      >
                        <div>{startDate.year}</div>
                        <div>{startDate.day}</div>
                        <div>入住時間：15:00</div>
                      </div>
                      <div className={`d-flex flex-column ${styles.box} my-2`}>
                        <div>{endDate.year}</div>
                        <div>{endDate.day}</div>
                        <div>退住時間：12:00</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <hr />

            <div className="d-flex flex-column mb-3">
              <div className={`fs-5 ${styles.textColor}`}>明細 </div>
              <div className="d-flex flex-column mb-1 mt-2">
                {cartItems.map((v, i) => {
                  let weekendDays = 0
                  let weekdayDays = 0
                  const start = new Date(v.startDate)
                  const end = new Date(v.endDate)

                  for (
                    let d = new Date(start);
                    d <= end;
                    d.setDate(d.getDate() + 1)
                  ) {
                    const dayOfWeek = d.getDay()
                    if (dayOfWeek === 6 || dayOfWeek === 0) {
                      weekendDays++
                    } else {
                      weekdayDays++
                    }
                  }

                  const weekendPrice = weekendDays * v.holiday_price
                  const weekdayPrice = weekdayDays * v.normal_price
                  const subtotal = weekendPrice + weekdayPrice

                  return (
                    <div key={i} className="mb-4 p-3 border rounded bg-light">
                      <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between mb-2">
                          <div>{`假日價格: ${v.holiday_price} x 假日天數: ${weekendDays}`}</div>
                          <div>{` $ ${weekendPrice}`}</div>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                          <div>{`平日價格: ${v.normal_price} x 平日天數: ${weekdayDays}`}</div>
                          <div>{` $ ${weekdayPrice}`}</div>
                        </div>
                        <div className="d-flex justify-content-between font-weight-bold">
                          <div>小計:</div>
                          <div>$ {subtotal}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="d-flex flex-column align-items-end mt-3 p-3 border-top">
                <div className="d-flex justify-content-between w-100">
                  <div className="font-weight-bold">總金額：</div>
                  <div className="font-weight-bold text-primary">$ {sum}</div>
                </div>
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
                    type="button"
                    className={`btn ${styles.btnOutlineInfo}`}
                    onClick={createOrderAndPay}
                  >
                    馬上下訂
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <hr />
      <h5>訂單明細記錄</h5>
      <p>訂單JSON結構，packages id與order id由伺服器產生。</p>
      <p>{JSON.stringify(order)}</p> */}
    </>
  )

  const confirmOrder = (
    <>
      <h2>最後付款確認結果(returnCode=0000 代表成功): </h2>
      <p>{JSON.stringify(result)}</p>
      <p>
        <button
          onClick={() => {
            window.location.href = '/test/line-pay/order'
          }}
        >
          重新測試
        </button>
      </p>
    </>
  )

  if (isLoading) {
    return (
      <>
        <p>與伺服器連線同步中...</p>
      </>
    )
  }

  return (
    <>
      <h1>ECPay測試</h1>
      <p>
        會員登入狀態(需登入才能進行交易): {auth.isAuth ? '已登入' : '未登入'}
      </p>
      <p>
        <Link href="/test/user">連至會員登入頁面</Link>
      </p>
      {result.returnCode ? confirmOrder : orderDisplay}
      {/* 土司訊息視窗用 */}
      <Toaster />
    </>
  )
}
