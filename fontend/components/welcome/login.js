import { useState } from 'react'
import { initUserData, useAuth } from '@/hooks/use-auth'

import { googleLogin, parseJwt, getUserById } from '@/services/user'
import styles from '@/components/welcome/login.module.scss'
import Image from 'next/image'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import Link from 'next/link'
import useFirebase from '@/hooks/use-firebase'
import toast, { Toaster } from 'react-hot-toast'

export default function Login() {
  // auth物件狀態的樣貌:
  // {
  //   isAuth: false,
  //   userData: {
  //     id: 0,
  //     email: '',
  //   }
  // }
  const { loginGoogle, logoutFirebase } = useFirebase()
  const { auth, setAuth, handleCheck, handleLogin, handleLogout } = useAuth()
  // 使用者帳號密碼輸入框
  const [customer, setCustomer] = useState({
    email: '',
    password: '',
  })

  // 顯示密碼的核取方塊使用，切換是否要呈現密碼
  const [showPassword, setShowPassword] = useState(false)
  // 多欄位共用事件處理函式
  const handleFieldChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    // 先阻擋form表單元件的預設送出行為
    e.preventDefault()

    // 表單檢查--- START ---
    // 建立一個新的錯誤訊息物件
    // const newErrors = { username: '', password: '' }

    // 開始檢查
    // if (user.username === '') {
    // if(user.username) 檢查如果有填寫
    // if(!user.username) 檢查如果沒填的話…
    // if (!user.username) {
    //   newErrors.username = '帳號為必填'
    // }

    // if (!user.password) {
    //   newErrors.password = '密碼為必填'
    // }

    // if (user.password.length < 5 || user.password.length > 10) {
    //   newErrors.password ||= '密碼最少6個字元至多10字元'
    // }

    // // 檢查完成後設定到錯誤狀態
    // setErrors(newErrors)

    // // newErrors物件中如果有屬性值不是空白字串時，代表有錯誤發生
    // const hasErrors = Object.values(newErrors).some((v) => v)

    // // 如果有錯誤發生，停止接下來的送到伺服器程式碼
    // if (hasErrors) {
    //   alert('有檢查到錯誤')
    //   return // 在函式內作流程控制用，執行到這會跳出函式執行
    // }
    // 表單檢查--- END ---

    // 檢查都沒問題才會到這裡執行
    handleLogin(customer)
  }

  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginPopup = async (providerData) => {
    console.log(providerData)

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (auth.isAuth) return

    // 向伺服器進行登入動作
    const res = await googleLogin(providerData)

    // console.log(res.data)

    if (res.data.status === 'success') {
      // 從JWT存取令牌中解析出會員資料
      // 注意JWT存取令牌中只有id, username, google_uid, line_uid在登入時可以得到
      const jwtUser = parseJwt(res.data.data.accessToken)
      // console.log(jwtUser)

      const res1 = await getUserById(jwtUser.id)
      //console.log(res1.data)

      if (res1.data.status === 'success') {
        // 只需要initUserData中的定義屬性值，詳見use-auth勾子
        const dbUser = res1.data.data.user
        const userData = { ...initUserData }

        for (const key in userData) {
          if (Object.hasOwn(dbUser, key)) {
            userData[key] = dbUser[key] || ''
          }
        }

        // 設定到全域狀態中
        setAuth({
          isAuth: true,
          userData,
        })

        toast.success('已成功登入')
      } else {
        toast.error('登入後無法得到會員資料')
        // 這裡可以讓會員登出，因為這也算登入失敗，有可能會造成資料不統一
      }
    } else {
      toast.error(`登入失敗`)
    }
  }

  return (
    <>
      <div className={styles.body}>
        <div className={`container ${styles.loginPanel}`}>
          <div className={styles.box}>
            <div className={styles.section1}>
              <h2>歡迎使用</h2>
              <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.inputFrame}>
                  <input
                    className={styles.input}
                    type="text"
                    value={customer.email}
                    name="email"
                    id="email"
                    placeholder="請輸入您的信箱"
                    onChange={handleFieldChange}
                  />
                </div>
                <span className="error">{}</span>
                <div className={styles.inputFrame}>
                  <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    value={customer.password}
                    name="password"
                    id="password"
                    placeholder="請輸入您的密碼"
                    onChange={handleFieldChange}
                  />
                  <label htmlFor="showPassword" className={styles.RemoveRedEye}>
                    {/* 顯示密碼 */}
                    <MdOutlineRemoveRedEye />
                  </label>
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    // checkbox與radio button是以checked來決定呈現狀態
                    checked={showPassword}
                    name="showPassword"
                    id="showPassword"
                    onChange={() => {
                      setShowPassword(!showPassword)
                    }}
                  />
                </div>
                <span className="error">{}</span>
                <button type="submit" className={styles.loginButton}>
                  登入
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCustomer({ email: 'lee@test.com', password: '11111' })
                  }}
                  className={styles.loginButton}
                >
                  一鍵輸入
                </button>
                {/* <button
                  type="button"
                  className={styles.loginButton}
                  onClick={handleLogout}
                >
                  暫時登出鍵
                </button>
                <Link
                  href="/customer"
                  type="button"
                  className={styles.loginButton}
                >
                  個人資料頁
                </Link> */}
              </form>
            </div>
            <div className={styles.section2}>
              <div className={styles.line} />
              <div>或</div>
              <div className={styles.line} />
            </div>
            <div className={styles.section3}>
              <div className={styles.socialMedia}>
                <span className={styles.icon}>
                  <Image
                    src="/facebook.svg"
                    alt="Facebook Icon"
                    width={60}
                    height={60}
                  />
                </span>
                <span className={styles.icon}>
                  <Image
                    src="/google.svg"
                    alt="Google Icon"
                    width={60}
                    height={60}
                    onClick={() => loginGoogle(callbackGoogleLoginPopup)}
                  />
                </span>
              </div>
              <div>
                還沒有帳號嗎?
                <Link href="/welcome/register" className={styles.link}>
                  註冊
                </Link>
              </div>
              <div>
                <Link href="" className={styles.link}>
                  忘記密碼
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* 土司訊息視窗用 */}
        <Toaster />
      </div>
    </>
  )
}
