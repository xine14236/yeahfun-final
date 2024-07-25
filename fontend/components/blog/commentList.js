// CommentList.js
import React, { useState, useEffect } from 'react';
import Comment from './comment';


const CommentList = ({ comments=[],setComments=()=>{} }) => {




  const handleEdit = (id, newText) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, text: newText } : comment));
  };

  const handleDelete = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const handleAddImage = (id, imageUrl) => {
    setComments(comments.map(comment => comment.id === id ? { ...comment, images: [...comment.images, imageUrl] } : comment));
  };

  return (
    <div className=' '>
      {comments.map(comment => (
        
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={(newText) => handleEdit(comment.id, newText)}
          onDelete={() => handleDelete(comment.id)}
          onAddImage={(imageUrl) => handleAddImage(comment.id, imageUrl)}
        />
      ))}
    </div>
  );
};

export default CommentList;
