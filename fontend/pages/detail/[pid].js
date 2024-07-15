import React from 'react'
import StoreTitleWrap from '@/components/product//detail/storeTitleWrap'
// import StoreTitleWrapV1 from '@/components/product//detail/storeTitleWrapV1'
import StoreNormalInfo from '@/components/product/detail/storeNormalInfo'
import CampAreaSearchBar from '@/components/product/detail/campAreaSearchBar'
import CampAreasList from '@/components/product/detail/campAreasList'
import AttractionsNearby from '@/components/product/detail/attractionsNearby'

export default function Detail2() {
  return (
    <>
      <StoreTitleWrap />
      {/* <StoreTitleWrapV1 /> */}
      <StoreNormalInfo />
      <CampAreaSearchBar />
      <CampAreasList />
      <AttractionsNearby />
    </>
  )
}
