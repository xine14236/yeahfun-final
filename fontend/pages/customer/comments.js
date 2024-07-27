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
  const [comment, setComment] = useState([])
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

  const getComment = async () => {
    const url = `http://localhost:3005/api/customer/${userId}/comment`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      const resDataImg = resData.data.comment.map((v) => {
        return v.store_img_name.split(',')
      })
      setImg(resDataImg)

      if (resData.status === 'success' && Array.isArray(resData.data.comment)) {
        // const order = resData.data.order
        setComment(resData.data.comment)
        // 設定會員資料(除了密碼)

        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
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
      getComment()
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
              <table className="table">
                <thead className={styles.orderTr}>
                  <tr>
                    <th scope="col">營地</th>
                    <th scope="col">評分</th>
                    <th scope="col">評語</th>
                    {/* <th scope="col">入住日期</th> */}
                    <th scope="col">留言時間</th>
                  </tr>
                </thead>
                <tbody>
                  {comment.map((v, i) => (
                    <tr key={v.id}>
                      <td>
                        {/* <Image
                          src={`/productDetail/${v.img}`}
                          alt="camp1"
                          width={160}
                          height={120}
                        /> */}
                        {v.store_name}
                      </td>
                      <td>{v.comment_star}</td>
                      <td>{v.comment_content}</td>
                      <td>{v.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
