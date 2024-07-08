import express, { Router } from "express";
import moment from "moment-timezone";
import db from "./../utils/connect-mysql.js"
import upload from './../utils/upload-img-blog.js';

const router = express.Router();

const getBlogData= async ()=>{
  let keyword = req.query.keyword || '';

  let birthBegin = req.query.birthBegin || ''; //這日期之後出生的
  let birthEnd = req.query.birthEnd || ''; //這日期之前出生的
  const perPage = 20; //每頁最多有幾筆

  let page = +req.query.page || 1;
  if(page<1){
   
    return {
      success:false,
  info:"值太小"
    }
  };

  const sql0 =`SELECT count(*)  totalRows FROM blog b `;
  const [[totalRows]] = await db.query(sql0);
  let totalPages = 0; //總頁數，預設值設定為0
let rows = []; //分頁資料
if(totalRows > 0){
   totalPages = Math.ceil(totalRows/perPage);
let keyword = req.query.keyword || ''; //相當於預設值
   if(page> totalPages){
    // return res.redirect(`?page=${totalPages}`);
    return {
      success:false,
      redirect:`?page=${totalPages}`,
      info:"值太大"
    }
  };
  
}

}

router.get("/", async (req,res) => {
 


  const sql ="SELECT b.* from blog b";
  const [rows]= await db.query(sql);
  res.json(rows)
})


router.post("/uploads",upload.array("photos",10),(req,res) => {
  res.json(req.files);
})

export default router;
