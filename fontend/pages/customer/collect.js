import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import toast, { Toaster } from 'react-hot-toast'
import Loader from '@/components/loader'
import Link from 'next/link'
import styles from '../../styles/customer.module.scss'
import Image from 'next/image'
import { RxCross2 } from 'react-icons/rx'

// import Star from '@/components/icons/star'
// import FavStoreBtn3 from '../icons/fav-store-btn3'
// import { set } from 'lodash'

export default function Index() {
  // 開發期間使用，之後可以從useAuth中得到
  const { auth, handleCheck } = useAuth()
  // const userId = auth?.userData?.id
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [collect, setCollect] = useState([])
  const [img, setImg] = useState([])

  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
  })

  // 按鈕換色
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(null)

  const links = [
    { href: '/customer', icon: '/icon/user.svg', text: '個人資訊' },
    {
      href: '/customer/order',
      icon: '/icon/shopping-bag.svg',
      text: '我的行程',
    },
    { href: '/customer/collect', icon: '/icon/star.svg', text: '口袋名單' },
    { href: '/customer/comments', icon: '/icon/comment.svg', text: '我的評價' },
    { href: '/customer/coupon', icon: '/icon/coupon.svg', text: 'Fun優惠' },
    { href: '/customer/blogs', icon: '/icon/tent.svg', text: 'FUN部落' },
    {
      href: '/customer/achievement',
      icon: '/icon/tree-1.svg',
      text: 'FUN成就',
    },
  ]
  useEffect(() => {
    const currentPath = router.pathname
    const currentIndex = links.findIndex((link) => link.href === currentPath)
    setSelectedIndex(currentIndex)
  }, [router.pathname])

  const handleClick = (index) => {
    setSelectedIndex(index)
  }
  const getCustomer = async () => {
    const url = `http://localhost:3005/api/customer/${userId}`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      setCustomer(resData.data.customer)
      if (resData.status === 'success') {
        const user = resData.data.customer
        // 設定會員資料(除了密碼)
        setCustomer({
          ...customer,
          email: user.email,
          name: user.name,
          phone: user.phone,
          gender: user.gender,
          birthday: user.birthday,
          address: user.address,
        })
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    } catch (e) {
      console.error(e)
    }
  }

  const getCollect = async () => {
    const url = `http://localhost:3005/api/customer/${userId}/collect`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      const resDataImg = resData.data.collect.map((v) => {
        return v.store_img_name.split(',')
      })
      setImg(resDataImg)
      // const imgArray = store_img_name ? img.img_name.split(',') : []

      if (resData.status === 'success' && Array.isArray(resData.data.collect)) {
        // const order = resData.data.order
        setCollect(resData.data.collect)
        // 設定會員資料(除了密碼)

        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const handleClickDelete = async (favId) => {
    const url = `http://localhost:3005/api/customer/${userId}/collect/${favId}`
    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const resData = await res.json()
      console.log(resData)
      if (resData.status === 'success') {
        toast.success('刪除成功')
        getCollect()
      } else {
        toast.error('刪除失敗')
      }
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    // console.log('userId:', userId);
    console.log('auth:', auth)

    if (userId) {
      getCustomer()
      getCollect()
    } else {
      console.log('need check')
      handleCheck()
      // console.og('e',auth.userData.id);
      setUserId(auth.userData.id)
    }
  }, [auth])

  const display = (
    <>
      <div className={styles.body}>
        <div className={`container ${styles.memberCard}`}>
          <ul className={styles.memberAside}>
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`${styles.memberAsideList} ${
                  selectedIndex === index ? styles.clicked : ''
                }`}
                onClick={() => handleClick(index)}
              >
                <Image
                  className={styles.memberAsideListIcon}
                  src={link.icon}
                  alt={link.text}
                  width={30}
                  height={30}
                />
                <span className={styles.memberAsideListText}>{link.text}</span>
              </Link>
            ))}
          </ul>
          <div className={styles.memberFrame}>
            <div className={styles.collectInfoFrame}>
              {collect.map((v, i) => (
                <div key={v.id} className={styles.collectCardFrame}>
                  <RxCross2
                    onClick={() => handleClickDelete(v.id)}
                    className={styles.collectCross}
                  />
                  <Link
                    href={`/detail-test/${v.pid}`}
                    className={styles.collectCard}
                  >
                    <div>
                      <Image
                        className={styles.chiiListImage}
                        src={`/detail/${img[i][0]}`}
                        alt="camp1"
                        width={300}
                        height={200}
                      />
                    </div>
                    <div className={styles.chiiCardBody}>
                      <div className={styles.chiiCardTitle}>
                        <div className={styles.chiiLocationDetail}>
                          <div className={styles.chiiLocationDetailCity}>
                            <svg
                              className={styles.chiiLocationDetailCityIcon}
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 384 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                            </svg>

                            <div className={styles.chiiLocationDetailCityText}>
                              {v.address}
                            </div>
                          </div>
                          <div className={styles.chiiStar}>
                            <svg
                              className={styles.chiiStarIcon}
                              stroke="currentColor"
                              fill="currentColor"
                              stroke-width="0"
                              viewBox="0 0 576 512"
                              height="1em"
                              width="1em"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                            </svg>

                            <div className={styles.chiiStarPoint}>
                              {v.comment_star}
                            </div>
                          </div>
                        </div>
                        <h4 className={styles.chiiLocationName}>
                          {v.store_name}
                        </h4>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
  // 載入指示動畫
  const spinner = (
    <>
      <div className={styles.loadingPage}>
        <Image
          src="/chameleon/v7.svg"
          alt="Chameleon"
          className={styles.loadingPageImg}
          width={150}
          height={150}
        />
        <h2>YeahFun正在為你檢查權限，不要轉台喔！</h2>
      </div>
      <Loader />
    </>
  )
  return <>{isLoading ? spinner : display}</>
}
