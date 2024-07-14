import React from 'react'
import ListNavbar from './list-navbar'
import ListForm from '@/components/list/list-form'
import WhiteLogo from '@/components/icons/white-logo'

export default function Header() {
  return (
    <>
      <header>
        <div className="kv d-flex flex-column">
          <ListNavbar />
          <WhiteLogo width={100} className={'whiteLogo'} />
        </div>
        <ListForm />
      </header>
      <style jsx>
        {`
          .kv {
            flex-direction: column;
            width: 100%;
            height: 300px;
            background: url(/images/homepage/kv.jpg) lightgray 50% / cover
              no-repeat;
            background-blend-mode: multiply;
          }
          .whiteLogo {
            margin: 0 auto;
          }
          @media (max-width: 576px) {
            .kv {
              height: 0;
              background: transparent;
            }
          }
        `}
      </style>
    </>
  )
}
