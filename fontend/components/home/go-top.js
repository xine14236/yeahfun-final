import GoTopIcon from '@/components/icons/go-top-icon'
import { motion } from 'framer-motion'

export default function GoTop() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <motion.button
        onClick={scrollToTop}
        className="goTop"
        whileHover={{ scale: 1.1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        <GoTopIcon size={50} />
      </motion.button>
    </>
  )
}
