import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Atom, GitBranch, Shield, Zap, ChevronRight } from 'lucide-react'
import TechModal from './TechModals'
import CoreInnovationModal from './CoreInnovationModals'
import useTilt from '../hooks/useTilt'


function TechCard({ icon: Icon, title, desc, index, color = 'cyan', onClick }) {
  const { cardRef, handleMouseMove, handleMouseLeave, tiltStyle } = useTilt(8)

  const colors = {
    cyan: { bg: 'bg-cyber-cyan/10', border: 'border-cyber-cyan/20', text: 'text-cyber-cyan', glow: 'rgba(0, 212, 230, 0.2)', gradient: 'from-cyber-cyan', borderColor: 'rgba(0, 212, 230, 0.6)' },
    magenta: { bg: 'bg-cyber-magenta/10', border: 'border-cyber-magenta/20', text: 'text-cyber-magenta', glow: 'rgba(224, 64, 224, 0.2)', gradient: 'from-cyber-magenta', borderColor: 'rgba(224, 64, 224, 0.6)' },
    blue: { bg: 'bg-cyber-blue/10', border: 'border-cyber-blue/20', text: 'text-cyber-blue', glow: 'rgba(0, 102, 255, 0.2)', gradient: 'from-cyber-blue', borderColor: 'rgba(0, 102, 255, 0.6)' },
    green: { bg: 'bg-cyber-green/10', border: 'border-cyber-green/20', text: 'text-cyber-green', glow: 'rgba(0, 224, 119, 0.2)', gradient: 'from-cyber-green', borderColor: 'rgba(0, 224, 119, 0.6)' },
  }[color]

  return (
    <motion.div
      onClick={onClick}
      ref={cardRef}
      className="relative rounded-lg p-[1px] group cursor-pointer"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ 
        y: -8,
        boxShadow: `0 20px 40px ${colors.glow}`,
      }}
    >
      {/* Animated electric border */}
      <motion.div
        className="absolute inset-0 rounded-lg overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.borderColor}, transparent)`,
            backgroundSize: '200% 100%',
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>
      
      <motion.div 
        className={`absolute inset-0 rounded-lg bg-gradient-to-br ${colors.gradient} to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      />
      
      <div className="cyber-card rounded-lg p-8 relative overflow-hidden bg-dark-900/95">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.bg}`} />
        
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="80" cy="20" r="2" className={`fill-current ${colors.text}`} />
            <circle cx="60" cy="40" r="1.5" className={`fill-current ${colors.text}`} />
            <circle cx="85" cy="50" r="1" className={`fill-current ${colors.text}`} />
            <line x1="80" y1="20" x2="60" y2="40" className={`stroke-current ${colors.text}`} strokeWidth="0.5" />
            <line x1="60" y1="40" x2="85" y2="50" className={`stroke-current ${colors.text}`} strokeWidth="0.5" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.div 
            className={`w-16 h-16 rounded-xl ${colors.bg} flex items-center justify-center mb-6 border ${colors.border} group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
          >
            <Icon className={`w-8 h-8 ${colors.text} group-hover:drop-shadow-lg transition-all duration-300`} />
          </motion.div>
          <h3 className={`text-xl font-bold mb-3 group-hover:${colors.text} transition-colors`}>{title}</h3>
          <p className="text-gray-300 leading-relaxed mb-4">{desc}</p>
          <div className={`flex items-center gap-2 text-xs font-mono ${colors.text} opacity-60 group-hover:opacity-100 transition-opacity`}>
            <span>See How It Works</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${color === 'cyan' ? '#00d4e6' : color === 'magenta' ? '#e040e0' : color === 'blue' ? '#0066ff' : '#00e077'}, transparent)` }}
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

export default function Technology() {
  const containerRef = useRef(null)
  const [activeModal, setActiveModal] = useState(null)
  const [activeCoreModal, setActiveCoreModal] = useState(null)
  
  const differentiators = [
    { 
      icon: Atom, 
      title: 'Live State Readings', 
      desc: 'Four measured signals per agent, every decision. They surface drift before it shows up in the output. Click for the math.',
      color: 'cyan',
      animationType: 'state-dynamics'
    },
    { 
      icon: Shield, 
      title: 'Stable by Design', 
      desc: 'When the system halts an agent, it\'s tied to a published stability proof — not a guessed threshold or a log pattern.',
      color: 'magenta',
      animationType: 'emergent-safety'
    },
    { 
      icon: GitBranch, 
      title: 'Works Across Model Families', 
      desc: 'The same measurement layer instruments GPT-class, Claude-class, and custom agents. One signal, one dashboard, every fleet.',
      color: 'blue',
      animationType: 'principled-decision'
    },
    { 
      icon: Zap, 
      title: 'Calibrated, Not Trained', 
      desc: 'Each agent class gets its own healthy baseline — no fleet-wide normalization that hides the real signal. The published method changes roughly 1 in 4 governance decisions on a real production sample.',
      color: 'green',
      animationType: 'self-tuning'
    },
  ]

  return (
    <section id="technology" className="py-32 relative overflow-hidden" ref={containerRef} style={{ position: 'relative' }}>
            
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <span className="text-cyber-magenta text-sm tracking-[0.2em] mb-4 block font-medium">
            TECHNICAL APPROACH
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What's <span className="text-gradient-cyber">Different</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Live state readings for every agent, with stability guarantees from a published method.
            Not another observability dashboard.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {differentiators.map((item, index) => (
            <TechCard 
              key={item.title} 
              {...item} 
              index={index} 
              onClick={() => setActiveModal(item.animationType)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          viewport={{ once: true, margin: "-50px" }}
          className="cyber-card rounded-xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <div className="absolute inset-0 holographic opacity-30" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-cyber-cyan/30 mb-6">
              <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
              <span className="font-mono text-xs text-cyber-cyan">CORE INNOVATION</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-glow">What We Actually Measure</h3>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg mb-8">
              Every governance decision traces back to a measured signal with a published proof
              behind it — not a heuristic. Click any signal below to see what it means and how it works.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'How confident the agent is', animation: 'coupled-variables' },
                { label: 'Whether it\'s using the context', animation: 'natural-evolution' },
                { label: 'How much trouble is building up', animation: 'emergent-stability' },
                { label: 'Where the safety bound lives', animation: 'automatic-intervention' },
              ].map((tag, index) => (
                <motion.span
                  key={tag.label}
                  onClick={() => setActiveCoreModal(tag.animation)}
                  className="px-4 py-2 cyber-card rounded-lg text-sm text-gray-300 font-mono group cursor-pointer hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                >
                  <ChevronRight className="w-3 h-3 inline mr-1 opacity-50 group-hover:opacity-100" />
                  {tag.label}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 text-sm font-mono">
            {'<'} Open paper &middot; Reference implementation &middot; 9+ provisional patents on the substrate {'/>'} 
          </p>
        </motion.div>
      </div>
      
      <TechModal 
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
        animationType={activeModal}
      />
      
      <CoreInnovationModal 
        isOpen={activeCoreModal !== null}
        onClose={() => setActiveCoreModal(null)}
        animationType={activeCoreModal}
      />
    </section>
  )
}
