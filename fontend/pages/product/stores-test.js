import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/cart-hook'
import Link from 'next/link'
import { differenceInDays, parseISO } from 'date-fns'
import { FaCartShopping } from 'react-icons/fa6'
import { useRouter } from 'next/router'

const Stores = () => {
  const [stores, setStores] = useState([])
  const { addCart } = useCart()

  const router = useRouter()

  const getStoreInfo = async () => {
    const url = 'http://localhost:3005/api/stores-information-test'

    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)

      if (resData.status === 'success') {
        setStores(resData.data.stores)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleStartDateChange = (index, event) => {
    const newStores = [...stores]
    newStores[index].startDate = event.target.value
    updateDays(index, newStores)
    setStores(newStores)
  }

  const handleEndDateChange = (index, event) => {
    const newStores = [...stores]
    newStores[index].endDate = event.target.value
    updateDays(index, newStores)
    setStores(newStores)
  }

  const updateDays = (index, newStores) => {
    const { startDate, endDate } = newStores[index]
    if (startDate && endDate) {
      const days = differenceInDays(parseISO(endDate), parseISO(startDate))
      newStores[index].days = days > 0 ? days : 0
    } else {
      newStores[index].days = 0
    }
  }

  const handleQtyChange = (index, event) => {
    const newStores = [...stores]
    newStores[index].qty = event.target.value
    setStores(newStores)
  }

  const handleAddToCart = (store) => {
    addCart({
      id: store.stores_id,
      name: store.store_name,
      rooms_campsites_id: store.rooms_campsites_id,
      rooms_campsites_name: store.rooms_campsites_name,
      rooms_campsites_price: store.normal_price,
      startDate: store.startDate || '',
      endDate: store.endDate || '',
      days: store.days || 0,
      qty: store.qty || 0,
    })
    // 可以添加一些提示或重置狀態的邏輯
    // 例如：setStores([...stores]); 重置輸入框狀態
  }

  useEffect(() => {
    if (router.isReady) {
      getStoreInfo()
    }
  }, [router.isReady])

  return (
    <div>
      <h2>Stores</h2>
      <Link href="/product/cart">
        這是一個購物車
        <FaCartShopping />
      </Link>
      <hr />
      {stores.map((store, index) => (
        <div key={index}>
          <h3 className="mt-3">{store.store_name}</h3>
          <p>Rooms/Campsites Name: {store.rooms_campsites_name}</p>
          <p>Price: {store.normal_price}</p>
          <label>
            Start Date:
            <input
              type="date"
              value={store.startDate || ''}
              onChange={(e) => handleStartDateChange(index, e)}
            />
          </label>
          <label>
            End Date:
            <input
              type="date"
              value={store.endDate || ''}
              onChange={(e) => handleEndDateChange(index, e)}
            />
          </label>
          <label>
            Days:
            <input type="number" value={store.days || ''} readOnly />
          </label>
          <label>
            Qty:
            <input
              type="number"
              value={store.qty || ''}
              onChange={(e) => handleQtyChange(index, e)}
            />
          </label>
          <button onClick={() => handleAddToCart(store)}>Add to Cart</button>
        </div>
      ))}
    </div>
  )
}

export default Stores
