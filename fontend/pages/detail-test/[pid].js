import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/cart-hook'
import Image from 'next/image'
import { DatePicker, Space } from 'antd'
import styles from '@/styles/detail.module.css'
import Link from 'next/link'
import Favor from '@/components/icons/favor'
import Share from '@/components/icons/share'

export default function DetailTest() {
  const router = useRouter()
  const [campsites, setCampsites] = useState([])
  const [store, setStore] = useState([])
  const [tag, setTag] = useState([])
  const [img, setImg] = useState([])
  const [peopleFilter, setPeopleFilter] = useState('') // 新增狀態來維護篩選值
  const [dateRange, setDateRange] = useState([])
  const { addCart } = useCart()
  const { RangePicker } = DatePicker

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

      if (resData.status === 'success') {
        setStore(resData.data.store)
        setTag(resData.data.tag)
        setImg(resData.data.img)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddToCart = (store) => {
    if (dateRange.length === 0) {
      alert('請輸入日期')
      return
    }

    addCart({
      stores_id: store.stores_id,
      rooms_campsites_id: store.rooms_campsites_id,
      store_name: store.store_name,
      rooms_campsites_name: store.rooms_campsites_name,
      normal_price: store.normal_price,
      holiday_price: store.holiday_price,
      rooms_campsites_amount: store.amount,
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
      storeImage: store.img,
    })
  }

  //收藏功能：擴充商店資料，多一個代表是否已收藏的屬性fav(布林值，預設是false)
  const initState =
    Array.isArray(store) && store.length === 0
      ? store.map((v) => ({ ...v, fav: false }))
      : []
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [favor, setFavor] = useState(initState)

  if (Array.isArray(store)) {
    console.log('store is not an array')
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

  // 將 precautions 字串拆分成陣列
  const precautionsArray = store.precautions ? store.precautions.split(',') : []

  // 將取得img資料字串拆分成陣列
  const imgArray = img.img_name ? img.img_name.split(',') : []

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
      <div className="row storeTitleWrap">
        <div className="col-12 storeTitle">
          <h1>{store.name}</h1>
          <div className="storeShare">
            <Share />
            <Favor />
          </div>
        </div>
        {/* <div className="row storeIntroduce"> */}
        <div className="col-6 briefIntroduce ">
          <p>{store.introduction}</p>
        </div>
        <div className="col-6 campTags ">
          <p>{store.address}</p>
          {tags}
        </div>
        {/* </div> */}
      </div>
      <div>
        <div className="campGallery">
          <figure className="gridItem">
            <Image
              src={`/detail/${imgArray[0]}`}
              alt="Camping scene with tents"
              width={500} // 圖片的實際寬度
              height={100} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{
                borderRadius: '5px',
              }}
            />
          </figure>

          {imgArray.slice(1, 5).map((img, index) => (
            <div style={{ display: 'flex' }} key={index}>
              <Image
                src={`/detail/${img}`}
                alt="Camping scene"
                width={500}
                height={300}
                layout="responsive"
                style={{ borderRadius: '5px' }}
              />
            </div>
          ))}

          {/* <div style={{ display: 'flex' }}>
            <Image
              className="gridImage"
              src="../../detail/campGallery3.jpg"
              alt="Camping scene"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{
                borderRadius: '5px',
              }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Image
              className="gridImage"
              src="../../detail/campGallery2.jpg"
              alt="Camping scene"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{
                borderRadius: '5px',
              }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Image
              className="gridImage"
              src="../../detail/campGallery5.jpg"
              alt="Camping scene"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{
                borderRadius: '5px',
              }}
            />
          </div> */}
        </div>
      </div>
      <div className="row storeNormalInfo">
        <div className="col-md-6 campPrecaution">
          <h3 className="campSubtitle">營主叮嚀</h3>
          {/* {precautionsElements} */}
          <div className="campPrecaution">
            {precautionsArray.map((precaution, index) => (
              <li key={index} style={{ lineHeight: '2.4' }}>
                {precaution}
              </li>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <h3 className="campSubtitle">營地資訊</h3>
          <table className="campTable">
            <tbody>
              <tr>
                <td className="td_cell">
                  <div className="div_cell">GPS座標</div>
                </td>
                <td className=" td_cell">
                  <div className="div_cell">
                    {store.longitude}°N, {store.latitude}°E
                  </div>
                </td>
              </tr>
              <tr>
                <td className="td_cell">
                  <div className="div_cell">提供夜衝</div>
                </td>
                <td>
                  <div className="div_cell">是</div>
                </td>
              </tr>
              <tr>
                <td className="td_cell">
                  <div className="div_cell">夜衝入場</div>
                </td>
                <td>
                  <div className="div_cell">18:00</div>
                </td>
              </tr>
              <tr>
                <td className="td_cell">
                  <div className="div_cell">入營時間</div>
                </td>
                <td>
                  <div className="div_cell">11:00</div>
                </td>
              </tr>
              <tr>
                <td className="td_cell">
                  <div className="div_cell">離營時間</div>
                </td>
                <td>
                  <div className="div_cell">12:00</div>
                </td>
              </tr>
              <tr>
                <td className="td_cell">
                  <div className="div_cell">海拔</div>
                </td>
                <td>
                  <div className="div_cell">{store.altitude}m</div>
                </td>
              </tr>
              <tr>
                <td className="td_cell">
                  <div className="div_cell">聯絡電話</div>
                </td>
                <td>
                  <div className="div_cell">{store.mobile}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="campAreaSearchBar">
        <div className="inputDate">
          <p style={{ color: 'white' }}>入住日期</p>
          <Space direction="vertical" size={12}>
            <RangePicker onChange={setDateRange} />
          </Space>
        </div>
        <div className="inputNumber" style={{ color: 'white' }}>
          入住人數
          <select value={peopleFilter} onChange={handlePeopleFilterChange}>
            <option value="">選擇人數</option>
            <option value="1">1人</option>
            <option value="2">2人</option>
            <option value="3">3人</option>
            <option value="4">4人</option>
            <option value="5">5人</option>
            <option value="6">6人以上</option>
          </select>
        </div>
      </div>

      <hr />
      <div className="row">
        <h3 className="campSubtitle">住宿選擇</h3>
        <Link href="/product/cart">前往購物車</Link>
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
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAddToCart(campsite)
                  }}
                >
                  立即訂房
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
      <div className="row">
        <h3 className="campSubtitle">營區選擇</h3>
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
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    handleAddToCart(campsite)
                  }}
                >
                  立即訂房
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
          .storeShare {
            display: flex;
            gap: 10px;
          }
          .storeIntroduce {
            /* 包含.briefIntroduce .campTags */
            display: flex;
          }
          .briefIntroduce {
            padding-block: 20px;
          }
          .campTags {
            padding-block: 20px;
          }
          .campGallery {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            gap: 10px;
            margin-block: 20px;
          }
          .gridItem {
            grid-column: 1 / 2;
            grid-row: 1 / 3;
            display: flex;
          }
          .campPrecaution {
            display: inline;
            justify-content: space-between;
            align-items: center;
            align-self: stretch;
          }
          .campSubtitle {
            display: flex;
            padding-bottom: 10px;
            gap: 10px;
          }
          .campTable {
            display: table;
            width: 100%;
          }
          .campTable td {
            border: 1px dotted grey;
            text-align: left;
          }
          .td_cell {
            padding-block: 10px;
          }
          .div_cell {
            display: flex;
            align-items: center;
            padding-inline: 10px;
          }
          .campAreaSearchBar {
            display: flex;
            margin-block: 40px;
            padding: 20px 40px;
            justify-content: space-evenly;
            border-radius: 50px;
            background: var(--secondary-3, #fdaf17);
          }
           {
            /* .inputDateAndNumber {
            display: flex;
            padding: 15px 40px;
            align-items: center;
            gap: 40px;
            align-self: stretch;
          } */
          }
          .inputNumber {
            display: flex;
            width: 370px;
            align-items: center;
            gap: 18px;
          }
          .inputDate {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
          }
           {
            /* .campAreas {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20px;
          } */
          }
          .cardContainer {
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            gap: 10px;
          }
          .storeCard {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            margin-bottom: 10px;
          }
        `}
      </style>
    </>
  )
}
