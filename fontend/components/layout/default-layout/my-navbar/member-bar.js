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
  const userName = auth.userData.name
  const userMail = auth.userData.email

  useEffect(() => {
    setShowRedDot(cartItems && cartItems.length > 0)
  }, [cartItems])

  return (
    <ul className="navbar-nav pe-2 ms-auto d-flex gap-4 align-items-center">
      {auth.userData.id ? (
        <li
          // className="nav-item dropdown"
          className={` dropdown ${styles['dropdown']}`}
        >
          <Link
            className={`dropdown-toggle btn ${styles.DropdownToggle}`}
            href="/customer"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title="會員中心"
          >
            <h5 className={` ${styles.member}`}>
              <Opensuse size={70} className={styles.iconOpensuse} />
              會員中心
            </h5>
            <p className="d-none d-md-inline d-lg-none">會員中心</p>
          </Link>
          <ul
            className={`dropdown-menu dropdown-menu-end p-4  ${styles['slideIn']} ${styles['dropdown-menu']}`}
          >
            <li>
              <h6 className="text-center">會員中心</h6>
              <p className="text-center">
                會員姓名: {userName}
                <br />
                帳號: {userMail}
              </p>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item text-center" href="/customer">
                會員管理區
              </Link>
            </li>

            <li>
              <Link className="dropdown-item text-center " href="/product/coin">
                兌換
              </Link>
            </li>
            <li>
              <Link
                href="#/"
                onClick={handleLogout}
                className="dropdown-item text-center "
              >
                登出
              </Link>
            </li>
          </ul>
        </li>
      ) : (
        <li>
          <Link href="/welcome/login" className={`btnOrangePc transition`}>
            <div>登入/註冊</div>
          </Link>
        </li>
      )}
      <li>
        {/* <button className={`btnOrangePc transition`}>登入/註冊</button> */}
        <Link href={`/product/cart`} className={styles.iconShoppingCart}>
          <ShoppingBag size={34} className={styles.iconShoppingCart} />
          {showRedDot && <div className={styles.redSpot} />}
          {/* <div className={styles.redSpot}></div> */}
        </Link>
      </li>
    </ul>
  )
}
