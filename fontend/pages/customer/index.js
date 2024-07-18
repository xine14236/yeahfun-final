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
            <li className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/user.svg"
                alt="User"
                width={30}
                height={30}
              />
              <Link href="" className={styles.memberAsideListText}>
                個人資訊
              </Link>
            </li>
            <li className={styles.ListTop}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/shopping-bag.svg"
                alt="User"
                width={30}
                height={30}
              />

              <Link href="" className={styles.memberAsideListText}>
                我的行程
              </Link>
            </li>
            <li className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/star.svg"
                alt="User"
                width={30}
                height={30}
              />

              <Link href="" className={styles.memberAsideListText}>
                口袋名單
              </Link>
            </li>
            <li className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/comment.svg"
                alt="User"
                width={30}
                height={30}
              />
              <Link href="" className={styles.memberAsideListText}>
                我的評價
              </Link>
            </li>
            <li className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/coupon.svg"
                alt="User"
                width={30}
                height={30}
              />
              <Link className={styles.memberAsideListText} href="">
                Fun優惠
              </Link>
            </li>
            <li className={styles.memberAsideList}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/tent.svg"
                alt="User"
                width={30}
                height={30}
              />
              <Link className={styles.memberAsideListText} href="">
                FUN部落
              </Link>
            </li>
            <li className={styles.ListButton}>
              <Image
                className={styles.memberAsideListIcon}
                src="/icon/tree-1.svg"
                alt="User"
                width={30}
                height={30}
              />
              <Link className={styles.memberAsideListText} href="">
                FUN成就
              </Link>
            </li>
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
              {/* <div className="mb-3">
                <label htmlFor="introduction" className="form-label">
                  自我介紹
                </label>
                <textarea
                  name="introduction"
                  id="introduction"
                  className="form-control"
                  rows="4"
                  cols="50"
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
              className={styles.btnSquare}
              onSubmit={handleSubmit}
            >
              修改
            </button>
          </form>
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
