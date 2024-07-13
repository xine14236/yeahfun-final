import express from 'express'
import db from "./../utils/connect-mysql.js"

const router = express.Router()

// GET - storeId
router.get('/:storeId', async function (req, res) {

    const id = Number(req.params.storeId)

    const [rows] = await db.query(`SELECT * FROM rooms_campsites where stores_id = ${id}`)
    
    const store = rows
  
    // 標準回傳JSON
    return res.json({ status: 'success', data: { store } })
  })
  
  export default router




