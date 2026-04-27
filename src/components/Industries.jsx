import { motion, useScroll } from 'framer-motion'
import { useRef, useState } from 'react'
import { TrendingUp, ShieldCheck, Server, ChevronRight } from 'lucide-react'
import IndustryModal from './IndustryModals'
import useTilt from '../hooks/useTilt'

function HorizontalScrollCard({ useCase, index, progress, onClick }) {
  const { cardRef, handleMouseMove, handleMouseLeave, tiltStyle } = useTilt(6)

  const colors = {
    cyan: { border: 'border-cyber-cyan/30', bg: 'bg-cyber-cyan/10', text: 'text-cyber-cyan', glow: '0 0 30px rgba(0, 212, 230, 0.2)', gradient: 'from-cyber-cyan' },
    magenta: { border: 'border-cyber-magenta/30', bg: 'bg-cyber-magenta/10', text: 'text-cyber-magenta', glow: '0 0 30px rgba(224, 64, 224, 0.2)', gradient: 'from-cyber-magenta' },
    green: { border: 'border-cyber-green/30', bg: 'bg-cyber-green/10', text: 'text-cyber-green', glow: '0 0 30px rgba(0, 224, 119, 0.2)', gradient: 'from-cyber-green' },
    orange: { border: 'border-cyber-orange/30', bg: 'bg-cyber-orange/10', text: 'text-cyber-orange', glow: '0 0 30px rgba(255, 102, 0, 0.2)', gradient: 'from-cyber-orange' },
  }[useCase.color]

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      className="relative rounded-xl p-[1px] group cursor-pointer"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ boxShadow: colors.glow, y: -8 }}
    >
      <motion.div 
        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
      />
      
      <div className={`cyber-card rounded-xl p-8 md:p-10 relative overflow-hidden ${colors.border} bg-dark-900/95`}>
        <motion.div 
          className={`absolute top-0 right-0 w-80 h-80 ${colors.bg} rounded-full blur-3xl opacity-30`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <div className="absolute top-4 right-4 font-mono text-xs opacity-30">
          {`SECTOR_0${index + 1}`}
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
          <motion.div 
            className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center flex-shrink-0 border ${colors.border} group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <useCase.icon className={`w-8 h-8 ${colors.text}`} />
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h3 className={`text-2xl font-bold group-hover:${colors.text} transition-colors`}>{useCase.name}</h3>
              <ChevronRight className={`w-5 h-5 ${colors.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">{useCase.description}</p>
            
            <div className="flex flex-wrap gap-3">
              {useCase.features.map((feature, featureIndex) => (
                <motion.span
                  key={feature}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + featureIndex * 0.1 }}
                  viewport={{ once: true }}
                  className={`px-3 py-1.5 cyber-card rounded-lg text-sm font-mono ${colors.border} hover:${colors.bg} transition-colors cursor-default`}
                  whileHover={{ scale: 1.05 }}
                >
                  {feature}
                </motion.span>
              ))}
            </div>
            
          </div>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-current to-transparent ${colors.text}`}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
          style={{ originX: 0.5 }}
        />
      </div>
    </motion.div>
  )
}

export default function Industries() {
  const containerRef = useRef(null)
  const [activeModal, setActiveModal] = useState(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const useCases = [
    {
      icon: TrendingUp,
      name: 'Financial Services',
      color: 'cyan',
      animationType: 'production',
      description: 'Trading algorithms, loan decisioning, fraud detection — agent fleets that already run in regulated environments, where every decision needs a reproducible state signature. CIRWEL attaches to existing models via MCP and emits per-decision (S, I, E, V) telemetry alongside the audit trail.',
      features: ['Per-decision (S, I, E, V) signature', 'Reproducible audit trail', 'V-residual anomaly detection', 'Model-agnostic instrumentation']
    },
    {
      icon: ShieldCheck,
      name: 'AI Risk Insurance',
      color: 'green',
      animationType: 'research',
      description: 'Underwriting agent risk requires a measurement protocol. (S, I, E, V) telemetry gives actuaries continuous, comparable behavioral data across heterogeneous fleets — drift on V, anomalies on I, resource pressure on E — instead of post-hoc incident reports.',
      features: ['(S, I, E, V) telemetry stream', 'V-residual drift detection', 'Per-decision event logs', 'Cross-fleet comparability']
    },
    {
      icon: Server,
      name: 'Enterprise AI Deployments',
      color: 'orange',
      animationType: 'multi-agent',
      description: 'Operators need evidence that fleets are running inside sanctioned dynamics before scaling them. CIRWEL instruments Claude-class, GPT-class, and custom agents with the same information-theoretic state model and triggers V-residual circuit breakers when contraction bounds are violated.',
      features: ['Works with Claude-, GPT-, and custom agents', 'Per-fleet state dashboards', 'V-residual circuit breakers', 'Zero-downtime integration']
    },
  ]

  return (
    <section id="industries" className="py-32 relative overflow-hidden" ref={containerRef} style={{ position: 'relative' }}>
            
      <div className="absolute inset-0 data-grid opacity-30 pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <span className="text-cyber-green font-mono text-sm tracking-[0.3em] mb-4 block">
            {'[['} WHERE IT'S USED {']]'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Where the <span className="text-gradient-cyber">Substrate</span> Is Used
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Three sectors where agent fleets already operate at scale and where principled measurement
            of internal state is currently absent.
          </p>
        </motion.div>

        <div className="space-y-8">
          {useCases.map((useCase, index) => (
            <HorizontalScrollCard 
              key={useCase.name} 
              useCase={useCase} 
              index={index}
              progress={scrollYProgress}
              onClick={() => setActiveModal(useCase.animationType)}
            />
          ))}
        </div>
      </div>
      
      <IndustryModal 
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        animationType={activeModal}
      />
    </section>
  )
}
