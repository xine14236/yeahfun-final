import React, { useState } from 'react'
import { TbMoodShare } from 'react-icons/tb'

export default function Share({ size, color, className }) {
  const [isShare, setIsShare] = useState(false)

  // const toggleShare = () => {
  //   setIsShare(!isShare)
  // } 點擊時動作

  return (
    <>
      <div
        className={`share ${isShare ? 'share-active' : ''}`}
        //懸停時改變顏色
        onMouseEnter={() => setIsShare(true)}
        onMouseLeave={() => setIsShare(false)}
        //點擊時動作
        // onClick={}
        // onKeyDown={}
        role="button"
        tabIndex={0}
      >
        <TbMoodShare size={30} />
      </div>
      <style jsx>{`
        .share {
          color: #feaf18;
        }
        .share-active {
          background-color: #feaf18;
          color: #fefcf0;
          border-radius: 50%;
        }
      `}</style>
    </>
  )
}
