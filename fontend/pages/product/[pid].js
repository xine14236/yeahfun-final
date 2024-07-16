import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import StoreTitleWrap from '@/components/product//detail/storeTitleWrap'
import StoreNormalInfo from '@/components/product/detail/storeNormalInfo'
import CampAreaSearchBar from '@/components/product/detail/campAreaSearchBar'
// import CampAreasList from '@/components/product/detail/campAreasList'
// import StoreDetail from '@/components/product/storeDetail'
// import AttractionsNearby from '@/components/product/detail/attractionsNearby'

export default function Detail() {
  // const router = useRouter()
  // const { pid } = router.query

  // const [people, setPeople] = useState(1)

  // const peopleOptions = new Array(12).fill().map((_, i) => i + 1)

  return (
    <>
      <StoreTitleWrap />
      <StoreNormalInfo />
      <CampAreaSearchBar />
      {/* <CampAreasList /> */}
      {/* <AttractionsNearby /> */}
      <Link href="/product/cart">我是購物車請點擊我</Link>
    </>
  )
}
