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
  const [blog, setBlog] = useState([])
  // const [img, setImg] = useState([])

  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
  })

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
  const getBlog = async () => {
    const url = `http://localhost:3005/api/customer/${userId}/blog`
    try {
      const res = await fetch(url)
      const resData = await res.json()
      console.log(resData)
      // const resDataImg = resData.data.blog.map((v) => {
      //   return v.img_name.split(',')
      // })
      // setImg(resDataImg)

      if (resData.status === 'success' && Array.isArray(resData.data.blog)) {
        // const order = resData.data.order
        setBlog(resData.data.blog)
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

  useEffect(() => {
    // console.log('userId:', userId);
    console.log('auth:', auth)

    if (userId) {
      getCustomer()
      getBlog()
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
            <div className={styles.infoFrame}>
              <table className="table">
                <thead className={styles.orderTr}>
                  <tr>
                    <th scope="col">部落照片</th>
                    <th scope="col">部落名稱</th>
                    {/* <th scope="col">部落內容</th> */}
                  </tr>
                </thead>
                <tbody>
                  {blog.map((v, i) => (
                    <tr key={v.id}>
                      <td>
                        <Image
                          src={
                            v.img_name
                              ? `http://localhost:3005/img-blog/${v.img_name}`
                              : `http://localhost:3005/img-blog/2e0910f14f50dfb9901999ab4dcb50db.webp`
                          }
                          alt="img"
                          width={160}
                          height={120}
                        />
                      </td>
                      <td>{v.title}</td>
                      {/* <td className={styles.content}>{v.content}</td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
