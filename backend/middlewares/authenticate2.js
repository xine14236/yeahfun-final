import jsonwebtoken from 'jsonwebtoken'
import 'dotenv/config.js'

// 獲得加密用字串
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// 中介軟體middleware，用於檢查授權(authenticate)
export default function authenticate(req, res, next) {
  // 從cookies中獲取token
  const token = req.cookies.accessToken

  // 如果沒有token，允許進一步的處理（這取決於應用的需求）
  if (!token) {
    // 如果需要未登入狀態下允許進行某些操作，可以跳過此中介軟體
    // return res.status(401).json({
    //   status: 'error',
    //   message: '授權失敗，沒有存取令牌',
    // });
    // 如果沒有token，則不設置`req.user`並繼續處理請求
    req.user = null
    return next()
  }

  // 驗證token
  jsonwebtoken.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: '不合法的存取令牌',
      })
    }

    // 將user資料加到req中
    req.user = user
    next()
  })
}
