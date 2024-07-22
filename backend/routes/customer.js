import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
// import { Op } from 'sequelize'
import sequelize from '#configs/db.js'
const { Customer } = sequelize.models
import db from '#configs/mysql.js'

// GET - 得到訂單資料
router.get('/:id/order', async function (req, res) {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid customer ID',
    })
  }
  try {
    const [rows] = await db.query(
      `SELECT
      purchase_item.id AS item_id, 
      purchase_order.user_id AS user_id,
      purchase_order.id AS order_id,
      store.name AS store_name,
      rooms_campsites.name AS rooms_name,
      purchase_item.startdate AS startdate,
      purchase_item.enddate AS enddate,
      purchase_item.price AS price,
      rooms_campsites.img AS img 
      FROM 
      purchase_item
      JOIN purchase_order ON purchase_order.id = purchase_item.purchase_order_id
      JOIN store ON purchase_item.store_id = store.stores_id
      JOIN rooms_campsites ON purchase_item.room_id = rooms_campsites.rooms_campsites_id
      WHERE purchase_order.user_id = ?
      ORDER BY startdate ASC`,
      [id]
    )
    const order = rows

    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: { order },
    })
  } catch (err) {
    console.error('Database query error: ', err)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

// GET - 得到部落格資料
router.get('/:id/blog', async function (req, res) {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid customer ID',
    })
  }
  try {
    const [rows] = await db.query(
      `SELECT
        favorite_blog.id,
        blog.title,
        blog.content,
        blog_img.img_name 
        FROM favorite_blog
        JOIN blog ON favorite_blog.blog_id = blog.id
        LEFT JOIN blog_img ON favorite_blog.blog_id = blog_img.blog_id
        WHERE customer_id = 1`,
      [id]
    )

    const blog = rows

    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: { blog },
    })
  } catch (err) {
    console.error('Database query error: ', err)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})
// GET - 得到口袋名單資料
router.get('/:id/collect', async function (req, res) {
  const id = Number(req.params.id)
  if (isNaN(id)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid customer ID',
    })
  }
  try {
    const [rows] = await db.query(
      `SELECT
        favorite.id,
        favorite.pid,
        favorite.uid,
        store.name AS store_name,
        store.address,
        comment.comment_star,
        stores_img.img_name as store_img_name
        FROM
        favorite
        JOIN store ON favorite.pid = store.stores_id
        JOIN comment ON favorite.pid = comment.stores_id
        JOIN stores_img ON favorite.pid = stores_img.stores_id
        WHERE favorite.uid = ?`,
      [id]
    )

    const collect = rows

    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: { collect },
    })
  } catch (err) {
    console.error('Database query error: ', err)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  }
})

router.put('/:id/profile', async function (req, res) {
  // 轉為數字
  const id = Number(req.params.id)

  // customer為來自前端的會員資料(準備要修改的資料)
  const customer = req.body

  // 對資料庫執行update
  const [affectedRows] = await Customer.update(customer, {
    where: {
      id,
    },
    logging: console.log,
    individualHooks: false, // 更新時要加密密碼字串 trigger the beforeUpdate hook
  })

  // 沒有更新到任何資料 -> 失敗或沒有資料被更新
  if (!affectedRows) {
    return res.json({ status: 'error', message: '更新失敗或沒有資料被更新' })
  }

  // 更新成功後，找出更新的資料，updatedUser為更新後的會員資料
  const updatedCustomer = await Customer.findByPk(id, {
    raw: true, // 只需要資料表中資料
  })

  // password資料不需要回應給瀏覽器
  delete updatedCustomer.password

  // 回傳
  return res.json({ status: 'success', data: { customer: updatedCustomer } })
})
// GET - 得到所有資料
router.get('/', async function (req, res) {
  const [rows] = await db.query('SELECT * FROM customer')
  const customer = rows

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: { customer },
  })
})

// GET - 得到個別會員資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:id', async function (req, res) {
  const id = Number(req.params.id)
  const [rows] = await db.query('SELECT * FROM customer WHERE id = ?', [id])
  const customer = rows[0]
  // 不回傳密碼
  delete customer.password

  // 標準回傳JSON
  return res.json({
    status: 'success',
    data: { customer },
  })
})

export default router
