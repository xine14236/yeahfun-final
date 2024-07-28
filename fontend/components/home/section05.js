import Link from 'next/link'
import Image from 'next/image'
import 'swiper/css'
import styles from '@/styles/homepage02.module.scss'
import { ScrollMotionContainer, ScrollMotionItem } from '../../ScrollMotion'
import { motion } from 'framer-motion'

export default function Section05() {
  return (
    <ScrollMotionContainer
      element="div"
      className={styles.section05}
      once={true}
    >
      {/* 代辦事項: 卡片展開 */}
      <Image
        className={styles.section05DecorateTop}
        src="/images/homepage/decorate.png"
        alt="decorate"
        width={1920}
        height={80}
      />
      <Image
        className={styles.section05Bg}
        src="/images/homepage/section05Bg.jpg"
        alt="section05Bg"
        width={1900}
        height={655}
      />
      <ScrollMotionItem element="div" type="up" className="title">
        <Image
          src="/images/homepage/title-tree.png"
          alt="blog"
          width={66}
          height={33}
        />
        <div className="titleContent">
          <h3 className="titleText">about us</h3>
          <p>關於我們</p>
        </div>
      </ScrollMotionItem>
      <ScrollMotionItem element="div" type="up" className="container">
        <div className={`row ${styles.aboutRow}`}>
          <div className="col-12 col-sm-4 p-0">
            <div className={`card ${styles.aboutCard}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <Link href="/about">
                  <Image
                    src="/images/homepage/stone3.png"
                    className={`card-img-top ${styles.stone}`}
                    alt="減碳慢活"
                    width={300}
                    height={300}
                  />
                </Link>
              </motion.div>

              <motion.div
                className={`card-body ${styles.aboutCardBody}`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                {/* <div className={`card-body ${styles.aboutCardBody}`}> */}
                <div className={`card-title m-0 ${styles.aboutCardTitle}`}>
                  <h3>
                    <Link href="/about" className={styles.aboutCardTitleA}>
                      減碳慢活
                    </Link>
                  </h3>
                </div>
                <p className={styles.aboutCardText}>
                  <Link href="/about" className={styles.aboutCardTextA}>
                    減碳慢活不僅是一種生活方式的選擇，更是對當前全球環境挑戰的一種積極回應。通過實踐這些原則，每個人都能為減少碳足跡、保護地球做出自己的貢獻，同時享受到更加豐富和有意義的生活。
                  </Link>
                </p>
                {/* </div> */}
              </motion.div>
            </div>
          </div>
          <div className="col-12 col-sm-4 p-0">
            <div className={`card ${styles.aboutCard}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <Link href="/about">
                  <Image
                    src="/images/homepage/stone1.png"
                    className={`card-img-top ${styles.stone}`}
                    alt="響應無痕山林"
                    width={300}
                    height={300}
                  />
                </Link>
              </motion.div>
              <motion.div
                className={`card-body ${styles.aboutCardBody}`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                {/* <div className={`card-body ${styles.aboutCardBody}`}> */}
                <div className={`card-title m-0 ${styles.aboutCardTitle}`}>
                  <h3>
                    <Link href="/about" className={styles.aboutCardTitleA}>
                      響應無痕山林
                    </Link>
                  </h3>
                </div>
                <p className={styles.aboutCardText}>
                  <Link href="/about" className={styles.aboutCardTextA}>
                    守護自然，從我做起，無痕山林不僅是一種環保行為，更是一種生活態度。每個人都應該從自身做起，響應無痕山林的號召，在享受大自然美景的同時，保護我們共同的家園。讓我們一起行動，守護地球的未來！
                  </Link>
                </p>
                {/* </div> */}
              </motion.div>
            </div>
          </div>
          <div className="col-12 col-sm-4 p-0">
            <div className={`card ${styles.aboutCard}`}>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                <Link href="/about">
                  <Image
                    src="/images/homepage/stone02.png"
                    className={`card-img-top ${styles.stone}`}
                    alt="親子探索教育"
                    width={300}
                    height={300}
                  />
                </Link>
              </motion.div>
              <motion.div
                className={`card-body ${styles.aboutCardBody}`}
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
              >
                {/* <div className={`card-body ${styles.aboutCardBody}`}> */}
                <div className={`card-title m-0 ${styles.aboutCardTitle}`}>
                  <h3>
                    <Link href="/about" className={styles.aboutCardTitleA}>
                      親子探索教育
                    </Link>
                  </h3>
                </div>
                <p className={styles.aboutCardText}>
                  <Link href="/about" className={styles.aboutCardTextA}>
                    親子探索教育是一種寓教於樂的教育方式，通過豐富多樣的活動，讓孩子在親身體驗中學習和成長。不僅促進了親子關係，還培養了孩子的各種素質和能力。讓我們一起參與到親子探索教育中來，與孩子一起探索世界，共同成長。
                  </Link>
                </p>
                {/* </div> */}
              </motion.div>
            </div>
          </div>
        </div>
      </ScrollMotionItem>
    </ScrollMotionContainer>
  )
}
