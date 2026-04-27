import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, FileCheck, Scale, Building2, Brain, Heart, Landmark, Globe, Factory, Users } from 'lucide-react';

const complianceFrameworks = [
  {
    id: 'hipaa-fda',
    title: 'FDA & HIPAA',
    subtitle: 'Healthcare Compliance',
    icon: Heart,
    color: 'cyan',
    description: 'CIRWEL supports healthcare AI deployments with built-in compliance controls for FDA 21 CFR Part 11 and HIPAA requirements.',
    features: [
      'Audit trail generation for AI decision-making',
      'Data privacy controls for PHI protection',
      'Validation documentation support',
      'Access control and authentication logging',
      'Explainability reports for clinical AI systems'
    ],
    status: 'Compliance Ready'
  },
  {
    id: 'eu-ai-act',
    title: 'EU AI Act',
    subtitle: 'European Union Regulation',
    icon: Globe,
    color: 'magenta',
    description: 'Full readiness for the EU AI Act with risk classification, transparency requirements, and human oversight capabilities.',
    features: [
      'AI system risk classification support',
      'Transparency and explainability documentation',
      'Human oversight enforcement mechanisms',
      'Conformity assessment preparation',
      'Technical documentation generation',
      'Fundamental rights impact assessment tools'
    ],
    status: 'EU AI Act Ready'
  },
  {
    id: 'colorado-sb21-169',
    title: 'Colorado SB21-169',
    subtitle: 'Colorado AI Governance Act',
    icon: Landmark,
    color: 'green',
    description: 'Comprehensive support for Colorado\'s groundbreaking AI governance legislation addressing algorithmic discrimination.',
    features: [
      'Algorithmic discrimination risk assessments',
      'Consumer notification capabilities',
      'Impact assessment documentation',
      'Developer duty compliance tools',
      'Deployer obligation tracking',
      'Opt-out mechanism support'
    ],
    status: 'Compliant'
  },
  {
    id: 'iso-42001',
    title: 'ISO/IEC 42001',
    subtitle: 'AI Management System Standard',
    icon: FileCheck,
    color: 'cyan',
    description: 'Aligned with the international standard for AI management systems, enabling organizations to demonstrate responsible AI practices.',
    features: [
      'AI policy and objective management',
      'Risk assessment and treatment workflows',
      'Performance monitoring and measurement',
      'Continuous improvement mechanisms',
      'Documentation and record keeping',
      'Internal audit support'
    ],
    status: 'Aligned'
  },
  {
    id: 'nist-ai-rmf',
    title: 'NIST AI RMF',
    subtitle: 'AI Risk Management Framework',
    icon: Shield,
    color: 'magenta',
    description: 'Built on NIST AI Risk Management Framework principles for trustworthy AI development and deployment.',
    features: [
      'GOVERN: Organizational AI risk culture',
      'MAP: Context and risk identification',
      'MEASURE: Risk analysis and tracking',
      'MANAGE: Risk prioritization and response',
      'Trustworthy AI characteristics support',
      'Cross-sectoral applicability'
    ],
    status: 'Framework Aligned'
  },
  {
    id: 'nyc-ll144',
    title: 'NYC Local Law 144',
    subtitle: 'Automated Employment Decision Tools',
    icon: Users,
    color: 'green',
    description: 'Full compliance support for NYC\'s law governing AI in hiring and employment decisions.',
    features: [
      'Bias audit documentation and tracking',
      'Annual audit scheduling and management',
      'Candidate notification system support',
      'Audit result publication workflows',
      'AEDT usage logging and monitoring',
      'Third-party auditor coordination tools'
    ],
    status: 'Compliant'
  }
];

const additionalStandards = [
  { name: 'SOC 2 Type II', status: 'In Progress' },
  { name: 'GDPR', status: 'Compliant' },
  { name: 'CCPA/CPRA', status: 'Compliant' },
  { name: 'IEEE 7000', status: 'Aligned' },
  { name: 'OECD AI Principles', status: 'Aligned' },
  { name: 'Singapore PDPA', status: 'Ready' }
];

function ComplianceCard({ framework, index }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = framework.icon;
  const colorClasses = {
    cyan: {
      glow: 'shadow-[0_0_30px_rgba(0,212,230,0.3)]',
      border: 'border-cyber-cyan/30',
      text: 'text-cyber-cyan',
      bg: 'bg-cyber-cyan/10',
      status: 'bg-cyber-cyan/20 text-cyber-cyan border-cyber-cyan/30'
    },
    magenta: {
      glow: 'shadow-[0_0_30px_rgba(255,0,255,0.3)]',
      border: 'border-cyber-magenta/30',
      text: 'text-cyber-magenta',
      bg: 'bg-cyber-magenta/10',
      status: 'bg-cyber-magenta/20 text-cyber-magenta border-cyber-magenta/30'
    },
    green: {
      glow: 'shadow-[0_0_30px_rgba(0,255,136,0.3)]',
      border: 'border-cyber-green/30',
      text: 'text-cyber-green',
      bg: 'bg-cyber-green/10',
      status: 'bg-cyber-green/20 text-cyber-green border-cyber-green/30'
    }
  };

  const colors = colorClasses[framework.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative p-6 rounded-lg bg-cyber-dark/80 backdrop-blur-sm border ${colors.border} hover:${colors.glow} transition-shadow duration-300 cursor-default`}
    >
      {/* Corner brackets */}
      <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${colors.border}`} />
      <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${colors.border}`} />
      <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${colors.border}`} />
      <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${colors.border}`} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className={`p-3 rounded-lg ${colors.bg}`}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className={`w-6 h-6 ${colors.text}`} />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-white">{framework.title}</h3>
            <p className={`text-sm font-mono ${colors.text}`}>{framework.subtitle}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-mono rounded-full border ${colors.status}`}>
          {framework.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
        {framework.description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {framework.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <CheckCircle className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Compliance() {
  const navigate = useNavigate()

  const handleContactClick = (e) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      const contactSection = document.getElementById('contact')
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    }, 300)
  }

  return (
    <section className="min-h-screen py-24 px-4 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyber-darker via-cyber-dark to-cyber-darker" />
      
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(rgba(0,212,230,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,230,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-cyan/30 bg-cyber-cyan/5 mb-6">
            <Shield className="w-4 h-4 text-cyber-cyan" />
            <span className="text-cyber-cyan font-mono text-sm">Enterprise Compliance</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Regulatory </span>
            <span className="bg-gradient-to-r from-cyber-cyan via-cyber-magenta to-cyber-cyan bg-clip-text text-transparent">
              Compliance
            </span>
          </h1>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            CIRWEL is designed from the ground up to help organizations meet the most demanding 
            AI governance and compliance requirements across industries and jurisdictions.
          </p>
        </motion.div>

        {/* Compliance Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {complianceFrameworks.map((framework, index) => (
            <ComplianceCard key={framework.id} framework={framework} index={index} />
          ))}
        </div>

        {/* Additional Standards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Additional Standards & Frameworks
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4">
            {additionalStandards.map((standard, index) => (
              <motion.div
                key={standard.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-4 py-2 rounded-lg bg-cyber-dark/60 border border-gray-700/50 flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-cyber-green" />
                <span className="text-gray-300 text-sm">{standard.name}</span>
                <span className="text-xs font-mono text-gray-500">({standard.status})</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block p-8 rounded-lg bg-dark-900/80 group">
            {/* Animated electric border */}
            <div className="absolute inset-0 rounded-lg overflow-hidden">
              <motion.div
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0,212,230,0.4), rgba(255,0,255,0.4), transparent)',
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 0%', '200% 0%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <div className="absolute inset-[1px] rounded-lg bg-dark-900/95" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need Custom Compliance Support?
              </h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Our team can help you navigate specific regulatory requirements and 
                customize CIRWEL for your industry's compliance needs.
              </p>
              <motion.a
                href="/#contact"
                onClick={handleContactClick}
                className="inline-flex items-center gap-2 px-6 py-3 border border-cyber-cyan/50 text-cyber-cyan font-semibold rounded-lg transition-all duration-300 hover:border-cyber-cyan hover:bg-cyber-cyan/10 hover:shadow-[0_0_20px_rgba(0,212,230,0.3)]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Scale className="w-5 h-5" />
                Contact Compliance Team
              </motion.a>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-xs max-w-2xl mx-auto font-mono">
            Disclaimer: Compliance readiness and alignment status indicates CIRWEL's capability 
            to support organizations in meeting regulatory requirements. Actual compliance depends 
            on proper implementation and organizational practices. Consult with legal and compliance 
            professionals for specific requirements.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
