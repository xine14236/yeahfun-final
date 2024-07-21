import express from 'express'
const router = express.Router()

// 資料庫使用
// import { Op } from 'sequelize'
import sequelize from '#configs/db.js'
const { Customer } = sequelize.models

// 資料庫使用直接使用 mysql+sql 來查詢
import db from '#configs/mysql.js'

// 密碼編碼和檢查比對用
// import { generateHash, compareHash } from '##/db-helpers/password-hash.js'
import jsonwebtoken from 'jsonwebtoken'

// 存取`.env`設定檔案使用
import 'dotenv/config.js'
// 定義安全的私鑰字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

router.post('/', async function (req, res) {
  // req.body資料範例
  // {
  //     "name":"金妮",
  //     "email":"ginny@test.com",
  //     "username":"ginny",
  //     "password":"12345"
  // }

  // 要新增的會員資料
  const newCustomer = req.body

  // 檢查從前端來的資料哪些為必要(name, username...)
  // if (
  //   !newCustomer.username ||
  //   !newCustomer.email ||
  //   !newCustomer.name ||
  //   !newCustomer.password
  // ) {
  //   return res.json({ status: 'error', message: '缺少必要資料' })
  // }

  // 先檢查username或是email不能有相同的
  const [rows] = await db.query(`SELECT * FROM customer WHERE  email = ?`, [
    newCustomer.email,
  ])

  console.log(rows)

  if (rows.length > 0) {
    return res.json({
      status: 'error',
      message: '建立會員失敗，有重覆的email',
    })
  }

  // 以下是準備新增會員
  // 1. 進行密碼編碼
  // const passwordHash = await generateHash(newCustomer.password)

  // 2. 新增到資料表
  const [rows2] = await db.query(
    // `INSERT INTO member(name, username, password, email, created_at, updated_at) VALUES(?, ?, ?, ?, NOW(), NOW())`,
    `INSERT INTO customer(email, password, created_at, updated_at) VALUES(?, ?, NOW(), NOW())`,
    [newCustomer.email, newCustomer.password]
  )

  console.log(rows2)

  if (!rows2.insertId) {
    return res.json({
      status: 'error',
      message: '建立會員失敗，資料庫錯誤',
    })
  }

  // 成功建立會員的回應
  // 狀態`201`是建立資料的標準回應，
  // 如有必要可以加上`Location`會員建立的uri在回應標頭中，或是回應剛建立的資料
  // res.location(`/users/${user.id}`)
  return res.status(201).json({
    status: 'success',
    data: null,
  })
})

router.post('/login', async (req, res) => {
  // 從前端來的資料 req.body = { username:'xxxx', password :'xxxx'}
  const loginCustomer = req.body

  // 檢查從前端來的資料哪些為必要
  if (!loginCustomer.email || !loginCustomer.password) {
    return res.json({ status: 'fail', data: null })
  }

  // 查詢資料庫，是否有這帳號與密碼的使用者資料
  // 方式一: 使用直接查詢
  // const customer = await sequelize.query(
  //   'SELECT * FROM customer WHERE email=? LIMIT 1',
  //   {
  //     replacements: [loginCustomer.email], //代入問號值
  //     type: QueryTypes.SELECT, //執行為SELECT
  //     plain: true, // 只回傳第一筆資料
  //     raw: true, // 只需要資料表中資料
  //     logging: console.log, // SQL執行呈現在console.log
  //   }
  // )

  // 方式二: 使用模型查詢
  const customer = await Customer.findOne({
    where: {
      email: loginCustomer.email,
    },
    raw: true, // 只需要資料表中資料
  })
  console.log(customer)

  // customer=null代表不存在
  if (!customer) {
    return res.json({ status: 'error', message: '使用者不存在' })
  }

  // compareHash(登入時的密碼純字串, 資料庫中的密碼hash) 比較密碼正確性
  // isValid=true 代表正確
  // const isValid = await compareHash(loginCustomer.password, customer.password)

  // isValid=false 代表密碼錯誤
  if (!(loginCustomer.password === customer.password)) {
    return res.json({ status: 'error', message: '密碼錯誤' })
  }

  // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
  const returnCustomer = {
    id: customer.id,
    email: customer.email,
  }

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign(returnCustomer, accessTokenSecret, {
    expiresIn: '3d',
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token(先改成 false)
  res.cookie('accessToken', accessToken, { httpOnly: false })

  // 傳送access token回應(例如react可以儲存在state中使用)
  res.json({
    status: 'success',
    data: { accessToken },
  })
})
// 檢查登入狀態用
router.get('/check', authenticate, async (req, res) => {
  // 查詢資料庫目前的資料
  const customer = await Customer.findByPk(req.user.id, {
    raw: true, // 只需要資料表中資料
  })

  // 不回傳密碼值
  delete customer.password
  return res.json({ status: 'success', data: { customer } })
})
router.post('/logout', authenticate, (req, res) => {
  // 清除cookie
  res.clearCookie('accessToken', { httpOnly: true })
  res.json({ status: 'success', data: null })
})

export default router
