import React, { useState } from 'react'
import { Modal } from 'antd'



export default function BlogCategoryModal({visible,handleOk,handleCancel}) {
  
  

  return (
    
    <>
     
      <Modal title="分類搜尋" visible={visible}onOk={handleOk} onCancel={handleCancel}>
        {/* 在這裡添加分類搜尋的內容 */}
        <p>分類內容...</p>
      </Modal>
    </>
  )
}
