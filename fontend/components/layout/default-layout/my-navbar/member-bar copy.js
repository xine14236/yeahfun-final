import React from 'react'
import Link from 'next/link'
import styles from '@/components/layout/default-layout/my-navbar/member-bar.module.scss'
import ShoppingBag from '@/components/icons/shopping-bag'
import Opensuse from '@/components/icons/opensuse'
import { useAuth } from '@/hooks/use-auth'
//購物車有商品時顯示紅點
import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/cart-hook'
export default function MemberBar() {
  const { auth, handleLogout } = useAuth()
  //購物車有商品時顯示紅點
  const [showRedDot, setShowRedDot] = useState(false)
  const { addCart, cartItems } = useCart()
  useEffect(() => {
    setShowRedDot(cartItems && cartItems.length > 0)
  }, [cartItems])

  return (
    <>
      <div
        className={`d-flex justify-content-start align-items-center gap-4 ${styles.navbarActions}`}
      >
        {auth.userData.id ? (
          <>
            <Link href="/customer" className={styles.iconOpensuseA}>
              <Opensuse size={70} className={styles.iconOpensuse} />
            </Link>
            <Link href="/customer" className={styles.navA}>
              <h5>會員中心</h5>
            </Link>
            <Link href="#/" onClick={handleLogout} className={styles.navA}>
              <h5>登出</h5>
            </Link>
          </>
        ) : (
          <Link href="/welcome/login" className={`btnOrangePc transition`}>
            <div>登入/註冊</div>
          </Link>
        )}
        {/* <button className={`btnOrangePc transition`}>登入/註冊</button> */}
        <Link href={`/product/cart`} className={styles.iconShoppingCart}>
          <ShoppingBag size={34} className={styles.iconShoppingCart} />
          {showRedDot && <div className={styles.redSpot} />}
          {/* <div className={styles.redSpot}></div> */}
        </Link>
      </div>
    </>
  )
}
