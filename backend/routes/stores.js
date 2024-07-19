import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  // where條件 ----- START
  const conditions = []
  const conditions2 = []

  // 分每個條件加入到conditions陣列

  // 名稱 關鍵字(查詢字串QS: name_like=sa)
  const name_like = req.query.name_like || ''
  conditions[0] = name_like ? `s.name LIKE '%${name_like}%'` : ''

  // 地點搜尋
  const location = req.query.location || ''
  conditions[1] = location ? `s.address='${location}'` : ''

  // 標籤搜尋
  const tag = req.query.tag || ''
  conditions[2] = tag ? `t.tag_name='${tag}'` : ''

  // 價格, 5000~150000
  const lowest_normal_price_gte = Number(req.query.lowest_normal_price_gte) || 0 // 最小價格
  const lowest_normal_price_lte =
    Number(req.query.lowest_normal_price_lte) || 5000 // 最大價格
  conditions2[0] = `lowest_normal_price BETWEEN ${lowest_normal_price_gte} AND ${lowest_normal_price_lte}`

  // 組合成where從句
  // 1. 過濾空白的條件
  const cvs = conditions.filter((v) => v)
  const cvs2 = conditions2.filter((v) => v)

  // 2. 用AND串接所有從句
  const where =
    cvs.length > 0 ? 'WHERE ' + cvs.map((v) => `( ${v} )`).join(` AND `) : ''

  const having = cvs2.length > 0 ? 'HAVING ' + cvs2.map((v) => `( ${v} )`) : ''

  console.log(where)

  // where條件 ----- END

  // 排序 (查詢字串QS: sort=price&order=asc) (順向asc, 逆向desc)
  const sort = req.query.sort || 'stores_id' // 預設的排序資料庫欄位
  const order = req.query.order || 'asc'
  // 允許的排序的欄位字串
  const sortList = ['stores_id', 'lowest_normal_price']
  // 允許的order字串
  const orderList = ['asc', 'desc']

  let orderby = ''
  // 檢查要可用的sort與order字串
  if (orderList.includes(order) && sortList.includes(sort)) {
    orderby = `ORDER BY ${sort} ${order}`
  }

  // 分頁 (查詢字串QS: page=2&perpage=5)
  // 預設值 page = 1, perpage = 10
  const page = Number(req.query.page) || 1
  const perpage = Number(req.query.perpage) || 12
  const offset = (page - 1) * perpage
  const limit = perpage

  const [rows] = await db.query(
    `  SELECT s.stores_id, s.name, s.address, 
       GROUP_CONCAT(DISTINCT t.tag_name SEPARATOR ',') AS tag_name,
       ROUND(AVG(comment.comment_star), 1) AS comment_star, 
       MAX(stores_img.img_name) AS img_name, 
       MIN(rooms_campsites.normal_price) AS lowest_normal_price
        FROM store AS s
        LEFT JOIN comment ON s.stores_id = comment.stores_id
        LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
        LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
        LEFT JOIN store_tag AS st ON st.stores_id = s.stores_id
        LEFT JOIN tag AS t ON t.tag_id = st.tag_id
        LEFT JOIN favorite ON s.stores_id = favorite.pid
        ${where}
        GROUP BY s.stores_id, s.name, s.address
        ${having}
         ${orderby} 
        LIMIT ${limit} OFFSET ${offset};
        `
  )
  const stores = rows

  // 計算在此條件下總共多少筆(WHERE)
  const [rows2] = await db.query(
    `SELECT 
    COUNT(*) AS count
    FROM (
        SELECT 
            s.stores_id
        FROM 
            store AS s
            LEFT JOIN comment ON s.stores_id = comment.stores_id
            LEFT JOIN stores_img ON s.stores_id = stores_img.stores_id
            LEFT JOIN rooms_campsites ON s.stores_id = rooms_campsites.stores_id
            LEFT JOIN store_tag AS st ON st.stores_id = s.stores_id
            LEFT JOIN tag AS t ON t.tag_id = st.tag_id
            ${where}
        GROUP BY 
            s.stores_id, s.name, s.address
        HAVING
            COUNT(DISTINCT CASE WHEN rooms_campsites.normal_price BETWEEN ${lowest_normal_price_gte} AND ${lowest_normal_price_lte} THEN s.stores_id END) > 0
    ) AS subquery;
     `
  )

  const { count } = rows2[0]

  // 計算總頁數
  const pageCount = Math.ceil(count / perpage)

  return res.json({
    status: 'success',
    total: count, // 總筆數
    pageCount, // 總頁數
    page, // 目前頁
    perpage, // 每頁筆數
    stores,
  })

  // 標準回傳JSON
  // return res.json({
  //   status: 'success',
  //   data: {
  //     total: count, // 總筆數
  //     pageCount, // 總頁數
  //     page, // 目前頁
  //     perpage, // 每頁筆數
  //     stores,
  //   },
  // })
})

export default router
