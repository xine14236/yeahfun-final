// CommentList.js
import React, { useState, useEffect } from 'react';
import Comment from './comment';


const CommentList = ({ comments=[],setComments=()=>{},handleEdit,handleDelete,handleAddImage }) => {




  

  return (
    <div className=' '>
      {comments.map(comment => (
        
        <Comment
          key={comment.id}
          comment={comment}
          onEdit={(newText) => handleEdit(comment.id, newText)}
          onDelete={() => handleDelete(comment.id)}
          onAddImages={(files) => handleAddImages(comment.id, files)}
        />
      ))}
    </div>
  );
};

export default CommentList;
