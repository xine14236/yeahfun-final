import multer from "multer";
import {v4} from "uuid";

//篩選檔案跟副檔名
const extMap ={
  "image/jpeg":".jpg",
  "image/png":".png",
  "image/webp":".webp",
};

const fileFilter = (req,file, callback)=>{
  callback(null,!! extMap[file.mimetype] );
  
  

};

const storage = multer.diskStorage({
  destination: (req,file, callback)=>{
callback(null,"public/img-blog") //這裡的路徑和此JS檔所在的位置無關
  },
  filename: (req,file, callback)=>{
    const timeName = `${Date.now()}`
const ext = extMap[file.mimetype]; // 取得副檔名
callback(null, timeName+ ext);
  },
});

export default multer({fileFilter,storage})