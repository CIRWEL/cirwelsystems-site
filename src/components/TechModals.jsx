import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { X, Atom, Shield, GitBranch, Zap } from 'lucide-react'

function StateBasedDynamicsAnimation() {
  const [time, setTime] = useState(0)
  const [trailPoints, setTrailPoints] = useState([])
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(t => t + 0.03)
    }, 50)
    return () => clearInterval(interval)
  }, [])
  
  const x1 = 50 + Math.sin(time * 0.8) * 25
  const y1 = 50 + Math.cos(time * 1.2) * 20
  const x2 = 50 + Math.sin(time * 0.6 + 2) * 20
  const y2 = 50 + Math.cos(time * 0.9 + 1) * 25
  const x3 = 50 + Math.sin(time * 1.1 + 4) * 18
  const y3 = 50 + Math.cos(time * 0.7 + 3) * 22
  
  useEffect(() => {
    setTrailPoints(prev => {
      const newPoints = [...prev, { x: x1, y: y1, t: time }]
      return newPoints.filter(p => time - p.t < 3).slice(-60)
    })
  }, [time, x1, y1])
  
  const vars = [
    { label: 'Intent', value: 0.5 + Math.sin(time * 0.8) * 0.4, color: '#00d4e6' },
    { label: 'Risk', value: 0.5 + Math.sin(time * 0.6 + 2) * 0.35, color: '#e040e0' },
    { label: 'Coherence', value: 0.5 + Math.sin(time * 1.1 + 4) * 0.3, color: '#00e077' },
  ]

  return (
    <div className="relative w-full h-64 md:h-80">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <rect x="8" y="8" width="84" height="84" fill="none" stroke="#00d4e6" strokeWidth="0.2" strokeOpacity="0.2" rx="2" />
        <line x1="50" y1="8" x2="50" y2="92" stroke="#00d4e6" strokeWidth="0.15" strokeOpacity="0.15" />
        <line x1="8" y1="50" x2="92" y2="50" stroke="#00d4e6" strokeWidth="0.15" strokeOpacity="0.15" />
        
        {trailPoints.length > 1 && (
          <path
            d={`M ${trailPoints[0].x} ${trailPoints[0].y} ${trailPoints.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}`}
            fill="none"
            stroke="#00d4e6"
            strokeWidth="0.8"
            strokeOpacity="0.4"
            strokeLinecap="round"
          />
        )}
        
        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00d4e6" strokeWidth="0.4" strokeOpacity="0.5" />
        <line x1={x2} y1={y2} x2={x3} y2={y3} stroke="#e040e0" strokeWidth="0.4" strokeOpacity="0.5" />
        <line x1={x3} y1={y3} x2={x1} y2={y1} stroke="#00e077" strokeWidth="0.4" strokeOpacity="0.5" />
        
        <circle cx={x1} cy={y1} r="6" fill="#00d4e6" opacity="0.15" />
        <circle cx={x1} cy={y1} r="3" fill="#00d4e6" filter="url(#glow)" />
        <text x={x1} y={y1 - 5} textAnchor="middle" fill="#00d4e6" fontSize="2.5" fontFamily="monospace">x₁</text>
        
        <circle cx={x2} cy={y2} r="5" fill="#e040e0" opacity="0.15" />
        <circle cx={x2} cy={y2} r="2.5" fill="#e040e0" filter="url(#glow)" />
        <text x={x2} y={y2 - 4} textAnchor="middle" fill="#e040e0" fontSize="2.5" fontFamily="monospace">x₂</text>
        
        <circle cx={x3} cy={y3} r="4" fill="#00e077" opacity="0.15" />
        <circle cx={x3} cy={y3} r="2" fill="#00e077" filter="url(#glow)" />
        <text x={x3} y={y3 - 4} textAnchor="middle" fill="#00e077" fontSize="2.5" fontFamily="monospace">x₃</text>
        
        <text x="50" y="97" textAnchor="middle" fill="#555" fontSize="2.2" fontFamily="monospace">PHASE SPACE TRAJECTORY</text>
      </svg>
      
      <div className="absolute right-2 top-2 space-y-2">
        {vars.map(v => (
          <div key={v.label} className="flex items-center gap-2 text-xs font-mono">
            <span className="w-16 text-right text-gray-400">{v.label}</span>
            <div className="w-16 h-1.5 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: v.color }}
                animate={{ width: `${v.value * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <p className="text-xs text-gray-500 font-mono">Coupled state variables trace smooth trajectories through phase space</p>
      </div>
    </div>
  )
}

function EmergentSafetyAnimation() {
  const [riskLevel, setRiskLevel] = useState(0.2)
  const [phase, setPhase] = useState('normal')
  const [circuitBreakerActive, setCircuitBreakerActive] = useState(false)
  const directionRef = useRef(1)
  const isRecoveringRef = useRef(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskLevel(prev => {
        let next = prev + directionRef.current * 0.02
        
        if (next >= 0.75 && !isRecoveringRef.current) {
          isRecoveringRef.current = true
          setCircuitBreakerActive(true)
          setPhase('triggered')
          directionRef.current = -1
          setTimeout(() => {
            setPhase('recovering')
          }, 1000)
        }
        
        if (next <= 0.15 && isRecoveringRef.current) {
          isRecoveringRef.current = false
          setCircuitBreakerActive(false)
          setPhase('normal')
          directionRef.current = 1
        }
        
        return Math.max(0.1, Math.min(0.8, next))
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  const gaugeColor = riskLevel < 0.4 ? '#00ff88' : riskLevel < 0.6 ? '#ffaa00' : '#ff4444'
  const rotation = -135 + riskLevel * 270

  return (
    <div className="relative w-full h-64 md:h-80 flex flex-col items-center justify-center">
      <svg className="w-48 h-48 md:w-56 md:h-56" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ff88" />
            <stop offset="50%" stopColor="#ffaa00" />
            <stop offset="100%" stopColor="#ff4444" />
          </linearGradient>
          <filter id="gaugeGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a24" strokeWidth="8" />
        
        <path
          d="M 15 70 A 40 40 0 1 1 85 70"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.3"
        />
        
        <motion.line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke={gaugeColor}
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#gaugeGlow)"
          style={{ transformOrigin: '50px 50px' }}
          animate={{ rotate: rotation }}
          transition={{ duration: 0.1 }}
        />
        
        <circle cx="50" cy="50" r="6" fill="#1a1a24" stroke={gaugeColor} strokeWidth="1" />
        
        <line x1="20" y1="65" x2="25" y2="60" stroke="#00ff88" strokeWidth="1" opacity="0.5" />
        <line x1="50" y1="15" x2="50" y2="20" stroke="#ffaa00" strokeWidth="1" opacity="0.5" />
        <line x1="80" y1="65" x2="75" y2="60" stroke="#ff4444" strokeWidth="1" opacity="0.5" />
        
        <text x="50" y="75" textAnchor="middle" fill="#666" fontSize="6" fontFamily="monospace">RISK</text>
        <text x="50" y="85" textAnchor="middle" fill={gaugeColor} fontSize="8" fontFamily="monospace" fontWeight="bold">
          {Math.round(riskLevel * 100)}%
        </text>
      </svg>
      
      <AnimatePresence>
        {circuitBreakerActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 left-1/2 -translate-x-1/2"
          >
            <div className={`px-4 py-2 rounded-lg border ${phase === 'triggered' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-yellow-500/20 border-yellow-500 text-yellow-400'} font-mono text-xs flex items-center gap-2`}>
              <motion.div
                className={`w-2 h-2 rounded-full ${phase === 'triggered' ? 'bg-red-500' : 'bg-yellow-500'}`}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              {phase === 'triggered' ? 'CIRCUIT BREAKER ACTIVE' : 'RECOVERING...'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 font-mono">Stability emerges from mathematical evolution</p>
      </div>
    </div>
  )
}

function PrincipledDecisionAnimation() {
  const [activeLayer, setActiveLayer] = useState(0)
  const [requestPosition, setRequestPosition] = useState(0)
  const layers = [
    { name: 'Safety Check', color: '#00d4e6', icon: '🛡️' },
    { name: 'Ethical Alignment', color: '#ff00ff', icon: '⚖️' },
    { name: 'Adaptive Control', color: '#00ff88', icon: '🎯' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setRequestPosition(prev => {
        const next = prev + 2
        if (next >= 100) {
          setActiveLayer(l => (l + 1) % 4)
          return 0
        }
        return next
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center">
      <div className="relative w-full max-w-sm">
        <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-center">
          <motion.div
            className="w-8 h-8 rounded-full bg-cyber-cyan/20 border border-cyber-cyan flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-xs">📨</span>
          </motion.div>
          <p className="text-[10px] text-gray-500 mt-1 font-mono">Request</p>
        </div>
        
        <div className="ml-16 mr-16 space-y-3">
          {layers.map((layer, index) => (
            <div key={layer.name} className="relative">
              <motion.div
                className="h-14 rounded-lg border flex items-center px-4 gap-3"
                style={{
                  borderColor: activeLayer === index ? layer.color : 'rgba(255,255,255,0.1)',
                  backgroundColor: activeLayer === index ? `${layer.color}15` : 'transparent',
                }}
                animate={{
                  boxShadow: activeLayer === index ? `0 0 20px ${layer.color}40` : 'none',
                }}
              >
                <span className="text-lg">{layer.icon}</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: activeLayer === index ? layer.color : '#888' }}>
                    {layer.name}
                  </p>
                  <p className="text-[10px] text-gray-600 font-mono">Layer {index + 1}</p>
                </div>
                
                {activeLayer === index && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 rounded-full"
                    style={{ backgroundColor: layer.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${requestPosition}%` }}
                  />
                )}
                
                {activeLayer === index && (
                  <motion.div
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: requestPosition > 80 ? 1 : 0 }}
                  >
                    <span className="text-green-400 text-sm">✓</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
        
        <div className="absolute right-4 top-0 bottom-0 flex flex-col justify-center">
          <motion.div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${activeLayer === 3 ? 'bg-green-500/20 border-green-500' : 'bg-dark-800 border-gray-700'} border`}
            animate={{ scale: activeLayer === 3 ? [1, 1.2, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xs">{activeLayer === 3 ? '✅' : '📤'}</span>
          </motion.div>
          <p className="text-[10px] text-gray-500 mt-1 font-mono">Output</p>
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <p className="text-xs text-gray-500 font-mono">Multi-layer infrastructure ensures principled decisions</p>
      </div>
    </div>
  )
}

function SelfTuningAnimation() {
  const [params, setParams] = useState([
    { name: 'Sensitivity', value: 0.5, target: 0.5 },
    { name: 'Threshold', value: 0.6, target: 0.6 },
    { name: 'Response', value: 0.4, target: 0.4 },
  ])
  const [condition, setCondition] = useState('stable')
  
  useEffect(() => {
    const conditionInterval = setInterval(() => {
      const conditions = ['stable', 'high-load', 'anomaly', 'stable']
      setCondition(prev => {
        const idx = conditions.indexOf(prev)
        const next = conditions[(idx + 1) % conditions.length]
        
        if (next === 'high-load') {
          setParams(p => p.map((param, i) => ({
            ...param,
            target: [0.3, 0.8, 0.7][i]
          })))
        } else if (next === 'anomaly') {
          setParams(p => p.map((param, i) => ({
            ...param,
            target: [0.9, 0.5, 0.2][i]
          })))
        } else {
          setParams(p => p.map((param, i) => ({
            ...param,
            target: [0.5, 0.6, 0.4][i]
          })))
        }
        
        return next
      })
    }, 3000)
    
    const tuneInterval = setInterval(() => {
      setParams(prev => prev.map(p => ({
        ...p,
        value: p.value + (p.target - p.value) * 0.1
      })))
    }, 50)

    return () => {
      clearInterval(conditionInterval)
      clearInterval(tuneInterval)
    }
  }, [])

  const conditionColors = {
    'stable': { bg: 'bg-green-500/20', border: 'border-green-500', text: 'text-green-400' },
    'high-load': { bg: 'bg-yellow-500/20', border: 'border-yellow-500', text: 'text-yellow-400' },
    'anomaly': { bg: 'bg-red-500/20', border: 'border-red-500', text: 'text-red-400' },
  }

  return (
    <div className="relative w-full h-64 md:h-80 flex flex-col items-center justify-center px-4">
      <motion.div
        className={`px-4 py-2 rounded-lg border ${conditionColors[condition].bg} ${conditionColors[condition].border} mb-6`}
        layout
      >
        <div className="flex items-center gap-2">
          <motion.div
            className={`w-2 h-2 rounded-full ${condition === 'stable' ? 'bg-green-500' : condition === 'high-load' ? 'bg-yellow-500' : 'bg-red-500'}`}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className={`text-xs font-mono uppercase ${conditionColors[condition].text}`}>
            {condition === 'stable' ? 'Normal Operation' : condition === 'high-load' ? 'High Load Detected' : 'Anomaly Detected'}
          </span>
        </div>
      </motion.div>
      
      <div className="w-full max-w-xs space-y-4">
        {params.map((param, i) => (
          <div key={param.name} className="space-y-1">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-gray-300">{param.name}</span>
              <span className="text-cyber-cyan">{(param.value * 100).toFixed(0)}%</span>
            </div>
            <div className="relative h-3 bg-dark-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  background: `linear-gradient(90deg, #00d4e6, ${i === 0 ? '#ff00ff' : i === 1 ? '#00ff88' : '#0066ff'})`,
                }}
                animate={{ width: `${param.value * 100}%` }}
                transition={{ duration: 0.1 }}
              />
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-4 bg-white/50 rounded-full"
                animate={{ left: `${param.target * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 flex items-center gap-2">
        <motion.div
          className="w-6 h-6 rounded-full border border-cyber-cyan/50 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Zap className="w-3 h-3 text-cyber-cyan" />
        </motion.div>
        <span className="text-xs text-gray-500 font-mono">Auto-tuning active</span>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <p className="text-xs text-gray-500 font-mono">Parameters adapt automatically to conditions</p>
      </div>
    </div>
  )
}

const animations = {
  'state-dynamics': {
    title: 'Information-Theoretic Foundation',
    subtitle: 'The (S, I, E, V) substrate from UNITARES v6.8.1',
    icon: Atom,
    color: 'cyan',
    Component: StateBasedDynamicsAnimation,
    insight: 'Agent behavior is described by four measurable quantities: S = H(Y|x), I = I(X;Y), E = −F (negative variational free energy; high E = low surprise), and V (accumulated free-energy residual). The substrate is defined publicly in the paper, not inside a private system.',
  },
  'emergent-safety': {
    title: 'Contraction-Stable by Construction',
    subtitle: 'Lyapunov-style bound on the V residual',
    icon: Shield,
    color: 'magenta',
    Component: EmergentSafetyAnimation,
    insight: 'UNITARES v6.8.1 (Appendix B) gives a contraction analysis of the substrate dynamics, bounding the V residual along stable trajectories. Stability is a paper-backed property of the update rule, not a heuristic monitor bolted on after deployment.',
  },
  'principled-decision': {
    title: 'Heterogeneous Fleets, One Substrate',
    subtitle: 'Model-agnostic instrumentation across providers',
    icon: GitBranch,
    color: 'blue',
    Component: PrincipledDecisionAnimation,
    insight: 'Every agent — regardless of model provider, vendor, or role — exposes the same (S, I, E, V) signature per decision. The substrate is the comparison surface, so a fleet of mixed models becomes governable as one system.',
  },
  'self-tuning': {
    title: 'Calibrated, Not Trained',
    subtitle: 'Parameters fit from observed substrate state',
    icon: Zap,
    color: 'green',
    Component: SelfTuningAnimation,
    insight: 'Class-conditional calibration: scale constants and healthy operating points fit per agent class, not via fleet-wide normalization. Paper §11.6 reports a 28.9% basin-assignment flip on a 13,310-row production slice when the grounded class-conditional form replaces the legacy fleet-wide one — homogenization fails first-order at the gating layer. No model weights are trained.',
  },
}

export default function TechModal({ isOpen, onClose, animationType }) {
  const modalRef = useRef(null)
  const config = animations[animationType]
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!config) return null

  const colors = {
    cyan: { border: 'border-cyber-cyan/30', text: 'text-cyber-cyan', bg: 'bg-cyber-cyan/10' },
    magenta: { border: 'border-cyber-magenta/30', text: 'text-cyber-magenta', bg: 'bg-cyber-magenta/10' },
    blue: { border: 'border-cyber-blue/30', text: 'text-cyber-blue', bg: 'bg-cyber-blue/10' },
    green: { border: 'border-cyber-green/30', text: 'text-cyber-green', bg: 'bg-cyber-green/10' },
  }[config.color]

  const Icon = config.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            ref={modalRef}
            className={`relative w-full max-w-lg bg-dark-900 rounded-2xl border ${colors.border} overflow-hidden shadow-2xl`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="absolute inset-0 bg-mesh opacity-20 pointer-events-none" />
            
            <div className={`relative border-b ${colors.border} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center border ${colors.border}`}>
                  <Icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{config.title}</h3>
                  <p className="text-xs text-gray-500">{config.subtitle}</p>
                </div>
              </div>
              
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-dark-800 hover:bg-dark-700 flex items-center justify-center transition-colors group"
              >
                <X className="w-4 h-4 text-gray-500 group-hover:text-white" />
              </button>
            </div>
            
            <div className="relative p-4">
              <config.Component />
            </div>
            
            <div className={`relative border-t ${colors.border} p-4`}>
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <span className={`text-xs ${colors.text}`}>💡</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {config.insight}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { animations }
