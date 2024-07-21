import express from 'express'
const router = express.Router()
// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 資料庫使用: 直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// 自訂 top-level middlewares
// router.use((req, res, next) => {
//   // 解析 JWT token
//   const auth = req.get('Authorization') // 取得用戶端送過來的 Authorization 檔頭
//   if (auth && auth.indexOf('Bearer ') === 0) {
//     const token = auth.slice(7) // 只取得 token 的部分

//     try {
//       req.my_jwt = jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET)
//     } catch (e) {
//       console.error(e)
//     }
//   }

//   next()
// })

// GET - 得到單筆資料(注意，有動態參數時要寫在 GET 區段最後面)
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
