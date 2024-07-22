import React from 'react'
import Link from 'next/link'
import styles from '@/components/layout/home-layout/home-navbar/home-member-bar.module.scss'
import ShoppingBag from '@/components/icons/shopping-bag'
import Opensuse from '@/components/icons/opensuse'
import { useAuth } from '@/hooks/use-auth'

export default function HomeMemberBar() {
  const { auth, handleLogout } = useAuth()
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
        <Link href={`/product/cart`} className={styles.iconShoppingCartA}>
          <ShoppingBag size={34} className={styles.iconShoppingCart} />
        </Link>
      </div>
    </>
  )
}
