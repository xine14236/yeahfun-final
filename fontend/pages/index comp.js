import HomeLayout from '@/components/layout/home-layout'
import Header from '@/components/home/header'
import { useState } from 'react'
import { useEffect } from 'react'
import 'swiper/css'
import GoTop from '@/components/home/go-top'
import Section02 from '@/components/home/section02'
import Section03 from '@/components/home/section03'
import Section04 from '@/components/home/section04'
import Section05 from '@/components/home/section05'

export default function Home() {
  const [products, setProducts] = useState([])
  const [blog, setBlog] = useState([])
  const [tag, setTag] = useState([])
  const [tag2, setTag2] = useState([])
  const [tag3, setTag3] = useState([])
  const [swiperInstance, setSwiperInstance] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const [swiperInstances, setSwiperInstances] = useState([])
  const [autoplayStatus, setAutoplayStatus] = useState('自動切換暫停了')

  const tags = [
    {
      data: tag,
      name: '櫻花祭',
    },
    {
      data: tag2,
      name: '親子共遊',
    },
    {
      data: tag3,
      name: '森林系',
    },
  ]

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex)
  }

  const handleButtonClick = (index) => {
    if (swiperInstances[index]) {
      swiperInstances[index].slideToLoop(index)
    }
  }

  const fetchData = async () => {
    try {
      const [productsRes, blogRes, tagRes, tag2Res, tag3Res] =
        await Promise.all([
          fetch('http://localhost:3005/api/home'),
          fetch('http://localhost:3005/api/home-blog'),
          fetch('http://localhost:3005/api/home02'),
          fetch('http://localhost:3005/api/home03'),
          fetch('http://localhost:3005/api/home04'),
        ])

      const [productsData, blogData, tagData, tag2Data, tag3Data] =
        await Promise.all([
          productsRes.json(),
          blogRes.json(),
          tagRes.json(),
          tag2Res.json(),
          tag3Res.json(),
        ])

      if (
        productsData.status === 'success' &&
        Array.isArray(productsData.data.stores)
      ) {
        setProducts(productsData.data.stores)
      }
      if (blogData.status === 'success' && Array.isArray(blogData.data.blogs)) {
        setBlog(blogData.data.blogs)
      }
      if (tagData.status === 'success' && Array.isArray(tagData.data.tag)) {
        setTag(tagData.data.tag)
      }
      if (tag2Data.status === 'success' && Array.isArray(tag2Data.data.tag)) {
        setTag2(tag2Data.data.tag)
      }
      if (tag3Data.status === 'success' && Array.isArray(tag3Data.data.tag)) {
        setTag3(tag3Data.data.tag)
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    <>
      <Header />
      <Section02
        products={products}
        swiperInstances={swiperInstances}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        onSwiperInit={onSwiperInit}
      />
      <Section03 blog={blog} />
      <Section04
        tags={tags}
        activeIndex={activeIndex}
        handleButtonClick={handleButtonClick()}
        setSwiperInstance={setSwiperInstance}
        handleSlideChange={handleSlideChange}
      />
      <Section05 />

      <GoTop />
    </>
  )
}
Home.getLayout = function (page) {
  return <HomeLayout>{page}</HomeLayout>
}
