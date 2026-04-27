import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function useTilt(range = 6) {
  const cardRef = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-50, 50], [range, -range]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-50, 50], [-range, range]), { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      x.set(e.clientX - rect.left - rect.width / 2)
      y.set(e.clientY - rect.top - rect.height / 2)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return {
    cardRef,
    rotateX,
    rotateY,
    handleMouseMove,
    handleMouseLeave,
    tiltStyle: { perspective: 1000, rotateX, rotateY, transformStyle: 'preserve-3d' },
  }
}
