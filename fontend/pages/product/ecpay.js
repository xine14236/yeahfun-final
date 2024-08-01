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
  const { cartItems, processCheckout } = useCart()

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

  const [level, setLevel] = useState({
    levels: 0,
    coin: 0,
  })

  const [formData, setFormData] = useState({
    name: auth.userData.name,
    email: auth.userData.email,
    phone: auth.userData.phone,
  })

  const [coupon, setCoupon] = useState({})

  //控制姓名的更換
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

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

  // 計算總金額
  const sumTotal = () => {
    const total = cartItems.reduce((acc, v) => {
      const startDate = new Date(v.startDate)
      const endDate = new Date(v.endDate)

      let totalDays = 0
      let holidays = 0
      let normals = 0

      for (
        let d = new Date(startDate);
        d < endDate;
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
    const discount = coupon && !isNaN(Number(coupon.coupon_off)) ? Number(coupon.coupon_off) : 0;
  setSum(total - discount);
  }

  useEffect(() => {
    sumTotal();
  }, [cartItems, coupon]);

  //取得 couponbag 的資料
  const getCoupon = async () => {
    const couponId = cartItems[0].coupon_id
    const url = `http://localhost:3005/api/coin/couponbag/${couponId}`

    const res = await fetch(url)
    const resData = await res.json()

    if (resData.status === 'success') {
      setCoupon(resData.data.couponbag)
      console.log('Set Coupon:', resData.data.couponbag)
    } else {
      console.error('Failed to fetch coupon data:', resData.message)
    }
  }

  useEffect(() => {
    if (cartItems.length > 0) {
      getCoupon().then(() => sumTotal());
    }
  }, [cartItems]);

  //更新 couponbag 的資料
  const updateCouponbag = async () => {
    const couponId = cartItems[0].coupon_id
    const url = `http://localhost:3005/api/coin/updateCouponbag`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ couponId }),
      })
      const resData = await res.json()
      console.log(resData)
    } catch (e) {
      console.error(e)
    }
  }

  //取得 Level 的資料
  const getLevel = async () => {
    const userId = auth.userData.id
    const url = `http://localhost:3005/api/level/${userId}`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log('Get Level Response:', resData)

      if (resData.status === 'success') {
        const { levels = 0, coin = 0 } = resData.data.level || {}
        setLevel({ levels, coin })
      } else {
        setLevel({ levels: 0, coin: 0 })
      }
    } catch (e) {
      console.error('Error fetching level:', e)
      setLevel({ levels: 0, coin: 0 })
    }
  }

  useEffect(() => {
    if (auth.userData && auth.userData.id) {
      getLevel()
    }
  }, [auth.userData])

  // 等級規則
  const rule = (levels) => {
    console.log('Current Levels:', levels)
    let newLevels = Number(levels) + 100
    let newCoin = level.coin

    if (newLevels <= 200) {
      newCoin += 10
    } else if (newLevels <= 400) {
      newCoin += 20
    } else if (newLevels <= 600) {
      newCoin += 30
    } else if (newLevels <= 800) {
      newCoin += 40
    } else if (newLevels <= 1000) {
      newCoin += 50
    } else {
      newCoin += 60
    }

    console.log('Calculated newLevels:', newLevels)
    console.log('Calculated newCoin:', newCoin)

    return { newLevels, newCoin }
  }

  // 更新levels和coin
  const updateLevel = async (newLevels, newCoin) => {
    const userId = auth.userData.id
    const url = `http://localhost:3005/api/level/update-level`
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newLevels, newCoin }),
      })
      const resData = await res.json()
      console.log(resData)
    } catch (e) {
      console.error(e)
    }
  }

  const createOrderAndPay = async () => {
    const products = cartItems.map((v) => ({
      store_id: v.stores_id,
      room_id: v.rooms_campsites_id,
      startdate: v.startDate,
      enddate: v.endDate,
      normal_price: v.normal_price,
      holiday_price: v.holiday_price,
    }))

    const res = await axiosInstance.post('/line-pay/create-order', {
      userid: auth.userData.id,
      products: products,
      amount: sum,
    })

    console.log(res.data)

    if (res.data.status === 'success') {
      setOrder(res.data.data.order)
      toast.success('已成功建立訂單')

      //更新 couponbag 的資料庫
      updateCouponbag();

      // 更新等级和金幣
      const currentLevels = level.levels || 0
      const { newLevels, newCoin } = rule(currentLevels)

      // 更新等级和金幣的資料庫
      updateLevel(newLevels, newCoin)

      // 更新前端狀態
      setLevel({
        levels: newLevels,
        coin: newCoin,
      })

      if (window.confirm('確認要導向至ECPay進行付款?')) {
        window.location.href = `http://localhost:3005/api/ecpay/payment?orderId=${res.data.data.order.orderId}`
      }
    } else {
      toast.error('建立訂單失敗')
    }
  }

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
                    d < end;
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
              <div className="mb-4 p-3 border rounded bg-light">
                <div className="d-flex justify-content-between mb-2">
                  <div>{`優惠劵: ${
                    coupon.directions || 'No directions available'
                  }`}</div>
                  <div>{`- $ ${
                    coupon.coupon_off || 'No discount available'
                  }`}</div>
                </div>
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>

                <label
                  className={`${styles.formLabel} mb-3 fs-5 ${styles.textColor}`}
                >
                  e-mail 信箱
                  <input
                    type="email"
                    className="form-control mt-3"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>

                <label className={`${styles.formLabel} mb-3 fs-5`}>
                  行動電話
                  <input
                    type="text"
                    className="form-control mt-3"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
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
                    className={`btn btnGreenPc`}
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
      {result.returnCode ? confirmOrder : orderDisplay}
      {/* 土司訊息視窗用 */}
      <Toaster />
    </>
  )
}
