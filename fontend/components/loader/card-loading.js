import React from 'react'
// import LoadingImageSvg from './loading-image-svg'
import Image from 'next/image'
import styles from './cardLoading.module.css'

export default function CardLoading({ loading = true }) {
  return (
    <>
      <div className="col">
        <div className={`card h-100 ${styles.cardLoading}`} aria-hidden="true">
          <Image
            className={`card-img-top ${styles.cardImage}`}
            src={
              loading ? '/images/cat/c1-loading.webp' : '/images/cat/c1.webp'
            }
            alt="..."
            width={458}
            height={305}
            style={{ width: '100%', height: 'auto' }} // optional
          />

          <div className="card-body">
            <h5 className="card-title placeholder-glow">
              {loading ? (
                <span className="placeholder col-4"></span>
              ) : (
                'Card Title'
              )}
            </h5>

            {loading ? (
              <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
              </p>
            ) : (
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the cards content.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
