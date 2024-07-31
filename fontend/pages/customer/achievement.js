import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import Loader from '@/components/loader'
import Link from 'next/link'
import styles from '../../styles/customer.module.scss'
import Image from 'next/image'

export default function Index() {
  const { auth, handleCheck } = useAuth()
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  // const [achievement, setAchievement] = useState([])
  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
  })
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [memberPoint, setMemberPoint] = useState(0) // 假設會員的積分

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

  const level = [
    {
      icon: '/chameleon/v1.svg',
      title: '入門會員',
      text: '註冊後即為入門會員',
    },
    {
      icon: '/chameleon/v2.svg',
      title: '晨曦會員',
      text: '消費兩筆即為晨曦會員',
    },
    {
      icon: '/chameleon/v3.svg',
      title: '玄彩會員',
      text: '消費四筆即為玄彩會員',
    },
    {
      icon: '/chameleon/v4.svg',
      title: '斜陽會員',
      text: '消費六筆即為斜陽會員',
    },
    {
      icon: '/chameleon/v5.svg',
      title: '碧海會員',
      text: '消費八筆即為碧海會員',
    },
    {
      icon: '/chameleon/v6.svg',
      title: '彩霞會員',
      text: '消費十筆即為彩霞會員',
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

  const getAchievement = async () => {
    const url = `http://localhost:3005/api/customer/${userId}/achievement`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      // setAchievement(resData.data.achievement)
      setMemberPoint(resData.data.achievement.levels)
      // console.log(resData.data.achievement.levels)
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
    console.log('auth:', auth)

    if (userId) {
      getCustomer()
      getAchievement()
    } else {
      console.log('need check')
      handleCheck()
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
              {level.map((v, i) => {
                let isColored = false

                if (
                  (memberPoint < 200 && i === 0) || // 如果積分小於200，只有第一個等級是彩色
                  (memberPoint >= 200 && memberPoint < 400 && i <= 1) ||
                  (memberPoint >= 400 && memberPoint < 600 && i <= 2) ||
                  (memberPoint >= 600 && memberPoint < 800 && i <= 3) ||
                  (memberPoint >= 800 && memberPoint < 1000 && i <= 4) ||
                  memberPoint >= 1000
                ) {
                  isColored = true
                }

                return (
                  <div
                    key={i}
                    className={`${styles.achieveFrame} ${
                      !isColored ? styles.grayScale : ''
                    }`}
                  >
                    <div className={styles.achieveFrameCircle}>
                      <Image
                        className={styles.achieveFrameImage}
                        src={v.icon}
                        alt="chameleon"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={styles.achieveFrameContent}>
                      <h3>{v.title}</h3>
                      <div className={styles.achieveFrameText}>
                        <h5>{v.text}</h5>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </form>
        </div>
      </div>
    </>
  )

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
