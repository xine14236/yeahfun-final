import Footer from './footer'
import Header from './header'
import Head from 'next/head'
import { useLoader } from '@/hooks/use-loader'

export default function ListLayout({ title = '野放 || YeahFun', children }) {
  const { loader } = useLoader()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      <main>
        {children}
        {loader()}
      </main>
      <Footer />
    </>
  )
}
