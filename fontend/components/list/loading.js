import { useEffect } from 'react'
import { useLoader } from '@/hooks/use-loader'
import CardLoading from '@/components/loader/card-loading'

const numberOfItems = 12 // 要顯示的項目數
export default function Loading() {
  const { showLoader, loading } = useLoader()

  // didmount-初次渲染
  useEffect(() => {
    showLoader()
  }, [])

  return (
    <>
      {Array(12)
        .fill(1)
        .map((v, i) => {
          return <CardLoading key={i} loading={loading} />
        })}
    </>
  )
}
