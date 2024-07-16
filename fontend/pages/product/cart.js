import React from 'react';
import { useCart } from '@/hooks/cart-hook';

export default function ShoppingCart() {
  const { cartItems } = useCart();

  return (
    <div>
      <h2>購物車</h2>
      <ul>
        {cartItems.map((v, i) => (
          <li key={i}>
            {v.name} - ${v.normal_price} 
          </li>
        ))}
      </ul>
    </div>
  );
}