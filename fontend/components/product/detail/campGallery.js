import React from 'react'
import Image from 'next/image'

export default function CampGallery() {
  return (
    <div>
      <div className="campGallery" style={{ border: '1px solid red' }}>
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
              src="../../detail/campGallery1.jpg"
              alt="Camping scene with tents"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <Image
              src="../../detail/campGallery2.jpg"
              alt="Camping scene"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <Image
              src="../../detail/campGallery3.jpg"
              alt="Camping scene"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <Image
              src="../../detail/campGallery4.jpg"
              alt="Camping scene"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div>
            <Image
              src="../../detail/campGallery5.jpg"
              alt="Camping scene"
              width={500} // 圖片的實際寬度
              height={300} // 圖片的實際高度
              layout="responsive" // 新增這行
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
