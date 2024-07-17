import React, { useState, useContext, createContext } from 'react'

// 創建一个 Context 用于共享購物車數據
const CartContext = createContext()

export function CartProviderNew({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addCart = (store) => {
    setCartItems((prevCart) => [...prevCart, store])
  }
  const removeFromCart = (rooms_campsites_id) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => item.rooms_campsites_id !== rooms_campsites_id)
    )
  }

  const value = {
    cartItems,
    setCartItems,
    addCart,
    removeFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
