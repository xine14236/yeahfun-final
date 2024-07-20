import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import Favor from '@/components/icons/favor'

import Location from '@/components/icons/location'
import Star from '@/components/icons/star'
import styles from '@/styles/homepage02.module.scss'
import { ScrollMotionContainer, ScrollMotionItem } from '../../ScrollMotion'

export default function Section02({
  products,
  swiperInstances,
  handleMouseEnter,
  handleMouseLeave,
  onSwiperInit,
}) {
  return (
    <>
      <ScrollMotionContainer
        once={true}
        element="div"
        className={`${styles.myCardList} ${styles.section02}`}
      >
        {/* <div className={`${styles.myCardList} ${styles.section02}`}> */}

        <Image
          className={styles.section02DecorateTop}
          src="/images/homepage/decorate.png"
          alt="decorate"
          width={1920}
          height={80}
        />

        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="tree"
            width={66}
            height={33}
          />
          <div className="titleContent">
            <h3 className="titleText">HOT</h3>
            <p>熱門營地</p>
          </div>
        </div>

        <div className="container">
          <div className="cards">
            <div className={`row ${styles.myRow}`}>
              {products.map((v, i) => (
                <div className="col-12 col-sm-4" key={i}>
                  <div
                    className={`card ${styles.productCard}`}
                    onMouseEnter={() => handleMouseEnter(i)}
                    onMouseLeave={() => handleMouseLeave(i)}
                  >
                    <div className={styles.favor}>
                      <Favor size={40} />
                    </div>
                    <Link href={`/detail-test/${v.stores_id}`}>
                      <Swiper
                        onSwiper={(swiper) => onSwiperInit(swiper, i)}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                          delay: 2500,
                          disableOnInteraction: false,
                          enabled: false, // 初始化時禁用自動播放
                        }}
                        // pagination={true}
                        modules={[Autoplay]}
                        className="mySwiper1"
                      >
                        {v.img_name.split(',').map((img, index) => (
                          <SwiperSlide key={index}>
                            <Image
                              src={`/detail/${img}`}
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
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Link>
                    {/* <div id="showhtml">{autoplayStatus}</div> */}
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
      </ScrollMotionContainer>
      {/* </div> */}
    </>
  )
}
