import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import styles from '@/styles/homepage02.module.scss'
import HomeLayout from '@/components/layout/home-layout'

import Location from '@/components/icons/location'
import Star from '@/components/icons/star'

export default function Home() {
  return (
    <>
      <div className="myCardList section02">
        {/* 代辦事項:hover like */}
        <div className="title">
          <img src="/images/homepage/title-tree.png" alt="" />
          <div className="titleContent">
            <h3 className="titleText">HOT</h3>
            <p>熱門營地</p>
          </div>
        </div>
        <div className="container">
          <div className="cards">
            <div className={`row ${styles.myRow}`}>
              <div className="col-12 col-sm-4">
                <div className="card">
                  <a href="#/">
                    {/* <svg className={styles.iconLike}>
                      <use href="#like" />
                    </svg> */}
                  </a>
                  <Link href="#/">
                    <img
                      src="/images/homepage/tent13.jpg"
                      className={styles.cardImage}
                      alt="Image 2"
                    />
                  </Link>
                  <div className={styles.cardBody}>
                    <div className={styles.cardTags}>
                      <div className={styles.cardTagLocation}>
                        <Location className={styles.iconLocation} />
                        <p>花蓮縣</p>
                      </div>
                      <div className={styles.cardTagStar}>
                        <Star className={styles.iconStar} />
                        <p>4.5</p>
                      </div>
                    </div>
                    <div className={styles.cardTitle}>
                      <h4>
                        <Link href="#/">星空營地</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section03}>
        <div className="title">
          <img src="/images/homepage/title-tree.png" alt="" />
          <div className="titleContent">
            <h3 className="titleText">Activity</h3>
            <p>最新消息</p>
          </div>
        </div>
        <img
          className={styles.section03Bg}
          src="/images/homepage/home-bg01.jpg"
          alt="section03Bg"
        />
        <div className={`row justify-content-center ${styles.rowActivity}`}>
          <div className={`col-12 col-sm-3 p-0 ${styles.customCol}`}>
            <div className={`card ${styles.activityCard}`}>
              <img
                src="/images/homepage/tent02.jpg"
                className={styles.activityImg}
                alt="blog"
              />
              <div className={`card-body ${styles.cardBody}`}>
                <a href="#/">
                  <h4 className={`card-title m-0 ${styles.cardTitle}`}>
                    露營準備裝備
                  </h4>
                </a>
                <a href="#/">
                  <h6 className={`card-text ${styles.cardText}`}>
                    你知道嗎?露營必備品，手電筒，吊床等等，超好用商品
                  </h6>
                </a>
              </div>
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
