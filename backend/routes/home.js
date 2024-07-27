import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'
import authenticate from '#middlewares/authenticate2.js'

// GET - 得到所有資料
router.get('/', authenticate, async function (req, res) {
  let query
  let params = []

  if (req.user && req.user.id) {
    // 用戶已登入，查詢包含最愛的SQL語句
    query = `
        SELECT 
          s.stores_id, 
          s.name, 
          s.address,
          ROUND(AVG(comment.comment_star), 1) AS comment_star,
          MAX(stores_img.img_name) AS img_name,
          MAX(fav.id) AS like_id
        FROM 
          store AS s
        LEFT JOIN 
          comment ON s.stores_id = comment.stores_id
        LEFT JOIN 
          stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN
          (SELECT favorite.id, favorite.pid, favorite.uid FROM favorite WHERE uid = ?) fav
          ON s.stores_id = fav.pid
        GROUP BY 
          s.stores_id, 
          s.name, 
          s.address
        LIMIT 6;
      `
    params = [req.user.id]
  } else {
    // 用戶未登入，查詢不包含最愛的SQL語句
    query = `
        SELECT 
          s.stores_id, 
          s.name, 
          s.address,
          ROUND(AVG(comment.comment_star), 1) AS comment_star,
          MAX(stores_img.img_name) AS img_name
        FROM 
          store AS s
        LEFT JOIN 
          comment ON s.stores_id = comment.stores_id
        LEFT JOIN 
          stores_img ON s.stores_id = stores_img.stores_id
        GROUP BY 
          s.stores_id, 
          s.name, 
          s.address
        LIMIT 6;
      `
  }

  try {
    const [rows] = await db.query(query, params)
    const stores = rows
    return res.json({ status: 'success', data: { stores } })
  } catch (error) {
    console.error('Error fetching stores:', error)
    return res
      .status(500)
      .json({ status: 'error', message: 'Internal server error' })
  }
})
export default router
