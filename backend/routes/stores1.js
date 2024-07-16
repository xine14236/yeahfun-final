// routes\my-products.js

import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// GET - 得到所有資料
router.get('/', async function (req, res) {
  // 排序 (查詢字串QS: sort=price&order=asc) (順向asc, 逆向desc)
  const sort = req.query.sort || 'store.stores_id' // 預設的排序資料庫欄位
  const order = req.query.order || 'asc'
  // 允許的排序的欄位字串
  const sortList = ['store.stores_id', 'lowest_normal_price']
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

  // 處理篩選條件
  const location = req.query.location || '' // 篩選條件：地點
  const tag = req.query.tag || '' // 篩選條件：tag
  const keyword = req.query.keyword || '' // 篩選條件：關鍵字

  // 組裝 WHERE 條件
  let whereClause = 'WHERE 1=1'
  if (location) {
    whereClause += ` AND store.address='${location}'`
  }
  if (keyword) {
    whereClause += ` AND store.name LIKE '%${keyword}%'`
  }

  if (tag) {
    whereClause += ` AND t.tag_name='${tag}'`
    // 有提供 tag 條件時，包含 tag 相關的 LEFT JOIN
    const sqlQuery = `
      SELECT 
        store.stores_id, 
        store.name, 
        store.address, 
        st.tag_id AS my_tag_id,
        t.tag_name,
        ROUND(c.comment_star, 1) AS comment_star, 
        si.img_name,
        rc.lowest_normal_price
      FROM 
        store
      LEFT JOIN 
        store_tag st ON store.stores_id = st.stores_id
      LEFT JOIN 
        tag t ON st.tag_id = t.tag_id
      LEFT JOIN 
        (SELECT stores_id, AVG(comment_star) AS comment_star
         FROM comment
         GROUP BY stores_id) c ON store.stores_id = c.stores_id
      LEFT JOIN 
        (SELECT stores_id, MAX(img_name) AS img_name
         FROM stores_img
         GROUP BY stores_id) si ON store.stores_id = si.stores_id
      LEFT JOIN 
        (SELECT stores_id, MIN(normal_price) AS lowest_normal_price
         FROM room_campsite
         GROUP BY stores_id) rc ON store.stores_id = rc.stores_id
      ${whereClause}
      ${orderby}
      LIMIT ${limit} OFFSET ${offset};
    `

    const [rows] = await db.query(sqlQuery)
    const stores = rows

    // 計算在此條件下總共多少筆(WHERE)
    const [rows2] = await db.query(
      `SELECT COUNT(*) AS count
      FROM 
        store
      LEFT JOIN 
        store_tag st ON store.stores_id = st.stores_id
      LEFT JOIN 
        tag t ON st.tag_id = t.tag_id
      LEFT JOIN 
        (SELECT stores_id, AVG(comment_star) AS comment_star
         FROM comment
         GROUP BY stores_id) c ON store.stores_id = c.stores_id
      LEFT JOIN 
        (SELECT stores_id, MAX(img_name) AS img_name
         FROM stores_img
         GROUP BY stores_id) si ON store.stores_id = si.stores_id
      LEFT JOIN 
        (SELECT stores_id, MIN(normal_price) AS lowest_normal_price
         FROM room_campsite
         GROUP BY stores_id) rc ON store.stores_id = rc.stores_id
      ${whereClause}`
    )
    const { count } = rows2[0]

    // 計算總頁數
    const pageCount = Math.ceil(count / perpage)

    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        total: count, // 總筆數
        pageCount, // 總頁數
        page, // 目前頁
        perpage, // 每頁筆數
        stores,
      },
    })
  } else {
    // 沒有提供 tag 條件時，不包含 tag 相關的 LEFT JOIN
    const sqlQueryNoTag = `
      SELECT 
        store.stores_id, 
        store.name, 
        store.address, 
        NULL AS my_tag_id,
        NULL AS tag_name,
        ROUND(c.comment_star, 1) AS comment_star, 
        si.img_name,
        rc.lowest_normal_price
      FROM 
        store
      LEFT JOIN 
        (SELECT stores_id, AVG(comment_star) AS comment_star
         FROM comment
         GROUP BY stores_id) c ON store.stores_id = c.stores_id
      LEFT JOIN 
        (SELECT stores_id, MAX(img_name) AS img_name
         FROM stores_img
         GROUP BY stores_id) si ON store.stores_id = si.stores_id
      LEFT JOIN 
        (SELECT stores_id, MIN(normal_price) AS lowest_normal_price
         FROM room_campsite
         GROUP BY stores_id) rc ON store.stores_id = rc.stores_id
      ${whereClause}
      ${orderby}
      LIMIT ${limit} OFFSET ${offset};
    `

    const [rows] = await db.query(sqlQueryNoTag)
    const stores = rows

    // 計算在此條件下總共多少筆(WHERE)
    const [rows2] = await db.query(
      `      SELECT  COUNT(*) AS count
      FROM 
        store
      LEFT JOIN 
        store_tag st ON store.stores_id = st.stores_id
      LEFT JOIN 
        tag t ON st.tag_id = t.tag_id
      LEFT JOIN 
        (SELECT stores_id, AVG(comment_star) AS comment_star
         FROM comment
         GROUP BY stores_id) c ON store.stores_id = c.stores_id
      LEFT JOIN 
        (SELECT stores_id, MAX(img_name) AS img_name
         FROM stores_img
         GROUP BY stores_id) si ON store.stores_id = si.stores_id
      LEFT JOIN 
        (SELECT stores_id, MIN(normal_price) AS lowest_normal_price
         FROM room_campsite
         GROUP BY stores_id) rc ON store.stores_id = rc.stores_id
      ${whereClause}`
      // `SELECT COUNT(*) AS count FROM store ${whereClause}`
    )
    const { count } = rows2[0]

    // 計算總頁數
    const pageCount = Math.ceil(count / perpage)

    // 標準回傳 JSON
    // 標準回傳JSON
    return res.json({
      status: 'success',
      data: {
        total: count, // 總筆數
        pageCount, // 總頁數
        page, // 目前頁
        perpage, // 每頁筆數
        stores,
      },
    })
  }
})

export default router
