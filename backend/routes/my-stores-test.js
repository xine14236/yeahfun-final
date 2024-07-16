import express from 'express'
const router = express.Router()

// 資料庫使用: 直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有產品資料
router.get('/', async function (req, res) {
  // 分頁 (查詢字串QS: page = 1 & perpage = 10)
  // 預設值 page = 1, perpage = 10
  const page = +req.query.page || 1
  const perpage = +req.query.perpage || 10
  const offset = (page - 1) * perpage
  const limit = perpage

  const [rows] = await db.query(
    `SELECT * FROM store LIMIT ${limit} OFFSET ${offset}`
  )
  const products = rows

  // 計算在此條件下總共多少筆(WHERE)
  const [rows2] = await db.query('SELECT COUNT(*) AS count FROM store')
  const { count } = rows2[0]

  // 計算總頁數
  const pageCount = Math.ceil(count / perpage)

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: {
      total: count, // 總筆數
      pageCount, // 總頁數
      page, // 目前頁
      perpage, // 每頁筆數
      products,
    },
  })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在 GET 區段最後面)
router.get('/:stores_id', async function (req, res) {
  // 轉為數字
  const id = +req.params.stores_id || 0

  const [rows] = await db.query('SELECT * FROM store WHERE stores_id = ?', [id])
  const product = rows[0]

  return res.json({ status: 'success', data: { product } })
})

export default router
