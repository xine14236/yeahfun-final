import { useEffect } from 'react'
// 樣式
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.scss'
// import '@/styles/product.scss'
import '@/styles/cart.scss'
import '@/styles/loader.scss'
import '@/styles/react-paginate.scss'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '@/styles/swiper.scss'
import 'bootstrap/dist/css/bootstrap.min.css'


import { ConfigProvider } from 'antd'
import theme from '@/theme/themeConfig'
// 載入購物車context
import { CartProvider } from '@/hooks/use-cart-state'
// 載入認証用context
import { AuthProvider } from '@/hooks/use-auth'
// 載入動畫context
import { LoaderProvider } from '@/hooks/use-loader'

import DefaultLayout from '@/components/layout/default-layout'
// 自訂用載入動畫元件
import {
  CatLoader,
  NoLoader,
  CircleLoader,
} from '@/hooks/use-loader/components'

import { CartProviderNew } from '@/hooks/cart-hook'

import Modal from 'react-modal'
Modal.setAppElement('#__next')

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js')
  }, [])

  // 使用預設排版檔案，對應`components/layout/default-layout/index.js`
  // 或`components/layout/default-layout.js`
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <CartProviderNew>
      <ConfigProvider theme={theme}>
        <AuthProvider>
          <LoaderProvider close={4} CustomLoader={CircleLoader}>
            <CartProvider>
              {getLayout(<Component {...pageProps} />)}
            </CartProvider>
          </LoaderProvider>
        </AuthProvider>
      </ConfigProvider>
    </CartProviderNew>
  )
}
