import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileCheck, Lock, Eye, Users, BarChart3, Settings, Cpu, Database, Network, Shield, ArrowRight } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'
import useTilt from '../hooks/useTilt'

function PatentCard({ patent, index, isInView }) {
  const { cardRef, handleMouseMove, handleMouseLeave, tiltStyle } = useTilt(8)

  return (
    <Link to={`/patents?highlight=${patent.patentId}#${patent.category}`}>
      <motion.div
        ref={cardRef}
        style={tiltStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ 
          y: -10, 
          boxShadow: '0 20px 40px rgba(0, 212, 230, 0.2)'
        }}
        className="cyber-card rounded-xl p-6 group cursor-pointer relative overflow-hidden"
      >
      <motion.div 
        className="absolute inset-0 holographic opacity-0 group-hover:opacity-20 transition-opacity duration-500"
      />
      
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <motion.div 
          className="w-14 h-14 rounded-xl bg-cyber-cyan/10 flex items-center justify-center mb-5 border border-cyber-cyan/20 group-hover:border-cyber-cyan/50 group-hover:scale-110 transition-all duration-300"
          whileHover={{ rotate: [0, -5, 5, 0] }}
          transition={{ duration: 0.4 }}
        >
          <patent.icon className="w-7 h-7 text-cyber-cyan group-hover:drop-shadow-[0_0_8px_rgba(0,212,230,0.8)]" />
        </motion.div>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] px-2 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded font-mono tracking-wider border border-cyber-cyan/30">
            PATENT-PENDING
          </span>
        </div>
        
        <h3 className="text-xl font-semibold mb-3 group-hover:text-cyber-cyan transition-colors">{patent.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{patent.desc}</p>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyber-cyan to-cyber-blue"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        style={{ originX: 0 }}
      />
      
      <div className="absolute bottom-4 right-4 font-mono text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
        {`IP_${String(index + 1).padStart(3, '0')}`}
      </div>
      </motion.div>
    </Link>
  )
}

export default function IPPortfolio() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.1) setIsInView(true)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1])

  const patents = [
    { icon: Eye, title: 'Drift Detection', desc: 'Real-time monitoring of AI behavioral changes and performance degradation', patentId: 3, category: 'core' },
    { icon: Lock, title: 'Bias Mitigation', desc: 'Algorithmic systems for identifying and correcting unfair decision patterns', patentId: 6, category: 'advanced' },
    { icon: BarChart3, title: 'Explainability Engine', desc: 'Transparent AI reasoning that humans can understand and audit', patentId: 5, category: 'advanced' },
    { icon: Users, title: 'Human-AI Collaboration', desc: 'Seamless handoff protocols between autonomous AI and human oversight', patentId: 1, category: 'foundation' },
    { icon: Settings, title: 'Infrastructure Automation', desc: 'Automated compliance and policy enforcement across AI systems', patentId: 2, category: 'foundation' },
    { icon: Cpu, title: 'Adaptive Learning Controls', desc: 'Safe boundaries for AI self-improvement and adaptation', patentId: 4, category: 'core' },
    { icon: Database, title: 'Audit Trail Systems', desc: 'Immutable logging of all AI decisions for regulatory compliance', patentId: 7, category: 'validation' },
    { icon: Network, title: 'Multi-Agent Coordination', desc: 'Safe interaction protocols for multiple AI systems working together', patentId: 8, category: 'validation' },
    { icon: FileCheck, title: 'Certification Framework', desc: 'Standards-based verification for AI deployment readiness', patentId: 9, category: 'validation' },
  ]

  return (
    <section id="ip" className="py-32 relative overflow-hidden" ref={ref} style={{ position: 'relative' }}>
            
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-10">
          <defs>
            <pattern id="ip-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#00d4e6" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ip-grid)" />
        </svg>
      </div>
      
      <motion.div className="max-w-7xl mx-auto px-6 relative z-10" style={{ scale }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyber-cyan font-mono text-sm tracking-[0.3em] mb-4 block">
            {'</'} DEFENSIBLE IP {'>'}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient-cyber">
              <AnimatedCounter target={9} />+
            </span> Patent-Pending
            <br />Innovations
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            9 provisional patent applications covering the full AI governance stack — from drift detection 
            to multi-agent coordination. This IP creates a lasting competitive moat.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {patents.slice(0, 6).map((patent, index) => (
            <PatentCard key={patent.title} patent={patent} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="cyber-card rounded-xl p-8 inline-block relative overflow-hidden group mb-8">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyber-cyan/5 via-cyber-blue/5 to-cyber-cyan/5"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            <div className="relative z-10 flex items-center gap-4">
              <Shield className="w-8 h-8 text-cyber-cyan" />
              <p className="text-gray-300 text-lg">
                Competitors would need to
                <span className="text-cyber-cyan font-semibold"> invent around our patent applications </span>
                to offer comparable governance capabilities.
              </p>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            <Link
              to="/patents"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/10 transition-all duration-300 font-medium group"
            >
              View Full Patent Portfolio
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
