import GoTopIcon from '@/components/icons/go-top-icon'

export default function GoTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <button onClick={scrollToTop}>
        <GoTopIcon className="goTop" size={50} />
      </button>
    </>
  )
}
