import Image from 'next/image'
import Link from 'next/link'
import Location from '@/components/icons/location'
import Star from '@/components/icons/star'
import styles from '@/styles/list.module.scss'
import FavStoreBtn3 from '../icons/fav-store-btn3'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'

const ProductList = ({ products = {}, query = '' }) => {
  const [swiperInstances, setSwiperInstances] = useState([])

  const [autoplayStatus, setAutoplayStatus] = useState('自動切換暫停了')
  const [fav, setFav] = useState(false)

  useEffect(() => {
    setSwiperInstances((prevInstances) =>
      prevInstances.slice(0, products.length)
    )
  }, [products])

  const handleMouseEnter = (index) => {
    if (swiperInstances[index]) {
      swiperInstances[index].autoplay.start()
      setAutoplayStatus('自動切換進行中')
    }
  }

  const handleMouseLeave = (index) => {
    if (swiperInstances[index]) {
      swiperInstances[index].autoplay.stop()
      setAutoplayStatus('自動切換暫停了')
    }
  }

  const onSwiperInit = (swiper, index) => {
    setSwiperInstances((prevInstances) => {
      const newInstances = [...prevInstances]
      newInstances[index] = swiper
      return newInstances
    })
  }
  return (
    <div className="col-sm-12 col-12">
      {/* {productChunks.map((chunk, chunkIndex) => ( */}
      <div className="row">
        {products.stores.map((v, i) => (
          <div className="col-12 col-sm-4" key={i}>
            <div
              className={`card ${styles.productCard}`}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className={styles.favor}>
                <FavStoreBtn3
                  width={45}
                  onClick={() => {
                    setFav(!fav)
                    console.log(fav)
                  }}
                  fav={fav}
                />
              </div>
              <Link
                href={`/detail-test/${v.stores_id}?startDate=${query.startDate}&endDate=${query.endDate}`}
              >
                <Swiper
                  onSwiper={(swiper) => onSwiperInit(swiper, i)}
                  spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    enabled: false, // 初始化時禁用自動播放
                  }}
                  loop={true}
                  pagination={true}
                  modules={[Autoplay, Pagination]}
                  className="mySwiper1"
                >
                  {v.img_name
                    .split(',')
                    .slice(0, 6)
                    .map((img, index) => (
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
              <div className={`card-body ${styles.cardBody}`}>
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
                <div className={`card-title ${styles.cardTitle}`}>
                  <h4>
                    <Link
                      href={`/detail-test/${v.stores_id}?startDate=${query.startDate}&endDate=${query.endDate}`}
                    >
                      {v.name}
                    </Link>
                  </h4>
                  <h5>${v.lowest_normal_price}/晚</h5>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
