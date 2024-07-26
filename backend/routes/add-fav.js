import express from 'express'
const router = express.Router()
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 資料庫使用: 直接使用 mysql 來查詢
import db from '#configs/mysql.js'

router.get('/:stores_id', authenticate, async (req, res) => {
  const id = +req.params.stores_id || 0

  const output = {
    success: false,
    action: '', // add, remove
    error: '',
    code: 0,
  }

  // 檢查是否已經加入我的最愛
  const [rows2] = await db.query(
    `SELECT * FROM favorite WHERE uid = ? AND pid = ?`,
    [req.user.id, id]
  )

  let result
  if (rows2.length < 1) {
    // 沒有加入我的最愛
    output.action = 'add'
    result = await db.query(
      `INSERT INTO favorite (uid, pid, created_at, updated_at) VALUES(?, ?, NOW(), NOW())`,
      [req.user.id, id]
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
