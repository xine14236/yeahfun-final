import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  const [rows] = await db.query(
    `     SELECT 
    s.stores_id, 
    s.name, 
    s.address,
            tag_name,
    ROUND(AVG(comment.comment_star), 1) AS comment_star,
    MAX(stores_img.img_name) AS img_name 
FROM 
    store AS s
LEFT JOIN 
    comment ON s.stores_id = comment.stores_id
LEFT JOIN 
    stores_img ON s.stores_id = stores_img.stores_id
    LEFT JOIN store_tag AS st ON st.stores_id = s.stores_id
    LEFT JOIN tag AS t ON t.tag_id = st.tag_id
    WHERE t.tag_id = 5
GROUP BY 
    s.stores_id, 
    s.name, 
    s.address
    LIMIT 6;
        `
  )
  const tag = rows
  return res.json({ status: 'success', data: { tag } })
})

export default router
