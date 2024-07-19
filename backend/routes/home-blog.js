import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  const [rows] = await db.query(
    `      SELECT title,content,img_name FROM blog
    LEFT JOIN blog_img ON blog.id = blog_img.blog_id
    LIMIT 4;
        `
  )
  const blogs = rows
  return res.json({ status: 'success', data: { blogs } })
})

export default router
