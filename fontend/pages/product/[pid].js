import React, { useState } from "react";
import StoreDetail from "@/components/product/storeDetail";
import { useRouter } from "next/router";

export default function Detail() {
  const router = useRouter();
  const { pid } = router.query;

  const [people, setPeople] = useState(1);

  const peopleOptions = new Array(12).fill().map((_, i) => i + 1);

  return (
    <>
      {/* 輸入日期、人數 */}
      <div className="campAreaSearchBar" style={{ border: "1px solid red" }}>
        <form className="inputDateAndNumber" action="">
          <div className="inputDate">
            <div
              htmlFor=""
              style={{
                color: "var(--white, #FFF)",
                fontFamily: "Inter",
                fontSize: 18,
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              請選擇入住日期：
            </div>
            <input type="text" />
          </div>

          <div className="inputNumber">
            要住幾人房?
            <select
              htmlFor=""
              style={
                {
                  // color: 'var(--white, #FFF)',
                  // fontFamily: 'Inter',
                  // fontSize: 18,
                  // fontStyle: 'normal',
                  // fontWeight: 500,
                  // lineHeight: 'normal',
                }
              }
              value={people}
              onChange={(e) => {
                setPeople(e.target.value);
              }}
            >
              {/* 為了要對應初始的city狀態，加入這個初始或未選擇的選項 */}
              <option value="">請選擇人數</option>
              {peopleOptions.map((v, i) => {
                return (
                  <option key={i} value={v}>
                    {v}
                  </option>
                );
              })}
            </select>
          </div>
        </form>
      </div>

      {/* pid && ( ... )：条件判断，避免在 pid 不存在时出现渲染错误或异常情况。 */}
      {pid && (
        <>
          <StoreDetail title="房型選擇" type="bed" pid={pid} people={people} />
          <StoreDetail title="營區選擇" type="tent" pid={pid} people={people} />
        </>
      )}
    </>
  );
}
