import express, { Router } from "express";
import moment from "moment-timezone";
import db from "./../utils/connect-mysql.js"
import upload from './../utils/upload-img-blog.js';

const router = express.Router();

router.get("/", async (req,res) => {
  const sql ="SELECT * from blog";
  const [rows]= await db.query(sql);
  res.json(rows)
})

router.post("/uploads",upload.array("photos",10),(req,res) => {
  res.json(req.files);
})

export default router;
