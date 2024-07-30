import { useState, useEffect } from 'react'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import GoTop from '@/components/home/go-top'
import 'bootstrap/dist/css/bootstrap.min.css'
import toast, { Toaster } from 'react-hot-toast'

export default function Coin() {
  const router = useRouter()
  const { auth } = useAuth()

  const [coupons, setCoupons] = useState([])
  const [donations, setDonations] = useState([])
  const [coin, setCoin] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [error, setError] = useState('')


  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  const getCoupons = async () => {
    const url = `http://localhost:3005/api/coin/coupons`

    const res = await fetch(url)
    const resData = await res.json()

    if (resData.status === 'success') {
      setCoupons(resData.data.coupons)
    } else {
      console.error('Failed to fetch coupons:', resData.message)
    }
  }

  useEffect(() => {
    getCoupons()
  }, [])

  const getDonations = async () => {
    const url = `http://localhost:3005/api/coin/donations`

    const res = await fetch(url)
    const resData = await res.json()

    if (resData.status === 'success') {
      setDonations(resData.data.donations)
    } else {
      console.error('Failed to fetch donations:', resData.message)
    }
  }

  useEffect(() => {
    getDonations()
  }, [coin])

  const getCoin = async () => {
    const userId = auth.userData.id
    console.log(`Fetching coin data for userId: ${userId}`) // 添加调试信息
    const url = `http://localhost:3005/api/coin/${userId}`

    const res = await fetch(url)
    const resData = await res.json()

    if (resData.status === 'success') {
      const coinValue = Number(resData.coin)
      if (!isNaN(coinValue)) {
        setCoin(coinValue)
      } else {
        console.error('Coin value is NaN')
      }
    } else {
      console.error('Failed to fetch coin:', resData.message)
    }
  }

  useEffect(() => {
    if (auth.userData) {
      getCoin()
    }
  }, [auth.userData])

  const handleItemClick = (item, type) => {
    if (coin < item.coin) {
      setError('金幣不足')
    } else {
      setError('')
      setSelectedItem({ ...item, type })
      console.log('Selected item:', item, 'Type:', type)
    }
  }

  const exchange = async () => {
    if (selectedItem && coin >= selectedItem.coin) {
      //扣到金幣
      const newCoin = coin - selectedItem.coin
      setCoin(newCoin)
      const userId = auth.userData.id

      const urlUpdateCoin = `http://localhost:3005/api/coin/updateCoin`
      try {
        const res = await fetch(urlUpdateCoin, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, newCoin }),
        })
        const resData = await res.json()
        console.log(resData)

        toast.success('成功兌換')
      } catch (e) {
        console.error(e)
      }

      //判斷type，存入各自的背包

      if (selectedItem.type === 'coupon') {
        const urlCoupon = `http://localhost:3005/api/coin/plusCoupon`
        try {
          const res = await fetch(urlCoupon, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: auth.userData.id,
              couponId: selectedItem.id,
            }),
          })
          const resData = await res.json()
          console.log(resData)
        } catch (e) {
          console.error(e)
        }
      } else if (selectedItem.type === 'donation') {
        const urlDonation = `http://localhost:3005/api/coin/plusDonation`
        try {
          const res = await fetch(urlDonation, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: auth.userData.id,
              donationId: selectedItem.id,
            }),
          })
          const resData = await res.json()
          console.log(resData)
        } catch (e) {
          console.error(e)
        }
      }
       // 每次兌換完關閉對話窗
       if (typeof window !== 'undefined') {
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then((bootstrap) => {
          const modal = document.getElementById('exampleModal')
          const modalInstance = bootstrap.Modal.getInstance(modal)
          modalInstance.hide()
        })
      }
    } else {
      setError('金幣不足，無法兌換')
    }
  }

  return (
    <>
    
      <section className="banner">
        <h1 className="bannerH1">YeahFun Coin</h1>
        <p className="bannerP">Explore our exclusive items!</p>
      </section>
      <Toaster />
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
            {donations.length > 0 ? (
              coupons.map((v, i) => (
                <div key={i} className="coinItem">
                  <img
                    className="itemImg"
                    src={`/coin/${v.img}`}
                    alt={v.name}
                  />
                  <h3 className="fs-4">{v.name}</h3>
                  <div className="description">{v.directions}</div>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="price mb-0">金幣：{v.coin} 枚</p>
                    <button
                      type="button"
                      className="btn btn-primary buyNow"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => handleItemClick(v, 'coupon')}
                    >
                      兌換
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>暫時沒有優惠劵</p>
            )}
          </div>
          <div className="category">
            <div className="d-flex align-items-end">
              <h2 className="littleTitle flex-grow-1">
                愛心捐助 | Love Donation
              </h2>
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
              {donations.length > 0 ? (
                donations.map((v, i) => (
                  <div key={i} className="coinItem">
                    <img
                      className="itemImg"
                      src={`/coin/${v.img}`}
                      alt={v.name}
                    />
                    <h3 className="fs-4">{v.name}</h3>
                    <div className="description">{v.directions}</div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="price mb-0">金幣：{v.coin} 枚</p>
                      <button
                        type="button"
                        className="btn btn-primary buyNow"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => handleItemClick(v, 'donation')}
                      >
                        兌換
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>沒有可捐助的項目</p>
              )}
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
          確定兌換 ?
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        />
      </div>
      <div className="modal-body">
        目前還有 {coin} 點
        <br />
        此次兌換後將扣除 {selectedItem ? selectedItem.coin : 0} 點
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={exchange}
          disabled={coin < (selectedItem ? selectedItem.coin : 0)}
        >
          確定
        </button>
      </div>
    </div>
  </div>
</div>

      <GoTop />

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

          .category {
            margin-bottom: 80px;
            margin-top: 40px;
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

          @media (max-width: 990px) {
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
