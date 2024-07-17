import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  const conditions = []
  const tag = req.query.tag || ''
  conditions[0] = tag ? `t.tag_name='${tag}'` : ''
  const cvs = conditions.filter((v) => v)
  const where =
    cvs.length > 0 ? 'WHERE ' + cvs.map((v) => `( ${v} )`).join(` AND `) : ''

  const [rows] = await db.query(
    `  SELECT 
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
    ${where}
GROUP BY 
    s.stores_id, 
    s.name, 
    s.address
    LIMIT 6;
        `
  )
  const stores = rows
  return res.json({ status: 'success', data: { stores } })
})

export default router
