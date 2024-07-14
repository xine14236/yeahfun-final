import { useState, useEffect } from 'react'
import Link from 'next/link'

// 模擬後端的資料來源: https://my-json-server.typicode.com/eyesofkids/json-fake-data/products
// 資料範例:
// [
//   {
//     "id": 1,
//     "picture": "https://via.placeholder.com/150",
//     "stock": 5,
//     "name": "iPhone 12 Pro",
//     "price": 25000,
//     "tags": "蘋果,大螢幕"
//   }
// ]
export default function List() {
  // 注意1: 初始值至少要空白陣列。初次render是使用初始值，需要對應伺服器的資料模型
  // 注意2: 在應用程式執行過程中，一定要保持狀態的資料類型一致(務必一定要是陣列)
  const [products, setProducts] = useState([])

  // 與伺服器作fetch獲得資料
  const getProducts = async () => {
    const url = 'http://localhost:3005/api/stores2'

    // 使用try-catch語句，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url)
      const resData = await res.json()

      if (resData.status === 'success') {
        // 設定到狀態中 ===> 進入update階段，觸發重新渲染(re-render)，呈現資料
        // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
        if (Array.isArray(resData.data.stores)) {
          setProducts(resData.data.stores)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 樣式2 didMount
  // 首次渲染(render)之後(after)，執行一次第一傳入參數函式其中程式碼，之後不會再執行
  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <h1>商品列表頁</h1>
      {products.map((v, i) => {
        return (
          <div className="card" key={v.id}>
            <p>{v.name}</p>
            <p>{v.address}</p>
            <p>{v.stores_id}</p>
            <p>{v.my_tag_id}</p>
            <p>{v.tag_name}</p>
            <p>{v.comment_star}</p>
            <p>{v.lowest_normal_price}</p>
            <p>{v.img_name}</p>
          </div>
        )
      })}
    </>
  )
}
