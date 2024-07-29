// Comment.js
import React, { useEffect, useRef, useState } from 'react';
import { Menu, Dropdown, Button, Input, Upload, message } from 'antd';
import { AiOutlineMore, AiOutlineEdit, AiOutlineDelete, AiOutlinePicture, AiOutlineCheck } from 'react-icons/ai';
import { z } from 'zod';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Image from 'next/image';
import styles from './comment.module.css';
import { useAuth } from '@/hooks/use-auth';
import axios from 'axios';

const { TextArea } = Input;

const Comment = ({ comment, onEdit, onDelete, onAddImages, forBId = 0, getBlog = () => {} }) => {
  const textAreaRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(comment.comment || '');
  const [error, setError] = useState('');
  const { auth } = useAuth();
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    const uploadPromises = fileList.map(file => {
      const formData = new FormData();
      formData.append('photos', file.originFileObj);

      return axios.post(`http://localhost:3005/api/blog/Cuploads/${forBId}`, formData);
    });

    try {
      const responses = await Promise.all(uploadPromises);
      message.success('所有图片上传成功');
      console.log('Uploaded files:', responses);
    } catch (error) {
      message.error('图片上传失败');
    }
  };

  const handleChange = ({ fileList }) => {
    setFileList(fileList);

    // Check if all files are in 'done' status
    const allFilesDone = fileList.every(file => file.status === 'done');

    if (allFilesDone) {
      handleUpload();
    }
  };

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
        Edit
      </Menu.Item>
      <Menu.Item key="2" icon={<AiOutlineDelete />} onClick={onDelete}>
        Delete
      </Menu.Item>
      <Menu.Item key="3" icon={<AiOutlinePicture />}>
        <Upload
          multiple
          fileList={fileList}
          beforeUpload={() => false} // 阻止默认的上传行为
          onChange={handleChange}
        >
          <Button type="text">Add Image</Button>
        </Upload>
      </Menu.Item>
    </Menu>
  );

  const menu2 = (
    <Menu>
      {/* Other menu items */}
    </Menu>
  );

  return (
    <div className={`row mt-4 px-3 w-100 ${styles.row2}`}>
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
        <h3>{comment.name}</h3>
      </div>
      <div className='col-8 d-flex flex-column justify-content-between'>
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
          <Dropdown overlay={auth.userData.id === comment.customer_id ? menu : menu2} trigger={['click']}>
            <Button type="text" icon={<AiOutlineMore />} />
          </Dropdown>
        </div>
      </div>
      <div className='col-12 mt-4'>
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
