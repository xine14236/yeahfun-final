import React from 'react'
import StoreTitleWrap from '@/components/product//detail/storeTitleWrap'
import StoreNormalInfo from '@/components/product/detail/storeNormalInfo'
import CampAreaSearchBar from '@/components/product/detail/campAreaSearchBar'
import CampAreasList from '@/components/product/detail/campAreasList'
import AttractionsNearby from '@/components/product/detail/attractionsNearby'

export default function Detail2() {
  return (
    <>
      <StoreTitleWrap />
      <StoreNormalInfo />
      <CampAreaSearchBar />
      <CampAreasList />
      <AttractionsNearby />
    </>
  )
}
