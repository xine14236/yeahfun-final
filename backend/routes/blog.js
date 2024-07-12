import express, { Router } from "express";
import moment from "moment-timezone";
import db from "./../utils/connect-mysql.js"
import upload from './../utils/upload-img-blog.js';

const router = express.Router();

const getBlogData= async (req)=>{
  const conditions = []
  let keyword = req.query.keyword || '';



  // 分頁
  const perPage = Number(req.query.perpage) || 10; //每頁最多有幾筆

  // 篩選
   const name_like = req.query.name_like || ''
  conditions[0] = name_like ? `b.title LIKE '%${name_like}%' OR b.content LIKE '%${name_like}%'` : ''

  let birthBegin = req.query.date_begin || ''; //這日期之後出生的
  let birthEnd = req.query.date_end || ''; //這日期之前出生的
  let birthStartCondition=''
  let birthEndCondition=''
  birthBegin = moment(birthBegin);
  if(birthBegin.isValid()){
    birthStartCondition =` b.create_at >= '${birthBegin.format('YYYY-MM-DD HH:MI:SS')}' `
  };

  birthEnd = moment(birthEnd);
  if(birthEnd.isValid()){
    birthEndCondition =` b.create_at <= '${birthEnd.format('YYYY-MM-DD HH:MI:SS')}' `
  };
  
  let dateBeEn=''
  if(birthStartCondition && birthEndCondition){
     dateBeEn = `${birthStartCondition} AND ${birthEndCondition}`
  }else if(birthStartCondition){
     dateBeEn = `${birthStartCondition} `
  }else if(birthEndCondition){
    dateBeEn=`${birthEndCondition} `
  }

  conditions[1]=dateBeEn


  const cvs = conditions.filter((v) => v)
  // 2.用AMD串接所有從句
  const where =
    cvs.length > 0 ? 'WHERE' + cvs.map((v) => `( ${v} )`).join(` AND `) : ''
  console.log(where)



  const sort = req.query.sort || 'id' //預設的排序資料庫欄位

  const order = req.query.order || 'asc'
  const sortList = ['id', 'author']
  const orderList = ['asc', 'desc']
  let orderby = ''
  if (orderList.includes(order) && sortList.includes(sort)) {
    orderby = `ORDER BY b.${sort} ${order}`
  }


  let page = +req.query.page || 1;
  if(page<1){
  
    return {
      success:false,
  info:"值太小"
    }
  };
  const offset = (page - 1) * perPage
  const limit = perPage

  
  



  const sql0 =`SELECT count(*)  totalRows FROM blog b LEFT JOIN blog_category bc ON b.id=bc.blog_id  ${where} ${orderby} LIMIT ${limit} OFFSET ${offset}`;
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
  const sql =`SELECT b.*, bc.blog_category_id, bcn.blog_category_name FROM blog b LEFT JOIN blog_category bc ON b.id=bc.blog_id LEFT join blog_category_name bcn on bc.blog_category_id= bcn.id ${where} ${orderby} LIMIT ${limit} OFFSET ${offset};
  `;
  const [rows]= await db.query(sql);

  const output={
    success:true,
    data:{
      where,page,perPage,totalPages,totalRows,blogs:rows

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
