import React from 'react'
import ListNavbar from './list-navbar'
import WhiteLogo from '@/components/icons/white-logo'
import styles from '@/components/layout/list-layout/header.module.scss'

export default function Header() {
  return (
    <>
      <header>
        <div className={`${styles.kv} d-flex flex-column`}>
          <ListNavbar />
          <WhiteLogo width={130} className={styles.whiteLogo} />
        </div>
      </header>
    </>
  )
}
