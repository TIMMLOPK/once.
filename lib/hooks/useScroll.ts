import { useEffect, useState } from 'react'

const useScroll = () => {
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    let currentScroll = window.scrollY

    const onScroll = () => {
      if (window.scrollY > currentScroll) {
        setScroll(true)
      } else {
        setScroll(false)
      }
      currentScroll = window.scrollY
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return scroll
}

export default useScroll
