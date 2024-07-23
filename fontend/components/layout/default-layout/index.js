// import MyNavbar from './my-navbar-nouse'
// import MyNavbarBS5 from './my-navbar'
import MyNavbar from './my-navbar'
import MyFooter from './my-footer'
import Head from 'next/head'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
import { useLoader } from '@/hooks/use-loader'

export default function DefaultLayout({ title = '野放 || YeahFun', children }) {
  const { loader } = useLoader()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbar />
      <main>
        <div className="container">
          <NextBreadCrumb isHomeIcon isChevron bgClass="" />
          {children}
        </div>
        {loader()}
      </main>
      <MyFooter />
    </>
  )
}
