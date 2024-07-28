import React from 'react'
import ListNavbar from '../layout/home-layout/home-navbar'
import WhiteLogo from '@/components/icons/white-logo'
import styles from '@/components/home/header.module.scss'
import HomeSearch from '@/components/home/home-search'
import { ScrollMotionContainer, ScrollMotionItem } from '../../ScrollMotion'

export default function Header() {
  return (
    <>
      <header>
        <div className={`${styles.kv} d-flex flex-column`}>
          <ListNavbar />

          <div
            className={`${styles.indexHeadings} d-flex justify-content-center flex-column `}
          >
            <WhiteLogo width={195} className={styles.homeLogoBig} />
            <div className={styles.indexHeading}>
              <h2 className={styles.happy}>
                Unleash your
                <br /> wild side
              </h2>
              <p>since 2024</p>
            </div>

            <HomeSearch />
          </div>
        </div>
      </header>
    </>
  )
}
