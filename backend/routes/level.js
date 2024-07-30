import express from 'express'
import db from '../utils/connect-mysql.js'

const router = express.Router()

// 更新等级和金幣
router.post('/update-level', async function (req, res) {
  const { userId, newLevels, newCoin } = req.body

  try {
    const [result] = await db.query(
      'UPDATE achievements SET levels = ?, coin = ? WHERE customer_id = ?',
      [newLevels, newCoin, userId]
    )
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async function (req, res) {
  const id = Number(req.params.id)

  const [rows] = await db.query(
    'SELECT levels, coin FROM achievements WHERE customer_id = ?',
    [id]
  )

  if (rows.length > 0) {
    res.json({ status: 'success', data: { level: rows[0] } })
  } else {
    res.json({ status: 'error', message: '用户不存在' })
  }
})

export default router
