import express from "express";
import multer from "multer";
import z from "zod";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import mysql_session from 'express-mysql-session';
import moment from 'moment-timezone';


import db from"./utils/connect-mysql.js"
// import admin2Router from "./routes/admin2.js";
// import upload from "./utils/upload-imgs.js";

const app = express();
const MysqlStore = mysql_session(session);

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