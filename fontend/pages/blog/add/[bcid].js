import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


const MyComponent = dynamic(() => import('@/components/blog/test'), {
  ssr: false,
})




export default function Test() {
    const router = useRouter();
    const [value, setValue] = useState('')
    const [blogId,setBlogId]=useState(0)

    useEffect(() => {
    

        if (router.isReady) {
          // 這裡可以得到router.query
    
          setBlogId(router.query.bcid)
        }
        // 以下為注解掉eslint的警告一行
        // eslint-disable-next-line
      }, [router.isReady])
    
  return <MyComponent value={value} setValue={setValue} blogId={blogId}  />
}
