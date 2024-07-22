import express from 'express'
const router = express.Router()

// 資料庫使用
import sequelize, { Purchase_Item } from '#configs/db.js'
const { Purchase_Order } = sequelize.models

// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// line pay使用npm套件
import { createLinePayClient } from 'line-pay-merchant'
// 產生uuid用
import { v4 as uuidv4 } from 'uuid'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'

// 定義安全的私鑰字串
const linePayClient = createLinePayClient({
  channelId: process.env.LINE_PAY_CHANNEL_ID,
  channelSecretKey: process.env.LINE_PAY_CHANNEL_SECRET,
  env: process.env.NODE_ENV,
})

// 在資料庫建立order資料(需要會員登入才能使用)
router.post('/create-order', authenticate, async (req, res) => {
  // 會員id由authenticate中介軟體提供
  //const userId = req.body.userid

  // 產生 orderId 與 packageId
  const orderId = uuidv4()

  // 要傳送給line pay的訂單資訊
  const order = {
    orderId: orderId,
    currency: 'TWD',
    amount: req.body.amount,
    options: { display: { locale: 'zh_TW' } },
  }

  // 要儲存到資料庫的資料
  const dbOrder = {
    id: orderId,
    user_id: req.body.userid,
    amount: req.body.amount,
    status: 'pending', // 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    order_info: JSON.stringify(order), // 要傳送給line pay的訂單資訊
  }

  const dbItems = req.body.products.map(product => {
    const start = new Date(product.startdate)
    const end = new Date(product.enddate)
  
    let weekendDays = 0
    let weekdayDays = 0
  
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay()
      if (dayOfWeek === 6 || dayOfWeek === 0) {
        weekendDays++
      } else {
        weekdayDays++
      }
    }
  
    const weekendPrice = weekendDays * product.holiday_price
    const weekdayPrice = weekdayDays * product.normal_price
    const subtotal = weekendPrice + weekdayPrice
  
    return {
      purchase_order_id: orderId,
      store_id: product.store_id,
      room_id: product.room_id,
      startdate: product.startdate,
      enddate: product.enddate,
      price: subtotal, // 使用計算出的 subtotal

    }
  })

  console.log('dbItems:', dbItems); // 檢查是否正確

  // 儲存到資料庫
  await Purchase_Order.create(dbOrder);
  console.log('Purchase_Item:', Purchase_Item);

  const insertedItems = await Purchase_Item.bulkCreate(dbItems, { returning: true });
  console.log('insertedItems:', insertedItems);

  // 回傳給前端的資料
  res.json({ status: 'success', data: { order } });
});

// 重新導向到line-pay，進行交易(純導向不回應前端)
// 資料格式參考 https://enylin.github.io/line-pay-merchant/api-reference/request.html#example
router.get('/reserve', async (req, res) => {
  if (!req.query.orderId) {
    return res.json({ status: 'error', message: 'order id不存在' })
  }

  const orderId = req.query.orderId

  // 設定重新導向與失敗導向的網址
  const redirectUrls = {
    confirmUrl: process.env.REACT_REDIRECT_CONFIRM_URL,
    cancelUrl: process.env.REACT_REDIRECT_CANCEL_URL,
  }

  // 從資料庫取得訂單資料
  const orderRecord = await Purchase_Order.findByPk(orderId, {
    raw: true, // 只需要資料表中資料
  })

  // const orderRecord = await findOne('orders', { order_id: orderId })

  // order_info記錄要向line pay要求的訂單json
  const order = JSON.parse(orderRecord.order_info)

  //const order = cache.get(orderId)
  console.log(`獲得訂單資料，內容如下：`)
  console.log(order)

  try {
    // 向line pay傳送的訂單資料
    const linePayResponse = await linePayClient.request.send({
      body: { ...order, redirectUrls },
    })

    // 深拷貝一份order資料
    const reservation = JSON.parse(JSON.stringify(order))

    reservation.returnCode = linePayResponse.body.returnCode
    reservation.returnMessage = linePayResponse.body.returnMessage
    reservation.transactionId = linePayResponse.body.info.transactionId
    reservation.paymentAccessToken =
      linePayResponse.body.info.paymentAccessToken

    console.log(`預計付款資料(Reservation)已建立。資料如下:`)
    console.log(reservation)

    // 在db儲存reservation資料
    const result = await Purchase_Order.update(
      {
        reservation: JSON.stringify(reservation),
        transaction_id: reservation.transactionId,
      },
      {
        where: {
          id: orderId,
        },
      }
    )

    // console.log(result)

    // 導向到付款頁面， line pay回應後會帶有info.paymentUrl.web為付款網址
    res.redirect(linePayResponse.body.info.paymentUrl.web)
  } catch (e) {
    console.log('error', e)
  }
})

// 向Line Pay確認交易結果
// 格式參考: https://enylin.github.io/line-pay-merchant/api-reference/confirm.html#example
router.get('/confirm', async (req, res) => {
  // 網址上需要有transactionId
  const transactionId = req.query.transactionId

  // 從資料庫取得交易資料
  const dbOrder = await Purchase_Order.findOne({
    where: { transaction_id: transactionId },
    raw: true, // 只需要資料表中資料
  })

  console.log(dbOrder)

  // 交易資料
  const transaction = JSON.parse(dbOrder.reservation)

  console.log(transaction)

  // 交易金額
  const amount = transaction.amount

  try {
    // 最後確認交易
    const linePayResponse = await linePayClient.confirm.send({
      transactionId: transactionId,
      body: {
        currency: 'TWD',
        amount: amount,
      },
    })

    // linePayResponse.body回傳的資料
    console.log(linePayResponse)

    //transaction.confirmBody = linePayResponse.body

    // status: 'pending' | 'paid' | 'cancel' | 'fail' | 'error'
    let status = 'paid'

    if (linePayResponse.body.returnCode !== '0000') {
      status = 'fail'
    }

    // 更新資料庫的訂單狀態
    const result = await Purchase_Order.update(
      {
        status,
        return_code: linePayResponse.body.returnCode,
        confirm: JSON.stringify(linePayResponse.body),
      },
      {
        where: {
          id: dbOrder.id,
        },
      }
    )

    console.log(result)

    return res.json({ status: 'success', data: linePayResponse.body })
  } catch (error) {
    return res.json({ status: 'fail', data: error.data })
  }
})

// 檢查交易用
router.get('/check-transaction', async (req, res) => {
  const transactionId = req.query.transactionId

  try {
    const linePayResponse = await linePayClient.checkPaymentStatus.send({
      transactionId: transactionId,
      params: {},
    })

    // 範例:
    // {
    //   "body": {
    //     "returnCode": "0000",
    //     "returnMessage": "reserved transaction."
    //   },
    //   "comments": {}
    // }

    res.json(linePayResponse.body)
  } catch (e) {
    res.json({ error: e })
  }
})

export default router
