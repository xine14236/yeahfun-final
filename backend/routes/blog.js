import express, { Router } from 'express'
import moment from 'moment-timezone'
import db from './../utils/connect-mysql.js'
import upload from './../utils/upload-img-blog.js'
import upload2 from './../utils/upload-img-blogComment.js'
import authenticate from '#middlewares/authenticate.js'


const router = express.Router()

const getBlogData = async (req) => {
  const conditions = []
  const dateFormat1 = 'YYYY-MM-DD HH:mm:ss'
  const dateFormat2 = 'YYYY年MM月DD日 '
  const memberId = req.user.id || 0

  // let test1 =moment('Thu Jul 25 2024 00:00:00 ').format(dateFormat1)
  // console.log({test1})

  // 分頁
  const perPage = Number(req.query.perpage) || 3 //每頁最多有幾筆

  // 篩選
  const name_like = req.query.name_like || ''
  conditions[0] = name_like
    ? `b.title LIKE '%${name_like}%' OR b.content LIKE '%${name_like}%'`
    : ''

  let birthBegin = req.query.date_begin || '' //這日期之後出生的
  let birthEnd = req.query.date_end || '' //這日期之前出生的
  let birthStartCondition = ''
  let birthEndCondition = ''
  birthBegin = moment(birthBegin)
  if (birthBegin.isValid()) {
    birthStartCondition = ` b.create_at >= '${birthBegin.format(dateFormat1)}' `
  }

  birthEnd = moment(birthEnd)
  if (birthEnd.isValid()) {
    birthEndCondition = ` b.create_at <= '${birthEnd.format(dateFormat1)}' `
  }

  let dateBeEn = ''
  if (birthStartCondition && birthEndCondition) {
    dateBeEn = `${birthStartCondition} AND ${birthEndCondition}`
  } else if (birthStartCondition) {
    dateBeEn = `${birthStartCondition} `
  } else if (birthEndCondition) {
    dateBeEn = `${birthEndCondition} `
  }

  conditions[1] = dateBeEn

  const categories = req.query.categories ? req.query.categories.split(',') : []
  conditions[2] =
    categories.length > 0
      ? categories.map((v) => `bc.blog_category_id='${v}'`).join(' OR ')
      : ''

      conditions[3] = `b.title is not null`

  const cvs = conditions.filter((v) => v)
  // 2.用AMD串接所有從句
  const where =
    cvs.length > 0 ? 'WHERE' + cvs.map((v) => `( ${v} )`).join(` AND `) : ''
  console.log(where)

  const sort = req.query.sort || 'id' //預設的排序資料庫欄位

  const order = req.query.order || 'asc'
  const sortList = ['id', 'author', 'favorite_count', 'likes_count']
  const orderList = ['asc', 'desc']
  let orderby = ''
  if (orderList.includes(order) && sortList.includes(sort)) {
    if (sort == 'favorite_count' || sort == 'likes_count') {
      orderby = `ORDER BY ${sort} ${order} ,b.id DESC`
    } else {
      orderby = `ORDER BY b.${sort} ${order}`
    }
  }

  let page = +req.query.page || 1
  if (page < 1) {
    return {
      success: false,
      info: '值太小',
    }
  }
  const offset = (page - 1) * perPage
  const limit = perPage

  const sql0 = `SELECT COUNT(DISTINCT b.id)  totalRows FROM blog b LEFT JOIN blog_category bc ON b.id=bc.blog_id  ${where}  `
  console.log(sql0)
  const [[{ totalRows }]] = await db.query(sql0)

  let totalPages = 0 //總頁數，預設值設定為0

  if (totalRows > 0) {
    totalPages = Math.ceil(totalRows / perPage)

    let keyword = req.query.keyword || '' //相當於預設值

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
    const sql = `SELECT   b.*, c.name, GROUP_CONCAT(DISTINCT bc.blog_category_id SEPARATOR ',') AS category_ids, GROUP_CONCAT(DISTINCT bcn.blog_category_name SEPARATOR ',') AS category_names, COALESCE(fb.favorite_count, 0) AS favorite_count, 
    COALESCE(lb.likes_count, 0) AS likes_count, bi.img_name , li.id fav_id
   FROM blog b Left join  blog_category bc ON b.id=bc.blog_id 
   Left join  blog_category_name bcn on bc.blog_category_id= bcn.id 
   Left join  (SELECT blog_id, COUNT(*) AS favorite_count FROM favorite_blog GROUP BY blog_id) fb ON b.id = fb.blog_id
   Left join  (SELECT blog_id, COUNT(*) AS likes_count FROM likes_blog GROUP BY blog_id) lb ON b.id = lb.blog_id
   Left join blog_img bi on b.id=bi.blog_id
   left join customer c on b.author=c.id
LEFT JOIN (
      SELECT * FROM favorite_blog WHERE customer_id=${memberId}
    ) li ON b.id =li.blog_id
     ${where} 
  GROUP BY b.id ${orderby} LIMIT ${limit} OFFSET ${offset};`
    const [rows] = await db.query(sql)
    
    
    rows.forEach((r) => {
      r.date = ''
      if(r.img_name){
        r.img_name=r.img_name.split(',')[0]
      }
      // "JS 的Date 類型 轉換成日期格式的字串"
      if (r.create_at) {
        r.create_at = moment(r.create_at).format(dateFormat1)
        r.date = r.create_at
        r.date = moment(r.create_at, dateFormat1).format(dateFormat2)
      }
    })
    // const sql1 ='SELECT * FROM `blog_category_name` WHERE parent >0'
    // const[rows3]= await db.query(sql1)

    const output = {
      success: true,
      data: {
        sql,
        page,
        perPage,
        totalPages,
        totalRows,
        blogs: rows,
      },
    }

    return output
  } else {
    return {
      success: false,
      info: '沒有找到資料',
    }
  }
}

router.get('/',authenticate, async (req, res) => {
  const result = await getBlogData(req)
  res.json(result)
})

// 收藏 還沒有連接會員
router.get('/fav/:b_id',authenticate, async (req, res) => {
  const output = {
    success: false,
    action: '',
    error: '',
    code: 0,
  }
  // 1.檢查用戶的授權
  // if(!req.my_jwt?.id){
  //   output.error = "沒有授權";
  //   output.code=402;
  //   return res.status(403).json(output)
  // }
  // 2.有沒有這個項目的資料
  const sql = `SELECT * FROM blog WHERE id=?`
  const [rows] = await db.query(sql, [req.params.b_id])
  if (rows.length < 1) {
    output.error = '沒有這個項目'
    output.code = 405
    return res.status(403).json(output)
  }
  // 3.該項有沒有加入過
  const sql2 = `SELECT id FROM favorite_blog WHERE customer_id=? AND blog_id=?`
  // ********************先用req給
  const [rows2] = await db.query(sql2, [req.user.id, req.params.b_id])
  let result
  if (rows2.length < 1) {
    // 沒有加入過
    output.action = 'add'
    const sql3 = `INSERT INTO favorite_blog (customer_id, blog_id) VALUES (?, ?)`
    ;[result] = await db.query(sql3, [req.user.id, req.params.b_id])
  } else {
    // 已經加入了
    output.action = 'remove'
    const sql4 = `DELETE FROM favorite_blog WHERE id=?`
    ;[result] = await db.query(sql4, [rows2[0].id])
  }
  output.success = !!result.affectedRows

  res.json(output)
})

// 喜歡
router.get('/like/:b_id',authenticate , async (req, res) => {
  const output = {
    success: false,
    action: '',
    error: '',
    code: 0,
  }
  // 1.檢查用戶的授權
  // if(!req.my_jwt?.id){
  //   output.error = "沒有授權";
  //   output.code=402;
  //   return res.status(403).json(output)
  // }
  // 2.有沒有這個項目的資料
  const sql = `SELECT * FROM blog WHERE id=?`
  const [rows] = await db.query(sql, [req.params.b_id])
  if (rows.length < 1) {
    output.error = '沒有這個項目'
    output.code = 405
    return res.status(403).json(output)
  }
  // 3.該項有沒有加入過
  const sql2 = `SELECT id FROM likes_blog WHERE customer_id=? AND blog_id=?`
  // ********************先用req給
  const [rows2] = await db.query(sql2, [req.user.id, req.params.b_id])
  let result
  if (rows2.length < 1) {
    // 沒有加入過
    output.action = 'add'
    const sql3 = `INSERT INTO likes_blog (customer_id, blog_id) VALUES (?, ?)`
    ;[result] = await db.query(sql3, [req.user.id, req.params.b_id])
  } else {
    // 已經加入了
    output.action = 'remove'
    const sql4 = `DELETE FROM likes_blog WHERE id=?`
    ;[result] = await db.query(sql4, [rows2[0].id])
  }
  output.success = !!result.affectedRows

  res.json(output)
})

// 新增 還沒有連接會員
router.get('/create', authenticate , async (req, res) => {
  if (!req.user.id ) {
    return res.json({ success:false, message: '存取會員資料失敗' })
  }
  
  const sql = ` INSERT INTO blog ( title, author ) VALUES ( NULL , ?); `
 
 
  const [result] = await db.query(sql,[req.user.id])
  // insertId
  res.json({success:true,data:result})
})

router.post('/save',authenticate, async (req, res) => {
  const output={
    success:false,
    info:'',
    
  }

const sql0 = `Select id from blog where title=?`
const [rows0]= await db.query(sql0,[req.body.title])
if(rows0.length > 0){
  output.info='重複的標題'
  return  res.json(output)
}

  const memberId = req.user.id || null
  const sql = `UPDATE blog set title=?, author=? , content=? where id=?`
  const [result]= await db.query(sql,[req.body.title, memberId, req.body.content, req.body.blogId])
  output.result1=result
  output.info='新增成功'

  if (result.affectedRows > 0) {
    output.success = true;
    output.info = '更新成功';
    output.result1 = result;

    // 删除旧的标签
    const deleteSql = `DELETE FROM blog_category WHERE blog_id=?`;
    await db.query(deleteSql, [req.body.blogId]);

    const tags = req.body.tags || [];
    if (!tags.includes(7)) {
      tags.push(7);
    }

    // 插入新的标签
    const insertSql = `INSERT INTO blog_category (blog_id, blog_category_id) VALUES ?`;
    const tagValues = tags.map(tag => [req.body.blogId, tag]);
    const [insertResult] = await db.query(insertSql, [tagValues]);

    output.result2 = insertResult;
  } else {
    output.info = '没有找到對應的blog';
  }

res.json(output)
})


router.post('/createCom',authenticate, async (req, res) => {
  const output={
    success:false,
    info:'',
    
  }
  const memberId = req.user.id || null
  const sql = `Insert blog_comment ( comment, blog_id , customer_id) values (?,?,?)`
  const [result]= await db.query(sql,[req.body.comText, req.body.blogId, memberId ])
  output.result1=result
  output.info='新增成功'

  if (result.affectedRows > 0) {
    output.success = true;
    output.info = '更新成功';
    output.result1 = result;

    // 删除旧的标签
    
  } else {
    output.info = '没有找到對應的blog';
  }

res.json(output)
})


router.post('/uploads/:bid', upload.array('photos', 10),  async (req, res) => {
  const bid2 = req.params.bid 
let pictureNameArray=[]
const output={
  success:false,
  

}
output.data=req.files
if (req.files) {
  for (const file of req.files) {
    pictureNameArray.push(file.filename);
    
  }
  const pictureNameString=pictureNameArray.join(',')
  const sql=`select img_name  from blog_img where blog_id=${bid2}`
  const [rows] = await db.query(sql)
  console.log(rows.length)
  
  if(rows.length<1){
    const sql2 =`INSERT INTO blog_img(img_name, blog_id) VALUES (?, ${bid2})`
    const [result] = await db.query(sql2,[pictureNameString])
    output.success=!!result.affectedRows
    output.result=result;
    output.info='圖片上傳成功'
  }else{
    const check=rows[0].img_name+','+pictureNameString
    const sql3 = `UPDATE blog_img SET img_name=? where blog_id=?`
    const [result]= await db.query(sql3,[check,bid2])
    output.success=!!(result.affectedRows && result.changedRows)
    output.info='更新成功'
  }
}


  // filename
  res.json(output)


})
router.post('/Cuploads/:bid', upload2.array('photos', 3),  async (req, res) => {
  const bid2 = req.params.bid 
let pictureNameArray=[]
const output={
  success:false,
  

}
output.data=req.files
if (req.files) {
  for (const file of req.files) {
    pictureNameArray.push(file.filename);
  }
  const pictureNameString = pictureNameArray.join(',');

  const connection = await db.getConnection();
  await connection.beginTransaction(); // 開始事務

  try {
    const sql = `SELECT img_name FROM blog_comment_img WHERE blog_comment_id = ? FOR UPDATE`;
    const [rows] = await connection.query(sql, [bid2]);

    if (rows.length < 1) {
      const sql2 = `INSERT INTO blog_comment_img (img_name, blog_comment_id) VALUES (?, ?)`;
      const [result] = await connection.query(sql2, [pictureNameString, bid2]);
      output.success = !!result.affectedRows;
      output.result = result;
      output.info = '圖片上傳成功';
    } else {
      const check = rows[0].img_name + ',' + pictureNameString;
      const sql3 = `UPDATE blog_comment_img SET img_name = ? WHERE blog_comment_id = ?`;
      const [result] = await connection.query(sql3, [check, bid2]);
      output.success = !!(result.affectedRows && result.changedRows);
      output.info = '更新成功';
    }

    await connection.commit(); // 提交事務
  } catch (error) {
    await connection.rollback(); // 發生錯誤時回滾事務
    console.error('Transaction error:', error);
    output.success = false;
    output.info = '發生錯誤';
  } finally {
    connection.release(); // 釋放連接
  }
}

res.json(output);


})

router.delete('/delete/:bid', async (req, res)=>{
  const output={
    success:false,
    info:'',
    
  }
  const sql = 'delete from blog where id=?'
  const [result]= await db.query(sql,[req.params.bid])
  if(result.affectedRows){
    output.success = !!result.affectedRows
  }
  res.json(output)
})

router.delete('/Cdelete/:bid', async (req, res)=>{
  const output={
    success:false,
    info:'',
    
  }
  const sql = 'delete from blog_comment where id=?'
  const [result]= await db.query(sql,[req.params.bid])
  if(result.affectedRows){
    output.success = !!result.affectedRows
  }
  res.json(output)
})

router.get('/edit/:bid', authenticate , async (req, res) => {
 




  const sql = ` SELECT   b.*, GROUP_CONCAT(DISTINCT bc.blog_category_id SEPARATOR ',') AS category_ids
   FROM blog b Left join  blog_category bc ON b.id=bc.blog_id   where b.id=${req.params.bid} GROUP BY b.id
    `
 
 
  const [rows] = await db.query(sql)
  const row=rows[0]
  // insertId
  res.json({success:true,data:{
    blog:row
  }})
})

router.post('/update' , async (req, res) => {
 
  const output={
    success:false,
    info:'',
    
  }


  const sql0 = `Select id from blog where title=? AND id<>?`
const [rows0]= await db.query(sql0,[req.body.title,req.body.blogId])
if(rows0.length > 0){
  output.info='重複的標題'
  return  res.json(output)
}
 
  const sql = `UPDATE blog set title=? , content=? where id=?`
  const [result]= await db.query(sql,[req.body.title, req.body.content, req.body.blogId])
  output.result1=result
  output.info='修改成功'

  if (result.affectedRows > 0) {
    output.success = true;
    output.info = '更新成功';
    output.result1 = result;

    // 删除旧的标签
    const deleteSql = `DELETE FROM blog_category WHERE blog_id=?`;
    await db.query(deleteSql, [req.body.blogId]);

    const tags = req.body.tags || [];
   
if(tags.length > 0){
    // 插入新的标签
    const insertSql = `INSERT INTO blog_category (blog_id, blog_category_id) VALUES ?`;
    const tagValues = tags.map(tag => [req.body.blogId, tag]);
    const [insertResult] = await db.query(insertSql, [tagValues]);

    output.result2 = insertResult;
}

  } else {
    output.info = '没有找到對應的blog';
  }

res.json(output)
})

router.post('/bccreate',authenticate, async (req, res) => {
  const output={
    success:false,
    info:'',
    
  }
  const memberId = req.user.id || null
  const sql = `UPDATE blog set title=?, author=? , content=? where id=?`
  const [result]= await db.query(sql,[req.body.title, memberId, req.body.content, req.body.blogId])
  output.result1=result
  output.info='新增成功'

  if (result.affectedRows > 0) {
    output.success = true;
    output.info = '更新成功';
    output.result1 = result;

    // 删除旧的标签
    const deleteSql = `DELETE FROM blog_category WHERE blog_id=?`;
    await db.query(deleteSql, [req.body.blogId]);

    const tags = req.body.tags || [];
    if (!tags.includes(7)) {
      tags.push(7);
    }

    // 插入新的标签
    const insertSql = `INSERT INTO blog_category (blog_id, blog_category_id) VALUES ?`;
    const tagValues = tags.map(tag => [req.body.blogId, tag]);
    const [insertResult] = await db.query(insertSql, [tagValues]);

    output.result2 = insertResult;
  } else {
    output.info = '没有找到對應的blog';
  }

res.json(output)
})


router.post('/Cedit/',authenticate, async (req, res) => {
  const output={
    success:false,
    info:'',
    
  }
  const memberId = req.user.id || null
  const sql = `UPDATE blog_comment set  customer_id=? , comment=?, created_at=NOW() where id=?`
  const [result]= await db.query(sql,[ memberId, req.body.comment, req.body.BCId])
  output.result=result
  output.info='新增成功'

  if (result.affectedRows > 0) {
    output.success = true;
    output.info = '更新成功';
    output.result = result;

  

  


  } else {
    output.info = '没有找到對應的blog';
  }

res.json(output)
})

router.get('/:bid', async (req, res) => {
  const sql = `SELECT   b.*, c.name, GROUP_CONCAT(DISTINCT bc.blog_category_id SEPARATOR ',') AS category_ids, GROUP_CONCAT(DISTINCT bcn.blog_category_name SEPARATOR ',') AS category_names, COALESCE(fb.favorite_count, 0) AS favorite_count, 
    COALESCE(lb.likes_count, 0) AS likes_count
   FROM blog b Left join  blog_category bc ON b.id=bc.blog_id 
   left join customer c on b.author=c.id
   Left join  blog_category_name bcn on bc.blog_category_id= bcn.id 
   Left join  (SELECT blog_id, COUNT(*) AS favorite_count FROM favorite_blog GROUP BY blog_id) fb ON b.id = fb.blog_id
   Left join  (SELECT blog_id, COUNT(*) AS likes_count FROM likes_blog GROUP BY blog_id) lb ON b.id = lb.blog_id  where b.id=${req.params.bid} 
  GROUP BY b.id `
  const dateFormat1 = 'YYYY-MM-DD HH:mm:ss'

  const [rows1] = await db.query(sql)
  rows1.forEach((r)=>{
    if (r.create_at) {

      r.create_at = moment(r.create_at).format(dateFormat1)
    }

  })
  const row1 = rows1[0]

  const sql2 = `SELECT   b.id, b.title, b.create_at, 
  bi.img_name,
    COALESCE(lb.likes_count, 0) AS likes_count
   FROM blog b 
   Left join blog_img bi on b.id=bi.blog_id
   Left join  (SELECT blog_id, COUNT(*) AS likes_count FROM likes_blog GROUP BY blog_id) lb ON b.id = lb.blog_id  
   Where b.title is not null
  GROUP BY b.id ORDER BY likes_count DESC ,b.id DESC
LIMIT 5 `



const dateFormat3 = 'YYYYMMDD'
  const [row2]=await db.query(sql2)
  row2.forEach((r) => {
    if(r.img_name){
      r.img_name=r.img_name.split(',')[0]
    }
    // "JS 的Date 類型 轉換成日期格式的字串"
    if (r.create_at) {
      r.create_at = moment(r.create_at).format(dateFormat3)
    
    }
  })

  const sql3 = `Select bc.*,  bci.img_name, c.name from blog_comment bc left join blog_comment_img bci on bc.id=bci.blog_comment_id left join customer c on bc.customer_id=c.id where bc.blog_id=${req.params.bid} ORDER BY created_at DESC ,id asc `
  const [rows3]= await db.query(sql3)
const dateFormat4 = 'YYYY-MM-DD HH:mm:ss'
  const comments = rows3.map(comment => {
    return {
      ...comment,
      created_at: comment.created_at ? moment(comment.created_at).format(dateFormat4) : null,
      images: comment.img_name ? comment.img_name.split(',') : [],
      
    };
  });

  res.json({
    success: true,
    data: { blog: row1,
      favBlog:row2,
      comment:comments
     },
  })
})

export default router
