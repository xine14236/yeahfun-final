import React from 'react'




export default function ECPayCallback() {

    
  return (
    <>
      <div className="background-container">
  <div
    className="content bg-white bg-opacity-75 p-4 rounded-3 shadow text-center"
    style={{ maxWidth: 500 }}
  >
    <img className="animate w-75" src="/chameleon/v1.svg" alt="動畫圖片" />
    <div className="order-info">訂單已成功完成，感謝您的預訂！</div>
    <div className="order-number">訂單號碼: 123251351213145678</div>
    <div className="order-details">已保存至會員中心，歡迎隨時查詢您的訂單</div>
    <div className="order-coins">本次消費獲得10枚金幣</div>
    <div className="order-note">可至商城兌換各種精美禮物~</div>
    <div className="buttons mt-3">
      <button type="button">
        返回首頁
      </button>
      <button type="button">
        前往會員中心
      </button>
    </div>
  </div>
</div>
<style jsx>
  {`.background-container {
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
            margin-top: 10px;
        }

        .order-number {
            font-size: 1.25rem;
            color: #006400;
            margin-top: 10px;
        }

        .order-details {
            font-size: 1.1rem;
            color: #556b2f;
            margin-top: 10px;
        }

        .order-coins {
            font-size: 1.1rem;
            color: #8b4513;
            margin-top: 10px;
        }

        .order-note {
            font-size: 1rem;
            color: #d2691e;
            margin-top: 10px;
        }

        .buttons button {
            font-size: 1rem;
            margin: 10px 5px;
            width: 38%;
            background-color: #2e8b57;
            border: none;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        .buttons button:hover {
            background-color: #006400;
        }

        @media (max-width: 767px) {
            .text-success-custom {
                color: #FF8C00;
            }

            .text-deepgreen-custom {
                color: #FF4500;
            }

            .text-olive-custom {
                color: #FF6347;
            }

            .text-brown-custom {
                color: #FF7F50;
            }

            .text-chocolate-custom {
                color: #FFA500;
            }

            .order-info {
                color: #FF8C00;
            }

            .order-number {
                color: #ff9b0e;
            }

            .order-details {
                color: #e8d102;
            }

            .btn-success {
                background-color: #FF8C00;
                border-color: #FF8C00;
            }

            .btn-success:hover {
                background-color: #FF4500;
                border-color: #FF4500;
            }
        }`}
</style>
    </>
  )
}
