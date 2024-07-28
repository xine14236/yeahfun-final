// CommentList.js
import React, { useState, useEffect } from 'react';
import Comment from './comment';
import Image from 'next/image'
import styles from './comment.module.css'
import { Menu, Dropdown, Button, Input, Upload, message } from 'antd';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlinePicture, AiOutlineCheck } from 'react-icons/ai';
import { useAuth } from '@/hooks/use-auth';




const CommentList = ({ comments=[],setComments=()=>{},handleEdit,handleDelete,handleAddImage, forBId=0, getBlog=()=>{}, comText='',setComText=()=>{}, handleSubmit=()=>{} }) => {
  const { auth } = useAuth()
  const { TextArea } = Input;

const [error, setError] = useState('');

  

  return (
    <div className=' '>
 <div className={`row mt-4 px-3 w-100    ${styles.row2}  `}>
      <div className='col-4'>
      <div className=''>
        <Image
                      src={`http://localhost:3005/avatar/default.png`}
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
        <h3> {auth.userData.name}</h3>
        
      </div>
      <div className='col-8  '>
        
      <TextArea
              value={comText}
              onChange={(e) => setComText(e.target.value)}
              rows={4}
              placeholder='請輸入內容'
            />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button type="primary" 
            onClick={handleSubmit} 
            icon={<AiOutlineCheck />}>
              送出
            </Button>
        
        <div 
        className={styles.commentMeta}
        >
          {/* {'123'}    */}
       
        </div>
      </div>
     
    </div>



      {comments.map(comment => (
        
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={(newText) => handleEdit(comment.id, newText)}
          onDelete={() => handleDelete(comment.id)}
          onAddImages={(files) => handleAddImages(comment.id, files)}
          getBlog={getBlog}
          forBId={forBId}
        />
      ))}
    </div>
  );
};

export default CommentList;
