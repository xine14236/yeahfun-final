import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/cart-hook'
import Image from 'next/image'
import styles from '@/styles/detail.module.css'

export default function DetailTest() {
  const router = useRouter()
  const [campsites, setCampsites] = useState([])
  const [store, setStore] = useState([])
  const [tag, setTag] = useState([])
  const [peopleFilter, setPeopleFilter] = useState('') // 新增狀態來維護篩選值

  const getCampsitesInformation = async (pid) => {
    const url = 'http://localhost:3005/api/detail-campsites-information/' + pid

    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)

      if (resData.status === 'success') {
        setCampsites(resData.data.store)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getStoreInformation = async (pid) => {
    const url = 'http://localhost:3005/api/detail-store-information/' + pid

    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      console.log(store)//[]

      if (resData.status === 'success') {
        setStore(resData.data.store)
        setTag(resData.data.tag)
      }
    } catch (e) {
      console.error(e)
    }
  }
  // 將取得tag資料map
  const tags = tag.map((item, index) => {
    return (
      <>
        <span style={{ color: 'grey' }} key={index}>
          #{item.tag_name}
        </span>
        <br />
      </>
    )
  })

  // TODO
  // 將取得precautions資料map
  // const precautionsElements = store.precautions
  //   .split(',')
  //   .map((item, index) => {
  //     return <p key={index}>{item}</p>
  //   })

  useEffect(() => {
    if (router.isReady) {
      getCampsitesInformation(router.query.pid)
      getStoreInformation(router.query.pid)
    }
  }, [router.isReady, router.query.pid])

  const handlePeopleFilterChange = (e) => {
    setPeopleFilter(e.target.value)
  }

  const filteredCampsites = peopleFilter
    ? campsites.filter((campsite) => campsite.people >= peopleFilter)
    : campsites

  return (
    <>
      <div className="storeTitleWrap">
        <div className="row storeTitle">
          <h1>{store.name}</h1>
          <div className="storeShare">
            <button>share</button>
            <button>add</button>
          </div>
        </div>
        <div className="row storeIntroduce">
          <div className="col-6 briefIntroduce ">
            <p>{store.introduction}</p>
          </div>
          <div className="col-2 campTags ">
            <h5>{store.address}</h5>
            {tags}
          </div>
        </div>
      </div>
      <div className="row storeNormalInfo">
        <div className="col-md-6 campPrecaution">
          <h3 className="campSubtitle">營主叮嚀</h3>
          {precautionsElements}
        </div>
        <div className="col-md-6">
          <h3 className="campSubtitle">營地資訊</h3>
          <table className="campTable">
            <colgroup span={2} />
            <tbody>
              <tr>
                <th>GPS座標</th>
                <td>
                  {store.longitude}°N, {store.latitude}°E
                </td>
              </tr>
              <tr>
                <th>提供夜衝</th>
                <td>是</td>
              </tr>
              <tr>
                <th>夜衝入場</th>
                <td>18:00</td>
              </tr>
              <tr>
                <th>入營時間</th>
                <td>11:00</td>
              </tr>
              <tr>
                <th>拔營時間</th>
                <td>12:00</td>
              </tr>
              <tr>
                <th>海拔</th>
                <td> {store.altitude}m</td>
              </tr>
              <tr>
                <th>聯絡電話</th>
                <td> {store.mobile}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <hr />
      <select value={peopleFilter} onChange={handlePeopleFilterChange}>
        <option value="">選擇人數</option>
        <option value="1">1人</option>
        <option value="2">2人</option>
        <option value="3">3人</option>
        <option value="4">4人</option>
        <option value="5">5人</option>
        <option value="6">6人以上</option>
      </select>
      <div>
        <h4>床區</h4>
        <div className="cardContainer">
          {filteredCampsites
            .filter((campsite) => campsite.type === 'bed')
            .map((campsite) => (
              <div key={campsite.rooms_campsites_id} className="storeCard">
                <h5>房型名稱: {campsite.rooms_campsites_name}</h5>
                <div>
                  <Image
                    src={`/productDetail/${campsite.img}`}
                    alt={campsite.rooms_campsites_name}
                    width={300}
                    height={200}
                  />
                </div>
                <p>平日價格: ${campsite.normal_price}</p>
                <p>假日價格: ${campsite.holiday_price}</p>
                <p>夜衝價格: ${campsite.night_price}</p>
                <p>房型數量: {campsite.amount}</p>
                <p>房型最多人數: {campsite.people}</p>
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
                          {campsite.rooms_campsites_name}
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
                                  src={`/productDetail/${campsite.img}`}
                                />
                              </div>
                              <div className="col-md-4">
                                <div>房型型別: {campsite.type}</div>
                                <div>房型坪數: {campsite.square_meters}</div>
                                <div>詳細介紹：</div>
                                <div>
                                  {campsite.rooms_campsites_introduction}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <hr />
      <div>
        <h4>帳篷區</h4>
        <div className="cardContainer">
          {filteredCampsites
            .filter((campsite) => campsite.type === 'tent')
            .map((campsite) => (
              <div key={campsite.rooms_campsites_id} className="storeCard">
                <h5>房型名稱: {campsite.rooms_campsites_name}</h5>
                <div>
                  <Image
                    src={`/productDetail/${campsite.img}`}
                    alt={campsite.rooms_campsites_name}
                    width={300}
                    height={200}
                  />
                </div>

                <p>平日價格: ${campsite.normal_price}</p>
                <p>假日價格: ${campsite.holiday_price}</p>
                <p>夜衝價格: ${campsite.night_price}</p>
                <p>房型數量: {campsite.amount}</p>
                <p>房型最多人數: {campsite.people}</p>

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
                          {campsite.rooms_campsites_name}
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
                                  src={`/productDetail/${campsite.img}`}
                                />
                              </div>
                              <div className="col-md-4">
                                <div>房型型別: {campsite.type}</div>
                                <div>房型坪數: {campsite.square_meters}</div>
                                <div>詳細介紹：</div>
                                <div>
                                  {campsite.rooms_campsites_introduction}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <style jsx>
        {`
          .storeTitle {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
          }
          .storeIntroduce {
            /* 包含.briefIntroduce .campTags */
            display: flex;
            width: 100%;
            height: 229px;
            justify-content: space-between;
            align-items: center;
          }
          .campSubtitle {
            display: flex;
            padding: 10px;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          .campPrecaution {
            display: flex;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
          }
          .campTable {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            border-collapse: collapse; /* 這行會讓格線更整齊 */
          }
          .campTable th,
          .campTable td {
            border: 1px solid black;
          }
          .cardContainer {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
          }
          .storeCard {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin: 10px 0;
          }
        `}
      </style>
    </>
  )
}
