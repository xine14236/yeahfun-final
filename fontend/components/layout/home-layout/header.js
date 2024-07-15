import React from 'react'
import ListNavbar from './home-navbar'
import ListForm from '@/components/list/list-form'
import WhiteLogo from '@/components/icons/white-logo'
import styles from '@/components/layout/home-layout/header.module.scss'
import HomeSearch from '@/components/home/home-search'

export default function Header() {
  return (
    <>
      <header>
        <div className={`${styles.kv} d-flex flex-column`}>
          <ListNavbar />
          <div
            className={`${styles.indexHeadings} d-flex justify-content-center flex-column gap-4`}
          >
            <WhiteLogo width={195} className={styles.homeLogoBig} />
            <div className={styles.indexHeading}>
              <h2 className={styles.happy}>Happy Camping</h2>
              <p>since 2024</p>
            </div>
            <HomeSearch />
          </div>
        </div>
      </header>
    </>
  )
}
