import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay, Navigation } from 'swiper/modules'
import styles from '@/styles/homepage02.module.scss'
import { ScrollMotionContainer, ScrollMotionItem } from '../../ScrollMotion'
import Image from 'next/image'

export default function Section03({ blog = [] }) {
  return (
    <>
      <ScrollMotionContainer
        once={true}
        element="div"
        className={styles.section03}
      >
        {/* <div className={styles.section03}> */}
        <Image
          className={styles.section04DecorateTop}
          src="/images/homepage/decorate.png"
          alt="decorate"
          width={1920}
          height={80}
        />
        <Image
          className={styles.section03Bg}
          src="/images/homepage/home-bg01.jpg"
          alt="section03Bg"
          width={1920}
          height={1080}
          style={{ width: '100%' }}
        />

        <div className="title">
          <Image
            src="/images/homepage/title-tree.png"
            alt="tree"
            width={66}
            height={33}
          />
          <div className="titleContent">
            <h3 className="titleText">Activity</h3>
            <p>最新消息</p>
          </div>
        </div>

        <div className={`row justify-content-center ${styles.rowActivity1}`}>
          <Swiper
            loop={true}
            watchSlidesProgress={true}
            slidesPerView={4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="mySwiper2"
          >
            {blog.map((v, i) => {
              return (
                <div
                  className={`col-12 col-sm-3 p-0 ${styles.customCol}`}
                  key={i}
                >
                  <SwiperSlide>
                    <Link href={`/blog/${v.id}`}>
                      <div className={`card ${styles.activityCard}`}>
                        <Image
                          src="/images/homepage/tent02.jpg"
                          className={styles.activityImg}
                          alt="blog"
                          width={400}
                          height={800}
                          style={{ width: '100%', height: '100%' }}
                        />
                        <div className={`card-body ${styles.cardBody}`}>
                          <h4 className={`card-title m-0 ${styles.cardTitle}`}>
                            {v.title}
                          </h4>
                          <Link href={`/blog/${v.id}`}>
                            <h6 className={`card-text ${styles.cardText}`}>
                              {v.content}
                            </h6>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                </div>
              )
            })}
          </Swiper>
        </div>
        <div className={`row justify-content-center ${styles.rowActivity2}`}>
          {blog.map((v, i) => {
            return (
              <div
                className={`col-12 col-sm-3 p-0 ${styles.customCol}`}
                key={i}
              >
                <Link href={`/blog/${v.id}`}>
                  <div className={`card ${styles.activityCard} `}>
                    <Image
                      src="/images/homepage/tent02.jpg"
                      className={styles.activityImg}
                      alt="blog"
                      width={400}
                      height={600}
                    />
                    <div className={`card-body  ${styles.cardBody} `}>
                      <h4 className={`card-title m-0 ${styles.cardTitle}`}>
                        {v.title}
                      </h4>
                      <Link href={`/blog/${v.id}`}>
                        <h6 className={`card-text ${styles.cardText}`}>
                          {v.content}
                        </h6>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </ScrollMotionContainer>
      {/* </div> */}
    </>
  )
}
