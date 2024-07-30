import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/use-auth'
import toast, { Toaster } from 'react-hot-toast'
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

  const [customer, setCustomer] = useState({
    email: '',
    name: '',
    phone: '',
    gender: '',
    birthday: '',
    address: '',
    // introduction: '',
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
          // introduction: user.introduction,
        })
        setTimeout(() => {
          setIsLoading(false)
        }, 1500)
      }
    } catch (e) {
      console.error(e)
    }
  }
  const handleFieldChange = (e) => {
    console.log(e.target.name, e.target.value, e.target.type)
    setCustomer({ ...customer, [e.target.name]: e.target.value })
    // [e.target.name]: e.target.value這樣可以動態的設定物件的屬性名稱
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

      toast.success('修改成功')
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
          <form
            name="form1"
            onSubmit={handleSubmit}
            className={styles.memberFrame}
          >
            <div className={styles.infoFrame}>
              <div className={styles.memberList}>
                <label className={styles.memberListLabel} htmlFor="name">
                  姓名
                </label>
                <input
                  className={styles.memberListInput}
                  type="text"
                  id="name"
                  name="name"
                  value={customer.name}
                  onChange={handleFieldChange}
                />
                {/* <div className="form-text"></div> */}
              </div>
              <div className={styles.memberList}>
                <label className={styles.memberListLabel} htmlFor="email">
                  信箱
                </label>
                <input
                  className={styles.memberListInput}
                  type="text"
                  id="email"
                  name="email"
                  value={customer.email}
                  disabled
                />
                {/* <div className="form-text"></div> */}
              </div>
              <div className={styles.memberList}>
                <label className={styles.memberListLabel} htmlFor="phone">
                  電話
                </label>
                <input
                  className={styles.memberListInput}
                  type="tel"
                  id="phone"
                  name="phone"
                  value={customer.phone}
                  onChange={handleFieldChange}
                />
                {/* <div className="form-text"></div> */}
              </div>
              <div className={styles.memberList}>
                <label className={styles.memberListLabel} htmlFor="gender">
                  性別
                </label>
                <input
                  className={styles.memberListInput}
                  type="text"
                  id="gender"
                  name="gender"
                  value={customer.gender}
                  onChange={handleFieldChange}
                />
                {/* <select name="gender" id="gender">
                  <option value="male">男性</option>
                  <option value="female">女性</option>
                  <option value="other">其他</option>
                </select> */}
              </div>
              <div className={styles.memberList}>
                <label className={styles.memberListLabel} htmlFor="birthday">
                  生日
                </label>
                <input
                  type="date"
                  className={styles.memberListInput}
                  id="birthday"
                  name="birthday"
                  value={customer.birthday}
                  onChange={handleFieldChange}
                />
                {/* <div className="form-text"></div> */}
              </div>
              <div className={styles.memberList}>
                <label className={styles.memberListLabel} htmlFor="address">
                  地址
                </label>
                <input
                  type="text"
                  className={styles.memberListInput}
                  id="address"
                  name="address"
                  value={customer.address}
                  onChange={handleFieldChange}
                />
              </div>
              {/* <div className={styles.memberList}>
                <label htmlFor="introduction" className="form-label">
                  自我介紹
                </label>
                <textarea
                  name="introduction"
                  id="introduction"
                  className="form-control"
                  rows="4"
                  cols="50"
                  value={customer.introduction}
                ></textarea>
              </div> */}
              {/* <div className="memberList">
                <label htmlFor="id_card" className="form-label">
                  身分證字號
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="id_card"
                  name="id_card"
                  value=""
                />
                <div className="form-text"></div>
              </div> */}
              {/* <input
                type="hidden"
                className="form-control"
                id="id"
                name="id"
                value=""
              /> */}
            </div>
            <button
              type="submit"
              className="btnOrangePc"
              onSubmit={handleSubmit}
            >
              修改
            </button>
          </form>
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
