import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic';
import styles from '@/styles/blog.module.scss'
import heart from '@/assets/heart.svg'
import chiiLikes from '@/assets/chiiLike.svg'
import chiiLikes2 from '@/assets/chiiLike2.svg'
import chiiLikes3 from '@/assets/chiiLike3.svg'
import Image from 'next/image'
import { FaSearch } from 'react-icons/fa'
import { DatePicker, Space,Modal } from 'antd'
import blogCategory from '@/data/blog/BlogCategory.json'
import BS5Pagination from '@/components/common/bs5-pagination';
import  useInfiniteScroll  from 'react-infinite-scroll-hook';

import GoTop from '@/components/home/go-top'
import CreateBlog from '@/components/blog/createBlog';
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useAuth } from '@/hooks/use-auth';
const { RangePicker } = DatePicker
const BlogCategoryModal = dynamic(() => import('@/components/blog/blogCategoryModal'), {
  ssr: false,
});




export default function Blog() {
  const { auth } = useAuth()

 
  const initialCate = blogCategory.map((v, i) => {
    return { ...v, checked: false }
  })
  // console.log(initialCate)

  const [blogs, setBlogs] = useState([])
  const [total, setTotal] = useState(0) //總筆數
  const [pageCount, setPageCount] = useState(0) //總頁數
  const [page, setPage] = useState(1)
  const [perpage, setPerPage] = useState(3)

  // 排序
  const [sort, setSort] = useState('id')
  const [order, setOrder] = useState('desc')
  const [nameLike, setNameLike] = useState('')
 


  const [selectedRange, setSelectedRange] = useState([null, null])

  const [category, setCategory] = useState(initialCate)

  const [visible, setVisible] = useState(false);

  const[getSuccess,setGetSuccess]=useState(false)

  // const [favoriteBlogs, setFavoriteBlogs] = useState([]);
  const [hoveredBlogId, setHoveredBlogId] = useState(null);

  const [showModal1, setShowModal1] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 

  let params = {
    page,
    perpage,
    sort,
    order,
    name_like: nameLike,
      categories: category.filter((v) => v.checked === true).map((v) => v.id).join(','),
      date_begin:selectedRange && selectedRange[0] ? selectedRange[0].$d : '' ,
      date_end: selectedRange &&selectedRange[1] ? selectedRange[1].$d : '',
  }


  const handleRangeChange = (dates, dateStrings) => {
    console.log('Selected Range:', dates)
    setSelectedRange(dates) // 更新状态变量
    if (dates) {
      console.log(dates[0].$d)
    }
    setPage(1);
  }

  const getLists = async (params = {}) => {
    const baseUrl = 'http://localhost:3005/api/blog'
    // 轉換params為查詢字串(預設字串)
    const searchParams = new URLSearchParams(params)
    const qs = searchParams.toString()
    const url = `${baseUrl}?${qs}`

    // 使用tyy-catch語句，真的要執行，不同的電腦上，讓和伺服器連線的程式能作錯誤處理
    try {
      const res = await fetch(url,{
        credentials: 'include', 
      method: 'GET', // or POST/PUT depending on your use case
      headers: {
        'Content-Type': 'application/json',
      },
   
    })
      const resData = await res.json()
      console.log(resData)

      if (resData.success === true) {
        setGetSuccess(true)
        setPageCount(resData.data.totalPages)
        setTotal(resData.data.total)
        if (Array.isArray(resData.data.blogs)) {
          if (params.page === 1) {
            setBlogs(resData.data.blogs);
          } else {
            setBlogs((prev) => [...prev, ...resData.data.blogs]);
          }
          setHasNextPage(params.page < resData.data.totalPages);
        }
      }else{
        setGetSuccess(false);
        setBlogs([]);
        setHasNextPage(false);
      }
      setLoading(false);
      // 設定到狀態中 ===>進入update階段，觸發重新渲染(re-render)，呈現資料
      // 確定資料是陣列資料類型才設定到狀態中(最基本的保護)
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }
  const stripHtmlTags = (str,maxLength = 150) => {
    const strippedStr = str.replace(/<[^>]*>/g, ''); // 去除所有 HTML 標籤
  return strippedStr.length > maxLength ? strippedStr.slice(0, maxLength)  : strippedStr; 
    // return str.replace(/<[^>]*>/g, '') // 使用正則表達式去除所有 HTML 標籤
  }

  const handleSearch = () => {
    // 每次搜尋條件後，因為頁數和筆數可能不同，所以要導向第1頁
    setPage(1)

    getLists({ ...params, page: 1 });
   
    
  }

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
   
    setVisible(false);
    handleSearch()
  };

  const handleCancel = () => {
    setVisible(false);
  };
 
  const handleCategoryCheckedAll = (nextChecked, parent = 0) => {
    if (parent === 0) {
      // 全選強制修改所有項目的checked屬性
      const nextCategory = category.map((v, i) => {
        return { ...v, checked: nextChecked }
      })
      setCategory(nextCategory )
    } else {
      // 強制修改所有項目的checked屬性
      const nextCategory = category.map((v, i) => {
        if (v.parent === parent) return { ...v, checked: nextChecked }
        else return v
      })

      setCategory(nextCategory )
    }
  }


  const toggleCheckbox = (category, id) => {
    return category.map((v, i) => {
      // 如果物件資料中的id屬性符合傳入的id時，則切換(or反相)checked的布林值
      if (v.id === id) return { ...v, checked: !v.checked }
      // 否則直接回傳原本的物件值
      else return v
    })
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClickStar = async (id)=>{
    const res = await fetch(`http://localhost:3005/api/blog/fav/${id}?customer=1`,{
      credentials: 'include', 
    method: 'GET', // or POST/PUT depending on your use case
    headers: {
      'Content-Type': 'application/json',
    },
 
  })
    const resData = await res.json()
    console.log(resData.action)
    if (resData.action === 'add') {
      toast.success('已收藏此文章！');
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === id ? { ...blog, fav_id: true } : blog
        )
      );
    } else if (resData.action === 'remove') {
      toast.error('已取消收藏此文章！');
      setBlogs(prevBlogs =>
        prevBlogs.map(blog =>
          blog.id === id ? { ...blog, fav_id: false } : blog
        )
      );
    }
    

  }


  const handleMouseEnter = (id) => {
    setHoveredBlogId(id);
  };

  const handleMouseLeave = () => {
    setHoveredBlogId(null);
  };



  useEffect(() => {
    //  建立搜尋參數物件
  
    // 向伺服器fetch
    getLists(params)
    console.log(params)
  }, [page, perpage, sort, order, auth])



  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: () => setPage((prevPage) => prevPage + 1),
    disabled: loading,
    rootMargin: '0px 0px 400px 0px',
  });

  return (
    <>

      <div className="container">
        <div className={`${styles.blogFilter}`}>
          <div className="row  ">
            <div
              className={`col-12 col-sm-4 col-lg-5  d-flex flex-column  ${styles.filterControl1} ${styles.h150}`}
            >
              <div className="row">
                <div className="col-lg-6 col-12 d-flex align-items-center">
                  <select className="form-select  " value={`${sort},${order}`}
        onChange={(e) => {
          const tv = e.target.value
          setSort(tv.split(',')[0])
          setOrder(tv.split(',')[1])
          setPage(1);
        }}>
                    <option value="id,desc">依時間排序(由新至舊)</option>
                    <option value="id,asc">依時間排序(由舊至新)</option>
                    <option value="author,asc">依作者排序</option>
                    {/* <option value="author,desc">依作者排序(由高至低)</option> */}
                    <option value="likes_count,desc">依喜愛數排序</option>
                    <option value="favorite_count,desc">依收藏數排序</option>
                  </select>
                </div>

                <div className="col-lg-6 col-12 ">
                  <input
                    type="text"
                    className={`form-control  ${styles.filterWidth1}`}
                    value={nameLike}
                    onChange={(e) => {
            setNameLike(e.target.value)
            
          }}
          onKeyDown={handleKeyDown}
                  />
                  <span
                    className={`form-text text-center ${styles.marginInline}`}
                  >
                    透過部落格標題搜尋<FaSearch />
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`col-12 col-sm-6  col-lg-5  d-flex justify-content-evenly align-items-center ${styles.h150}`}
            >
         
         <Space direction="vertical">

                <RangePicker showTime onChange={handleRangeChange} />
         <div className={`form-text text-center `}>
                透過部落格時間搜尋 <FaSearch />
              </div>
               
         </Space>

          
            </div>
            <div
              className={`col-12 col-sm-2 col-lg   d-flex  align-items-center justify-content-sm-center ${styles.h150}` }
              onClick={handleSearch}
            >
                  <button
            type="submit"
            className={`btnGreenPc transition mx-auto `}
            // onClick={handleSearch}
          >
            搜尋<FaSearch  className='ms-3'/>
          </button>
            </div>
            <div className={`col-12  border ${styles.blogcategory}`} onClick={showModal} >點我展開分類搜尋</div>
          </div>

        </div>
        <div className="title mt-5">
          <Image
            src="/images/homepage/title-tree.png"
            alt="tree"
            width={66}
            height={33}
          />
          <div className="titleContent ">
            <h3 className="titleText">Blog</h3>
            <p>露營文章</p>
          </div>
        </div>
        <div className="row" id="card-container"></div>
      </div>
      <div className={`container position-relative `}>
       
      <CreateBlog />
      <Toaster  reverseOrder={false} />
      <div  >
   {blogs.length>0  && blogs.map((v, i) => {
          return (
            <div className={`row ${styles.blogBodyHead}`} id="card-container" key={v.id} onMouseEnter={() => handleMouseEnter(v.id)}
            onMouseLeave={handleMouseLeave}>
           
            <div onClick={()=>{handleClickStar(v.id)}}>
     {v.fav_id? <Image src={chiiLikes2} className={` ${styles.starBoxShow}`}  /> : <Image src={chiiLikes3} className={` ${hoveredBlogId === v.id ? styles.starBoxShow : styles.starBox}`}  />}
      </div>
              {/* 卡片内容会在这里动态生成 */}
              <div
                className={`card col-md-12 ${styles.cardWrapper} ${styles.blogBody} col-lg-9 ${
                  i % 2 === 1 ? `${styles.cardRight}` : `${styles.cardLeft}`
                }`}
              >
                <div className="row g-0 ">
                  <div
                    className={`col-md-5 d-flex flex-column my-auto ${
                      i % 2 === 1 ? `${styles.order1}` : ''
                    } `}
                  >
                    <Link href={`/blog/${v.id}`}> 
                    <Image
                      src={v.img_name? `http://localhost:3005/img-blog/${v.img_name}` :`http://localhost:3005/img-blog/2e0910f14f50dfb9901999ab4dcb50db.webp`}
                      className="img-fluid"
                      alt="..."
                      width={400}
                      height={350}
                      style={{
                        width: '100%',
                        height: 'auto',
                        minHeight: '280px',
                        maxHeight: '400px',
                        objectFit: 'cover',
                      }}
                    />
                     </Link>
                  
                  </div>
                  <div className="col-md-7 d-flex flex-column">
                    <div className={`card-body ${styles.order0}`}>
                      <div className="d-flex flex-column">
                      <Link href={`/blog/${v.id}`}>
                      <h3
                          className={`card-title mt-md-3 ${styles.color1} ${styles.textTruncate2}`}
                        >
                          {v.title}
                        </h3>
                      </Link>
                      
                        <div className="d-flex justify-content-between ">
                          <p className="card-text ">
                            <small className="text-muted">{v.date}</small>
                          </p>
                          <div>
                            <Image src={heart} />
                            <span className="ms-3">{v.likes_count}</span>
                          </div>
                        </div>
                        <p className="card-text text-muted mb-md-5">
                          <small className="text-muted">{v.name}</small>
                        </p>
                        <div
                          className={`card-content mb-md-3 ${styles.textTruncate4}`}
                        >
                          <Link href={`/blog/${v.id}`}> 
                          <h5 className={`card-text ${styles.color3}`}>
                            {stripHtmlTags(v.content)
                              .replace(/\\r\\n/g, '')
                              .replace(/\s+/g, '')
                              .replace(/\&nbsp;/g, '')}
                              
                          </h5>
                           </Link>
                         
                        </div>
                      </div>
                      <Link href={`/blog/${v.id}`} className="text-decoration-none text-end ">
                        <p className={`card-text ${styles.color2}`}>查看更多</p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        {loading && <div>Loading...</div>}
      {!hasNextPage && <div className='d-flex justify-content-center'><h3  className={`${styles.color4}`} >您已經到底了</h3></div>}
        <div ref={sentryRef} />
   </div>
  
      </div>
      
      <GoTop />
      <BlogCategoryModal visible={visible} handleOk={handleOk} handleCancel={handleCancel} initialCate={initialCate} category={category} setCategory={setCategory} toggleCheckbox={toggleCheckbox} handleCategoryCheckedAll={handleCategoryCheckedAll} handleSearch={handleSearch} />
      
    </>
  )
}
