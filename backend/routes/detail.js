import express from 'express'
const router = express.Router()

// 資料庫使用(sequelize用)
// import { Op } from 'sequelize'
// import sequelize from '#configs/db.js'
// const { User } = sequelize.models

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  const [rows] = await db.query('SELECT * FROM store')
  const store = rows

  // 標準回傳JSON
  return res.json({ status: 'success', data: { store } })
})

//GET - 得到單筆資料(注意，有動態參數時要寫在GET區段最後面)
router.get('/:stores_id', async function (req, res) {
  //轉為數字
  const id = Number(req.params.stores_id)

  const [rows] = await db.query('SELECT * FROM store WHERE stores_id = ?', [id])
  const store = rows[0]

  //取得 tag_name
  const [tagRows] = await db.query(
    `
    SELECT
    store.stores_id,
    store.name as store_name,
    tag.tag_name,
    tag.tag_id as tagId
    FROM
    store
    JOIN store_tag ON store.stores_id = store_tag.stores_id
    JOIN tag ON store_tag.tag_id = tag.tag_id
    WHERE store.stores_id = ?
  `,
    [id]
  )
  const tag = tagRows

  return res.json({ status: 'success', data: { store, tag } })
})

export default router
