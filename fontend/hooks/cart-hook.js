import { useState, useContext, createContext } from 'react'

// 創建一个 Context 用于共享購物車數據
const CartContext = createContext()

// 创建一个 Provider 组件
export function CartProviderNew({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addCart = (store) => {
    setCartItems((prevCart) => [...prevCart, store])
  }

  const removeFromCart = (rooms_campsites_id) => {
    setCartItems((prevCart) => prevCart.filter((item) => item.rooms_campsites_id !== rooms_campsites_id))
  }

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const CartProviderNew = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (store) => {
    setCart((prevCart) => [...prevCart, store])
  }
  const removeFromCart = (rooms_campsites_id) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.rooms_campsites_id !== rooms_campsites_id)
    )
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
