import express from 'express'
import db from '../utils/connect-mysql.js'

const router = express.Router()

// coupon資料庫的全部資料
router.get('/coupons', async function (req, res) {
  const [rows] = await db.query('SELECT * FROM `coupon`')

  const coupons = rows

  res.json({ status: 'success', data: { coupons } })
})

// donation資料庫的全部資料
router.get('/donations', async function (req, res) {
  const [rows] = await db.query('SELECT * FROM `donation`')
  const donations = rows
  res.json({ status: 'success', data: { donations } })
})


//得到使用者的coin
router.get('/:id', async function(req, res) {
    const id = Number(req.params.id);
    console.log(`Fetching coin data for customer_id: ${id}`); 

        const [rows] = await db.query(
            'SELECT coin FROM achievements WHERE customer_id = ?', [id]
        );

        if (rows.length > 0) {
            const coin = rows[0].coin;
            res.json({ status: 'success', coin: coin });
        } 
});

// 更新金幣
router.post('/updateCoin', async function (req, res) {

  const { userId, newCoin } = req.body

  try {
    const [result] = await db.query(
      'UPDATE achievements SET coin = ? WHERE customer_id = ?',
      [newCoin, userId]
    );
    res.json({ status: 'success', message: 'Coin updated successfully' });
  } catch (error) {
    console.error(error)
  }
})

//增加couponbag
router.post('/plusCoupon', async function (req, res){
    const { userId, couponId} = req.body
    const [row] = await db.query(
        'INSERT INTO `couponbag`(`user_id`, `coupon_id`, `amount`, `created_at`) VALUES (?,?,?, NOW())',[userId, couponId,1]
    )
    res.json({ status: 'success', message: 'Coupon added to bag successfully' });
})

//增加donationbag
router.post('/plusDonation', async function (req, res){
    const { userId, donationId} = req.body
    const [row] = await db.query(
        'INSERT INTO `donationbag`(`user_id`, `donation_id`, `amount`, `created_at`) VALUES (?,?,?, NOW())',[userId, donationId,1]
    )
    res.json({ status: 'success', message: 'Donation added to bag successfully' });
})


//得到couponbag的id
router.get('/couponbag/:id', async function(req, res) {
  const id = Number(req.params.id);
  console.log(`Fetching coin data for customer_id: ${id}`); 

  
    const [rows] = await db.query(
      'SELECT couponbag.id, coupon_off, directions, amount FROM couponbag join coupon on coupon_id = coupon.id WHERE couponbag.id = ?', [id]
    );

    if (rows.length > 0) {
      const couponbag = rows[0];
      res.json({ status: 'success', data: { couponbag } });
    } else {
      res.json({ status: 'error', message: 'No coupon found' });
    }
  
});


// 更新couponbag
router.post('/updateCouponbag', async function (req, res) {

  const { couponId } = req.body

  try {
    const [result] = await db.query(
      'UPDATE couponbag SET amount = 0 WHERE id = ?',
      [couponId]
    );
    res.json({ status: 'success', message: 'Coin updated successfully' });
  } catch (error) {
    console.error(error)
  }
})

export default router
