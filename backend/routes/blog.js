import express, { Router } from "express";
import moment from "moment-timezone";
import db from "./../utils/connect-mysql.js"
import upload from './../utils/upload-img-blog.js';

const router = express.Router();

const getBlogData= async (req)=>{
  let keyword = req.query.keyword || '';

  let birthBegin = req.query.dateBegin || ''; //這日期之後出生的
  let birthEnd = req.query.dateEnd || ''; //這日期之前出生的
  const perPage = 20; //每頁最多有幾筆

  let page = +req.query.page || 1;
  if(page<1){
  
    return {
      success:false,
  info:"值太小"
    }
  };

  const sql0 =`SELECT count(*)  totalRows FROM blog b `;
  const [[{totalRows}]] = await db.query(sql0);
  
  let totalPages = 0; //總頁數，預設值設定為0

if(totalRows > 0){
   totalPages = Math.ceil(totalRows/perPage);
   
let keyword = req.query.keyword || ''; //相當於預設值
   
// if(page> totalPages){
//     console.log(2)
//     // return res.redirect(`?page=${totalPages}`);
//     return {
//       success:false,
//       redirect:`?page=${totalPages}`,
//       info:"值太大"
//     }
//   };
  // 
  const sql =`SELECT b.*, bc.blog_category_id, bcn.blog_category_name FROM blog b LEFT JOIN blog_category bc ON b.id=bc.blog_id LEFT join blog_category_name bcn on bc.blog_category_id= bcn.id WHERE 1;
  `;
  const [rows]= await db.query(sql);

  const output={
    success:true,
    data:{
      page,perPage,totalPages,blogs:rows

    }
  }
 
return(output)
}

}

router.get("/", async (req,res) => {
 
const result = await getBlogData(req)
  res.json(result)
})


router.post("/uploads",upload.array("photos",10),(req,res) => {
  res.json(req.files);
})

export default router;
