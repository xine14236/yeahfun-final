import express from 'express'
const router = express.Router()

// 資料庫使用: 直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到單筆資料(注意，有動態參數時要寫在 GET 區段最後面)
router.get('/:stores_id', async (req, res) => {
  const id = +req.params.stores_id || 0

  const output = {
    success: false,
    action: '', // add, remove
    error: '',
    code: 0,
  }

  // const [rows] = await db.query(
  //   `SELECT
  //     favorite.id,
  //     favorite.uid,
  //     customer.name as customer_name,
  //     favorite.pid,
  //     store.name as store_name
  //   FROM
  //     favorite
  //   JOIN customer ON favorite.uid = customer.id
  //   JOIN store ON favorite.pid = store.stores_id
  //   WHERE stores_id = ?`,
  //   [id]
  // )
  // const favStore = rows[0]

  // 檢查是否已經加入我的最愛
  const [rows2] = await db.query(
    `SELECT * FROM favorite WHERE uid = 1 AND pid = ?`,
    [id]
  )

  let result
  if (rows2.length < 1) {
    // 沒有加入我的最愛
    output.action = 'add'
    result = await db.query(
      `INSERT INTO favorite (uid, pid, created_at, updated_at) VALUES(1, ?, NOW(), NOW())`,
      [id]
    )
  } else {
    // 已經加入我的最愛
    output.action = 'remove'
    result = await db.query(`DELETE FROM favorite WHERE id = ?`, [rows2[0].id])
  }

  output.success = !!result.affectedRows

  return res.json({ status: 'success', data: { output } })
})

export default router
