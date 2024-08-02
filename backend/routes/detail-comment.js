import express from 'express'
const router = express.Router()

// 資料庫使用直接使用 mysql 來查詢
import db from '#configs/mysql.js'

// let comments = [
//   { storeId: 1, comment: 'Great store!' },
//   { storeId: 1, comment: 'Very friendly staff.' },
// ]

router.get('/:stores_id', async function (req, res) {
  const storeId = Number(req.params.stores_id)
  // const storeId = Number(req.params.storeId) // 确保参数名一致
  try {
    const [rows] = await db.query('SELECT * FROM comment WHERE stores_id = ?', [
      storeId,
    ])

    const storeComments = await db.query(
      `SELECT * FROM comment JOIN store ON comment.stores_id = store.stores_id WHERE store.stores_id = ?`,
      [storeId]
    )

    const custormer = await db.query(
      `SELECT customer.name FROM customer JOIN comment ON customer.id = comment.customer_id WHERE comment.comment_content = ?`,
      [storeComments[0].customer_content]
    )

    return res.json({
      status: 'success',
      data: { storeComments: storeComments[0] },
    })
  } catch (err) {
    console.error(err)
    return res
      .status(500)
      .json({ status: 'error', message: 'Database query failed' })
  }
})

export default router
