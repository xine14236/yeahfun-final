import React, { useState } from 'react'
import { Modal } from 'antd'

export default function BlogCategoryModal({
  visible = false,
  handleOk,
  handleCancel,
  initialCate = [],
  category = [],
  setCategory = () => {},
  toggleCheckbox = () => {},
  handleCategoryCheckedAll = () => {},
  handleSearch = () => {},
}) {
  const cate1 = category.filter((v, i) => v.parent == 1)
  const cate2 = category.filter((v, i) => v.parent == 2)
  const cate3 = category.filter((v, i) => v.parent == 3)
  const cate4 = category.filter((v, i) => v.parent == 4)
  const cate5 = category.filter((v, i) => v.parent == 5)

  return (
    <>
      <Modal
        title="部落格分類搜尋"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {/* 在這裡添加分類搜尋的內容 */}
        <div>
        <label className="form-check-label mb-2">
            
            <input
              className="form-check-input ms-3"
              type="checkbox"
              checked={category.every((v) => v.checked)}
              onChange={(e) => {
                handleCategoryCheckedAll(e.target.checked, 0)
              }}
            />
            勾選全部的選項
          </label>
          <label className="form-check-label mb-2">
            
            <input
              className="form-check-input ms-3"
              type="checkbox"
              checked={category.every((v) => !v.checked)}
              onChange={(e) => {
                handleCategoryCheckedAll(false, 0)
              }}
            />
            重設全部的選項
          </label>
        </div>
        <div>
          <label className="form-check-label mb-2">
            官方活動:
            <input
              className="form-check-input ms-3"
              type="checkbox"
              checked={cate1.every((v) => v.checked)}
              onChange={(e) => {
                handleCategoryCheckedAll(e.target.checked, 1)
              }}
            />
            全選
          </label>
          <br />
          {cate1.map((v, i) => {
            return (
              <label
                className="form-check-label me-3"
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={i}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={v.checked}
                  onChange={() => {
                    setCategory(toggleCheckbox(category, v.id))
                  }}
                />
                {v.blog_category_name}
              </label>
            )
          })}
          <hr />
        </div>
        <div>
          <label className="form-check-label mb-2">
            露營地區:
            <input
              className="form-check-input ms-3"
              type="checkbox"
              checked={cate2.every((v) => v.checked)}
              onChange={(e) => {
                handleCategoryCheckedAll(e.target.checked, 2)
              }}
            />
            全選
          </label>
          <br />
          {cate2.map((v, i) => {
            return (
              <label
                className="form-check-label me-3"
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={i}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={v.checked}
                  onChange={() => {
                    setCategory(toggleCheckbox(category, v.id))
                  }}
                />
                {v.blog_category_name}
              </label>
            )
          })}
          <hr />
        </div>
        <div>
          <label className="form-check-label mb-2">
            露營活動:
            <input
              className="form-check-input ms-3"
              type="checkbox"
              checked={cate3.every((v) => v.checked)}
              onChange={(e) => {
                handleCategoryCheckedAll(e.target.checked, 3)
              }}
            />
            全選
          </label>
          <br />
          {cate3.map((v, i) => {
            return (
              <label
                className="form-check-label me-3"
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={i}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={v.checked}
                  onChange={() => {
                    setCategory(toggleCheckbox(category, v.id))
                  }}
                />
                {v.blog_category_name}
              </label>
            )
          })}
          <hr />
        </div>
        <div>
          <label className="form-check-label mb-2">
            露營景點:
            <input
              className="form-check-input ms-3"
              type="checkbox"
              checked={cate5.every((v) => v.checked)}
              onChange={(e) => {
                handleCategoryCheckedAll(e.target.checked, 5)
              }}
            />
            全選
          </label>
          <br />
          {cate5.map((v, i) => {
            return (
              <label
                className="form-check-label me-3"
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={i}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={v.checked}
                  onChange={() => {
                    setCategory(toggleCheckbox(category, v.id))
                  }}
                />
                {v.blog_category_name}
              </label>
            )
          })}
          <hr />
        </div>
        <div>
          <label className="form-check-label mb-2">
            露營裝備與技巧:
            <input
              className="form-check-input ms-3"
              type="checkbox"
              checked={cate4.every((v) => v.checked)}
              onChange={(e) => {
                handleCategoryCheckedAll(e.target.checked, 4)
              }}
            />
            全選
          </label>
          <br />
          {cate4.map((v, i) => {
            return (
              <label
                className="form-check-label me-3"
                // 當初次render後不會再改動，即沒有新增、刪除、更動時，可以用索引當key
                key={i}
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={v.checked}
                  onChange={() => {
                    setCategory(toggleCheckbox(category, v.id))
                  }}
                />
                {v.blog_category_name}
              </label>
            )
          })}
          <hr />
        </div>

   
      </Modal>
    </>
  )
}
