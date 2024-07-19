import express from 'express'
const router = express.Router()

// 資料庫使用: 直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到單筆資料(注意，有動態參數時要寫在 GET 區段最後面)
router.get('/:stores_id', async function (req, res) {
  // 轉為數字
  const id = +req.params.stores_id || 0

  const [rows] = await db.query(
    `SELECT
      store.stores_id,
      store.name as store_name,
      store.mobile,
      store.address,
      store.longitude,
      store.latitude,
      store.altitude,
      store.precautions,
      store.introduction as store_introduction,
      rooms_campsites.rooms_campsites_id,
      rooms_campsites.name as rooms_campsites_name,
      rooms_campsites.normal_price,
      rooms_campsites.holiday_price,
      rooms_campsites.night_price,
      rooms_campsites.type,
      rooms_campsites.amount,
      rooms_campsites.people,
      rooms_campsites.square_meters,
      rooms_campsites.introduction as rooms_campsites_introduction,
      rooms_campsites.img
    FROM
      store
    JOIN rooms_campsites 
    ON store.stores_id = rooms_campsites.stores_id
    WHERE
      store.stores_id = ?`,
    [id]
  )
  const store = rows

  // const [rows2] = await db.query(
  //   'SELECT stores_id, COUNT(*) as commentCounts FROM `comment` WHERE stores_id = ? GROUP BY stores_id',
  //   [id]
  // )
  // const commentCount = rows2[0]

  return res.json({ status: 'success', data: { store } })
})

export default router
