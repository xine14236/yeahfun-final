// Comment.js
import React, { useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Button, Input, Upload, message } from 'antd';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlinePicture, AiOutlineCheck, AiOutlineMeh } from 'react-icons/ai';
import { z } from 'zod';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Image from 'next/image'
import styles from './comment.module.css'
import { useAuth } from '@/hooks/use-auth';


const { TextArea } = Input;


const Comment = ({ comment, onEdit, onDelete, onAddImages, forBId=0, getBlog=()=>{} }) => {
    const textAreaRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.comment || '');
  const [error, setError] = useState('');
  const { auth } = useAuth()

  const handleSave = () => {
    const schema = z.string().max(200, "Cannot exceed 200 characters");
    try {
      schema.parse(text);
      onEdit(text);
      setIsEditing(false);
      setError('');
    } catch (e) {
      setError(e.errors[0].message);
    }
  };

  // const handleImageUpload = ({ fileList }) => {
  //   if (fileList.length > 3) {
  //     alert('You can only upload up to 3 images.');
  //     return false;
  //   }
  //   onAddImages(fileList);
  //   return false; // Prevent upload
  // };
  const props = {
    name: 'photos',
    action: `http://localhost:3005/api/blog/Cuploads/${comment.id}`,
    multiple:true,
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        getBlog(forBId)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textAreaRef.current && !textAreaRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);



  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<AiOutlineEdit />} onClick={() => setIsEditing(true)}>
        編輯
      </Menu.Item>
      <Menu.Item key="2" icon={<AiOutlineDelete />} onClick={onDelete}>
        刪除
      </Menu.Item>
      <Menu.Item key="3" icon={<AiOutlinePicture />}>
      <Upload  {...props} >
          <Button type="text">新增圖片</Button>
        </Upload>
      </Menu.Item>
    </Menu>
  );
  const menu2 =(
    <Menu>
   <Menu.Item key="1" icon={<AiOutlineMeh />} >
        檢舉
      </Menu.Item>
  </Menu>
  )

  return (
    <div className={`row mt-4 px-3 w-100   ${styles.row2} `}>
      <div className='col-4'>
      <div className=''>
        <Image
                      src={`http://localhost:3005/avatar/1.webp`}
                      className="img-fluid"
                      alt="..."
                      width={30}
                      height={25}
                      style={{
                        width: '70px',
                        height: 'auto',
                        maxHeight: '200px',
                        objectFit: 'contain',
                      }}
                    />
        </div>
        <h3> {comment.name}</h3>
        
      </div>
      <div className='col-8 d-flex flex-column justify-content-between '>
        {isEditing ? (
          <div ref={textAreaRef}>
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button type="primary" onClick={handleSave} icon={<AiOutlineCheck />}>
              保存與送出
            </Button>
          </div>
        ) : (
          <h4>{comment.comment}</h4>
        )}
        <div className={styles.commentMeta}>
          {comment.created_at}   
          <Dropdown overlay= {auth.userData.id==comment.customer_id?menu : menu2} trigger={['click']}>
            <Button type="text" icon={<AiOutlineMore />} />
          </Dropdown>
        </div>
      </div>
      <div className='col-8 offset-4 mt-4'>
        {comment.images && comment.images.length > 0 && (
          <PhotoProvider>
            <div>
              {comment.images.map((image, index) => (
                <PhotoView key={index} src={`http://localhost:3005/img-blog-comment/${image}`}>
                  <img
                    src={`http://localhost:3005/img-blog-comment/${image}`}
                    alt="comment"
                    style={{ width: '100px', cursor: 'pointer', marginRight: '10px' }}
                  />
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        )}
      </div>
    </div>
  );
};

export default Comment;
