import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function GlitchText({ 
  children, 
  className = '', 
  as = 'span',
  glitchOnHover = true,
  glitchOnLoad = false,
  duration = 300,
  intensity = 3
}) {
  const [displayText, setDisplayText] = useState(children)
  const [isGlitching, setIsGlitching] = useState(false)
  const originalText = useRef(children)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    originalText.current = children
    setDisplayText(children)
  }, [children])

  useEffect(() => {
    if (glitchOnLoad) {
      triggerGlitch()
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const getRandomChar = () => {
    return glitchChars[Math.floor(Math.random() * glitchChars.length)]
  }

  const scrambleText = (text, progress) => {
    return text.split('').map((char, i) => {
      if (char === ' ') return ' '
      const shouldGlitch = Math.random() > progress
      return shouldGlitch ? getRandomChar() : originalText.current[i] || char
    }).join('')
  }

  const triggerGlitch = () => {
    if (isGlitching) return
    setIsGlitching(true)
    
    const text = originalText.current
    let iteration = 0
    const totalIterations = Math.ceil(duration / 30)
    
    intervalRef.current = setInterval(() => {
      iteration++
      const progress = iteration / totalIterations
      
      if (iteration >= totalIterations) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsGlitching(false)
        return
      }
      
      setDisplayText(scrambleText(text, progress))
    }, 30)
  }

  const handleInteraction = () => {
    if (glitchOnHover) {
      triggerGlitch()
    }
  }

  const Component = motion[as] || motion.span

  return (
    <Component
      className={`${className} ${isGlitching ? 'glitch-active' : ''}`}
      onMouseEnter={handleInteraction}
      onTouchStart={handleInteraction}
      style={{ 
        display: 'inline-block',
        position: 'relative'
      }}
    >
      {displayText}
      {isGlitching && (
        <>
          <span 
            className="absolute inset-0 opacity-80"
            style={{ 
              clipPath: 'inset(20% 0 40% 0)',
              transform: 'translateX(-2px)',
              color: '#00d4e6',
              textShadow: '2px 0 #e040e0'
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
          <span 
            className="absolute inset-0 opacity-80"
            style={{ 
              clipPath: 'inset(60% 0 10% 0)',
              transform: 'translateX(2px)',
              color: '#e040e0',
              textShadow: '-2px 0 #00d4e6'
            }}
            aria-hidden="true"
          >
            {displayText}
          </span>
        </>
      )}
    </Component>
  )
}

export function GlitchTextCSS({ children, className = '' }) {
  return (
    <span className={`glitch-text-css ${className}`} data-text={children}>
      {children}
    </span>
  )
}
