import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

export default function ECPayCallback() {
  const { auth } = useAuth()

  const [level, setLevel] = useState({
    levels:0,
    coin:0
  })

  const getLevel = async () => {
    const userId = auth.userData.id;
    const url = `http://localhost:3005/api/level/${userId}`;
    try {
      const res = await fetch(url);
      const resData = await res.json();
      console.log('Get Level Response:', resData);
  
      if (resData.status === 'success') {
        const { levels = 0, coin = 0 } = resData.data.level || {};
        setLevel({ levels, coin });
      } else {
        setLevel({ levels: 0, coin: 0 });
      }
    } catch (e) {
      console.error('Error fetching level:', e);
      setLevel({ levels: 0, coin: 0 });
    }
  };
  
  useEffect(() => {
    if (auth.userData && auth.userData.id) {
      getLevel();
    }
  }, [auth.userData]);

  const ruleImg = (levels)=>{

    let newLevels = Number(levels)
    if (newLevels <= 200) {
      return 'v1.svg'
    } else if (newLevels <= 400) {
      return 'v2.svg'
    } else if (newLevels <= 600) {
      return 'v3.svg'
    } else if (newLevels <= 800) {
      return 'v4.svg'
    } else if (newLevels <= 1000) {
      return 'v5.svg'
    } else {
      return 'v6.svg'
    }

  }

  return (
    <>
      <div className="background-container">
        <div
          className="content bg-white bg-opacity-75 p-4 rounded-3 shadow text-center"
          style={{ maxWidth: 500 }}
        >
          <img
            className="animate w-75"
            src={`/chameleon/${ruleImg(level.levels)}`}
            alt="動畫圖片"
          />
          <div className="order-info">訂單成功完成，感謝您的預訂！</div>
          <div className="order-details">
          相關訂單資訊保存至會員中心，歡迎您隨時來查詢
          </div>
          <div className="order-coins">本次消費後已累積{level.coin}枚金幣</div>
          <div className="order-note">可至商城兌換各種精美禮物~</div>
          <div className="buttons mt-3">
            <Link href="/" legacyBehavior>
              <a className="button btnGreenPc">返回首頁</a>
            </Link>
            <Link href="/customer" legacyBehavior>
              <a className="button btnGreenPc">前往會員中心</a>
            </Link>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .background-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            background: url('/chameleon/main.svg') no-repeat center center;
            background-size: contain;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
          }

          .text-success-custom {
            color: #2e8b57;
          }

          .text-deepgreen-custom {
            color: #006400;
          }

          .text-olive-custom {
            color: #556b2f;
          }

          .text-brown-custom {
            color: #8b4513;
          }

          .text-chocolate-custom {
            color: #d2691e;
          }

          @keyframes backInRight {
            0% {
              opacity: 0;
              transform: translateX(50%);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate {
            animation: backInRight 2s ease-in-out;
          }

          .order-info {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2e8b57;
            margin-top: 20px;
          }

          .order-number {
            font-size: 1.25rem;
            color: #006400;
            margin-top: 20px;
          }

          .order-details {
            font-size: 1.1rem;
            color: #556b2f;
            margin-top: 20px;
          }

          .order-coins {
            font-size: 1.1rem;
            color: #8b4513;
            margin-top: 20px;
          }

          .order-note {
            font-size: 1rem;
            color: #d2691e;
            margin-top: 20px;
            margin-bottom: 40px;
          }
        
          .buttons {
            display: flex;
            flex-direction: row;
            justify-content: center;
          }

          .buttons .button {
            font-size: 1rem;
            margin: 10px 5px;
            width: 38%;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }


          @media (max-width: 767px) {
            
            .text-success-custom {
              color: #ff8c00;
            }

            .text-deepgreen-custom {
              color: #ff4500;
            }

            .text-olive-custom {
              color: #ff6347;
            }

            .text-brown-custom {
              color: #ff7f50;
            }

            .text-chocolate-custom {
              color: #ffa500;
            }

            .order-info {
              color: #ff8c00;
            }

            .order-number {
              color: #ff9b0e;
            }

            .order-details {
              color: #e8d102;
            }

            .btn-success {
              background-color: #ff8c00;
              border-color: #ff8c00;
            }

            .btn-success:hover {
              background-color: #ff4500;
              border-color: #ff4500;
            }
          }
        `}
      </style>
    </>
  )
}
