import React, { useState } from 'react'
import { useEffect } from 'react'
import { TbMoodShare } from 'react-icons/tb'
import { FaFacebookF } from 'react-icons/fa6'
import { FaLine } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa'

export default function Share({ size, color, className }) {
  const [isShare, setIsShare] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    // 在组件挂载后设置 currentUrl
    setCurrentUrl(window.location.href)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('Link copied to clipboard!')
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }

  //臉書分享
  const shareOnFacebook = () => {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl
    )}`
    window.open(facebookShareUrl, '_blank')
  }

  //分享line
    const shareOnLine = () => {
      const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        currentUrl
      )}`
      window.open(lineShareUrl, '_blank')
    }

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
        <TbMoodShare
          size={30}
          data-bs-toggle="modal" //寫在這裡才會有作用
          data-bs-target="#shareModal"
        />
        {/* Modal */}
        <div
          className="modal fade"
          id="shareModal"
          tabIndex="-1"
          labelled="shareModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="row modal-content" style={{ alignItems: 'center' }}>
              <div className="col-8 modal-header ">
                <h5 className="modal-title" id="shareModalLabel">
                  分享營地資訊
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="col-10 modal-body">
                <div className="share-button">
                  <FaFacebookF
                    className="share-icon"
                    data-bs-dismiss="modal"
                    style={{ fontSize: '25px' }}
                    onClick={shareOnFacebook}
                  />
                </div>
                <div className="share-button">
                  <FaLine
                    className="share-icon"
                    data-bs-dismiss="modal"
                    style={{ fontSize: '25px' }}
                    onClick={shareOnLine}
                  />
                </div>
                <div className="share-button">
                  <FaLink
                    className="share-icon"
                    data-bs-dismiss="modal"
                    style={{ fontSize: '25px' }}
                    onClick={copyToClipboard}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
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
        .modal-content {
          align-item: center;
          height: 20vh;
        }
        .modal-title {
          display: flex;
          color: black;
        }
        .modal-body {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .share-button {
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #feaf18;
          width: 50px;
          height: 50px;
          border: none;
          border-radius: 50px;
        }
        .share-icon {
          color: white;
          font-size: 30px;
        }
      `}</style>
    </>
  )
}
