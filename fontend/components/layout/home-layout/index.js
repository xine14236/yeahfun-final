import Footer from './footer'
import Header from '../../home/header'
import Head from 'next/head'
import { useLoader } from '@/hooks/use-loader'

export default function HomeLayout({ title = '野放 || YeahFun', children }) {
  const { loader } = useLoader()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>

      <main>
        {children}
        {loader()}
      </main>
      <Footer />
    </>
  )
}
