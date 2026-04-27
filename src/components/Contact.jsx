import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, MapPin, ArrowRight, Terminal, CheckCircle } from 'lucide-react'

function CyberInput({ label, type = 'text', placeholder, value, onChange, required = false }) {
  return (
    <div className="relative group">
      <label className="block text-xs font-mono text-cyber-cyan/70 mb-2 tracking-wider uppercase">{label}</label>
      <div className="relative">
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-dark-900/80 border border-cyber-cyan/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_20px_rgba(0,212,230,0.1)] focus:ring-1 focus:ring-cyber-cyan/30 transition-all font-mono"
          placeholder={placeholder}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  )
}

function CyberTextarea({ label, placeholder, value, onChange, required = false }) {
  return (
    <div className="relative group">
      <label className="block text-xs font-mono text-cyber-cyan/70 mb-2 tracking-wider uppercase">{label}</label>
      <div className="relative">
        <textarea
          required={required}
          rows={4}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 bg-dark-900/80 border border-cyber-cyan/20 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-cyber-cyan/50 focus:shadow-[0_0_20px_rgba(0,212,230,0.1)] focus:ring-1 focus:ring-cyber-cyan/30 transition-all resize-none font-mono"
          placeholder={placeholder}
        />
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyber-cyan/0 via-cyber-cyan/5 to-cyber-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  )
}

export default function Contact() {
  const ref = useRef(null)

  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message')
      }
      
      setSubmitted(true)
      setFormData({ name: '', email: '', company: '', message: '' })
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref} style={{ position: 'relative' }}>
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      
      <div className="absolute inset-0 circuit-pattern opacity-20 pointer-events-none" />
      
      <motion.div 
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <div className="absolute top-20 left-10 w-32 h-32 border border-cyber-cyan/10 rounded-full opacity-10" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-cyber-magenta/10 rounded-full opacity-10" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span 
              className="text-cyber-cyan font-mono text-sm tracking-[0.3em] mb-4 block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {'///'} GET IN TOUCH
            </motion.span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Let's Talk
              <span className="text-gradient-cyber"> AI Governance</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Whether you're a researcher, funder, enterprise operator, or potential partner —
              we'd love to walk you through the substrate.
            </p>

            <div className="space-y-6">
              <motion.div 
                className="cyber-card rounded-xl p-5 flex items-center gap-4 group"
                whileHover={{ x: 5, borderColor: 'rgba(0, 212, 230, 0.3)' }}
              >
                <div className="w-12 h-12 rounded-lg bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/20 group-hover:border-cyber-cyan/50 transition-colors">
                  <Mail className="w-5 h-5 text-cyber-cyan" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">Email</p>
                  <a href="mailto:founder@cirwel.org" className="text-white font-medium hover:text-cyber-cyan transition-colors">
                    founder@cirwel.org
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="cyber-card rounded-xl p-5 flex items-center gap-4 group"
                whileHover={{ x: 5, borderColor: 'rgba(0, 212, 230, 0.3)' }}
              >
                <div className="w-12 h-12 rounded-lg bg-cyber-magenta/10 flex items-center justify-center border border-cyber-magenta/20 group-hover:border-cyber-magenta/50 transition-colors">
                  <MapPin className="w-5 h-5 text-cyber-magenta" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">Location</p>
                  <p className="text-white font-medium">United States</p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="mt-8 p-4 border border-dashed border-cyber-cyan/20 rounded-xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-cyber-cyan" />
                <span className="font-mono text-xs text-cyber-cyan">system_status</span>
              </div>
              <p className="font-mono text-xs text-gray-500">
                {'>'} infra_engine: <span className="text-cyber-green">ONLINE</span><br />
                {'>'} response_time: <span className="text-cyber-cyan">{'<'}24h</span><br />
                {'>'} availability: <span className="text-cyber-green">ACCEPTING_INQUIRIES</span>
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="cyber-card rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 font-mono text-xs text-cyber-cyan/30">
                FORM_v2.1
              </div>
              
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <p className="text-red-400 text-sm font-mono">{error}</p>
                </motion.div>
              )}
              
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-cyber-green/20 flex items-center justify-center mx-auto mb-6 border border-cyber-green/30"
                    animate={{ 
                      boxShadow: ['0 0 20px rgba(0, 224, 119, 0.2)', '0 0 40px rgba(0, 224, 119, 0.4)', '0 0 20px rgba(0, 224, 119, 0.2)']
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="w-10 h-10 text-cyber-green" />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2 text-glow">Transmission Successful</h3>
                  <p className="text-gray-300 font-mono text-sm mb-6">Response ETA: {'<'}24 hours</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 border border-cyber-cyan/30 rounded-lg text-cyber-cyan text-sm font-mono hover:bg-cyber-cyan/10 hover:border-cyber-cyan/50 transition-all"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <CyberInput
                      label="Name"
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                    <CyberInput
                      label="Email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  
                  <CyberInput
                    label="Company"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                  
                  <CyberTextarea
                    label="Message"
                    placeholder="Tell us about your agent infrastructure needs..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2 group relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyber-cyan to-cyber-blue" />
                    <span className="absolute inset-[1px] bg-dark-900 rounded-lg group-hover:bg-transparent transition-colors duration-300" />
                    <span className="relative z-10 flex items-center gap-2 text-white group-hover:text-dark-950 transition-colors">
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
