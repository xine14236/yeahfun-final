import React from 'react'
import Image from 'next/image'

export default function Coin() {
  return (
    <>

      <section className="banner">
        <h1 className="bannerH1">YeahFun Coin</h1>
        <p className="bannerP">Explore our exclusive items!</p>
      </section>
      <section className="storeCategories">
        <div className="category">
          <div className="d-flex align-items-end">

            <h2 className="littleTitle flex-grow-1">優惠券 | Coupon</h2>
            <div className="littleImg">
              <Image
                src="/images/homepage/title-tree.png"
                alt="tree"
                width={66}
                height={33}
              />
            </div>

          </div>
          <div className="items">
            <div className="coinItem">
              <img className="itemImg" src="/coin/coupon1.jpg" alt="Coupon 1" />
              <h3 className="fs-4 itemH3">暑假出遊囉~</h3>
              <div className="description">單筆訂單打95折</div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="price mb-0">金幣：5 枚</p>
                <button
                  type="button"
                  className="btn btn-primary buyNow"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  兌換
                </button>
              </div>
            </div>
            <div className="coinItem">
              <img className="itemImg" src="/coin/coupon2.jpg" alt="Coupon 2" />
              <h3 className="fs-4 itemH3">其實我有很多金幣...</h3>
              <div className="description">單筆訂單折扣現金500元</div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="price mb-0">金幣：1000 枚</p>
                <button className="btn btn-primary buyNow">兌換</button>
              </div>
            </div>
          </div>
        </div>
        <div className="category">
          <div className="d-flex align-items-end">
          <h2 className="littleTitle flex-grow-1">愛心捐助 | Love Donation</h2>
            <div className="littleImg">
              <Image
                src="/images/homepage/title-tree.png"
                alt="tree"
                width={66}
                height={33}
              />
            </div>
          </div>
          <div className="items">
            <div className="coinItem">
              <img
                className="itemImg"
                src="/coin/donation1.jpg"
                alt="Donation 1"
              />
              <h3 className="fs-4">兒童基金會</h3>
              <div className="description">捐助10元</div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="price mb-0">金幣：10 枚</p>
                <button
                  type="button"
                  className="btn btn-primary buyNow"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  兌換
                </button>
              </div>
            </div>
            <div className="coinItem">
              <img
                className="itemImg"
                src="/coin/donation2.jpg"
                alt="Donation 2"
              />
              <h3 className="fs-4">動物救援</h3>
              <div className="description">捐助10元</div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="price mb-0">金幣：10 枚</p>
                <button className="btn btn-primary buyNow">兌換</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>
        {`
          .banner {
            background-image: url('/coin/banner.jpg');
            background-size: cover;
            background-position: center;
            padding: 150px 20px 100px;
            text-align: center;
            color: #fff;
            margin-top: 80px;
          }

          .bannerH1 {
            font-size: 48px;
            margin: 0;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
          }

          .bannerP {
            font-size: 18px;
            margin: 10px 0 0;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          }

          .storeCategories {
            padding: 40px 50px;
          }

          .category {
            margin-bottom: 40px;
          }

          .littleTitle {
            font-size: 24px;
            margin-bottom: 30px;
            position: relative;
          }

          .littleTitle::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -15px;
            width: 100%;
            height: 3px;
            background-color: #ff8c00;
          }

          .littleImg {
            font-size: 24px;
            margin-bottom: 30px;
            position: relative;
          }

          .littleImg::before {
            content: '';
            position: absolute;
            left: 0;
            bottom: -15px;
            width: 100%;
            height: 3px;
            background-color: #ff8c00;
          }

          .items {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
          }

          .coinItem {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            width: calc(30% - 20px);
            padding: 20px;
            text-align: left;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .coinItem:hover {
            transform: translateY(-5px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .itemImg {
            width: 100%;
            height: 150px;
            object-fit: cover;
            border-bottom: 1px solid #f1f1f1;
            padding-bottom: 15px;
            margin-bottom: 15px;
            border-radius: 8px 8px 0 0;
          }

          .itemH3 {
            font-size: 20px;
            margin: 10px 0;
          }

          .description {
            font-size: 16px;
            margin: 10px 0;
            color: #666;
          }

          .price {
            font-size: 18px;
            color: #ff8c00;
            margin: 10px 0;
          }

          .buyNow {
            background-color: #ff8c00;
            color: #fff;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .buyNow:hover {
            background-color: #e67e00;
          }

          @media (max-width: 768px) {
            .items {
              flex-direction: column;
            }

            .coinItem {
              width: 100%;
            }
          }
        `}
      </style>
    </>
  )
}
