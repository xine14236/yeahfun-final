import React from 'react'

export default function StoreNormalInfo() {
  return (
    <>
      <div
        className="storeNormalInfo row mb-4"
        style={{ border: '1px solid black' }}
      >
        <div className="es-col-full">
          <h2>花開滿溢，溫馨田園 ｜有家的感覺｜免裝備露營小屋</h2>
        </div>
        <div className="campDescriptionContent">
          <div className="col-md-8">
            <h3 className="campSubtitle">冒險須知</h3>
            <div className="infoCard">
              <div className="info">
                <svg className="svgIcon">
                  <use href="/shower" />
                </svg>
                <div className="info">提供衛浴。</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/fire" />
                </svg>
                <div className="info">離地焚火，自備薪柴。</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/noSmoking" />
                </svg>
                <div className="info">公共區域，嚴禁抽菸</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/wifi" />
                </svg>
                <div className="info">提供免費wifi</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/trash" />
                </svg>
                <div className="info">嚴格分類，廚餘統一</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/pet" />
                </svg>
                <div className="info">請注意犬吠及清理排遺、露營屋禁入。</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/fishing" />
                </svg>
                <div className="info">營內提供免費垂釣魚池。</div>
              </div>
              <div className="info">
                <svg className="svgIcon">
                  <use href="/attention" />
                </svg>
                <div className="info">
                  每個營位限用1條延長線，規定使用距離最近的插座，禁止私接它處電源
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 campInfoTable">
            <h3 className="campSubtitle">基地資訊</h3>
            <table className="campTable">
              <colgroup span={2} />
              <tbody>
                <tr>
                  <th>GPS座標</th>
                  <td>N23.6281524, E120.8829127</td>
                </tr>
                <tr>
                  <th>提供夜衝</th>
                  <td>是</td>
                </tr>
                <tr>
                  <th>夜衝入場</th>
                  <td>18:00</td>
                </tr>
                <tr>
                  <th>入營時間</th>
                  <td>11:00</td>
                </tr>
                <tr>
                  <th>拔營時間</th>
                  <td>12:00</td>
                </tr>
                <tr>
                  <th>海拔</th>
                  <td>900m</td>
                </tr>
                <tr>
                  <th>冰箱</th>
                  <td>有提供</td>
                </tr>
                <tr>
                  <th>飲水</th>
                  <td>有提供</td>
                </tr>
                <tr>
                  <th>停車</th>
                  <td>車輛請停放碎石地</td>
                </tr>
                <tr>
                  <th>寵物</th>
                  <td>露營屋禁入</td>
                </tr>
                <tr>
                  <th>夜靜時間</th>
                  <td>晚上11點</td>
                </tr>
                <tr>
                  <th>熱水澡</th>
                  <td>全天候供應</td>
                </tr>
                <tr>
                  <th>露營車</th>
                  <td>場地受限暫不開放</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
