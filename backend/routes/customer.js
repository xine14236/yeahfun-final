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
      'SELECT orders.*, store.name AS store_name, stores_img.img_name AS store_img_name FROM orders JOIN store ON orders.store_id = store.stores_id LEFT JOIN (SELECT stores_id, MIN(img_name) AS img_name FROM stores_img GROUP BY stores_id) AS stores_img ON orders.store_id = stores_img.stores_id WHERE orders.customer_id = ?',
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
