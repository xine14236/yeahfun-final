import dynamic from 'next/dynamic'

const MyComponent = dynamic(() => import('@/components/blog/test'), {
  ssr: false,
})

export default function Test() {
  return <MyComponent />
}
