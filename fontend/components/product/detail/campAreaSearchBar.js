import React from 'react'

export default function CampAreaSearchBar() {
  return (
    <>
              <div className="campAreaSearchBar" style={{ border: '1px solid red' }}>
          <form className="inputDateAndNumber" action="">
            <div className="inputDate">
              <div
                htmlFor=""
                style={{
                  color: 'var(--white, /FFF)',
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                請選擇入住日期：
              </div>
              <input type="text" />
            </div>
            <div className="inputNumber">
              <span
                htmlFor=""
                style={{
                  color: 'var(--white, /FFF)',
                  fontFamily: 'Inter',
                  fontSize: 18,
                  fontStyle: 'normal',
                  fontWeight: 500,
                  lineHeight: 'normal',
                }}
              >
                請選擇入住人數：
              </span>
              <input type="text" />
            </div>
          </form>
        </div>
    </>
  )
}
