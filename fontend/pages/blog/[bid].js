import React from 'react'
import Carousel from '@/components/blog/carousel'

export default function blogDetail() {
  return (
    <>
      <div className="row">
      <Carousel/>
      </div>
      <div className="row">
        <div className="col-12 col-md-9 border" ></div>
        <div className="col-12 col-md-3 border"></div>
      </div>
    </>
  )
}
