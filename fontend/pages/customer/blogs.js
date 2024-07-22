import { useState, useEffect } from 'react'
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
  // const [blog, setBlog] = useState([])
  // const [img, setImg] = useState([])

  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
  })
  //   const [errors, setErrors] = useState({
  //     email: '',
  //     name: '',
  //     phone: '',
  //     gender: '',
  //     birthday: '',
  //     address: '',
  //   })
  // 按鈕換色

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
          {/* <ul className={styles.memberAside}>
            <Link
              href=""
              className={`${styles.memberAsideList} ${
                isClicked ? styles.clicked : ''
              }`}
              onClick={handleClick}
            >
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/user.svg"
                alt="User"
                width={30}
                height={30}
              />
              <span className={styles.memberAsideListText}>個人資訊</span>
            </Link>
            <Link
              href=""
              className={`${styles.memberAsideList} ${
                isClicked ? styles.clicked : ''
              }`}
            >
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/shopping-bag.svg"
                alt="User"
                width={30}
                height={30}
              />

              <span href="" className={styles.memberAsideListText}>
                我的行程
              </span>
            </Link>
            <Link href="" className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/star.svg"
                alt="User"
                width={30}
                height={30}
              />

              <span href="" className={styles.memberAsideListText}>
                口袋名單
              </span>
            </Link>
            <Link href="" className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/comment.svg"
                alt="User"
                width={30}
                height={30}
              />
              <span href="" className={styles.memberAsideListText}>
                我的評價
              </span>
            </Link>
            <Link href="" className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/coupon.svg"
                alt="User"
                width={30}
                height={30}
              />
              <span className={styles.memberAsideListText} href="">
                Fun優惠
              </span>
            </Link>
            <Link href="" className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/tent.svg"
                alt="User"
                width={30}
                height={30}
              />
              <span href="" className={styles.memberAsideListText}>
                FUN部落
              </span>
            </Link>
            <Link href="" className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/tree-1.svg"
                alt="User"
                width={30}
                height={30}
              />
              <span className={styles.memberAsideListText} href="">
                FUN成就
              </span>
            </Link>
          </ul> */}
          <div className={styles.memberFrame}>
            <div className={styles.infoFrame}></div>
            <button
              type="submit"
              className={styles.btnSquare}
              onSubmit={handleSubmit}
            >
              修改
            </button>
          </div>
        </div>
      </div>
    </>
  )
  // 載入指示動畫
  const spinner = (
    <>
      <h1>正向伺服器查詢是否有權限進入...</h1>
      <Loader />
    </>
  )
  return <>{isLoading ? spinner : display}</>
}
