import express, { Router } from "express";
import moment from "moment-timezone";
import db from "./../utils/connect-mysql.js"
import upload from './../utils/upload-img-blog.js';

const router = express.Router();

const getBlogData= async (req)=>{
  const conditions = []
  const dateFormat1 = 'YYYY-MM-DD HH:MI:SS'
  const dateFormat2 = 'YYYY年MM月DD日 '



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
    birthStartCondition =` b.create_at >= '${birthBegin.format(dateFormat1)}' `
  };

  birthEnd = moment(birthEnd);
  if(birthEnd.isValid()){
    birthEndCondition =` b.create_at <= '${birthEnd.format(dateFormat1)}' `
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

  const categories = req.query.categories ? req.query.categories.split(',') : []
  conditions[2] =
  categories.length > 0 ? categories.map((v) => `bc.blog_category_id='${v}'`).join(' OR ') : ''


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

  
  



  const sql0 =`SELECT COUNT(DISTINCT b.id)  totalRows FROM blog b LEFT JOIN blog_category bc ON b.id=bc.blog_id  ${where} ${orderby} LIMIT ${limit} OFFSET ${offset}`;
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
  const sql =`SELECT   b.*, GROUP_CONCAT(DISTINCT bc.blog_category_id SEPARATOR ',') AS category_ids, GROUP_CONCAT(DISTINCT bcn.blog_category_name SEPARATOR ',') AS category_names,COUNT(fb.blog_id) AS favorite_count,COUNT(lb.blog_id) AS likes_count
   FROM blog b INNER JOIN blog_category bc ON b.id=bc.blog_id 
   INNER join blog_category_name bcn on bc.blog_category_id= bcn.id 
   Left join favorite_blog fb ON b.id = fb.blog_id 
   Left join likes_blog lb ON b.id = lb.blog_id ${where} 
  GROUP BY b.id ${orderby} LIMIT ${limit} OFFSET ${offset};`;
  const [rows]= await db.query(sql);

  rows.forEach((r) => {
r.date=''
    // "JS 的Date 類型 轉換成日期格式的字串"
    if(r.create_at){

      r.create_at =moment(r.create_at).format(dateFormat1);
      r.date=r.create_at
      r.date=moment(r.create_at, dateFormat1).format(dateFormat2);
    }
  })

  const output={
    success:true,
    data:{
      sql,page,perPage,totalPages,totalRows,blogs:rows

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
