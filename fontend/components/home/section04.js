import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Pagination, Navigation } from 'swiper/modules'
import styles from '@/styles/homepage02.module.scss'
import { useState } from 'react'
import { ScrollMotionContainer, ScrollMotionItem } from '../../ScrollMotion'
import Link from 'next/link'
import Image from 'next/image'
import Favor from '@/components/icons/favor'

import Location from '@/components/icons/location'
import Star from '@/components/icons/star'

export default function Section04({
  tags = [],
  activeIndex = 0,
  handleButtonClick = () => {},
  setSwiperInstance = [],
  handleSlideChange = () => {},
}) {
  return (
    <>
      <ScrollMotionContainer
        element="div"
        className={`${styles.myCardList} ${styles.section04}`}
      >
        {/* <div className={`${styles.myCardList} ${styles.section04}`}> */}
        {/* 代辦事項: like hover，輪播動畫*/}
        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="blog"
            width={66}
            height={33}
          />
          <div className={`titleContent  ${styles.titleTheme}`}>
            <h3 className="titleText">theme</h3>
            <p>主題營地</p>
          </div>
        </div>

        <div className={styles.paginationButtons}>
          {tags.map((tagSet, index) => (
            <button
              key={index}
              className={
                index === activeIndex ? styles.themeBtnActive : styles.themeBtn
              }
              onClick={() => handleButtonClick(index)}
            >
              {tagSet.name}
            </button>
          ))}
        </div>
        <Swiper
          onSwiper={setSwiperInstance}
          slidesPerView={1}
          loop={true}
          onSlideChange={handleSlideChange}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper3"
          // simulateTouch={false}
        >
          {tags.map((tagSet, idx) => (
            <SwiperSlide key={idx}>
              <div className="container">
                <div className={styles.cards}>
                  <div className={`row ${styles.myRow}`}>
                    {tagSet.data.map((v, i) => (
                      <div className="col-12 col-sm-4" key={i}>
                        <div className={`card ${styles.productCard}`}>
                          <div className={styles.favor}>
                            <Favor size={40} />
                          </div>

                          <Link href={`/detail-test/${v.stores_id}`}>
                            <Image
                              src={`/detail/${v.img_name.split(',')[0]}`}
                              className={styles.cardImage}
                              alt="tents"
                              width={300}
                              height={200}
                              style={{
                                width: '100%',
                                height: 'auto',
                                objectFit: 'contain',
                              }}
                            />
                          </Link>
                          <div className={styles.cardBody}>
                            <div className={styles.cardTags}>
                              <div className={styles.cardTagLocation}>
                                <Location className={styles.iconLocation} />
                                <p>{v.address}</p>
                              </div>
                              <div className={styles.cardTagStar}>
                                <Star className={styles.iconStar} />
                                <p>{v.comment_star}</p>
                              </div>
                            </div>
                            <div className={styles.cardTitle}>
                              <h4>
                                <Link href={`/detail-test/${v.stores_id}`}>
                                  {v.name}
                                </Link>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* </div> */}
      </ScrollMotionContainer>
    </>
  )
}
