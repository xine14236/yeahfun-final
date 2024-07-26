import Image from 'next/image'
import Link from 'next/link'

// 組合以下區塊
import styles from '@/components/layout/home-layout/home-navbar/navbar.module.scss'
import HomeMemberBar from './home-member-bar'

import { useRouter } from 'next/router'
import { useState } from 'react'

export default function HomeNavbar() {
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light py-2 py-sm-3 ${styles.navbar}`}
      >
        <div className={`container-fluid ${styles.myContainer}`}>
          <Link className={` ${styles.HomepageName}`} href="/">
            <h3>YeahFun</h3>
          </Link>
          <button
            className={`navbar-toggler ${styles.navbarToggler}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className={`navbar-toggler-icon ${styles.navbarTogglerIcon}`}
            />
          </button>
          <div
            className={`collapse navbar-collapse ${styles.navbarCollapse}`}
            id="navbarSupportedContent"
          >
            <ul
              className={`navbar-nav me-auto mb-0 py-3 py-sm-0 gap-2 gap-sm-5 ${styles.navMenu}`}
            >
              <li className={`nav-item ${styles.navItem}`}>
                <Link
                  className={`nav-link p-0 ${styles.navMenuA}`}
                  href={`/blog`}
                >
                  <h3>Blog</h3>
                </Link>
              </li>
              <li className={`nav-item ${styles.navItem}`}>
                <Link
                  className={`nav-link p-0 ${styles.navMenuA}`}
                  href="/about"
                >
                  <h3>About us</h3>
                </Link>
              </li>
              {/* <li className={`nav-item ${styles.navItem}`}>
                <Link className={`nav-link p-0 ${styles.navMenuA}`} href="#/">
                  <h3>Blog</h3>
                </Link>
              </li> */}
            </ul>
            <HomeMemberBar />
          </div>
        </div>
      </nav>

      {/* hover動畫(下底線)，需要覆蓋原本global.scss樣式 */}
      <style global jsx>{`
         {
          /* @media screen and (min-width: 992px) {
          .navbar {
            padding: 0;
          }
          .navbar .navbar-nav .nav-link {
            padding: 1em 0;
          }
          .navbar .navbar-nav .nav-item {
            margin: 0 1em;
          }
        } */
        }

        .navbar .navbar-nav .nav-item {
          position: relative;
        }

        .navbar .navbar-nav .nav-item::after {
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          margin: 0 auto;
          content: '';
          background-color: var(--secondary-3);
          width: 0%;
          height: 2px;
          transition: all 0.5s;
        }
        .navbar .navbar-nav .nav-item:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  )
}
