import express, { Router } from "express";
import moment from "moment-timezone";
import db from "./../utils/connect-mysql.js"
import upload from './../utils/upload-img-blog.js';

const router = express.Router();

router.post("/uploads",upload.array("photos",10),(req,res) => {
  res.json(req.files);
})

export default router;
