import React, { createContext, useState, useContext } from 'react';

// 创建一个 Context
const CartContext = createContext();

// 创建一个 Provider 组件
export function CartProviderNew({ children }) {
  const [cartItems, setCartItems] = useState([]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
}

// 创建一个自定义 Hook 方便使用 CartContext
export function useCart() {
  return useContext(CartContext);
}