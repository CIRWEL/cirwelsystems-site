import { useState, useEffect, useRef } from 'react'

export default function AnimatedCounter({ target, duration = 2, delay = 0.2 }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const hasAnimated = useRef(false)
  
  useEffect(() => {
    const element = ref.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    observer.observe(element)
    return () => observer.disconnect()
  }, [])
  
  useEffect(() => {
    if (!isVisible || hasAnimated.current) return
    
    hasAnimated.current = true
    
    const timer = setTimeout(() => {
      let current = 0
      const step = target / (duration * 60)
      
      const interval = setInterval(() => {
        current += step
        if (current >= target) {
          setCount(target)
          clearInterval(interval)
        } else {
          setCount(Math.floor(current))
        }
      }, 1000 / 60)
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [isVisible, target, duration, delay])
  
  return <span ref={ref}>{count}</span>
}
