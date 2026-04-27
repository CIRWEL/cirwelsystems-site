import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-cyber-cyan/10 flex items-center justify-center border border-cyber-cyan/20">
              <Shield className="w-6 h-6 text-cyber-cyan" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Privacy Policy</h1>
          </div>

          <p className="text-gray-300 font-mono text-sm mb-12">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <div className="space-y-10 text-gray-300">
            <Section title="1. Introduction">
              <p>
                CIRWEL Systems ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you visit our website 
                or use our services.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Contact Information:</strong> Name, email address, and company name when you submit our contact form</li>
                <li><strong>Message Content:</strong> Any information you include in messages sent through our contact form</li>
                <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Respond to your inquiries and requests</li>
                <li>Provide information about our AI infrastructure platform and services</li>
                <li>Improve our website and user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </Section>

            <Section title="4. Information Sharing">
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Providers:</strong> Third-party services that help us operate our website, including email delivery services (Resend)</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>
              <p className="mt-4">We do not sell your personal information to third parties.</p>
            </Section>

            <Section title="5. Data Security">
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
                the Internet is 100% secure.
              </p>
            </Section>

            <Section title="6. Data Retention">
              <p>
                We retain your personal information only for as long as necessary to fulfill the purposes for which 
                it was collected, including to satisfy legal, accounting, or reporting requirements.
              </p>
            </Section>

            <Section title="7. Your Rights">
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{' '}
                <a href="mailto:founder@cirwel.org" className="text-cyber-cyan hover:text-cyber-magenta transition-colors">
                  founder@cirwel.org
                </a>
              </p>
            </Section>

            <Section title="8. Cookies">
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. 
                You can control cookies through your browser settings.
              </p>
            </Section>

            <Section title="9. Third-Party Links">
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy 
                practices of these external sites. We encourage you to review their privacy policies.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this privacy policy from time to time. We will notify you of any changes by posting 
                the new policy on this page and updating the "Last updated" date.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-dark-900/50 rounded-lg border border-cyber-cyan/20 font-mono text-sm">
                <p className="text-white">CIRWEL Systems</p>
                <p>Email:{' '}
                  <a href="mailto:founder@cirwel.org" className="text-cyber-cyan hover:text-cyber-magenta transition-colors">
                    founder@cirwel.org
                  </a>
                </p>
                <p>Location: United States</p>
              </div>
            </Section>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-cyber-cyan font-mono text-sm">///</span>
        {title}
      </h2>
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </motion.div>
  )
}
