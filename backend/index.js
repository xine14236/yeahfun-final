import express from "express";
import multer from "multer";
import z from "zod";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import mysql_session from 'express-mysql-session';
import moment from 'moment-timezone';
import blogRouter from './routes/blog.js'

import jwt from "jsonwebtoken";


import db from"./utils/connect-mysql.js"
// import admin2Router from "./routes/admin2.js";
// import upload from "./utils/upload-imgs.js";

const app = express();
const MysqlStore = mysql_session(session);
const sessionStore = new MysqlStore({},db);

app.use(express.urlencoded({extended: true}))

app.use(express.json())

app.use(session({
  saveUninitialized:false,
  resave:false,
  name:"super mario",
  secret: "u129ru12urawewq",
  store: sessionStore,
  // cookie:{
  //   maxAge:1200_000 //底線是給人看的，不能用兩個_ __
  // }
}));

var corsOptions= {
  credentials: true,
  origin: (origin, callback)=> {
   
callback(null,true); 
  }
}

// ******************* 自訂 top-level middleware
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.locals.session =req.session; //是讓template可以使用session
  // res.send("<p>直接被中斷</p>"); // 不應該回應
  res.locals.title = 'YeahFUN'; // 預設的頁面 title
  res.locals.pageName ="";

  const auth = req.get('Authorization')  //取得用戶端request的Header
if(auth && auth.indexOf("Bearer ")===0){
const token = auth.slice(7) //只取得token的部分
try{
  // 解密token 並把資料掛在req的my_jwt
req.my_jwt = jwt.verify(token, process.env.JWT_KEY)
}catch(ex){}
}

  next();
});

app.get("/", (req, res) => {
  res.send("<h2>YeahFun首頁</h2>")
 
});

app.use("/blog",blogRouter)
const port = process.env.WEB_PORT || 3002;

app.listen(port, () => {
  console.log(`伺服器動了 port:${port}`);
});

