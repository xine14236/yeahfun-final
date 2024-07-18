import { useEffect, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import { useCart } from '@/hooks/cart-hook'
import { FaLocationDot, FaStar, FaCommentDots, FaMinus } from 'react-icons/fa6'
import { useRouter } from 'next/router'
import { differenceInDays, parseISO } from 'date-fns'

export default function Cart() {
  const { cartItems, removeFromCart } = useCart()

  const handleRemove = (rooms_campsites_id) => {
    removeFromCart(rooms_campsites_id)
  }

  const router = useRouter()

  const [storeInformation, setStoreInformation] = useState({})

  const getStoreInformation = async (storeId) => {
    const url = 'http://localhost:3005/api/cart-information/' + storeId

    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)

      if (resData.status === 'success') {
        setStoreInformation((prevInfo) => ({
          ...prevInfo,
          [storeId]: {
            id: resData.data.store.stores_id,
            rooms_campsites_id: resData.data.store.rooms_campsites_id,
            name: resData.data.store.name,
            address: resData.data.store.address,
            comment_star: resData.data.store.comment_star,
            commentCounts: resData.data.commentCount.commentCounts,
          },
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    if (router.isReady && cartItems.length > 0) {
      cartItems.forEach((item) => {
        getStoreInformation(item.stores_id)
      })
    }
  }, [router.isReady, cartItems])

  return (
    <>
      <Head>
        <title>YeahFun | Cart</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <h2>尚未有物品加入購物車</h2>
        </div>
      ) : (
        cartItems.map((store, index) => (
          <div key={index} className="wrap mt-5">
            <div className="cartBox">
              <div className="cartInfoImage">
                <Image
                  src="/productDetail/tent05.jpg"
                  alt="Picture of the author"
                  width={450}
                  height={300}
                />
              </div>
              <div className="cartInfoContent px-5">
                <h3 className="py-2">{store.store_name}</h3>
                <div>
                  <div className="cartInfoText py-1">
                    <FaLocationDot />
                    <h5 className="iconText">
                      {storeInformation[store.stores_id]?.address}
                    </h5>
                  </div>
                  <div className="cartInfoText py-1">
                    <FaStar />
                    <h5 className="iconText">
                      {storeInformation[store.stores_id]?.comment_star}
                    </h5>
                  </div>
                  <div className="cartInfoText py-1">
                    <FaCommentDots />
                    <h5 className="iconText">
                      {storeInformation[store.stores_id]?.commentCounts}{' '}
                      comments
                    </h5>
                  </div>
                </div>
              </div>
              <div className="contentDetails px-3">
                <div className="content">
                  <div className="contentDetailSite">
                    <h3 className="my-1">
                      {store.rooms_campsites_name} *{' '}
                      {store.rooms_campsites_amount}
                    </h3>
                    <div className="my-1">
                      <p className="py-2" style={{ margin: 0 }}>
                        預訂日期: {store.startDate} ~ {store.endDate}
                      </p>
                      <p className="py-2" style={{ margin: 0 }}>
                        價格: NT${store.normal_price} *{' '}
                        {differenceInDays(store.endDate, store.startDate)} 晚 *{' '}
                        {store.rooms_campsites_amount} 間
                      </p>
                    </div>
                  </div>
                  <div className="minusButton py-1">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleRemove(store.rooms_campsites_id)}
                    >
                      <FaMinus />
                    </button>
                  </div>
                </div>
                <div className="detailPrice">
                  {/* <input type="checkbox" className="" />
                coupon */}
                  <h3 className="mx-2">
                    NT${' '}
                    {store.normal_price *
                      differenceInDays(store.endDate, store.startDate) *
                      store.rooms_campsites_amount}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="totalMount m-2">
          <h3>
            Total : NT${' '}
            {cartItems.reduce(
              (acc, store) =>
                acc +
                store.normal_price *
                  differenceInDays(store.endDate, store.startDate) *
                  store.rooms_campsites_amount,
              0
            )}
          </h3>
        </div>
      )}

      <div className="checkoutButton">
        <button
          className="btn btn-primary btn-lg mt-5 checkout"
          disabled={cartItems.length === 0}
        >
          結帳
        </button>
      </div>
      <style jsx>
        {`
          .emptyCart {
            text-align: center;
            margin-top: 50px;
          }
          .wrap {
            height: 320px;
          }
          .cartBox {
            width: 100%;
            height: 300px;
            background-color: lightgray;
            border-radius: 10px;
            display: flex;
            background: #fff;
            box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
          }
          .cartInfoImage {
            border-radius: 10px;
            overflow: hidden;
          }
          .cartInfoContent {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            align-items: stretch;
            border-right: 2px solid var(--grey-400, #757575);
          }
          .cartInfoText {
            display: flex;
            align-items: center;
            height: 40px;
            line-height: 40px;
          }
          .iconText {
            margin-left: 5px; /* Adjust the spacing as needed */
          }
          .contentDetails {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: auto;
            flex-grow: 1;
            /* gap: 11px; */
          }
          .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
          }
          .contentDetailSite {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            /* align-items: center; */
          }
          .minusButton {
            height: 100%;
            display: flex;
            align-items: flex-start;
          }
          .detailPrice {
            display: flex;
            justify-content: end;
            align-items: center;
          }
          .checkoutButton {
            height: 200px;
            display: flex;
            justify-content: flex-end; /* Aligns the button to the right */
            align-items: start; /* Aligns the button to the top */
          }
          .checkout {
            padding: 10px 80px;
          }
          .totalMount {
            display: flex;
            justify-content: flex-end;
          }
        `}
      </style>
    </>
  )
}
