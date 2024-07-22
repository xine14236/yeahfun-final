import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function FavoriteStores() {
  const router = useRouter()
  const [store, setStore] = useState([])

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
  // 先擴充原本的商家資料，多一個代表是否有加入收藏的屬性fav(布林值，預設是false)
  const initState =
    Array.isArray(store) && store.length === 0
      ? store.map((v) => ({ ...v, fav: false }))
      : []

  // 宣告狀態
  const [favor, setfavor] = useState(initState)

  useEffect(() => {
    if (router.isReady) {
      getStoreInformation(router.query.pid)
    }
  }, [router.isReady, router.query.pid])

  return (
    <>
      <h1>書籍清單</h1>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>title</th>
            <th>author</th>
            <th>加入收藏</th>
          </tr>
        </thead>
        <tbody>
          {store.map((v, i) => {
            return (
              <tr key={v.isbn}>
                <td>{v.isbn}</td>
                <td>{v.title}</td>
                <td>{v.author}</td>
                <td>
                  {/* <Image src={v.fav ? bookmarkIconFill : bookmarkIcon} alt="" /> */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
