import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function StoreNormalInfo() {
  const router = useRouter()
  const [store, setStore] = useState({
    stores_id: 0,
    owners_id: 0,
    name: '',
    mobile: '',
    address: '',
    longitude: '',
    latitude: '',
    altitude: '',
    precautions: '',
    introduction: '',
    update_time: '',
  })
  // const [precautionsElements, setPrecautionsElements] = useState([])

  const getProduct = async (pid) => {
    const url = 'http://localhost:3005/api/detail/' + pid

    try {
      const res = await fetch(url)
      const resData = await res.json()
      if (resData.status === 'success') {
        setStore(resData.data.store)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const precautionsElements = store.precautions
    .split(',')
    .map((item, index) => {
      return <p key={index}>{item}</p>
    })
  // console.log('store', store)
  // console.log('store.precautions', store.precautions)
  console.log('precautionsElements', precautionsElements)

  useEffect(() => {
    console.log('render router.query=', router.query)
  })

  useEffect(() => {
    if (router.isReady) {
      // 這裡可以得到router.query
      console.log(router.query)
      // 向伺服器要求資料
      getProduct(router.query.pid)
    }
  }, [router.isReady])

  // useEffect(() => {
  //   const precautionsElements = store.precautions
  //     .split('\n')
  //     .map((item, index) => {
  //       return <p key={index}>{item}</p>
  //     })
  //   console.log('store', store)
  //   console.log('precautionsElements', precautionsElements)
  //   console.log('store.precautions', store.precautions)
  // }, [store])

  return (
    <>
      <div
        className="storeNormalInfo row mb-4"
        style={{ border: '1px solid black' }}
      >
        <div className="es-col-full">
          <h2>花開滿溢，溫馨田園 ｜有家的感覺｜免裝備露營小屋</h2>
        </div>
        <div className="campDescriptionContent">
          <div className="col-md-8">
            <h3 className="campSubtitle">冒險須知</h3>
            <div className="infoCard">
              <div className="info">
                <svg className="svgIcon">
                  <use href="/shower" />
                </svg>
                <div className="info">{precautionsElements[0]}</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/fire" />
                </svg>
                <div className="info">{precautionsElements[1]}</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/noSmoking" />
                </svg>
                <div className="info">{precautionsElements[2]}</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/wifi" />
                </svg>
                <div className="info">{precautionsElements[3]}</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/trash" />
                </svg>
                <div className="info">{precautionsElements[4]}</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/pet" />
                </svg>
                <div className="info">{precautionsElements[5]}</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/fishing" />
                </svg>
                <div className="info">{precautionsElements[6]}</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/attention" />
                </svg>
                <div className="info">{precautionsElements[7]}</div>
              </div>
            </div>
          </div>
          <div className="col-md-4 campInfoTable">
            <h3 className="campSubtitle">基地資訊</h3>
            <table className="campTable">
              <colgroup span={2} />
              <tbody>
                <tr>
                  <th>GPS座標</th>
                  <td>
                    N{store.longitude}, E{store.latitude}
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
                  <td>{store.altitude}m</td>
                </tr>
                <tr>
                  <th>冰箱</th>
                  <td>有提供</td>
                </tr>
                <tr>
                  <th>飲水</th>
                  <td>有提供</td>
                </tr>
                <tr>
                  <th>停車</th>
                  <td>車輛請停放碎石地</td>
                </tr>
                <tr>
                  <th>寵物</th>
                  <td>露營屋禁入</td>
                </tr>
                <tr>
                  <th>夜靜時間</th>
                  <td>晚上11點</td>
                </tr>
                <tr>
                  <th>熱水澡</th>
                  <td>全天候供應</td>
                </tr>
                <tr>
                  <th>露營車</th>
                  <td>場地受限暫不開放</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
