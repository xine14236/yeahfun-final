import express from 'express'
const router = express.Router()

// import { Op } from 'sequelize'
// import sequelize from '#configs/db.js'
// const { My_Product } = sequelize.models

// mysql
import db from '#configs/mysql.js'

// GET - 得到所有會員資料
router.get('/', async function (req, res) {
  // WHERE條件
  const conditions = []

  // 分每個條件加入到conditions陣列

  // 名稱關鍵字(查詢字串QS: name_like=sa)
  const name_like = req.query.name_like || ''
  conditions[0] = name_like ? `name LIKE '%${name_like}%'` : ''

  // 品牌 複選(查詢字串QS brands=apple,Google)
  const brands = req.query.brands ? req.query.brands.split(',') : []
  conditions[1] =
    brands.length > 0 ? brands.map((v) => `brand='${v}'`).join(' OR ') : ''

  // 價格區間查詢(查詢字串QS:price_gte=5000&price_lte=20000)
  const price_gte = Number(req.query.price_gte) || 0
  const price_lte = Number(req.query.price_lte) || 20000
  conditions[2] = `price BETWEEN ${price_gte} AND ${price_lte}`
  // 組合成where從句
  // 1.過濾空白的條件
  const cvs = conditions.filter((v) => v)
  // 2.用AMD串接所有從句
  const where =
    cvs.length > 0 ? 'WHERE' + cvs.map((v) => `( ${v} )`).join(` AND `) : ''
  console.log(where)
  // 排序 (查詢字串QS: sort=price&order=asc) (順向asc,逆向 desc)
  const sort = req.query.sort || 'id' //預設的排序資料庫欄位

  const order = req.query.order || 'asc'
  const sortList = ['id', 'price']
  const orderList = ['asc', 'desc']
  let orderby = ''
  if (orderList.includes(order) && sortList.includes(sort)) {
    orderby = `ORDER BY ${sort} ${order}`
  }

  // -- 分頁 (查詢字串QS: page=2&perpage=5)(目前page頁，每頁perpage筆資料)
  //  預設值page =1, perpage= 10
  const page = Number(req.query.page) || 1
  const perpage = Number(req.query.perpage) || 10
  const offset = (page - 1) * perpage
  const limit = perpage

  const [rows] = await db.query(
    `SELECT * FROM my_product ${where} ${orderby} LIMIT ${limit} OFFSET ${offset}`
  )

  const products = rows
  const [rows2] = await db.query(
    `SELECT COUnT(1) AS count FROM my_product ${where}`
  )
  const { count } = rows2[0]
  const pageCount = Math.ceil(count / perpage)
  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: { total: count, pageCount, page, perpage, products },
  })
})

// GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:id', async function (req, res) {
  // 轉為數字
  const id = Number(req.params.id)

  // const product = await My_Product.findByPk(id, {
  //   raw: true, // 只需要資料表中資料
  // })

  const [rows] = await db.query(`SELECT * FROM my_product WHERE id=?`, [id])
  const product = rows[0]
  // 不回傳密碼

  return res.json({ status: 'success', data: { product } })
})

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'my-products' })
// })

export default router
