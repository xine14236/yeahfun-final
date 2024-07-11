import express from 'express'
import { json, Op } from 'sequelize'
import jsonwebtoken from 'jsonwebtoken'
import sequelize from '#configs/db.js'
const { Member } = sequelize.models
import authenticate from '#middlewares/authenticate.js'
const router = express.Router()

import db from '#configs/mysql.js'

import { generateHash, compareHash } from '##/db-helpers/password-hash.js'
/* GET home page. */
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

// -------PUT--------
router.put('/:id/profile', async (req, res) => {
  const id = +req.params.id

  const member = req.body
  // 改成用前端擋
  // if (member.password) {
  //   delete member.password
  //   delete member.confirmPassword
  // }
  // delete member.username

  const [affectedRows] = await Member.update(member, {
    where: { id },
    logging: console.log,
    individualHooks: true,
    // 要有這個才可以使用鉤子加密
  })

  if (!affectedRows) {
    return res.json({ status: 'error', message: '更新 失敗或沒有資料被更新' })
  }
  const updatedUser = await Member.findByPk(id, {
    raw: true, // 只需要資料表中資料
  })
  return res.json({ status: 'success', data: { user: updatedUser } })
})
// -------PUT--------

// -------GET--------
router.get('/', function (req, res, next) {
  res.render('index', { title: 'members' })
})
// 檢查登入狀態用
router.get('/check', authenticate, async (req, res) => {
  // 查詢資料庫目前的資料
  const member = await Member.findByPk(req.user.id, {
    raw: true, // 只需要資料表中資料
  })

  // 不回傳密碼值
  delete member.password
  return res.json({ status: 'success', data: { member } })
})
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  const [rows] = await db.query(`SELECT *  FROM member WHERE id=?`, [
    req.params.id,
  ])
  const member = await Member.findByPk(id, {
    raw: true,
  })

  delete member.password
  return res.json({ status: 'success', data: { member } })
})

// -------GET--------

// -------POST-------
router.post('/login', async (req, res) => {
  // 從前端來的資料 req.body = { username:'xxxx', password :'xxxx'}
  const loginUser = req.body

  // 檢查從前端來的資料哪些為必要
  if (!loginUser.username || !loginUser.password) {
    return res.json({ status: 'fail', data: null })
  }

  // 查詢資料庫，是否有這帳號與密碼的使用者資料
  // 方式一: 使用直接查詢
  // const user = await sequelize.query(
  //   'SELECT * FROM user WHERE username=? LIMIT 1',
  //   {
  //     replacements: [loginUser.username], //代入問號值
  //     type: QueryTypes.SELECT, //執行為SELECT
  //     plain: true, // 只回傳第一筆資料
  //     raw: true, // 只需要資料表中資料
  //     logging: console.log, // SQL執行呈現在console.log
  //   }
  // )

  // 方式二: 使用模型查詢
  const member = await Member.findOne({
    where: {
      username: loginUser.username,
    },
    raw: true, // 只需要資料表中資料
  })

  // console.log(user)

  // user=null代表不存在
  if (!member) {
    return res.json({ status: 'error', message: '使用者不存在' })
  }

  // compareHash(登入時的密碼純字串, 資料庫中的密碼hash) 比較密碼正確性
  // isValid=true 代表正確
  const isValid = await compareHash(loginUser.password, member.password)

  // isValid=false 代表密碼錯誤
  if (!isValid) {
    return res.json({ status: 'error', message: '密碼錯誤' })
  }

  // 存取令牌(access token)只需要id和username就足夠，其它資料可以再向資料庫查詢
  const returnUser = {
    id: member.id,
    username: member.username,
    // google_uid: user.google_uid,
    // line_uid: user.line_uid,
  }

  // 產生存取令牌(access token)，其中包含會員資料
  const accessToken = jsonwebtoken.sign(returnUser, accessTokenSecret, {
    expiresIn: '3d',
  })

  // 使用httpOnly cookie來讓瀏覽器端儲存access token
  res.cookie('accessToken', accessToken, { httpOnly: true })

  // 傳送access token回應(例如react可以儲存在state中使用)
  res.json({
    status: 'success',
    data: { accessToken },
  })
})

router.post('/logout', authenticate, (req, res) => {
  // 清除cookie
  res.clearCookie('accessToken', { httpOnly: true })
  res.json({ status: 'success', data: null })
})

// 檢查登入狀態用

// POST - 新增會員資料
router.post('/', async function (req, res) {
  // req.body資料範例
  // {
  //     "name":"金妮",
  //     "email":"ginny@test.com",
  //     "username":"ginny",
  //     "password":"12345"
  // }

  // 要新增的會員資料
  const newMember = req.body

  // 檢查從前端來的資料哪些為必要(name, username...)
  if (
    !newMember.username ||
    !newMember.email ||
    !newMember.name ||
    !newMember.password
  ) {
    return res.json({ status: 'error', message: '缺少必要資料' })
  }

  //先檢查username或是email不能有相同的
  const [rows] = await db.query(
    `SELECT * FROM member WHERE username= ? OR email=?`,
    [newMember.username, newMember.email]
  )
  console.log(rows)
  if (rows.length > 0) {
    return res.json({
      status: 'error',
      message: '建立會員失敗，有重複帳號或email',
    })
  }

  // 以下是準備新增會員
  // 1.進行密碼編碼
  const passwordHash = await generateHash(newMember.password)

  // 2.新增到資料表
  const [rows2] = await db.query(
    `INSERT INTO member (name,username,password,email,created_at,updated_at ) VALUES (?,?,?,?,NOW(),NOW())`,
    [newMember.name, newMember.username, passwordHash, newMember.email]
  )
  console.log(rows2)
  if (!rows2.insertId) {
    return res.json({
      status: 'error',
      message: '資料庫錯誤',
    })
  }
  // 執行後user是建立的會員資料，created為布林值
  // where指的是不可以有相同的資料，如username或是email不能有相同的
  // defaults用於建立新資料用需要的資料

  // const [member, created] = await Member.findOrCreate({
  //   where: {
  //     [Op.or]: [{ username: newMember.username }, { email: newMember.email }],
  //   },
  //   defaults: {
  //     name: newMember.name,
  //     password: newMember.password,
  //     username: newMember.username,
  //     email: newMember.email,
  //   },
  // })

  // // 新增失敗 created=false 代表沒新增
  // if (!created) {
  //   return res.json({ status: 'error', message: '建立會員失敗' })
  // }

  // 成功建立會員的回應
  // 狀態`201`是建立資料的標準回應，
  // 如有必要可以加上`Location`會員建立的uri在回應標頭中，或是回應剛建立的資料
  // res.location(`/users/${user.id}`)
  return res.status(201).json({
    status: 'success',
    data: null,
  })
})
// -------POST-------
export default router
