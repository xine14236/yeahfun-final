import { useState, useContext, createContext } from 'react'

// 創建一个 Context 用于共享購物車數據
const CartContext = createContext()

export const useCart = () => {
  return useContext(CartContext)
}

export const CartProviderNew = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (store) => {
    setCart((prevCart) => [...prevCart, store])
  }
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id))
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
