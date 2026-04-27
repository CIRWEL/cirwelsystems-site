import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import { X, Link2, TrendingUp, Target, Zap, Activity, AlertTriangle, Layers } from 'lucide-react'

function CoupledVariablesAnimation() {
  const [nodes, setNodes] = useState([
    { id: 0, label: 'S', value: 0.5, x: 50, y: 20, color: '#00d4e6' },
    { id: 1, label: 'I', value: 0.4, x: 20, y: 50, color: '#ff00ff' },
    { id: 2, label: 'E', value: 0.6, x: 80, y: 50, color: '#00ff88' },
    { id: 3, label: 'V', value: 0.3, x: 50, y: 80, color: '#0066ff' },
  ])
  const [pulsingEdge, setPulsingEdge] = useState(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const sourceIdx = Math.floor(Math.random() * 4)
      const change = (Math.random() - 0.5) * 0.15
      
      setPulsingEdge(sourceIdx)
      
      setNodes(prev => {
        const newNodes = [...prev]
        newNodes[sourceIdx] = { ...newNodes[sourceIdx], value: Math.max(0.1, Math.min(0.9, newNodes[sourceIdx].value + change)) }
        
        prev.forEach((node, idx) => {
          if (idx !== sourceIdx) {
            const coupling = 0.3 + Math.random() * 0.2
            const effect = change * coupling * (Math.random() > 0.5 ? 1 : -1)
            newNodes[idx] = { ...newNodes[idx], value: Math.max(0.1, Math.min(0.9, newNodes[idx].value + effect)) }
          }
        })
        return newNodes
      })
      
      setTimeout(() => setPulsingEdge(null), 300)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const edges = [
    [0, 1], [0, 2], [1, 3], [2, 3], [0, 3], [1, 2]
  ]

  return (
    <div className="relative w-full h-64 md:h-80">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="nodeGlow">
            <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {edges.map(([from, to], idx) => {
          const isActive = pulsingEdge === from || pulsingEdge === to
          return (
            <g key={idx}>
              <line
                x1={nodes[from].x}
                y1={nodes[from].y}
                x2={nodes[to].x}
                y2={nodes[to].y}
                stroke={isActive ? '#00d4e6' : '#333'}
                strokeWidth={isActive ? 0.8 : 0.3}
                strokeOpacity={isActive ? 0.8 : 0.4}
              />
              {isActive && (
                <circle r="1.5" fill="#00d4e6" filter="url(#nodeGlow)">
                  <animateMotion
                    dur="0.3s"
                    repeatCount="1"
                    path={`M${nodes[from].x},${nodes[from].y} L${nodes[to].x},${nodes[to].y}`}
                  />
                </circle>
              )}
            </g>
          )
        })}
        
        {nodes.map(node => (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={4 + node.value * 4} fill={node.color} opacity="0.2" />
            <circle cx={node.x} cy={node.y} r={2 + node.value * 2} fill={node.color} filter="url(#nodeGlow)" />
            <text x={node.x} y={node.y - 8} textAnchor="middle" fill={node.color} fontSize="3" fontFamily="monospace">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 12} textAnchor="middle" fill="#666" fontSize="2.5" fontFamily="monospace">
              {(node.value * 100).toFixed(0)}%
            </text>
          </g>
        ))}
      </svg>
      
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <p className="text-xs text-gray-500 font-mono">(S, I, E, V) co-evolve — coupling is measured, not assumed</p>
      </div>
    </div>
  )
}

function NaturalEvolutionAnimation() {
  const [points, setPoints] = useState([])
  const [generation, setGeneration] = useState(0)
  const targetRef = useRef({ x: 70, y: 30 })

  useEffect(() => {
    const initial = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 15 + Math.random() * 20,
      y: 60 + Math.random() * 25,
      fitness: 0,
    }))
    setPoints(initial)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints(prev => {
        const target = targetRef.current
        return prev.map(p => {
          const dist = Math.sqrt((p.x - target.x) ** 2 + (p.y - target.y) ** 2)
          const fitness = 1 / (1 + dist * 0.1)
          
          const moveX = (target.x - p.x) * 0.08 + (Math.random() - 0.5) * 3
          const moveY = (target.y - p.y) * 0.08 + (Math.random() - 0.5) * 3
          
          return {
            ...p,
            x: Math.max(5, Math.min(95, p.x + moveX)),
            y: Math.max(5, Math.min(95, p.y + moveY)),
            fitness,
          }
        })
      })
      setGeneration(g => g + 1)
    }, 150)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="targetGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        <circle cx={targetRef.current.x} cy={targetRef.current.y} r="15" fill="url(#targetGradient)" />
        <circle cx={targetRef.current.x} cy={targetRef.current.y} r="3" fill="none" stroke="#00ff88" strokeWidth="0.5" strokeDasharray="1,1">
          <animate attributeName="r" values="3;8;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x={targetRef.current.x} y={targetRef.current.y - 12} textAnchor="middle" fill="#00ff88" fontSize="3" fontFamily="monospace">
          MAX I(X;Y)
        </text>
        
        {points.map((p, i) => {
          const color = `hsl(${180 + p.fitness * 60}, 100%, 60%)`
          return (
            <g key={p.id}>
              <circle cx={p.x} cy={p.y} r={2 + p.fitness * 2} fill={color} opacity="0.3" />
              <circle cx={p.x} cy={p.y} r={1.5} fill={color} />
              {i > 0 && (
                <line
                  x1={points[i-1].x}
                  y1={points[i-1].y}
                  x2={p.x}
                  y2={p.y}
                  stroke="#00d4e6"
                  strokeWidth="0.2"
                  strokeOpacity="0.2"
                />
              )}
            </g>
          )
        })}
        
        <text x="10" y="95" fill="#666" fontSize="3" fontFamily="monospace">
          Gen: {generation}
        </text>
      </svg>
      
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <p className="text-xs text-gray-500 font-mono">Mutual information I(context; response) — measured, per decision</p>
      </div>
    </div>
  )
}

function EmergentStabilityAnimation() {
  const [particles, setParticles] = useState([])
  const [phase, setPhase] = useState('chaotic')
  const [stability, setStability] = useState(0)
  const attractorRef = useRef({ x: 50, y: 50 })

  useEffect(() => {
    const initial = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
    }))
    setParticles(initial)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const attractor = attractorRef.current
      
      setParticles(prev => {
        const avgDist = prev.reduce((sum, p) => {
          return sum + Math.sqrt((p.x - attractor.x) ** 2 + (p.y - attractor.y) ** 2)
        }, 0) / prev.length
        
        const newStability = Math.max(0, Math.min(100, 100 - avgDist * 2))
        setStability(newStability)
        setPhase(newStability > 70 ? 'stable' : newStability > 40 ? 'settling' : 'chaotic')
        
        return prev.map(p => {
          const dx = attractor.x - p.x
          const dy = attractor.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          const attractForce = 0.15
          const ax = (dx / dist) * attractForce
          const ay = (dy / dist) * attractForce
          
          let newVx = p.vx + ax + (Math.random() - 0.5) * 0.5
          let newVy = p.vy + ay + (Math.random() - 0.5) * 0.5
          
          newVx *= 0.95
          newVy *= 0.95
          
          return {
            ...p,
            x: Math.max(5, Math.min(95, p.x + newVx)),
            y: Math.max(5, Math.min(95, p.y + newVy)),
            vx: newVx,
            vy: newVy,
          }
        })
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const phaseColors = {
    chaotic: '#ff6600',
    settling: '#ffaa00',
    stable: '#00ff88',
  }

  return (
    <div className="relative w-full h-64 md:h-80">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="50" r="20" fill="none" stroke={phaseColors[phase]} strokeWidth="0.3" strokeOpacity="0.5" strokeDasharray="2,2" />
        <circle cx="50" cy="50" r="10" fill="none" stroke={phaseColors[phase]} strokeWidth="0.3" strokeOpacity="0.7" />
        <circle cx="50" cy="50" r="2" fill={phaseColors[phase]} opacity="0.5" />
        
        {particles.map(p => (
          <circle
            key={p.id}
            cx={p.x}
            cy={p.y}
            r="1.5"
            fill={phaseColors[phase]}
            opacity={0.6 + stability * 0.004}
          />
        ))}
        
        <text x="50" y="8" textAnchor="middle" fill={phaseColors[phase]} fontSize="3.5" fontFamily="monospace" fontWeight="bold">
          {phase.toUpperCase()}
        </text>
      </svg>
      
      <div className="absolute right-2 top-2 w-20">
        <div className="text-xs font-mono text-gray-500 mb-1">Stability</div>
        <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: phaseColors[phase] }}
            animate={{ width: `${stability}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <div className="text-xs font-mono mt-1" style={{ color: phaseColors[phase] }}>
          {stability.toFixed(0)}%
        </div>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <p className="text-xs text-gray-500 font-mono">Free-energy residual V contracts toward zero</p>
      </div>
    </div>
  )
}

function AutomaticInterventionAnimation() {
  const [signal, setSignal] = useState([])
  const [anomalyDetected, setAnomalyDetected] = useState(false)
  const [correcting, setCorrecting] = useState(false)
  const [corrections, setCorrections] = useState(0)

  useEffect(() => {
    const initial = Array.from({ length: 50 }, (_, i) => ({
      x: i * 2,
      y: 50 + Math.sin(i * 0.3) * 15,
      isAnomaly: false,
    }))
    setSignal(initial)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setSignal(prev => {
        const newSignal = prev.slice(1)
        const lastX = prev[prev.length - 1]?.x || 0
        
        const shouldAnomaly = Math.random() < 0.08 && !correcting
        const baseY = 50 + Math.sin((lastX + 2) * 0.15) * 15
        const anomalyOffset = shouldAnomaly ? (Math.random() > 0.5 ? 25 : -25) : 0
        
        if (shouldAnomaly) {
          setAnomalyDetected(true)
          setTimeout(() => {
            setCorrecting(true)
            setCorrections(c => c + 1)
            setTimeout(() => {
              setCorrecting(false)
              setAnomalyDetected(false)
            }, 500)
          }, 200)
        }
        
        newSignal.push({
          x: lastX + 2,
          y: correcting ? baseY : baseY + anomalyOffset,
          isAnomaly: shouldAnomaly,
        })
        
        return newSignal.map((p, i) => ({ ...p, x: i * 2 }))
      })
    }, 80)

    return () => clearInterval(interval)
  }, [correcting])

  return (
    <div className="relative w-full h-64 md:h-80">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <line x1="0" y1="50" x2="100" y2="50" stroke="#333" strokeWidth="0.3" strokeDasharray="2,2" />
        <line x1="0" y1="25" x2="100" y2="25" stroke="#ff6600" strokeWidth="0.2" strokeOpacity="0.5" />
        <line x1="0" y1="75" x2="100" y2="75" stroke="#ff6600" strokeWidth="0.2" strokeOpacity="0.5" />
        <text x="2" y="24" fill="#ff6600" fontSize="2" fontFamily="monospace" opacity="0.7">V UPPER BOUND</text>
        <text x="2" y="78" fill="#ff6600" fontSize="2" fontFamily="monospace" opacity="0.7">V LOWER BOUND</text>
        
        <path
          d={`M ${signal.map(p => `${p.x},${p.y}`).join(' L ')}`}
          fill="none"
          stroke={anomalyDetected ? '#ff6600' : '#00d4e6'}
          strokeWidth="0.8"
        />
        
        {signal.filter(p => p.isAnomaly).map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="3" fill="none" stroke="#ff6600" strokeWidth="0.5">
              <animate attributeName="r" values="2;5;2" dur="0.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        
        {correcting && (
          <g>
            <rect x="35" y="42" width="30" height="16" rx="2" fill="#00ff88" fillOpacity="0.1" stroke="#00ff88" strokeWidth="0.5" />
            <text x="50" y="52" textAnchor="middle" fill="#00ff88" fontSize="3" fontFamily="monospace">CORRECTING</text>
          </g>
        )}
        
        <rect x="75" y="5" width="22" height="12" rx="1" fill="#1a1a24" stroke={anomalyDetected ? '#ff6600' : '#00ff88'} strokeWidth="0.5" />
        <circle cx="80" cy="11" r="2" fill={anomalyDetected ? '#ff6600' : '#00ff88'}>
          {anomalyDetected && <animate attributeName="opacity" values="1;0.3;1" dur="0.2s" repeatCount="indefinite" />}
        </circle>
        <text x="84" y="12" fill="#999" fontSize="2.5" fontFamily="monospace">
          {anomalyDetected ? 'ALERT' : 'OK'}
        </text>
      </svg>
      
      <div className="absolute left-2 top-2 text-xs font-mono">
        <span className="text-gray-500">Auto-corrections: </span>
        <span className="text-cyber-green">{corrections}</span>
      </div>
      
      <div className="absolute bottom-2 left-2 right-2 text-center">
        <p className="text-xs text-gray-500 font-mono">Contraction analysis on V — UNITARES v6.8.1, App. B</p>
      </div>
    </div>
  )
}

function RealTimeMonitoringAnimation() {
  const [metrics, setMetrics] = useState([
    { id: 'cpu', label: 'CPU Load', value: 45, history: [], color: '#00d4e6' },
    { id: 'mem', label: 'Memory', value: 62, history: [], color: '#ff00ff' },
    { id: 'latency', label: 'Latency', value: 12, history: [], color: '#00ff88' },
    { id: 'throughput', label: 'Throughput', value: 78, history: [], color: '#0066ff' },
  ])
  const [events, setEvents] = useState([])
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1)
      setMetrics(prev => prev.map(m => {
        const change = (Math.random() - 0.5) * 15
        const newValue = Math.max(5, Math.min(95, m.value + change))
        const newHistory = [...m.history.slice(-20), newValue]
        return { ...m, value: newValue, history: newHistory }
      }))
      
      if (Math.random() < 0.15) {
        const eventTypes = ['Agent checkpoint', 'State sync', 'Health ping', 'Metric update']
        setEvents(prev => [...prev.slice(-4), {
          id: Date.now(),
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          time: new Date().toLocaleTimeString(),
        }])
      }
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80">
      <div className="absolute inset-2 grid grid-cols-2 gap-2">
        {metrics.map(m => (
          <div key={m.id} className="bg-dark-900/50 rounded-lg p-2 border border-dark-700">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-gray-500">{m.label}</span>
              <span className="text-xs font-mono font-bold" style={{ color: m.color }}>
                {m.value.toFixed(0)}%
              </span>
            </div>
            <svg className="w-full h-8" viewBox="0 0 100 30" preserveAspectRatio="none">
              {m.history.length > 1 && (
                <path
                  d={`M ${m.history.map((v, i) => `${(i / 20) * 100},${30 - (v / 100) * 28}`).join(' L ')}`}
                  fill="none"
                  stroke={m.color}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              )}
              <line x1="0" y1="30" x2="100" y2="30" stroke="#333" strokeWidth="0.5" />
            </svg>
            <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden mt-1">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: m.color }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-2 left-2 right-2">
        <div className="bg-dark-900/80 rounded-lg p-2 border border-dark-700">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            <span className="text-[10px] font-mono text-gray-500">LIVE EVENTS</span>
          </div>
          <div className="space-y-0.5 h-12 overflow-hidden">
            {events.slice(-3).map(e => (
              <div key={e.id} className="text-[9px] font-mono text-gray-300 flex justify-between">
                <span className="text-cyber-cyan">{e.type}</span>
                <span className="text-gray-600">{e.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScalabilityProblemAnimation() {
  const [decisions, setDecisions] = useState([])
  const [reviewed, setReviewed] = useState(0)
  const [queue, setQueue] = useState(0)
  const [overwhelmed, setOverwhelmed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const newDecisions = Math.floor(Math.random() * 8) + 5
      setDecisions(prev => {
        const updated = [...prev, ...Array.from({ length: newDecisions }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 80 + 10,
        }))]
        return updated.slice(-30)
      })
      setQueue(q => {
        const newQueue = q + newDecisions - 1
        setOverwhelmed(newQueue > 20)
        return Math.max(0, newQueue)
      })
      if (Math.random() < 0.3) {
        setReviewed(r => r + 1)
      }
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80 p-3">
      <div className="h-full flex flex-col">
        <div className="flex-1 relative bg-dark-900 rounded-lg border border-dark-700 overflow-hidden">
          <div className="absolute top-2 left-2 text-[9px] font-mono text-gray-500">AI DECISIONS</div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-cyber-cyan">
            {decisions.length * 100}/sec
          </div>
          
          {decisions.slice(-15).map((d, i) => (
            <motion.div
              key={d.id}
              className="absolute w-2 h-2 rounded-full bg-cyber-cyan"
              initial={{ top: 0, left: `${d.x}%`, opacity: 1 }}
              animate={{ top: '80%', opacity: 0.3 }}
              transition={{ duration: 1.5, ease: 'linear' }}
            />
          ))}
          
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark-800 to-transparent" />
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-dark-700 border-2 border-gray-600 flex items-center justify-center">
              <span className="text-[10px] font-mono text-gray-400">∅</span>
            </div>
            <span className="text-[9px] font-mono text-gray-500">No Measurement</span>
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2 text-center">
            <div className="text-[9px] font-mono text-gray-500">Incoming</div>
            <div className="text-sm font-mono font-bold text-cyber-cyan">{decisions.length * 100}</div>
          </div>
          <div className={`bg-dark-900 rounded-lg border p-2 text-center ${overwhelmed ? 'border-cyber-orange' : 'border-dark-700'}`}>
            <div className="text-[9px] font-mono text-gray-500">Queue</div>
            <div className={`text-sm font-mono font-bold ${overwhelmed ? 'text-cyber-orange animate-pulse' : 'text-yellow-400'}`}>
              {queue > 99 ? '99+' : queue}
            </div>
          </div>
          <div className="bg-dark-900 rounded-lg border border-dark-700 p-2 text-center">
            <div className="text-[9px] font-mono text-gray-500">Reviewed</div>
            <div className="text-sm font-mono font-bold text-cyber-green">{reviewed}</div>
          </div>
        </div>
        
        {overwhelmed && (
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyber-orange/20 border border-cyber-orange rounded-lg px-4 py-2"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <span className="text-cyber-orange text-sm font-mono font-bold">BOTTLENECK</span>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function MissingLayerAnimation() {
  const [phase, setPhase] = useState('without')
  const [dataFlow, setDataFlow] = useState([])

  useEffect(() => {
    const phaseInterval = setInterval(() => {
      setPhase(p => p === 'without' ? 'with' : 'without')
    }, 4000)

    const flowInterval = setInterval(() => {
      setDataFlow(prev => [...prev.slice(-5), { id: Date.now(), y: 0 }])
    }, 400)

    return () => {
      clearInterval(phaseInterval)
      clearInterval(flowInterval)
    }
  }, [])

  return (
    <div className="relative w-full h-64 md:h-80 p-3">
      <div className="h-full flex flex-col">
        <div className="flex justify-center mb-2">
          <div className={`px-3 py-1 rounded-full text-[10px] font-mono ${phase === 'without' ? 'bg-cyber-orange/20 text-cyber-orange' : 'bg-cyber-green/20 text-cyber-green'}`}>
            {phase === 'without' ? 'WITHOUT CIRWEL' : 'WITH CIRWEL'}
          </div>
        </div>
        
        <div className="flex-1 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-dark-800 rounded-lg border border-cyber-cyan/30 flex items-center justify-center">
            <span className="text-[10px] font-mono text-cyber-cyan">AI SYSTEM</span>
          </div>
          
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {dataFlow.map((d, i) => (
              <motion.circle
                key={d.id}
                cx="50%"
                cy="15%"
                r="3"
                fill={phase === 'with' ? '#00ff88' : '#00d4e6'}
                initial={{ cy: '20%', opacity: 1 }}
                animate={{ cy: phase === 'with' ? '55%' : '80%', opacity: 0.3 }}
                transition={{ duration: phase === 'with' ? 0.8 : 1.5 }}
              />
            ))}
          </svg>
          
          {phase === 'with' && (
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 bg-cyber-green/10 rounded-lg border border-cyber-green/50 flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            >
              <span className="text-[10px] font-mono text-cyber-green font-bold">CIRWEL</span>
            </motion.div>
          )}
          
          {phase === 'without' && (
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-10 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-[10px] font-mono text-gray-500">GAP</span>
            </motion.div>
          )}
          
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-12 bg-dark-800 rounded-lg border border-gray-600 flex items-center justify-center">
            <span className="text-[10px] font-mono text-gray-300">SUBSTRATE</span>
          </div>
        </div>
        
        <div className="mt-2 grid grid-cols-2 gap-2">
          <div className={`bg-dark-900 rounded-lg border p-2 ${phase === 'without' ? 'border-cyber-orange/50' : 'border-dark-700'}`}>
            <div className="text-[9px] font-mono text-gray-500">State Telemetry</div>
            <div className={`text-sm font-mono font-bold ${phase === 'without' ? 'text-cyber-orange' : 'text-cyber-green'}`}>
              {phase === 'without' ? 'none' : '(S,I,E,V)'}
            </div>
          </div>
          <div className={`bg-dark-900 rounded-lg border p-2 ${phase === 'without' ? 'border-cyber-orange/50' : 'border-dark-700'}`}>
            <div className="text-[9px] font-mono text-gray-500">Per-Decision Trace</div>
            <div className={`text-sm font-mono font-bold ${phase === 'without' ? 'text-cyber-orange' : 'text-cyber-green'}`}>
              {phase === 'without' ? 'no' : 'yes'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const modalContent = {
  'coupled-variables': {
    title: 'Entropy (S) — Response Distribution',
    icon: Link2,
    color: 'cyan',
    description: 'S = H(Y|x), the Shannon entropy of an agent\'s response distribution given context x. CIRWEL measures S per decision; rising S signals the model is hedging across more outputs and the (S, I, E, V) state co-evolves.',
    Animation: CoupledVariablesAnimation,
  },
  'natural-evolution': {
    title: 'Mutual Information (I) — Context↔Response',
    icon: TrendingUp,
    color: 'green',
    description: 'I = I(X; Y), the mutual information between the prompt context X and the response Y. Higher I means the response is actually conditioned on context, not boilerplate. CIRWEL tracks I per decision rather than assuming the model is paying attention.',
    Animation: NaturalEvolutionAnimation,
  },
  'emergent-stability': {
    title: 'Free-Energy Residual (V)',
    icon: Target,
    color: 'magenta',
    description: 'V is the accumulated free-energy residual along the trajectory — a Lyapunov-style scalar that should contract over a stable run. UNITARES v6.8.1 (Appendix B) gives the contraction analysis. In current production, the V residual sits within [-0.1, 0.1] for active agents.',
    Animation: EmergentStabilityAnimation,
  },
  'automatic-intervention': {
    title: 'Contraction Bounds on V',
    icon: Zap,
    color: 'orange',
    description: 'UNITARES v6.8.1 (Appendix B) gives a contraction analysis of the (S, I, E, V) dynamics, bounding the V residual along stable trajectories. CIRWEL surfaces this as a runtime signal: when the bound is at risk of being violated, the agent is halted — stability is a paper-backed property of the update rule, not a heuristic monitor.',
    Animation: AutomaticInterventionAnimation,
  },
  'real-time-monitoring': {
    title: 'Per-Decision (S, I, E, V) Telemetry',
    icon: Activity,
    color: 'cyan',
    description: 'CIRWEL streams the (S, I, E, V) state for every agent decision: response entropy, context–response mutual information, negative variational free energy, and accumulated free-energy residual. Each value is tied back to the state signature at execution.',
    Animation: RealTimeMonitoringAnimation,
  },
  'scalability-problem': {
    title: 'The Measurement Gap',
    icon: AlertTriangle,
    color: 'orange',
    description: 'Agent fleets ship without instruments for response entropy, context–response mutual information, resource use, or free-energy residual. Without those signals there is nothing to bound, alert on, or audit — only after-the-fact explanation.',
    Animation: ScalabilityProblemAnimation,
  },
  'missing-layer': {
    title: 'The Open Substrate',
    icon: Layers,
    color: 'cyan',
    description: 'UNITARES v6.8.1 (Zenodo DOI 10.5281/zenodo.19647159) defines the (S, I, E, V) substrate publicly: the variables, the update rule, and the contraction proof. CIRWEL is the production instrumentation against that substrate.',
    Animation: MissingLayerAnimation,
  },
}

const colorMap = {
  cyan: { bg: 'from-cyber-cyan/20', border: 'border-cyber-cyan/30', text: 'text-cyber-cyan', glow: 'shadow-cyber-cyan/20' },
  green: { bg: 'from-cyber-green/20', border: 'border-cyber-green/30', text: 'text-cyber-green', glow: 'shadow-cyber-green/20' },
  magenta: { bg: 'from-cyber-magenta/20', border: 'border-cyber-magenta/30', text: 'text-cyber-magenta', glow: 'shadow-cyber-magenta/20' },
  orange: { bg: 'from-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400', glow: 'shadow-orange-500/20' },
}

export default function CoreInnovationModal({ isOpen, onClose, animationType }) {
  const content = modalContent[animationType]
  
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

  if (!content) return null

  const colors = colorMap[content.color]
  const Icon = content.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className={`relative w-full max-w-lg bg-gradient-to-b ${colors.bg} to-dark-900 border ${colors.border} rounded-2xl overflow-hidden shadow-2xl ${colors.glow}`}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-50" style={{ color: content.color === 'cyan' ? '#00d4e6' : content.color === 'green' ? '#00ff88' : content.color === 'magenta' ? '#ff00ff' : '#ff6600' }} />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-dark-800 border ${colors.border} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${colors.text}`}>{content.title}</h3>
                    <p className="text-xs text-gray-500 font-mono">Core Innovation</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-dark-800 transition-colors text-gray-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-300 text-sm mb-6">{content.description}</p>
              
              <div className="bg-dark-950/50 rounded-xl border border-dark-700 overflow-hidden">
                <content.Animation />
              </div>
              
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-600">
                <span className="font-mono">ESC</span>
                <span>or click outside to close</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
