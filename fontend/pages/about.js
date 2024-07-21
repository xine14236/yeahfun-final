import HomeLayout from '@/components/layout/home-layout'
import Image from 'next/image'
import ListNavbar from '@/components/layout/home-layout/home-navbar'
import styles from '@/styles/about.module.scss'
import { ScrollMotionContainer, ScrollMotionItem } from '../ScrollMotion'
import GoTop from '@/components/home/go-top'
import Camp from '@/components/icons/camp'
import Children from '@/components/icons/children'
import Tree from '@/components/icons/tree'

export default function About() {
  return (
    <>
      <header>
        <div className={`${styles.kv}`}>
          <ListNavbar />
          <div className={styles.title}>
            <h1>About Us</h1>
            <span class="subheading">This is what we do.</span>
          </div>
        </div>
      </header>
      {/* Main Content*/} 
      <section className="about section">
        <ScrollMotionContainer
          amount={0.2}
          once={true}
          element="div"
          className={`container ${styles.aboutContainer}`}
        >
          <div className={`row ${styles.aboutRow}`}>
            <ScrollMotionItem
              duration={1}
              element="div"
              type="right"
              className="col-sm-7 pe-5"
            >
              <div className="block">
                <div className="section-title">
                  <h2>
                    <Tree size={30} color={'#389b87 '} /> &nbsp;減碳慢活
                  </h2>
                </div>
                <p>
                  我們致力於推廣減碳慢活的理念，鼓勵大家以低碳的方式享受露營生活。我們提倡：
                </p>
                <br />
                <ul>
                  <li>
                    綠色出行：鼓勵乘坐公共交通工具、自行車或共乘來到露營地，減少碳排放。
                  </li>
                  <li>
                    環保設施：我們的露營地配備了太陽能電池板、雨水收集系統和節能照明，減少對環境的影響。
                    減少浪費：倡導使用可重複使用的餐具和容器，並設置分類垃圾箱，鼓勵露營者進行垃圾分類和回收。
                  </li>
                  <li>
                    本地食材：我們提倡使用本地採購的有機食材，減少食物里程，支持當地農業。
                  </li>
                </ul>
                <br />
                <p>
                  我們相信，通過實踐減碳慢活，大家可以在享受大自然的同時，為地球的可持續發展貢獻一份力量。讓我們一起走進大自然，發現世界的美好，並共同守護這片美麗的土地！
                </p>
              </div>
            </ScrollMotionItem>
            {/* .col-sm-7 close */}
            <ScrollMotionItem element="div" type="left" className="col-sm-5">
              <div className="block">
                <Image
                  className={styles.aboutImg}
                  src="/images/about/earth.jpg"
                  alt="earth"
                  width={550}
                  height={403}
                  style={{ objectFit: 'cover', width: '100%' }}
                />
              </div>
            </ScrollMotionItem>
          </div>
          <div className={`row ${styles.aboutRow}`}>
            <ScrollMotionItem
              element="div"
              type="right"
              className="col-sm-5 pe-5  "
            >
              <div className="block">
                <Image
                  className={styles.aboutImg}
                  src="/images/about/forest.jpg"
                  alt="forest"
                  width={550}
                  height={403}
                  style={{ objectFit: 'cover', width: '100%' }}
                />
              </div>
            </ScrollMotionItem>
            <ScrollMotionItem element="div" type="left" className="col-sm-7">
              <div className="block">
                <div className={`section-title ${styles.sectionTitle}`}>
                  <h2>
                    <Camp color={'#389b87 '} size={30} />
                    &nbsp;響應無痕山林
                  </h2>
                </div>
                <p>
                  我們積極響應無痕山林的理念，提倡所有露營者在享受大自然的同時，也要尊重和保護環境。無痕山林的七大原則是我們的重要指導方針：
                </p>
                <br />
                <ul>
                  <li>
                    在可行的路徑和露營地活動：選擇已有的路徑和露營地，避免破壞自然植被。
                  </li>
                  <li>
                    妥善處理垃圾：不留下任何垃圾，將所有廢棄物帶離露營地，保持環境整潔。
                  </li>
                  <li>
                    保持環境整潔：不採摘植物、不打擾野生動物，尊重自然生態。
                  </li>
                  <li>
                    減少篝火影響：儘量使用露營爐具，減少篝火對環境的影響，確保篝火完全熄滅後再離開。
                  </li>
                  <li>
                    尊重野生動物：觀察而不打擾，保持安全距離，不餵食野生動物。
                  </li>
                  <li>
                    考慮其他遊客：保持安靜，尊重他人，營造和諧的露營環境。
                  </li>
                </ul>
                <br />
                <p>
                  我們相信，通過實踐這些原則，大家可以在享受大自然的同時，共同保護這片美麗的土地。讓我們一起走進大自然，發現世界的美好，並共同守護這片無痕山林！
                </p>
              </div>
            </ScrollMotionItem>
          </div>
          <div className={`row ${styles.aboutRow}`}>
            <ScrollMotionItem
              element="div"
              type="right"
              className={`col-sm-7 pe-5 ${styles.aboutCol}`}
            >
              <div className="block">
                <div className="section-title">
                  <h2>
                    <Children size={30} color={'#389b87 '} />
                    &nbsp;親子探索教育
                  </h2>
                </div>
                <p>
                  在我們的露營地，我們深信大自然是最好的教室。我們設計了一系列親子探索教育活動，旨在讓孩子們在遊戲和探險中學習，培養他們對大自然的熱愛和保護意識。我們的活動包括：
                </p>
                <br />
                <ul>
                  <li>
                    自然導覽：專業的自然導覽員帶領家庭探索露營地周邊的生態環境，認識各種植物和動物。
                  </li>
                  <li>
                    戶外手工藝：利用自然材料進行創作，增進孩子們的動手能力和創造力。
                  </li>
                  <li>
                    星空觀察：在夜晚，我們會舉辦星空觀察活動，讓孩子們學習星座知識，感受宇宙的浩瀚。
                  </li>
                  <li>
                    生存技巧：教導基本的生存技巧，如搭帳篷、點火、尋找食物和水源，提升孩子們的獨立性和問題解決能力。
                  </li>
                </ul>
              </div>
            </ScrollMotionItem>
            <ScrollMotionItem element="div" type="left" className="col-sm-5">
              <div className="block">
                <Image
                  className={styles.aboutImg}
                  src="/images/about/family2.jpg"
                  alt="family"
                  width={550}
                  height={403}
                  style={{ objectFit: 'cover', width: '100%' }}
                />
              </div>
            </ScrollMotionItem>
          </div>
        </ScrollMotionContainer>
      </section>

      <div className={styles.contact}>
        <div className={styles.contactText}>
          <h2> 聯繫我們</h2>
          <p>
            我們樂意為您提供幫助！
            無論您有任何問題、建議，還是需要進一步的信息，請隨時與我們聯繫。我們的客戶服務團隊會盡快回覆您。
          </p>
          <div>
            <button className="btnOrangePc "> Contact Us</button>
          </div>
        </div>
      </div>
      <GoTop />
    </>
  )
}
About.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>
}
