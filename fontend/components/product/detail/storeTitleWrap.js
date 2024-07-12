import React from 'react'
// import Link from 'next'
import Image from 'next/image'

const images = [
  {
    src: '/detail/campGallery1.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery2.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery3.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery4.jpg',
    alt: 'camp',
  },
  {
    src: '/detail/campGallery5.jpg',
    alt: 'camp',
  },
]

export default function StoreTitleWrap() {
  return (
    <>
      <div className="storeTitleWrap">
        <div className="storeTitle">
          <h1>青山綠水露營地</h1>
          <div className="campShare">
            <div>share</div>
            <div>add</div>
          </div>
        </div>
        <div className="storeIntroduce">
          <div className="briefIntroduce">
            <p>
              布農語在這裡休息。海拔900公尺環境優雅清靜，群山環繞鳥語草香，遠眺玉山、郡大山、望鄉山，舉目所見盡是超寬角的山野景觀。除了提供露營場地、民宿及信義鄉旅遊諮詢，還可在此進行烤肉、營火晚會、體驗布農相關文化等活動，不論是家族出遊，同學會或戶外研習活動甚至想偷一點清靜閒適的朋友們都相當適合
            </p>
          </div>
          <div className="campTags">
            <h4>高雄市桃源區</h4>
            <div>
              <div>/草地</div>
              <div>/親子</div>
              <div>/夜衝</div>
            </div>
            <div className="campTag"></div>
          </div>
        </div>
        <div className="storeGallery">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: 10,
              padding: 10,
            }}
          >
            <div style={{ gridRow: 'span 2' }}>
              <Image
                src={images[0].src}
                alt={images[0].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <Image
                src={images[1].src}
                alt={images[1].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <Image
                src={images[2].src}
                alt={images[2].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <Image
                src={images[3].src}
                alt={images[3].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <Image
                src={images[4].src}
                alt={images[4].alt}
                width={100}
                height={100}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
