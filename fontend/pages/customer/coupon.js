import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import Loader from '@/components/loader'
import Link from 'next/link'
import styles from '../../styles/customer.module.scss'
import Image from 'next/image'
// import { set } from 'lodash'

export default function Index() {
  // 開發期間使用，之後可以從useAuth中得到
  const { auth, handleCheck } = useAuth()
  // const userId = auth?.userData?.id
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [coupon, setCoupon] = useState([])

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
  const getCoupon = async () => {
    const url = `http://localhost:3005/api/customer/${userId}/coupon`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      setCoupon(resData.data.coupon)
    } catch (e) {
      console.error(e)
    }
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

  const handleSubmit = async (e) => {
    // 阻擋表單預設送出行為
    e.preventDefault()

    try {
      const updatedCustomer = {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        gender: customer.gender,
        birthday: customer.birthday,
        address: customer.address,
      }

      if (customer.password) {
        updatedCustomer.password = customer.password
      }

      const url = `http://localhost:3005/api/customer/${userId}/profile`
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCustomer),
      })

      const resData = await res.json()
      console.log(resData)

      alert('修改成功')
    } catch (e) {
      console.error(e)
    }
  }
  useEffect(() => {
    // console.log('userId:', userId);
    console.log('auth:', auth)

    if (userId) {
      getCustomer()
      getCoupon()
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
          <form
            name="form1"
            onSubmit={handleSubmit}
            className={styles.memberFrame}
          >
            <div className={styles.infoFrame}>
              {coupon.map((v, i) => (
                <div key={v.id} className={styles.couponFrame}>
                  <div className={styles.couponFrameCircle}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="63"
                      height="52"
                      viewBox="0 0 63 52"
                      fill="none"
                    >
                      <path
                        d="M18.3096 1.31331C15.1418 -0.128525 11.505 1.03091 10.1997 3.89881L7.83305 9.0984C7.50764 9.81334 7.91656 10.6762 8.55416 11.2508C10.0009 12.5468 10.5505 14.5524 9.77392 16.2586C8.99737 17.9647 7.12398 18.8675 5.19652 18.6277C4.34445 18.5243 3.42523 18.7826 3.09982 19.4976L0.733205 24.6972C-0.572131 27.5651 0.942104 31.069 4.1099 32.5109L44.313 50.8095C47.4808 52.2513 51.1176 51.0919 52.423 48.224L54.7896 43.0244C55.115 42.3095 54.7061 41.4466 54.0685 40.872C52.6217 39.576 52.0722 37.5704 52.8487 35.8642C53.6253 34.1581 55.4987 33.2553 57.4261 33.4951C58.2782 33.5985 59.1974 33.3402 59.5228 32.6252L61.8894 27.4256C63.1948 24.5577 61.6805 21.0538 58.5127 19.6119L18.3096 1.31331ZM19.9113 13.0267L13.9948 26.0257C13.6694 26.7406 14.0492 27.6196 14.839 27.9791L40.6838 39.7425C41.4735 40.1019 42.3859 39.8111 42.7113 39.0961L48.6279 26.0971C48.9533 25.3822 48.5734 24.5032 47.7837 24.1437L21.9388 12.3803C21.1491 12.0209 20.2367 12.3117 19.9113 13.0267ZM17.6313 10.4197C18.2858 8.98173 20.0979 8.40403 21.6863 9.12699L50.4028 22.1974C51.9912 22.9204 52.7457 24.6663 52.0912 26.1043L44.9913 41.7031C44.3368 43.1411 42.5247 43.7188 40.9364 42.9958L12.2198 29.9254C10.6314 29.2024 9.87696 27.4565 10.5315 26.0185L17.6313 10.4197Z"
                        fill="#FDAF17"
                      />
                    </svg>
                  </div>
                  <div className={styles.couponFrameContent}>
                    <h3>{v.name}</h3>
                    <h5>{v.directions}</h5>
                    <p>
                      {v.time_start} ~ {v.time_end}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
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
        <h2>正向伺服器查詢是否有權限進入...</h2>
      </div>
      <Loader />
    </>
  )
  return <>{isLoading ? spinner : display}</>
}
