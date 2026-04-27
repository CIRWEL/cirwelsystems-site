import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, AlertTriangle, ShieldOff, RefreshCw, CheckCircle, ArrowRight } from 'lucide-react'

const states = [
  {
    id: 'normal',
    label: 'Normal',
    icon: Activity,
    color: '#00e077',
    bgColor: 'rgba(0, 224, 119, 0.1)',
    borderColor: 'rgba(0, 224, 119, 0.3)',
    description: 'System operating within safe parameters',
    details: [
      'All state variables stable',
      'Risk metrics below thresholds',
      'Continuous monitoring active',
      'Agents executing normally'
    ]
  },
  {
    id: 'risk',
    label: 'Risk Detected',
    icon: AlertTriangle,
    color: '#ffaa00',
    bgColor: 'rgba(255, 170, 0, 0.1)',
    borderColor: 'rgba(255, 170, 0, 0.3)',
    description: 'Anomaly detected in agent behavior',
    details: [
      'State drift exceeds warning level',
      'Behavioral anomaly flagged',
      'Increased monitoring frequency',
      'Preparing intervention protocols'
    ]
  },
  {
    id: 'circuit',
    label: 'Circuit Breaker',
    icon: ShieldOff,
    color: '#ff4444',
    bgColor: 'rgba(255, 68, 68, 0.1)',
    borderColor: 'rgba(255, 68, 68, 0.3)',
    description: 'Agent paused for protection',
    details: [
      'Critical threshold breached',
      'Agent execution halted',
      'State snapshot captured',
      'Recovery protocol initiated'
    ]
  },
  {
    id: 'recovery',
    label: 'Recovery',
    icon: RefreshCw,
    color: '#00d4e6',
    bgColor: 'rgba(0, 212, 230, 0.1)',
    borderColor: 'rgba(0, 212, 230, 0.3)',
    description: 'Peer-assisted review in progress',
    details: [
      'Peer agents reviewing state',
      'Corrective actions proposed',
      'Consensus being reached',
      'Gradual reintegration'
    ]
  },
]

function StateNode({ state, isActive, onClick, index }) {
  const Icon = state.icon
  
  return (
    <motion.div
      className="relative cursor-pointer group"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isActive ? state.bgColor : 'rgba(255, 255, 255, 0.02)',
          border: `2px solid ${isActive ? state.color : 'rgba(255, 255, 255, 0.1)'}`,
          boxShadow: isActive ? `0 0 30px ${state.color}40, 0 0 60px ${state.color}20` : 'none'
        }}
        animate={isActive ? {
          boxShadow: [
            `0 0 30px ${state.color}40, 0 0 60px ${state.color}20`,
            `0 0 40px ${state.color}60, 0 0 80px ${state.color}30`,
            `0 0 30px ${state.color}40, 0 0 60px ${state.color}20`
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Icon 
          className="w-8 h-8 sm:w-10 sm:h-10 transition-all duration-300"
          style={{ color: isActive ? state.color : 'rgba(255, 255, 255, 0.4)' }}
        />
        
        {isActive && (
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{ border: `2px solid ${state.color}` }}
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1.3, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.div>
      
      <p 
        className="text-center mt-3 text-xs sm:text-sm font-mono transition-colors duration-300"
        style={{ color: isActive ? state.color : 'rgba(255, 255, 255, 0.5)' }}
      >
        {state.label}
      </p>
    </motion.div>
  )
}

function ConnectionArrow({ isActive, fromColor, toColor }) {
  return (
    <div className="flex items-center justify-center w-8 sm:w-12 mx-1 sm:mx-2">
      <motion.div
        className="relative"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative w-8 sm:w-10 h-5 flex items-center">
          <div 
            className="absolute inset-y-[9px] left-0 right-4 h-[2px] rounded-full"
            style={{ backgroundColor: isActive ? `${toColor}40` : 'rgba(255, 255, 255, 0.1)' }}
          />
          {isActive && (
            <motion.div
              className="absolute top-[8px] left-0 h-[4px] w-3 rounded-full"
              style={{ 
                background: `linear-gradient(90deg, transparent, ${toColor})`,
                boxShadow: `0 0 8px ${toColor}80`
              }}
              animate={{ left: ['0%', '70%'] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          <ArrowRight 
            className="w-4 h-4 sm:w-5 sm:h-5 absolute right-0"
            style={{ color: isActive ? toColor : 'rgba(255, 255, 255, 0.15)' }}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default function StateDiagram() {
  const [activeState, setActiveState] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const lastSwipeTime = useRef(0)
  const cardRef = useRef(null)
  
  useEffect(() => {
    if (!isAutoPlaying || isPaused) return
    
    const interval = setInterval(() => {
      setActiveState(prev => (prev + 1) % states.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [isAutoPlaying, isPaused])

  const handleStateClick = (index) => {
    setActiveState(index)
    setIsAutoPlaying(false)
  }

  const handleSwipe = useCallback((direction) => {
    const now = Date.now()
    if (now - lastSwipeTime.current < 400) return
    lastSwipeTime.current = now
    
    if (direction === 'left') {
      setActiveState(prev => (prev + 1) % states.length)
    } else if (direction === 'right') {
      setActiveState(prev => (prev - 1 + states.length) % states.length)
    }
  }, [])

  const handleWheel = useCallback((e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 30) {
      e.preventDefault()
      if (e.deltaX > 0) {
        handleSwipe('left')
      } else {
        handleSwipe('right')
      }
    }
  }, [handleSwipe])

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    
    card.addEventListener('wheel', handleWheel, { passive: false })
    return () => card.removeEventListener('wheel', handleWheel)
  }, [handleWheel])

  const currentState = states[activeState]

  return (
    <section id="how-it-works" className="py-20 relative overflow-hidden">
      <div 
        className="max-w-6xl mx-auto px-6"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-cyber-cyan text-sm tracking-[0.2em] mb-4 block font-medium">
            GOVERNANCE FLOW
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cyber">State-Based</span> Dynamics
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Click or swipe to explore how Cirwel monitors, detects, and recovers from AI agent anomalies
          </p>
        </motion.div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center flex-wrap gap-y-4 mb-10">
            {states.map((state, index) => (
              <div key={state.id} className="flex items-center">
                <StateNode
                  state={state}
                  isActive={activeState === index}
                  onClick={() => handleStateClick(index)}
                  index={index}
                />
                {index < states.length - 1 && (
                  <ConnectionArrow
                    isActive={activeState === index || activeState === index + 1}
                    fromColor={state.color}
                    toColor={states[index + 1].color}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeState}
              ref={cardRef}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl touch-pan-y"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipeThreshold = 50
                if (offset.x < -swipeThreshold || velocity.x < -500) {
                  handleSwipe('left')
                } else if (offset.x > swipeThreshold || velocity.x > 500) {
                  handleSwipe('right')
                }
              }}
            >
              <div
                className="rounded-xl p-6 sm:p-8 backdrop-blur-sm select-none"
                style={{
                  backgroundColor: currentState.bgColor,
                  border: `1px solid ${currentState.borderColor}`,
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${currentState.color}20` }}
                  >
                    <currentState.icon 
                      className="w-6 h-6"
                      style={{ color: currentState.color }}
                    />
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold"
                      style={{ color: currentState.color }}
                    >
                      {currentState.label}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {currentState.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                  {currentState.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle 
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: currentState.color }}
                      />
                      <span className="text-gray-300 text-sm font-mono">
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-white/10">
                  {states.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleStateClick(i)}
                      aria-label={`Go to state ${states[i]?.name || i + 1}`}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: activeState === i ? currentState.color : 'rgba(255, 255, 255, 0.2)',
                        transform: activeState === i ? 'scale(1.5)' : 'scale(1)'
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  )
}
