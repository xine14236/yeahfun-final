import express from 'express'
import db from './../utils/connect-mysql.js'

const router = express.Router()

// GET - storeId 取物件
router.get('/:storeId/:type/:people', async function (req, res) {
  const id = Number(req.params.storeId)
  const type = req.params.type
  const people = Number(req.params.people)

  const [rows] = await db.query(
    'SELECT * FROM rooms_campsites WHERE type = ? AND stores_id = ? AND people >= ?',
    [type, id, people]
  )

  const store = rows

  // 標準回傳JSON
  return res.json({ status: 'success', data: { store } })
})

export default router
