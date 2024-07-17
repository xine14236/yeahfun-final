import React, { createContext, useState, useContext } from 'react';

// 创建一个 Context
const CartContext = createContext();

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

// 创建一个自定义 Hook 方便使用 CartContext
export function useCart() {
  return useContext(CartContext);
}
