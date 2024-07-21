import express from 'express'
const router = express.Router()

// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 資料庫使用: 直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到單筆資料(注意，有動態參數時要寫在 GET 區段最後面)
router.get('/:stores_id', authenticate, async function (req, res) {
  // 轉為數字
  const id = +req.params.stores_id || 0

  const [rows] = await db.query(
    `SELECT store.*, fav.id as like_id FROM store LEFT JOIN (SELECT favorite.id, favorite.pid, favorite.uid FROM favorite WHERE uid = ?) fav ON store.stores_id = fav.pid WHERE stores_id = ?`,
    [req.user.id, id]
  )
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

  // 取得圖片
  const [imgRows] = await db.query(
    `SELECT
      store.stores_id,
      store.name,
      stores_img.img_name
    FROM
      store
    JOIN stores_img 
    ON store.stores_id = stores_img.stores_id
    WHERE store.stores_id = ?`,
    [id]
  )
  const img = imgRows[0]

  // const [rows2] = await db.query(
  //   'SELECT stores_id, COUNT(*) as commentCounts FROM `comment` WHERE stores_id = ? GROUP BY stores_id',
  //   [id]
  // )
  // const commentCount = rows2[0]

  return res.json({ status: 'success', data: { store, tag, img } })
})

export default router
