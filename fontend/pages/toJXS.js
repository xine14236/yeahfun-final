import React from 'react'
import { Link } from 'next'
import bootstrap from 'bootstrap'
// import Carousel from '@/components/product/carousel'

export default function Detail() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">
            露營樂園
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="/navbarNav"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" href="//">
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  營地
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/">
                  活動
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="pagecontent container mt-4">
        {/* <div className="storeIntroduce" style={{ border: '1px solid red' }}>
          <div className="briefIntroduce">
            <p>
              布農語在這裡休息。海拔900公尺環境優雅清靜，群山環繞鳥語草香，遠眺玉山、郡大山、望鄉山，舉目所見盡是超寬角的山野景觀。除了提供露營場地、民宿及信義鄉旅遊諮詢，還可在此進行烤肉、營火晚會、體驗布農相關文化等活動，不論是家族出遊，同學會或戶外研習活動甚至想偷一點清靜閒適的朋友們都相當適合
            </p>
          </div>
          <div className="campTags" style={{ border: '1px solid orange' }}>
            <h4>高雄市桃源區</h4>
            <div>
              <Link>/草地</Link>
              <Link>/親子</Link>
              <Link>/夜衝</Link>
            </div>
            <div className="campTag"></div>
          </div>
        </div> */}
        {/* <div className="storeGallery">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: 10,
              padding: 10,
            }}
          >
            <div style={{ gridRow: 'span 2' }}>
              <img
                src="/yeahFun_detailPage/image/campGallery1.jpg"
                alt="Camping scene with tents"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src="/yeahFun_detailPage/image/campGallery2.jpg"
                alt="Camping scene"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src="/yeahFun_detailPage/image/campGallery3.jpg"
                alt="Camping scene"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src="/yeahFun_detailPage/image/campGallery4.jpg"
                alt="Camping scene"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div>
              <img
                src="/yeahFun_detailPage/image/campGallery5.jpg"
                alt="Camping scene"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div> */}

        {/* <div id="campingCarousel" class="carousel slide mb-4" data-bs-ride="carousel">
<div class="carousel-inner">
  <div class="carousel-item active">
    <img src="https://via.placeholder.com/800x400?text=露營景色1" class="d-block w-100" alt="露營景色1">
  </div>
  <div class="carousel-item">
    <img src="https://via.placeholder.com/800x400?text=露營景色2" class="d-block w-100" alt="露營景色2">
  </div>
</div>
    </div> */}

        {/* <div
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
        </div> */}

        {/* 輸入日期、人數 */}
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
      </div>

      {/* 營區選擇 */}

      <h3 className="mb-3 campSubtitle">營區選擇</h3>
      <div
        className="row row-cols-1 row-cols-md-3 g-4 mb-4 campAreas"
        style={{ border: '1px solid black' }}
      >
        <div className="col campArea" style={{ border: '1px solid red' }}>
          <div className="thumbNail " style={{ border: '1px solid orange' }}>
            <img
              src="https://via.placeholder.com/300x200?text=帳篷"
              className="card-img-top"
              alt="帳篷"
            />
          </div>
          <div className="campInfo" style={{ border: '1px solid orange' }}>
            <div className="" style={{ border: '1px solid yellow' }}>
              <h5 className="card-title">舒適帳篷</h5>
              <button
                className="btn-square"
                style={{
                  borderRadius: 10,
                  border: '1px solid var(--primary-1, /389B87)',
                  background: '/FFF',
                }}
              >
                詳細內容
              </button>
            </div>
            <div className="campPrice" style={{ border: '1px solid yellow' }}>
              <span>平日價格：＄1000/晚</span>
              <span>假日價格：＄1000/晚</span>
            </div>
          </div>
          <div className="addCart" style={{ border: '1px solid orange' }}>
            <form action="">
              <div style={{ paddingBottom: 0, border: '1px solid darkgray' }} />
              <div className="form-item">
                <span>-</span>
                <input type="number" />
                <span>+</span>
              </div>
              <div className="form-item">
                <button>
                  <span>加入訂房</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col campArea" style={{ border: '1px solid red' }}>
          <div className="thumbNail " style={{ border: '1px solid orange' }}>
            <img
              src="https://via.placeholder.com/300x200?text=帳篷"
              className="card-img-top"
              alt="帳篷"
            />
          </div>
          <div className="campInfo" style={{ border: '1px solid orange' }}>
            <div className="" style={{ border: '1px solid yellow' }}>
              <h5 className="card-title">舒適帳篷</h5>
              <button>詳細內容</button>
            </div>
            <div className="campPrice" style={{ border: '1px solid yellow' }}>
              <span>平日價格：＄1000/晚</span>
              <span>假日價格：＄1000/晚</span>
            </div>
          </div>
          <div className="addCart" style={{ border: '1px solid orange' }}>
            <form action="">
              <div style={{ paddingBottom: 0, border: '1px solid darkgray' }} />
              <div className="form-item">
                <span>-</span>
                <input type="number" />
                <span>+</span>
              </div>
              <div className="form-item">
                <button>
                  <span>加入訂房</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col campArea" style={{ border: '1px solid red' }}>
          <div className="thumbNail " style={{ border: '1px solid orange' }}>
            <img
              src="https://via.placeholder.com/300x200?text=帳篷"
              className="card-img-top"
              alt="帳篷"
            />
          </div>
          <div className="campInfo" style={{ border: '1px solid orange' }}>
            <div className="" style={{ border: '1px solid yellow' }}>
              <h5 className="card-title">舒適帳篷</h5>
              <button>詳細內容</button>
            </div>
            <div className="campPrice" style={{ border: '1px solid yellow' }}>
              <span>平日價格：＄1000/晚</span>
              <span>假日價格：＄1000/晚</span>
            </div>
          </div>
          <div className="addCart" style={{ border: '1px solid orange' }}>
            <form action="">
              <div style={{ paddingBottom: 0, border: '1px solid darkgray' }} />
              <div className="form-item">
                <span>-</span>
                <input type="number" />
                <span>+</span>
              </div>
              <div className="form-item">
                <button>
                  <span>加入訂房</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col campArea" style={{ border: '1px solid red' }}>
          <div className="thumbNail " style={{ border: '1px solid orange' }}>
            <img
              src="https://via.placeholder.com/300x200?text=帳篷"
              className="card-img-top"
              alt="帳篷"
            />
          </div>
          <div className="campInfo" style={{ border: '1px solid orange' }}>
            <div className="" style={{ border: '1px solid yellow' }}>
              <h5 className="card-title">舒適帳篷</h5>
              <button>詳細內容</button>
            </div>
            <div className="campPrice" style={{ border: '1px solid yellow' }}>
              <span>平日價格：＄1000/晚</span>
              <span>假日價格：＄1000/晚</span>
            </div>
          </div>
          <div className="addCart" style={{ border: '1px solid orange' }}>
            <form action="">
              <div style={{ paddingBottom: 0, border: '1px solid darkgray' }} />
              <div className="form-item">
                <span>-</span>
                <input type="number" />
                <span>+</span>
              </div>
              <div className="form-item">
                <button>
                  <span>加入訂房</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col campArea" style={{ border: '1px solid red' }}>
          <div className="thumbNail " style={{ border: '1px solid orange' }}>
            <img
              src="https://via.placeholder.com/300x200?text=帳篷"
              className="card-img-top"
              alt="帳篷"
            />
          </div>
          <div className="campInfo" style={{ border: '1px solid orange' }}>
            <div className="" style={{ border: '1px solid yellow' }}>
              <h5 className="card-title">舒適帳篷</h5>
              <button>詳細內容</button>
            </div>
            <div className="campPrice" style={{ border: '1px solid yellow' }}>
              <span>平日價格：＄1000/晚</span>
              <span>假日價格：＄1000/晚</span>
            </div>
          </div>
          <div className="addCart" style={{ border: '1px solid orange' }}>
            <form action="">
              <div style={{ paddingBottom: 0, border: '1px solid darkgray' }} />
              <div className="form-item">
                <span>-</span>
                <input type="number" />
                <span>+</span>
              </div>
              <div className="form-item">
                <button>
                  <span>加入訂房</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col campArea" style={{ border: '1px solid red' }}>
          <div className="thumbNail " style={{ border: '1px solid orange' }}>
            <img
              src="https://via.placeholder.com/300x200?text=帳篷"
              className="card-img-top"
              alt="帳篷"
            />
          </div>
          <div className="campInfo" style={{ border: '1px solid orange' }}>
            <div className="" style={{ border: '1px solid yellow' }}>
              <h5 className="card-title">舒適帳篷</h5>
              <button>詳細內容</button>
            </div>
            <div className="campPrice" style={{ border: '1px solid yellow' }}>
              <span>平日價格：＄1000/晚</span>
              <span>假日價格：＄1000/晚</span>
            </div>
          </div>
          <div className="addCart" style={{ border: '1px solid orange' }}>
            <form action="">
              <div style={{ paddingBottom: 0, border: '1px solid darkgray' }} />
              <div className="form-item">
                <span>-</span>
                <input type="number" />
                <span>+</span>
              </div>
              <div className="form-item">
                <button>
                  <span>加入訂房</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* <div class="col">
          <div class="card camping-card h-100">
            <img src="https://via.placeholder.com/300x200?text=營火區" class="card-img-top" alt="營火區">
            <div class="card-body">
              <h5 class="card-title">營火區</h5>
              <p class="card-text">晚上可以圍著營火聊天、烤棉花糖，享受露營的樂趣。</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card camping-card h-100">
            <img src="https://via.placeholder.com/300x200?text=戶外活動" class="card-img-top" alt="戶外活動">
            <div class="card-body">
              <h5 class="card-title">戶外活動</h5>
              <p class="card-text">提供各種戶外活動，如健行、釣魚等，豐富您的露營體驗。</p>
            </div>
          </div>
        </div>
      </div> */}
      </div>

      <div className="attractionsNearby">
        {/* 住宿選擇 */}
        <div className="CampAreasWithSubtitle">
          <h3 className="mb-3 campSubtitle">營區選擇</h3>
          <div
            className="row row-cols-1 row-cols-md-3 g-4 mb-4 campAreas"
            style={{ border: '1px solid black' }}
          >
            <div className="col campArea" style={{ border: '1px solid red' }}>
              <div
                className="thumbNail "
                style={{ border: '1px solid orange' }}
              >
                <img
                  src="https://via.placeholder.com/300x200?text=帳篷"
                  className="card-img-top"
                  alt="帳篷"
                />
              </div>
              <div className="campInfo" style={{ border: '1px solid orange' }}>
                <div className="" style={{ border: '1px solid yellow' }}>
                  <h5 className="card-title">舒適帳篷</h5>
                  <button
                    className="btn-square"
                    style={{
                      borderRadius: 10,
                      border: '1px solid var(--primary-1, /389B87)',
                      background: '/FFF',
                    }}
                  >
                    詳細內容
                  </button>
                </div>
                <div
                  className="campPrice"
                  style={{ border: '1px solid yellow' }}
                >
                  <span>平日價格：＄1000/晚</span>
                  <span>假日價格：＄1000/晚</span>
                </div>
              </div>
              <div className="addCart" style={{ border: '1px solid orange' }}>
                <form action="">
                  <div
                    style={{
                      paddingBottom: 0,
                      border: '1px solid darkgray',
                    }}
                  />
                  <div className="form-item">
                    <span>-</span>
                    <input type="number" />
                    <span>+</span>
                  </div>
                  <div className="form-item">
                    <button>
                      <span>加入訂房</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col campArea" style={{ border: '1px solid red' }}>
              <div
                className="thumbNail "
                style={{ border: '1px solid orange' }}
              >
                <img
                  src="https://via.placeholder.com/300x200?text=帳篷"
                  className="card-img-top"
                  alt="帳篷"
                />
              </div>
              <div className="campInfo" style={{ border: '1px solid orange' }}>
                <div className="" style={{ border: '1px solid yellow' }}>
                  <h5 className="card-title">舒適帳篷</h5>
                  <button>詳細內容</button>
                </div>
                <div
                  className="campPrice"
                  style={{ border: '1px solid yellow' }}
                >
                  <span>平日價格：＄1000/晚</span>
                  <span>假日價格：＄1000/晚</span>
                </div>
              </div>
              <div className="addCart" style={{ border: '1px solid orange' }}>
                <form action="">
                  <div
                    style={{
                      paddingBottom: 0,
                      border: '1px solid darkgray',
                    }}
                  />
                  <div className="form-item">
                    <span>-</span>
                    <input type="number" />
                    <span>+</span>
                  </div>
                  <div className="form-item">
                    <button>
                      <span>加入訂房</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col campArea" style={{ border: '1px solid red' }}>
              <div
                className="thumbNail "
                style={{ border: '1px solid orange' }}
              >
                <img
                  src="https://via.placeholder.com/300x200?text=帳篷"
                  className="card-img-top"
                  alt="帳篷"
                />
              </div>
              <div className="campInfo" style={{ border: '1px solid orange' }}>
                <div className="" style={{ border: '1px solid yellow' }}>
                  <h5 className="card-title">舒適帳篷</h5>
                  <button>詳細內容</button>
                </div>
                <div
                  className="campPrice"
                  style={{ border: '1px solid yellow' }}
                >
                  <span>平日價格：＄1000/晚</span>
                  <span>假日價格：＄1000/晚</span>
                </div>
              </div>
              <div className="addCart" style={{ border: '1px solid orange' }}>
                <form action="">
                  <div
                    style={{
                      paddingBottom: 0,
                      border: '1px solid darkgray',
                    }}
                  />
                  <div className="form-item">
                    <span>-</span>
                    <input type="number" />
                    <span>+</span>
                  </div>
                  <div className="form-item">
                    <button>
                      <span>加入訂房</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col campArea" style={{ border: '1px solid red' }}>
              <div
                className="thumbNail "
                style={{ border: '1px solid orange' }}
              >
                <img
                  src="https://via.placeholder.com/300x200?text=帳篷"
                  className="card-img-top"
                  alt="帳篷"
                />
              </div>
              <div className="campInfo" style={{ border: '1px solid orange' }}>
                <div className="" style={{ border: '1px solid yellow' }}>
                  <h5 className="card-title">舒適帳篷</h5>
                  <button>詳細內容</button>
                </div>
                <div
                  className="campPrice"
                  style={{ border: '1px solid yellow' }}
                >
                  <span>平日價格：＄1000/晚</span>
                  <span>假日價格：＄1000/晚</span>
                </div>
              </div>
              <div className="addCart" style={{ border: '1px solid orange' }}>
                <form action="">
                  <div
                    style={{
                      paddingBottom: 0,
                      border: '1px solid darkgray',
                    }}
                  />
                  <div className="form-item">
                    <span>-</span>
                    <input type="number" />
                    <span>+</span>
                  </div>
                  <div className="form-item">
                    <button>
                      <span>加入訂房</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col campArea" style={{ border: '1px solid red' }}>
              <div
                className="thumbNail "
                style={{ border: '1px solid orange' }}
              >
                <img
                  src="https://via.placeholder.com/300x200?text=帳篷"
                  className="card-img-top"
                  alt="帳篷"
                />
              </div>
              <div className="campInfo" style={{ border: '1px solid orange' }}>
                <div className="" style={{ border: '1px solid yellow' }}>
                  <h5 className="card-title">舒適帳篷</h5>
                  <button>詳細內容</button>
                </div>
                <div
                  className="campPrice"
                  style={{ border: '1px solid yellow' }}
                >
                  <span>平日價格：＄1000/晚</span>
                  <span>假日價格：＄1000/晚</span>
                </div>
              </div>
              <div className="addCart" style={{ border: '1px solid orange' }}>
                <form action="">
                  <div
                    style={{
                      paddingBottom: 0,
                      border: '1px solid darkgray',
                    }}
                  />
                  <div className="form-item">
                    <span>-</span>
                    <input type="number" />
                    <span>+</span>
                  </div>
                  <div className="form-item">
                    <button>
                      <span>加入訂房</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col campArea" style={{ border: '1px solid red' }}>
              <div
                className="thumbNail "
                style={{ border: '1px solid orange' }}
              >
                <img
                  src="https://via.placeholder.com/300x200?text=帳篷"
                  className="card-img-top"
                  alt="帳篷"
                />
              </div>
              <div className="campInfo" style={{ border: '1px solid orange' }}>
                <div className="" style={{ border: '1px solid yellow' }}>
                  <h5 className="card-title">舒適帳篷</h5>
                  <button>詳細內容</button>
                </div>
                <div
                  className="campPrice"
                  style={{ border: '1px solid yellow' }}
                >
                  <span>平日價格：＄1000/晚</span>
                  <span>假日價格：＄1000/晚</span>
                </div>
              </div>
              <div className="addCart" style={{ border: '1px solid orange' }}>
                <form action="">
                  <div
                    style={{
                      paddingBottom: 0,
                      border: '1px solid darkgray',
                    }}
                  />
                  <div className="form-item">
                    <span>-</span>
                    <input type="number" />
                    <span>+</span>
                  </div>
                  <div className="form-item">
                    <button>
                      <span>加入訂房</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <div class="col">
              <div class="card camping-card h-100">
                <img src="https://via.placeholder.com/300x200?text=營火區" class="card-img-top" alt="營火區">
                <div class="card-body">
                  <h5 class="card-title">營火區</h5>
                  <p class="card-text">晚上可以圍著營火聊天、烤棉花糖，享受露營的樂趣。</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card camping-card h-100">
                <img src="https://via.placeholder.com/300x200?text=戶外活動" class="card-img-top" alt="戶外活動">
                <div class="card-body">
                  <h5 class="card-title">戶外活動</h5>
                  <p class="card-text">提供各種戶外活動，如健行、釣魚等，豐富您的露營體驗。</p>
                </div>
              </div>
            </div>
          </div> */}
          </div>
          <div className="attractionsNearby">
            <h3 className="mb-3 campSubtitle">周邊景點</h3>
          </div>
        </div>
        <h3 className="mb-3 campSubtitle">位置資訊</h3>
        <div className="ratio ratio-16x9 mb-4">
          {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14562.33858058984!2d120.91373!3d24.110769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDA2JzM4LjgiTiAxMjDCsDU0JzQ5LjQiRQ!5e0!3m2!1szh-TW!2stw!4v1625000000000!5m2!1szh-TW!2stw"
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              /> */}
        </div>
        <footer className="bg-light text-center text-lg-start mt-4">
          <div
            className="text-center p-3"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            © 2024 露營樂園版權所有
          </div>
        </footer>
        <svg style={{ display: 'none' }}>
          <defs>
            <symbol
              id="shower"
              width={26}
              height={29}
              viewBox="0 0 26 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8438 0.625V3.0459C8.92603 3.52918 6.65418 5.80103 6.1709 8.71875H4.90625V11.0312H21.0938V8.71875H19.8291C19.3458 5.80103 17.074 3.52918 14.1562 3.0459V0.625H11.8438ZM13 5.25C15.2177 5.25 16.9114 6.69531 17.4082 8.71875H8.5918C9.08862 6.69531 10.7823 5.25 13 5.25ZM10.6875 12.1875C10.0507 12.1875 9.53125 12.7069 9.53125 13.3438C9.53125 13.9806 10.0507 14.5 10.6875 14.5C11.3243 14.5 11.8438 13.9806 11.8438 13.3438C11.8438 12.7069 11.3243 12.1875 10.6875 12.1875ZM15.3125 12.1875C14.6757 12.1875 14.1562 12.7069 14.1562 13.3438C14.1562 13.9806 14.6757 14.5 15.3125 14.5C15.9493 14.5 16.4688 13.9806 16.4688 13.3438C16.4688 12.7069 15.9493 12.1875 15.3125 12.1875ZM8.375 15.6562C7.73816 15.6562 7.21875 16.1757 7.21875 16.8125C7.21875 17.4493 7.73816 17.9688 8.375 17.9688C9.01184 17.9688 9.53125 17.4493 9.53125 16.8125C9.53125 16.1757 9.01184 15.6562 8.375 15.6562ZM13 15.6562C12.3632 15.6562 11.8438 16.1757 11.8438 16.8125C11.8438 17.4493 12.3632 17.9688 13 17.9688C13.6368 17.9688 14.1562 17.4493 14.1562 16.8125C14.1562 16.1757 13.6368 15.6562 13 15.6562ZM17.625 15.6562C16.9882 15.6562 16.4688 16.1757 16.4688 16.8125C16.4688 17.4493 16.9882 17.9688 17.625 17.9688C18.2618 17.9688 18.7812 17.4493 18.7812 16.8125C18.7812 16.1757 18.2618 15.6562 17.625 15.6562ZM6.0625 19.125C5.42566 19.125 4.90625 19.6444 4.90625 20.2812C4.90625 20.9181 5.42566 21.4375 6.0625 21.4375C6.69934 21.4375 7.21875 20.9181 7.21875 20.2812C7.21875 19.6444 6.69934 19.125 6.0625 19.125ZM10.6875 19.125C10.0507 19.125 9.53125 19.6444 9.53125 20.2812C9.53125 20.9181 10.0507 21.4375 10.6875 21.4375C11.3243 21.4375 11.8438 20.9181 11.8438 20.2812C11.8438 19.6444 11.3243 19.125 10.6875 19.125ZM15.3125 19.125C14.6757 19.125 14.1562 19.6444 14.1562 20.2812C14.1562 20.9181 14.6757 21.4375 15.3125 21.4375C15.9493 21.4375 16.4688 20.9181 16.4688 20.2812C16.4688 19.6444 15.9493 19.125 15.3125 19.125ZM19.9375 19.125C19.3007 19.125 18.7812 19.6444 18.7812 20.2812C18.7812 20.9181 19.3007 21.4375 19.9375 21.4375C20.5743 21.4375 21.0938 20.9181 21.0938 20.2812C21.0938 19.6444 20.5743 19.125 19.9375 19.125ZM3.75 22.5938C3.11316 22.5938 2.59375 23.1132 2.59375 23.75C2.59375 24.3868 3.11316 24.9062 3.75 24.9062C4.38684 24.9062 4.90625 24.3868 4.90625 23.75C4.90625 23.1132 4.38684 22.5938 3.75 22.5938ZM8.375 22.5938C7.73816 22.5938 7.21875 23.1132 7.21875 23.75C7.21875 24.3868 7.73816 24.9062 8.375 24.9062C9.01184 24.9062 9.53125 24.3868 9.53125 23.75C9.53125 23.1132 9.01184 22.5938 8.375 22.5938ZM13 22.5938C12.3632 22.5938 11.8438 23.1132 11.8438 23.75C11.8438 24.3868 12.3632 24.9062 13 24.9062C13.6368 24.9062 14.1562 24.3868 14.1562 23.75C14.1562 23.1132 13.6368 22.5938 13 22.5938ZM17.625 22.5938C16.9882 22.5938 16.4688 23.1132 16.4688 23.75C16.4688 24.3868 16.9882 24.9062 17.625 24.9062C18.2618 24.9062 18.7812 24.3868 18.7812 23.75C18.7812 23.1132 18.2618 22.5938 17.625 22.5938ZM22.25 22.5938C21.6132 22.5938 21.0938 23.1132 21.0938 23.75C21.0938 24.3868 21.6132 24.9062 22.25 24.9062C22.8868 24.9062 23.4062 24.3868 23.4062 23.75C23.4062 23.1132 22.8868 22.5938 22.25 22.5938ZM1.4375 26.0625C0.800659 26.0625 0.28125 26.5819 0.28125 27.2188C0.28125 27.8556 0.800659 28.375 1.4375 28.375C2.07434 28.375 2.59375 27.8556 2.59375 27.2188C2.59375 26.5819 2.07434 26.0625 1.4375 26.0625ZM6.0625 26.0625C5.42566 26.0625 4.90625 26.5819 4.90625 27.2188C4.90625 27.8556 5.42566 28.375 6.0625 28.375C6.69934 28.375 7.21875 27.8556 7.21875 27.2188C7.21875 26.5819 6.69934 26.0625 6.0625 26.0625ZM10.6875 26.0625C10.0507 26.0625 9.53125 26.5819 9.53125 27.2188C9.53125 27.8556 10.0507 28.375 10.6875 28.375C11.3243 28.375 11.8438 27.8556 11.8438 27.2188C11.8438 26.5819 11.3243 26.0625 10.6875 26.0625ZM15.3125 26.0625C14.6757 26.0625 14.1562 26.5819 14.1562 27.2188C14.1562 27.8556 14.6757 28.375 15.3125 28.375C15.9493 28.375 16.4688 27.8556 16.4688 27.2188C16.4688 26.5819 15.9493 26.0625 15.3125 26.0625ZM19.9375 26.0625C19.3007 26.0625 18.7812 26.5819 18.7812 27.2188C18.7812 27.8556 19.3007 28.375 19.9375 28.375C20.5743 28.375 21.0938 27.8556 21.0938 27.2188C21.0938 26.5819 20.5743 26.0625 19.9375 26.0625ZM24.5625 26.0625C23.9257 26.0625 23.4062 26.5819 23.4062 27.2188C23.4062 27.8556 23.9257 28.375 24.5625 28.375C25.1993 28.375 25.7188 27.8556 25.7188 27.2188C25.7188 26.5819 25.1993 26.0625 24.5625 26.0625Z"
                fill="black"
              />
            </symbol>
            <symbol
              id="fire"
              width={24}
              height={31}
              viewBox="0 0 24 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.1211 0.46875L9.9043 1.37207C9.55652 2.9303 7.3208 5.49573 5.02637 8.63477C2.73193 11.7738 0.4375 15.6852 0.4375 20.5947C0.4375 22.9117 1.14661 25.3868 2.89453 27.3154C4.64246 29.244 7.4292 30.5312 11.2051 30.5312C11.3722 30.5312 11.5122 30.4996 11.6748 30.4951C11.7832 30.4996 11.8871 30.5312 12 30.5312C12.3523 30.5312 12.682 30.4906 13.0117 30.459C13.1111 30.45 13.2014 30.4319 13.3008 30.4229C17.1715 30.1022 19.7415 28.9098 21.3223 27.1348C23.1786 25.0526 23.5625 22.4104 23.5625 20.125C23.5625 14.9625 20.5906 10.1614 17.709 6.61133C14.8274 3.06128 11.9277 0.72168 11.9277 0.72168L11.6025 0.46875H10.1211ZM11.4219 3.35938C12.3568 4.1814 13.9331 5.66736 15.9023 8.09277C18.6213 11.4441 21.25 15.8839 21.25 20.125C21.25 22.153 20.8932 24.1177 19.5879 25.5811C19.3079 25.8972 18.9691 26.2043 18.5762 26.4844C19.1995 24.6823 19.064 22.6317 18.6484 20.5947C18.1742 18.2687 17.2754 15.9336 16.4082 14.0547C15.541 12.1758 14.8003 10.8479 14.168 10.1162L13.8428 9.71875H11.6025L12.0361 11.2002C13.2466 15.1342 12.6097 17.8125 11.9277 18.6074C11.589 19.0049 11.4399 19.041 11.0967 18.9326C10.7534 18.8242 10.1346 18.3771 9.54297 17.2705L8.67578 15.6445L7.5918 17.126C5.42834 20.0392 4.59729 23.2324 5.31543 25.9062C5.37866 26.1411 5.47803 26.3715 5.56836 26.5928C5.2251 26.3308 4.90442 26.0643 4.62891 25.7617C3.33716 24.339 2.75 22.4375 2.75 20.5947C2.75 16.4078 4.71924 12.9978 6.90527 10.0078C8.68482 7.57336 10.4192 5.51831 11.4219 3.35938ZM14.9629 16.9092C15.5004 18.2687 16.083 19.6417 16.3721 21.0645C16.7921 23.1331 16.7831 25.0255 16.1914 26.2314C15.7488 27.1348 15.0623 27.7987 13.6621 28.0742C13.5085 28.1058 13.3279 28.1239 13.1562 28.1465C12.7949 28.1781 12.3975 28.2052 12 28.2188C11.8961 28.2188 11.8103 28.2233 11.7109 28.2188C9.20874 28.1375 8.00732 27.0219 7.55566 25.3281C7.18079 23.9325 7.66858 21.9858 8.71191 20.0166C9.22681 20.5496 9.77332 20.938 10.4102 21.1367C11.589 21.5071 12.9033 21.0554 13.6982 20.125C14.3802 19.3256 14.7822 18.219 14.9629 16.9092Z"
                fill="black"
              />
            </symbol>
            <symbol
              id="noSmoking"
              width={36}
              height={33}
              viewBox="0 0 36 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.7998 0.637695L2.1377 2.2998L32.2002 32.3623L33.8623 30.7002L26.5996 23.4375H35.3438V16.5H19.6621L3.7998 0.637695ZM18.0361 2.625C17.6206 3.04053 17.3135 3.53284 16.9521 4.32324C16.5908 5.11365 16.2701 6.1073 16.2656 7.21387C16.2611 8.32043 16.645 9.58508 17.6387 10.5381C18.6323 11.4911 20.1499 12.1099 22.2637 12.3809C24.0251 12.6067 25.1588 12.8958 25.8047 13.2842C26.4506 13.6726 26.717 14.0701 26.9248 15.0186L29.2012 14.5127C28.9031 13.1487 28.1488 11.9879 26.9971 11.2969C25.8453 10.6058 24.4362 10.3077 22.5527 10.0684C20.7506 9.83801 19.7434 9.33215 19.2285 8.83984C18.7136 8.34753 18.5781 7.84168 18.5781 7.21387C18.5781 6.58606 18.7814 5.88147 19.0479 5.29883C19.3143 4.71619 19.7253 4.18774 19.6621 4.25098L18.0361 2.625ZM24.4316 2.98633V5.29883C25.1498 5.29883 26.0757 5.40723 26.7803 5.80469C27.4849 6.20215 28.0811 6.78931 28.2256 8.47852L28.334 9.5625H29.3818C29.978 9.5625 31.2201 9.74768 31.8389 10.2852C32.146 10.5562 32.3447 10.8723 32.417 11.4775C32.4893 12.0828 32.3809 13.0087 31.8389 14.332L34.0068 15.1992C34.6527 13.6274 34.865 12.3221 34.7295 11.1885C34.594 10.0548 34.043 9.15149 33.3564 8.55078C32.3131 7.63843 31.1794 7.40357 30.249 7.32227C29.847 5.65112 29.0115 4.39099 27.9365 3.78125C26.6403 3.04504 25.2898 2.98633 24.4316 2.98633ZM0.65625 16.5V23.4375H20.0957L17.7832 21.125H2.96875V18.8125H15.4707L13.1582 16.5H0.65625ZM21.9746 18.8125H26.0938V21.125H24.2871L21.9746 18.8125ZM28.4062 18.8125H29.5625V21.125H28.4062V18.8125ZM31.875 18.8125H33.0312V21.125H31.875V18.8125Z"
                fill="black"
              />
            </symbol>
            <symbol
              id="wifi"
              width={30}
              height={22}
              viewBox="0 0 30 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 0.09375C9.20068 0.09375 3.96594 2.5011 0.185547 6.34473L1.81152 7.9707C5.17188 4.54712 9.83752 2.40625 15 2.40625C20.1625 2.40625 24.8281 4.54712 28.1885 7.9707L29.8145 6.34473C26.0341 2.5011 20.7993 0.09375 15 0.09375ZM15 5.875C10.7905 5.875 7.0011 7.63196 4.26855 10.4277L5.89453 12.0537C8.20703 9.67798 11.4319 8.1875 15 8.1875C18.5681 8.1875 21.793 9.67798 24.1055 12.0537L25.7314 10.4277C22.9989 7.63196 19.2095 5.875 15 5.875ZM15 11.6562C12.3849 11.6562 10.0363 12.7628 8.35156 14.5107L9.97754 16.1367C11.2422 14.8088 13.0217 13.9688 15 13.9688C16.9783 13.9688 18.7578 14.8088 20.0225 16.1367L21.6484 14.5107C19.9683 12.7628 17.6151 11.6562 15 11.6562ZM15 17.4375C13.9792 17.4375 13.0714 17.8892 12.4346 18.5938L15 21.1592L17.5654 18.5938C16.9286 17.8892 16.0208 17.4375 15 17.4375Z"
                fill="black"
              />
            </symbol>
            <symbol
              id="trash"
              width={24}
              height={29}
              viewBox="0 0 24 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.84375 0.625C9.23853 0.625 8.61975 0.837281 8.18164 1.27539C7.74353 1.7135 7.53125 2.33228 7.53125 2.9375V4.09375H0.59375V6.40625H1.75V24.9062C1.75 26.8077 3.31726 28.375 5.21875 28.375H19.0938C20.9952 28.375 22.5625 26.8077 22.5625 24.9062V6.40625H23.7188V4.09375H16.7812V2.9375C16.7812 2.33228 16.569 1.7135 16.1309 1.27539C15.6927 0.837281 15.074 0.625 14.4688 0.625H9.84375ZM9.84375 2.9375H14.4688V4.09375H9.84375V2.9375ZM4.0625 6.40625H20.25V24.9062C20.25 25.5476 19.7351 26.0625 19.0938 26.0625H5.21875C4.57739 26.0625 4.0625 25.5476 4.0625 24.9062V6.40625ZM6.375 9.875V22.5938H8.6875V9.875H6.375ZM11 9.875V22.5938H13.3125V9.875H11ZM15.625 9.875V22.5938H17.9375V9.875H15.625Z"
                fill="black"
              />
            </symbol>
            <symbol
              id="pet"
              width={32}
              height={29}
              viewBox="0 0 32 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.0625 0.625C9.0625 1.91675 8.04175 2.9375 6.75 2.9375H5.59375C3.0509 2.9375 0.96875 5.01965 0.96875 7.5625C0.96875 10.1053 3.0509 12.1875 5.59375 12.1875H6.93066C6.81323 12.7521 6.75 13.3257 6.75 13.9219V28.375H9.0625V13.9219C9.0625 10.417 11.917 7.5625 15.4219 7.5625C16.4652 7.5625 17.4453 7.80188 18.3125 8.24902V5.75586C17.4092 5.43518 16.4381 5.25 15.4219 5.25C12.1067 5.25 9.22058 7.13342 7.76172 9.875H5.59375C4.302 9.875 3.28125 8.85425 3.28125 7.5625C3.28125 6.27075 4.302 5.25 5.59375 5.25H6.75C9.29285 5.25 11.375 3.16785 11.375 0.625H9.0625ZM19.4688 3.0459V10.4531C19.4688 13.4025 22.1471 15.6562 25.25 15.6562C28.3529 15.6562 31.0312 13.4025 31.0312 10.4531V3.0459L29.2246 4.31055L27.3096 5.64746C26.6501 5.4126 25.9998 5.1416 25.25 5.1416C24.5002 5.1416 23.8499 5.4126 23.1904 5.64746L21.2754 4.31055L19.4688 3.0459ZM25.25 7.4541C25.9185 7.4541 26.5327 7.6167 27.0566 7.8877L27.6709 8.21289L28.249 7.81543L28.7188 7.49023V10.4531C28.7188 11.9752 27.2554 13.3438 25.25 13.3438C23.2446 13.3438 21.7812 11.9752 21.7812 10.4531V7.49023L22.251 7.81543L22.8291 8.21289L23.4434 7.8877C23.9673 7.6167 24.5815 7.4541 25.25 7.4541ZM17.1562 13.3438C13.9675 13.3438 11.375 15.9363 11.375 19.125V28.375H13.6875V19.125C13.6875 17.2145 15.2457 15.6562 17.1562 15.6562C19.0668 15.6562 20.625 17.2145 20.625 19.125V28.375H22.9375V19.125C22.9375 18.0094 22.6213 16.9751 22.0703 16.0898C20.9547 15.5569 20.0198 14.7529 19.3604 13.7773C18.6829 13.4973 17.9331 13.3438 17.1562 13.3438ZM27.5625 16.4512C26.8353 16.686 26.063 16.8125 25.25 16.8125V28.375H27.5625V16.4512Z"
                fill="black"
              />
            </symbol>
            <symbol
              id="fishing"
              width={32}
              height={26}
              viewBox="0 0 32 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.64062 0.9375L10.291 2.52734C10.6975 3.51648 11.2485 5.98706 11.1221 7.15234C9.54578 8.12341 8.57922 9.0719 7.83398 9.8623C6.92163 9.1261 5.11951 7.875 2.125 7.875H0.96875V9.03125C0.96875 11.2444 1.76819 13.042 2.05273 13.6562C1.76367 14.266 0.96875 16.0004 0.96875 18.2812V19.4375H2.125C5.09692 19.4375 6.92163 18.1819 7.83398 17.4502C9.20251 18.8594 11.1537 20.3453 13.6152 21.4609C13.5068 22.1791 13.421 23.1818 13.7236 24.3516L13.9404 25.2188H14.8438C16.271 25.2188 17.4995 24.5096 18.4932 23.8818C19.3062 23.3669 19.6991 23.0056 19.9023 22.834C24.5002 22.6714 27.436 20.1918 29.0078 17.7393C30.6338 15.2054 31.0312 12.6807 31.0312 12.6807L31.0674 12.3916L30.959 12.1025C30.959 12.1025 28.3123 4.83081 21.1309 4.47852C20.3676 3.55261 19.3016 2.78479 17.8066 2.16602C16.0406 1.43433 13.8185 0.9375 11.375 0.9375H9.64062ZM13.001 3.39453C14.4598 3.55713 15.8239 3.85071 16.9033 4.29785C18.3802 4.90759 19.41 5.78381 19.6494 6.17676L19.9746 6.71875H20.625C26.4017 6.71875 28.4794 12.1884 28.6465 12.6445C28.5652 13.0691 28.231 14.6815 27.0566 16.5107C25.7152 18.6019 23.5427 20.5938 19.4688 20.5938H19.0352L18.71 20.8828C18.71 20.8828 18.1002 21.4022 17.2646 21.9307C16.8265 22.2062 16.4517 22.2559 16 22.4365C16.0452 21.9081 16 21.1357 16 21.1357L16.2529 20.124L15.3135 19.7988C12.45 18.7058 10.0155 16.6462 8.77344 15.21L7.97852 14.2705L7.11133 15.1377C7.11133 15.1377 5.57117 16.2172 3.57031 16.7275C3.86841 15.3726 4.3291 14.1621 4.3291 14.1621L4.58203 13.6562L4.3291 13.1504C4.3291 13.1504 3.82776 11.8225 3.53418 10.4043C5.66602 10.874 7.11133 12.1748 7.11133 12.1748L7.97852 13.042L8.77344 12.1025C9.80774 10.9327 12.5945 8.01953 16.6865 7.47754L16.3613 5.20117C15.2548 5.3457 14.2882 5.66638 13.3623 6.03223C13.3036 5.06116 13.2539 4.22559 13.001 3.39453ZM23.5156 11.3438C22.5581 11.3438 21.7812 12.1206 21.7812 13.0781C21.7812 14.0356 22.5581 14.8125 23.5156 14.8125C24.4731 14.8125 25.25 14.0356 25.25 13.0781C25.25 12.1206 24.4731 11.3438 23.5156 11.3438Z"
                fill="black"
              />
            </symbol>
            <symbol
              id="attention"
              width={30}
              height={31}
              viewBox="0 0 30 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.2393 0.962891L18.4443 2.04688L12.7715 9.7793C9.73181 9.25085 6.51599 10.109 4.17188 12.4531L3.34082 13.248L9.4834 19.3906L0.125 28.749V30.375H1.75098L11.1094 21.0166L17.252 27.1592L18.0469 26.3281C20.391 23.984 21.2491 20.7682 20.7207 17.7285L28.4531 12.0557L29.5371 11.2607L19.2393 0.962891ZM19.5283 4.50391L25.9961 10.9717L18.8057 16.2471L18.1553 16.7168L18.3721 17.4756C18.9276 19.5939 18.3224 21.8025 16.999 23.6543L6.8457 13.501C8.69751 12.1776 10.9061 11.5724 13.0244 12.1279L13.7832 12.3447L14.2529 11.6943L19.5283 4.50391Z"
                fill="black"
              />
            </symbol>
          </defs>
        </svg>
      </div>
    </>
  )
}
