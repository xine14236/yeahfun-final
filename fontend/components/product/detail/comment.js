import React, { useEffect, useState } from 'react'
import axios from 'axios'


const getStoreComment = async (storeId) => {
  const url = 'http://localhost:3005/api/detail-comment/' + storeId
  const 

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const resData = await res.json()
    console.log(resData)

    if(resData.status === 'success') {
      return resData.data
    }
  }

({ storeId }) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios
      .get(`/detail-comment/${storeId}`)
      .then((res) => {
        console.log(res.data)
        const commentContents = res.data.storeComments.map(
          (comment) => comment.comment_content
        ) // 獲取所有的 comment_content
        setComments(commentContents)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [storeId])

  return (
    <div>
      <h1>Comment</h1>
      <div>
        {comments.map(
          (
            comment,
            index // 渲染每個 comment
          ) => (
            <p key={index}>{comment}</p>
          )
        )}
      </div>
    </div>
  )
}

export default StoreComment
