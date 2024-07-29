import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/cart-hook'
import { initUserData, useAuth } from '@/hooks/use-auth'
import Image from 'next/image'
import { DatePicker, Space } from 'antd'
import styles from '@/styles/detail.module.css'
import Link from 'next/link'
import Share from '@/components/icons/share'
import FavStoreBtn2 from '@/components/icons/fav-store-btn2'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import Carousel from '@/components/product/detail/carousel'
import GoTop from '@/components/home/go-top'
import Swal from 'sweetalert2'
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { SlClose } from 'react-icons/sl'
import { useLoader } from '@/hooks/use-loader'
import { Select } from 'antd'

// import ModalTest from '@/components/product/detail/modalTest'
import dayjs from 'dayjs'

export default function DetailTest() {
  const router = useRouter()
  const [campsites, setCampsites] = useState([])
  const [store, setStore] = useState([])
  const [tag, setTag] = useState([])
  const [img, setImg] = useState([])
  const [peopleFilter, setPeopleFilter] = useState('') // 新增狀態來維護篩選值
  const [dateRange, setDateRange] = useState([])
  const { addCart } = useCart()
  const { auth, getAuthHeader } = useAuth()
  const { RangePicker } = DatePicker
  const [modalIsOpen, setModalIsOpen] = useState(false)
  // const { showLoader, hideLoader, loading, delay } = useLoader()
  //RWD
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 800
  ) //新增狀態來維護視窗寬度
  const [swiperInstances, setSwiperInstances] = useState([])

  // RWD:初始化時檢查 window 物件是否存在
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    // 清除事件監聽器
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // RWD:根據 windowWidth 決定要渲染哪種組件
  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  }

  const query = router.query
  console.log(query)

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
      const res = await fetch(url, {
        method: 'GET',
        headers: { ...getAuthHeader() },
        credentials: 'include',
      })
      const resData = await res.json()
      console.log(resData)

      if (resData.status === 'success') {
        setStore(resData.data.store)
        setTag(resData.data.tag)
        setImg(resData.data.img)
        console.log(resData.data.store)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddToCart = (store) => {
    if (dateRange.length === 0) {
      // alert('請輸入日期')
      Swal.fire({
        title: '請填寫入住和退房日！',
        text: 'Please enter your check-in and check-out dates.',
        icon: 'question',
      })
      return
    }

    addCart({
      user_id: auth.userData.id,
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

    // alert('已加入購物車')
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Yeah! 已加入購物車',
      showConfirmButton: false,
      timer: 1500,
    })
  }

  // 加入或取消最愛
  const handleFavor = async (store_id) => {
    const url = 'http://localhost:3005/api/add-fav-store/' + store_id

    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: { ...getAuthHeader() },
        credentials: 'include',
      })
      const resData = await res.json()
      console.log(resData)

      if (resData.status === 'success') {
        const data = structuredClone(store) // 深層複製
        // console.log(data)
        if (data.stores_id === store_id) {
          // 確認 stores_id 是否匹配 store_id
          if (resData.data.output.action === 'add') {
            data.like_id = true
          } else {
            data.like_id = false
          }

          setStore(data)
        } else {
          console.error('store_id 不匹配')
        }
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
  const disabledDate = (current) => {
    return current && current < dayjs().endOf('day')
  }

  // 將 precautions 字串拆分成陣列
  const precautionsArray = store.precautions ? store.precautions.split(' ') : []

  // 將取得img資料字串拆分成陣列
  const imgArray = img.img_name ? img.img_name.split(',') : []

  useEffect(() => {
    if (router.isReady) {
      getCampsitesInformation(router.query.pid)
      getStoreInformation(router.query.pid)

      if (router.query.startDate && router.query.endDate) {
        setDateRange([
          dayjs(router.query.startDate),
          dayjs(router.query.endDate),
        ])
      } else {
        setDateRange([dayjs(), dayjs().add(1, 'day')])
      }
    }
    // eslint-disable-next-line
  }, [router, router.query.pid])

  const handlePeopleFilterChange = (value) => {
    setPeopleFilter(value)
  }

  const filteredCampsites = peopleFilter
    ? campsites.filter((campsite) => campsite.people >= peopleFilter)
    : campsites

  // useEffect(() => {
  //   showLoader()
  //   getStoreInformation()
  //     .then(() => delay(3000))
  //     .then(hideLoader)
  // }, [])

  useEffect(() => {
    setSwiperInstances((prevInstances) => prevInstances.slice(0, store.length))
  }, [store])

  const onSwiperInit = (swiper, index) => {
    setSwiperInstances((prevInstances) => {
      const newInstances = [...prevInstances]
      newInstances[index] = swiper
      return newInstances
    })
  }

  return (
    <>
      <div className="row storeTitleWrap">
        <div className="col-12 storeTitle">
          <h1>{store.name}</h1>
          <div className="storeShare">
            <Share />
            <FavStoreBtn2
              initFull={store.like_id}
              width={30}
              handler={() => {
                handleFavor(store.stores_id)
              }}
            />
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
        <div>
          {windowWidth < 640 ? (
            <div>
              <Swiper
                onSwiper={(swiper, i) => onSwiperInit(swiper, i)}
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                  enabled: false, // 初始化時禁用自動播放
                }}
                pagination={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper1"
              >
                {imgArray.slice(1, 5).map((img, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={`/detail/${img}`}
                      alt="Camping scene"
                      width={500}
                      height={100}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            <div className="campGallery">
              <figure className="gridItem">
                <Image
                  src={`/detail/${imgArray[0]}`}
                  alt="Camping scene with tents"
                  width={500} // 圖片的實際寬度
                  height={100} // 圖片的實際高度
                  priority
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '5px',
                  }}
                  // onClick={() => setModalIsOpen(true)}
                  data-bs-toggle="modal" //告訴Bootstrap這裡要觸發一個modal
                  data-bs-target="#modal2" //告訴Bootstrap要觸發哪個modal
                />
              </figure>

              {imgArray.slice(1, 5).map((img, index) => (
                <div style={{ display: 'flex' }} key={index}>
                  <Image
                    src={`/detail/${img}`}
                    alt="Camping scene"
                    width={500}
                    height={300}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '5px',
                    }}
                    data-bs-toggle="modal"
                    data-bs-target={`#modal${index}`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal2 */}
        <div className="modal fade  modal-xl " id="modal2">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <Image
                  src={`/detail/${imgArray[0]}`}
                  alt="Your description"
                  width={500} // 圖片的實際寬度
                  height={100} // 圖片的實際高度
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '5px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Modal3 */}
        {imgArray.slice(1, 5).map((img, index) => (
          <div
            className="modal fade  modal-xl "
            id={`modal${index}`}
            key={index}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <Image
                    src={`/detail/${img}`}
                    alt="Camping scene"
                    width={500}
                    height={300}
                    style={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '5px',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row storeNormalInfo">
        <div className="col-md-6 campPrecaution">
          <h3 className="campSubtitle">營主叮嚀</h3>
          {/* {precautionsElements} */}
          <div className="campPrecaution">
            {precautionsArray.map((precaution, index) => (
              <li key={index} style={{ lineHeight: '2.4' }}>
                {precaution}
                <br />
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
        <div className="inputDate" style={{ color: 'white' }}>
          入住日期
          <Space direction="vertical" size={12}>
            <RangePicker
              onChange={(e) => {
                setDateRange(e)
              }}
              defaultValue={
                query.startDate && query.endDate
                  ? [dayjs(query.startDate), dayjs(query.endDate)]
                  : [dayjs(), dayjs().add(1, 'day')]
              }
              disabledDate={disabledDate}
            />
          </Space>
        </div>
        <div className="inputNumber" style={{ color: 'white' }}>
          入住人數
          <div className="select">
            <Select
              placeholder="請選擇人數"
              onChange={handlePeopleFilterChange}
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              } // 選項過濾
              options={[
                {
                  value: '1',
                  label: '1人',
                },
                {
                  value: '2',
                  label: '2人',
                },
                {
                  value: '3',
                  label: '3人',
                },
                {
                  value: '4',
                  label: '4人',
                },
                {
                  value: '5',
                  label: '5人',
                },
                {
                  value: '6',
                  label: '6人以上',
                },
              ]}
            />
          </div>
        </div>
      </div>

      <hr />
      <div className="row">
        <h3 className="campSubtitle">住宿選擇</h3>
        <div className="cardContainer">
          {filteredCampsites
            .filter((campsite) => campsite.type === 'bed')
            .map((campsite) => (
              <div key={campsite.rooms_campsites_id} className="storeCard">
                <div className="thumbNail">
                  <span className="span">總房間數: {campsite.amount}</span>
                  <Image
                    src={`/productDetail/${campsite.img}`}
                    alt={campsite.rooms_campsites_name}
                    width={300}
                    height={200}
                    style={{
                      borderTopLeftRadius: '5px',
                      borderTopRightRadius: '5px',
                    }}
                  />
                </div>
                <div className="areaInfo">
                  <div style={{ width: '50%', paddingLeft: '10px' }}>
                    <h5 style={{ alignContent: 'center' }}>
                      {campsite.rooms_campsites_name}
                    </h5>
                    <p style={{ color: 'transparent' }}>--</p>
                    <button
                      type="button"
                      className="btn btn-primary btnGreen"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      詳細內容
                    </button>
                  </div>
                  <div className="areaPrice">
                    <p style={{ color: '#888' }}>
                      平日價: ${campsite.normal_price}
                    </p>
                    <p style={{ color: '#888' }}>
                      假日價: ${campsite.holiday_price}
                    </p>
                  </div>
                </div>

                <button
                  className="btn btn-primary btnBookNow"
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
                  labelled="exampleModalLabel"
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
                <div className="thumbNail">
                  <span className="span">總帳數: {campsite.amount}</span>
                  <Image
                    src={`/productDetail/${campsite.img}`}
                    alt={campsite.rooms_campsites_name}
                    width={300}
                    height={200}
                    style={{
                      borderTopLeftRadius: '5px',
                      borderTopRightRadius: '5px',
                    }}
                  />
                </div>
                <div className="areaInfo">
                  <div style={{ width: '50%', paddingLeft: '10px' }}>
                    <h5 style={{ alignContent: 'center' }}>
                      {campsite.rooms_campsites_name}
                    </h5>
                    <p style={{ color: 'transparent' }}>--</p>
                    <button
                      type="button"
                      className="btn btn-primary btnGreen"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      詳細內容
                    </button>
                  </div>
                  <div className="areaPrice">
                    <p style={{ color: '#888' }}>
                      平日價: ${campsite.normal_price}
                    </p>
                    <p style={{ color: '#888' }}>
                      假日價: ${campsite.holiday_price}
                    </p>
                    <p style={{ color: '#888' }}>
                      夜衝價: ${campsite.night_price}/帳
                    </p>
                  </div>
                </div>

                <button
                  className="btn btn-primary btnBookNow"
                  onClick={() => {
                    handleAddToCart(campsite)
                  }}
                >
                  立即訂房
                </button>
                {/* Modal */}
                <div
                  className="modal fade  modal-xl "
                  id={`exampleModal${campsite.rooms_campsites_id}`}
                  tabIndex={-1}
                  labelled="exampleModalLabel"
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
        <h3 className="campSubtitle">周邊景點</h3>
        <div className="container">
          <Carousel className="carousel2" />
        </div>
      </div>
      <GoTop />
      <div>
        <div style={{ height: '10vh' }}></div>
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
            margin: 0px;
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
            background: linear-gradient(0deg, #fa8752 0%, #fdb524 100%);
          }
          .inputNumber {
            display: flex;
            width: 370px;
            align-items: center;
            gap: 18px;
          }
          .inputNumber Select {
            width: 120px;
          }
          .inputDate {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
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
            margin-bottom: 10px;
          }
          .thumbNail {
            position: relative;
            width: 100%;
          }
          .span {
            position: absolute;
            margin-top: 10px;
            margin-left: 10px;
            padding: 5px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 5px;
            color: white;
          }
          .areaInfo {
            display: flex;
            justify-content: space-between;
            margin-block: 10px;
          }
          .areaPrice {
            display: flex;
            flex-direction: column;
            padding-right: 10px;
          }
          .btnGreen {
            border: 1px solid var(--primary-1); /* 明確指定邊框寬度、樣式和顏色 */
            background: #fefcf0;
            color: var(--primary-1);
            width: 100%;
          }
          .btnGreen:hover {
            border: 1px solid var(--white);
            background: var(--primary-1);
            color: var(--white);
            /* font-size: var(--p); */
            border: 1px solid var(--white);
          }
          .btnBookNow {
            display: flex;
            width: 47%;
            justify-content: center;
            margin-left: 10px;
            margin-bottom: 10px;
            padding: 10px 30px;
            background: linear-gradient(0deg, #fa8752 0%, #fdb524 100%);
            color: var(--white);
            font-size: var(--h5);
            border: var(--white);
          }
          .btnBookNow:hover {
            background: linear-gradient(
              to bottom,
              #ffb58e 0%,
              #fa8752 50%,
              #ff8c00 51%,
              #fb955e 100%
            );
          }

          @media screen and (max-width: 640px) {
            .storeTitleWrap {
              display: flex;
              flex-direction: column;
            }
            .storeTitleWrap .briefIntroduce {
              order: 2;
              display: block;
              width: 100%;
            }
            .storeTitleWrap .campTags {
              order: 1;
              display: block;
              width: 100%;
            }
            .campGallery {
              display: flex;
            }
            .campSubtitle {
              margin-top: 20px;
              margin-bottom: -2px;
            }
            .campPrecaution {
              display: block;
            }
            .campPrecaution li {
              position: relative;
              list-style-type: disc;
              text-indent: -1.3em;
              padding-left: 1em;
            }
            .campAreaSearchBar {
              display: flex;
              flex-direction: column;
              padding: 10px 10px 10px 20px;
              border-radius: 20px;
            }
            .inputDate {
              order: 2;
              width: 80%;
            }
            .inputNumber {
              order: 1;
              width: 50%;
            }
            .select {
              width: 100%;
            }
            .cardContainer {
              display: ruby;
            }
          }
        `}
      </style>
    </>
  )
}
