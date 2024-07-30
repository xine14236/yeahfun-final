import express from 'express'
const router = express.Router()

// 中介軟體，存取隱私會員資料用
import authenticate from '#middlewares/authenticate.js'

// 資料庫使用: 直接使用 mysql 來查詢
import db from '#configs/mysql.js'

router.get('/', authenticate, async function (req, res) {
  const [rows] = await db.query(
    `SELECT
    coupon.id,
    couponbag.user_id,
    coupon.directions,
    coupon.coupon_off,
    couponbag.id AS couponbag_id
FROM
    coupon
JOIN couponbag ON coupon.id = couponbag.coupon_id
WHERE
    couponbag.user_id = ?`,
    [req.user.id]
  )

  return res.json({ status: 'success', data: rows })
})

export default router
