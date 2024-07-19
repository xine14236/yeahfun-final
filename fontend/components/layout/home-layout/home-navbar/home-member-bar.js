import React from 'react'
import Link from 'next/link'
import styles from '@/components/layout/home-layout/home-navbar/home-member-bar.module.scss'
import ShoppingBag from '@/components/icons/shopping-bag'
import Opensuse from '@/components/icons/opensuse'

export default function HomeMemberBar() {
  return (
    <>
      <div
        className={`d-flex justify-content-start align-items-center gap-4 ${styles.navbarActions}`}
      >
        <button className={`btnOrangePc transition ${styles.btnOrangePc}`}>
          登入/註冊
        </button>
        <Link href="/customer" className={styles.iconOpensuseA}>
          <Opensuse size={70} className={styles.iconOpensuse} />
        </Link>
        <Link href="/customer" className={styles.navA}>
          <h5>會員中心</h5>
        </Link>
        <Link href="#/" className={styles.navA}>
          <h5>登出</h5>
        </Link>
        <Link href={`/product/cart`} className={styles.iconShoppingCartA}>
          <ShoppingBag size={34} className={styles.iconShoppingCart} />
        </Link>
      </div>
    </>
  )
}
