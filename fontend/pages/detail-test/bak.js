import { useState, useEffect, React } from 'react'
import { useRouter } from 'next/router'
import { useCart } from '@/hooks/cart-hook'
import Image from 'next/image'
import { DatePicker, Space } from 'antd'
import Link from 'next/link'
import { FaCartShopping } from 'react-icons/fa6'

export default function DetailTest() {
  const { RangePicker } = DatePicker

  const { addCart } = useCart()
  const router = useRouter()
  const [campsites, setCampsites] = useState([])
  const [store, setStore] = useState([])
  const [peopleFilter, setPeopleFilter] = useState('') // 狀態篩選值
  const [dateRange, setDateRange] = useState([])

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
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 將 precautions 字串拆分成陣列
  const precautionsArray = store.precautions ? store.precautions.split(',') : []

  const handlePeopleFilterChange = (e) => {
    setPeopleFilter(e.target.value)
  }

  const filteredCampsites = peopleFilter
    ? campsites.filter((campsite) => campsite.people >= peopleFilter)
    : campsites

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
      rooms_campsites_amount: store.amount,
      startDate: dateRange[0].format('YYYY-MM-DD'),
      endDate: dateRange[1].format('YYYY-MM-DD'),
    })
  }

  useEffect(() => {
    if (router.isReady) {
      getCampsitesInformation(router.query.pid)
      getStoreInformation(router.query.pid)
    }
  }, [router.isReady, router.query.pid])

  return (
    <>
      {/* 基本資訊 */}
      <div>
        <h4>基本資訊</h4>
        <p>露營地名稱: {store.name}</p>
        <p>Location: {store.address}</p>
        <p>mobile: {store.mobile}</p>
        <p>露營地介紹: {store.introduction}</p>
        <ul>
          <p>注意事項:</p>
          {precautionsArray.map((precaution, index) => (
            <li key={index} className="precautionList">
              {precaution}
            </li>
          ))}
        </ul>
        <p>經度: {store.latitude}°E</p>
        <p>緯度: {store.longitude}°N</p>
        <p>高度: {store.altitude}m</p>
      </div>
      <hr />
      <Space direction="vertical" size={12}>
        <RangePicker onChange={setDateRange} />
      </Space>
      <select
        className="selectPeople"
        value={peopleFilter}
        onChange={handlePeopleFilterChange}
      >
        <option value="">選擇人數</option>
        <option value="1">1人</option>
        <option value="2">2人</option>
        <option value="3">3人</option>
        <option value="4">4人</option>
        <option value="5">5人</option>
        <option value="6">6人以上</option>
      </select>
      <div>
        <Link href="/product/cart">
          這是一個購物車
          <FaCartShopping />
        </Link>
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
                <p>房型介紹: {campsite.rooms_campsites_introduction}</p>
                <p>平日價格: ${campsite.normal_price}</p>
                <p>假日價格: ${campsite.holiday_price}</p>
                <p>夜衝價格: ${campsite.night_price}</p>
                <p>房型數量: {campsite.amount}</p>
                <p>房型坪數: {campsite.square_meters}</p>
                <p>房型最多人數: {campsite.people}</p>
                <p>房型型別: {campsite.type}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(campsite)}
                >
                  加入訂房
                </button>
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
                <p>房型介紹: {campsite.rooms_campsites_introduction}</p>
                <p>平日價格: ${campsite.normal_price}</p>
                <p>假日價格: ${campsite.holiday_price}</p>
                <p>夜衝價格: ${campsite.night_price}</p>
                <p>房型數量: {campsite.amount}</p>
                <p>房型坪數: {campsite.square_meters}</p>
                <p>房型最多人數: {campsite.people}</p>
                <p>房型型別: {campsite.type}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(campsite)}
                >
                  加入訂房
                </button>
              </div>
            ))}
        </div>
      </div>
      <style jsx>
        {`
          .selectPeople {
            margin: 10px;
          }
          .precautionList {
            list-style-type: disc;
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
