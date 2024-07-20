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
      store.name,
      store.address,
      comment.comment_star,
      comment.comment_content,
      stores_img.img_name
    FROM store
    JOIN comment
    ON store.stores_id = comment.stores_id
    JOIN stores_img 
    ON store.stores_id = stores_img.stores_id
    WHERE
      store.stores_id = ?`,
    [id]
  )
  const store = rows[0]

  const [rows2] = await db.query(
    'SELECT stores_id, COUNT(*) as commentCounts FROM `comment` WHERE stores_id = ? GROUP BY stores_id',
    [id]
  )
  const commentCount = rows2[0]

  return res.json({ status: 'success', data: { store, commentCount } })
})

export default router
