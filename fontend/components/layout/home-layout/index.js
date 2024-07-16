import Footer from './footer'
import Header from './header'
import Head from 'next/head'

export default function HomeLayout({ title = 'HomeList', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
