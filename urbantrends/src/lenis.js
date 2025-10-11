// src/lenis.js
import Lenis from "lenis"
import { useEffect, useState } from "react"

let lenisInstance = null

export const initLenis = () => {
  if (lenisInstance) return lenisInstance // prevent re-init

  lenisInstance = new Lenis({
    duration: 1.3,
    smooth: true,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  })

  function raf(time) {
    lenisInstance.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)

  return lenisInstance
}

// Optional hook to track scroll position in React
export const useLenisScroll = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    if (!lenisInstance) return
    const update = ({ scroll }) => setScrollY(scroll)
    lenisInstance.on("scroll", update)
    return () => lenisInstance.off("scroll", update)
  }, [])

  return scrollY
}
