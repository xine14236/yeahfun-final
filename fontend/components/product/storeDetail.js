import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/cart-hook'

export default function StoreDetail({ title = '', type = '', pid, people }) {
  //路徑
  const router = useRouter()
  //更新購物車鉤子的狀態
  const { setCartItems, addCart } = useCart()
  //取得商店內的商品
  const [storeDetail, setStoreDetail] = useState([])

  const [stores, setStores] = useState([])

  const getStore = async (id, type, people) => {
    const url = `http://localhost:3005/api/store/${id}/${type}/${people}`
    console.log('Fetching data from:', url)

    try {
      const res = await fetch(url)
      const resData = await res.json()
      //console.log("Response data:", resData);

      if (resData.status === 'success') {
        // 打印完整的 resData.data
        //console.log("Complete data:", resData.data);

        // 设置storeDetail为resData.data.store
        if (Array.isArray(resData.data.store)) {
          setStoreDetail(resData.data.store)
        } else {
          console.error('Data is not an array:', resData.data.store)
        }
      } else {
        console.error('Failed to fetch data:', resData.message)
      }
    } catch (e) {
      console.error('Error fetching data:', e)
    }
  }

  // const handleAddToCart = () => {}

  useEffect(() => {
    if (router.isReady && pid) {
      //console.log("Router is ready, query:", router.query);
      getStore(pid, type, people)
    }
  }, [router.isReady, pid, type, people])

  // const addToCart = (detail) => {
  //   setCartItems((prevItems) => [...prevItems, detail])
  // }

  return (
    <>
      <h3 className="mb-3 campSubtitle">{title}</h3>

      <div
        className="row row-cols-1 row-cols-md-3 g-4 mb-4 campAreas"
        style={{ border: '1px solid black' }}
      >
        {storeDetail.map((detail, index) => (
          <div
            key={index}
            className="col campArea"
            style={{ border: '1px solid red' }}
          >
            <div className="thumbNail" style={{ border: '1px solid orange' }}>
              <img
                src={`/productDetail/${detail.img}`}
                className="card-img-top"
              />
            </div>

            <div className="campInfo" style={{ border: '1px solid orange' }}>
              <div className="" style={{ border: '1px solid yellow' }}>
                <h5 className="card-title">{detail.name}</h5>

                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  詳細內容
                </button>
                {/* Modal */}
                <div
                  className="modal fade  modal-xl "
                  id="exampleModal"
                  tabIndex={-1}
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                          {detail.name}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        />
                      </div>
                      <div className="modal-body">
                        <div className="modal-body">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-8">
                                <img
                                  className="w-100"
                                  src={`/productDetail/${detail.img}`}
                                />
                              </div>
                              <div className="col-md-4">
                                <div>尺寸：{detail.square_meters}</div>
                                <div>詳細介紹：</div>
                                <div>{detail.introduction}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="campPrice" style={{ border: '1px solid yellow' }}>
                <span>平日價格：＄{detail.normal_price}/晚</span>
                <br />
                <span>假日價格：＄{detail.holiday_price}/晚</span>
              </div>

              <div className="addCart" style={{ border: '1px solid orange' }}>
                <form action="">
                  <div
                    style={{ paddingBottom: 0, border: '1px solid darkgray' }}
                  />
                  <div className="form-item"></div>
                  <div className="form-item">
                    <button type="button" onClick={() => addCart(detail)}>
                      加入訂房
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
