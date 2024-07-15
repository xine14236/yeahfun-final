import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import styles from '@/styles/list.module.scss'
import HomeLayout from '@/components/layout/home-layout'
// import ListProduct from '@/components/list/list-product'

export default function Home() {
  return (
    <>
      <div className="myCardList section02">
        {/* 代辦事項:hover like */}
        <div className="title">
          <img src="../images/title-tree.png" alt="" />
          <div className="titleContent">
            <h3 className="titleText">HOT</h3>
            <p>熱門營地</p>
          </div>
        </div>
        <div className="container">
          <div className="cards">
            <div className={`row ${styles.myRow}`}>
              {/* <ListProduct /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
Home.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>
}
