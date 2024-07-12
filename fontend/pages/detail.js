import React from 'react'
import StoreTitleWrap from '@/components/product/storeTitleWrap'
import StoreNormalInfo from '@/components/product/storeNormalInfo'
import CampAreaSearchBar from '@/components/product/campAreaSearchBar'
import CampAreasList from '@/components/product/campAreasList'
import AttractionsNearby from '@/components/product/attractionsNearby'

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
