import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

// import { checkAuth, getFavs } from '@/services/user'

// 1. 建立與導出它
// defaultValue是在套用context失敗時才會出現的值，可以使用有意義的預設值，或使用null(目的是為了除錯)。
const AuthContext = createContext(null)

export const initUserData = {
  id: 0,
  email: '',
  name: '',
  google_uid: '',
  // line_uid: '',
}

// 2. 建立一個Context Provider元件
// 目的: 將所有要共享狀態集中統一管理，提供給上層元件(_app.js)使用
// props.children屬性，代表包覆在Provider中所有的子女元件
export function AuthProvider({ children }) {
  // 建立路由器
  const router = useRouter()

  // 會員使用的認証&授權狀態
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: initUserData,
    // {
    //   id: 0,
    //   email: '',
    //   name: '',
    //   google_uid: '',
    //   // line_uid: '',
    // }
  })
  // 解析accessToken用的函式
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }
  const handleLogout = async () => {
    try {
      const url = 'http://localhost:3005/api/welcome/logout'
      const res = await fetch(url, {
        credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      })

      const resData = await res.json()
      // console.log(resData)

      if (resData.status === 'success') {
        // 設定全域的AuthContext(useAuth勾子)
        const nextAuth = {
          isAuth: false,
          userData: {
            id: 0,
            email: '',
            name: '',
            phone: '',
          },
        }

        setAuth(nextAuth)
      }

      toast.success('成功登出')
      router.push('/welcome/login')
    } catch (e) {
      console.error(e)
    }
  }
  const handleLogin = async (customer) => {
    try {
      const url = 'http://localhost:3005/api/welcome/login'
      const res = await fetch(url, {
        credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      })

      const resData = await res.json()
      console.log(resData)
      if (resData.status === 'success') {
        // 從jwt中剖析出其中的會員資訊(id, email)
        const payload = parseJwt(resData.data.accessToken)
        console.log(payload)

        // 設定全域的AuthContext(useAuth勾子)
        const nextAuth = {
          isAuth: true,
          userData: {
            id: payload.id,
            email: payload.email,
            name: payload.name,
            phone: payload.phone,
          },
        }

        setAuth(nextAuth)

        toast.success('登入成功')
        router.push('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 註冊路由
  // 登入路由 - 當要進入隱私路由但未登入時，會跳轉到登入路由
  const loginRoute = '/welcome/login'
  // 隱私(保護)路由
  const protectedRoutes = ['/customer']

  const handleCheck = async () => {
    try {
      const url = 'http://localhost:3005/api/welcome/check'
      const res = await fetch(url, {
        credentials: 'include', // 設定cookie或是存取隱私資料時要加這個參數
        method: 'GET',
      })

      const resData = await res.json()
      console.log(resData)

      if (resData.status === 'success') {
        const customer = resData.data.customer
        // 設定全域的AuthContext(useAuth勾子)
        const nextAuth = {
          isAuth: true,
          userData: {
            id: customer.id,
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
          },
        }
        // console.log(nextAuth);
        setAuth(nextAuth)
      } else {
        // 作隱私路由跳轉
        if (protectedRoutes.includes(router.pathname)) {
          // 減緩跳轉時間
          setTimeout(() => {
            toast.error('無進入權限，請先登入!')
            router.push(loginRoute)
          }, 1500)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  // 取得包含 token 的檔頭
  const getAuthHeader = () => {
    const token = Cookies.get('accessToken') // 從 cookie 中取得 accessToken
    // console.log('Token:', token)
    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      }
    }
    return {}
  }

  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      handleCheck()
    }
    // 加入router.pathname是為了要在伺服器檢查後
    // 如果是隱私路由+未登入，就要執行跳轉到登入頁路由的工作
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        handleCheck,
        handleLogin,
        handleLogout,
        parseJwt,
        getAuthHeader,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// 3. 建立一個包裝useContext與對應context的專用函式
// 目的: 讓消費者們(consumers)方便呼叫使用共享狀態，提高可閱讀性
export const useAuth = () => useContext(AuthContext)
