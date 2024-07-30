import { useRouter } from 'next/router';
import { FaPencil } from "react-icons/fa6";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import styles from './createBlog.module.css'

export default function CreateBlog() {
    const router = useRouter();
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     })
//   }
const MySwal = withReactContent(Swal)
const handleCreate = () => {
    MySwal.fire({
      title: '您確定要新增嗎?',
      text: '按下確認將跳轉到新增頁!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: '取消',
      confirmButtonText: '確定新增!',
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the fetch operation
        fetch('http://localhost:3005/api/blog/create', {
            credentials: 'include', 
          method: 'GET', // or POST/PUT depending on your use case
          headers: {
            'Content-Type': 'application/json',
          },
       
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                MySwal.fire({
                  title: '已創建!',
                  text: 'Blog文章已創建',
                  icon: 'success',
                }).then(() => {
                  // Navigate to another page with insertId in the route
                  router.push(`/blog/add/${data.data.insertId}`);
                });
              } else {
                MySwal.fire({
                  title: '錯誤!',
                  text: data.message,
                  icon: 'error',
                });
              }
        })
        .catch((error) => {
          // Handle fetch error
          console.error('Error:', error);
          Swal.fire({
            title: '錯誤!',
            text: '發生了一些錯誤，請稍後再試。',
            icon: 'error',
          });
        });
      }
    });
  };

  return (
    <>
      <button className={`${styles.goCreate}` } onClick={handleCreate}>

        <FaPencil  size={35} />
      </button>
    </>
  )
}
