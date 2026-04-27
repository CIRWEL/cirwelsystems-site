# CIRWEL Website

## Overview
The CIRWEL website is a cyber/deep tech platform showcasing CIRWEL as the governance layer for autonomous AI agents. The messaging is optimized for a VC audience, emphasizing market opportunity, competitive moat, defensible IP, and business outcomes (compliance, liability reduction, insurability). Visual style is futuristic with dynamic scroll-linked animations, neon aesthetics, and particle network backgrounds.

## User Preferences
- Prefers dynamic, animated scrolling experiences
- Cyber/deep tech aesthetic with neon colors (brightened from original)
- Professional but futuristic feel
- VC-focused messaging over technical/developer messaging
- Domain: cirwelsystems.com (registered via Replit, DNS points to Replit)

## System Architecture
Built with **React 18** and **Vite** for the frontend, **Express.js** API server for contact form. Styling via **Tailwind CSS** with custom cyber color palette. Animations powered by **Framer Motion**. Dark mode only.

**Site Flow (VC Pitch Structure):**
1. **Hero** — Value prop: "Agentic AI Governance" with rotating labels (Governance/Compliance/Auditability/Safety)
2. **Problem** (About) — "Every AI Agent Is a Liability" — market urgency, compliance gap, market opportunity
3. **Moat** (Technology) — "Why We Win" — patent-protected physics-based approach, competitive advantages
4. **How It Works** (StateDiagram) — Normal → Risk → Circuit Breaker → Recovery flow
5. **Markets** (Industries) — Go-to-market: Enterprise AI, Multi-Agent Platforms, Developer Tools, AI Insurance
6. **Product** (Platform) — 42+ production-ready MCP tools, sub-ms latency, zero cloud dependencies
7. **IP** (IPPortfolio) — 9+ patent-pending innovations, defensible moat
8. **Contact** — Lead generation for investors, enterprise buyers, and partners

**Navigation Labels:** Problem | Moat | How It Works | Markets | Product | IP | Contact

**Project Structure:**
- **Components:** CyberBackground, GlitchText, Navbar, Hero, About, Technology, Industries, Patents, IPPortfolio, StateDiagram, Contact, PrivacyPolicy, Compliance, Footer
- **Hooks:** `useTilt.js` (shared 3D tilt mouse-tracking for all card components)
- **Context:** `ThemeContext.jsx` (dark mode only)
- **Styling:** `index.css`, `tailwind.config.js` (darkMode: 'class')
- **Server:** `server.js` (Express API, contact form via Resend)
- **Assets:** `public/logo.png`, `public/favicon.png`

## External Dependencies
- **Email:** Resend API (contact form)
- **Icons:** Lucide React
- **Fonts:** Inter, JetBrains Mono
- **Deployment:** Replit static deployment (dist/)

## SEO & Social
- Open Graph and Twitter Card meta tags configured
- Canonical URL: https://cirwel.org
- Meta description aligned with VC messaging
- Page title: "CIRWEL | AI Governance & Compliance for Autonomous Agents"

## Recent Changes (March 2026)
- **Visual & Animation Polish:**
  - Hero animations cut to ~50% of original delays for snappier page load feel
  - Rotating label transition tightened (0.5s → 0.35s) to eliminate visible gap between words
  - "Learn More" button upgraded from flat gray to cyber-themed (cyan border, hover glow, gradient overlay)
  - Section dividers added between all major sections (gradient line + center dot, responsive h-16/h-24)
  - StateDiagram connection arrows redesigned with animated pulse trail (glowing dot traveling along track)
  - Contact form inputs now have visible focus rings (focus:ring-cyber-cyan/30) for keyboard accessibility
  - Contact form success state now has "Send Another Message" reset button
  - StateDiagram navigation dots have aria-labels for accessibility
  - Footer navigation and tagline updated to match VC framing
- **Performance Optimization:** Hero images converted from PNG (3.5MB) to WebP (120KB); logo converted from PNG (143KB) to WebP (4KB); hero videos removed entirely (10MB eliminated — static images sufficient at card size); scroll-linked parallax transforms removed from Hero, Technology, and Contact sections; CyberBackground optimized (removed shadowBlur per particle, simplified gradient line drawing, reduced particle count from 35→25, reduced GlowOrb blur from 60px→40px); initial page load reduced from ~13.5MB to ~575KB
- **Animation Cleanup:** Removed parallax scroll backgrounds from About and Platform sections (backgroundY transforms); simplified section headers in About, Technology, and Industries from 3-4 staggered motion elements to single container animations; removed 10 FloatingParticle decorations from Technology; removed pulsing circles from Contact; CyberBackground respects `prefers-reduced-motion`; cleaned unused useScroll/useTransform imports
- **Config Cleanup:** Removed 12 unused animations, unused `primary` color scale, unused `backdropBlur` from tailwind.config.js
- **Full VC Messaging Overhaul:** Reframed every section from technical/developer language to VC pitch structure (honest pre-seed tone — not Series B oversell)
- **Navigation Updated:** Problem | Moat | How It Works | Markets | Product | IP | Contact
- **Hero Headline:** "Your AI agents make thousands of decisions. / Can you prove what happened and why?" — static text carries the weight; rotating label (Governance/Compliance/Auditability/Safety) as accent; CTA = "Talk to the Founder" → mailto:founder@cirwel.org
- **About → "The Problem":** "Every AI Agent Is a Liability" — credibility line added: "In production since November 2025 — 9+ patent-pending innovations across thermodynamic state modeling, autonomous recovery, and behavioral monitoring."
- **Technology → "Competitive Moat":** "Why We Win" — physics-based foundation, predictive not reactive, universal framework, zero configuration
- **Industries → "Go-to-Market":** Cut from 4 to 3 — Financial Services, AI Risk Insurance, Enterprise AI Deployments; deeper copy on each; section retitled "Where We Go to Market"
- **Platform → "The Product":** Emphasized shipping product, not prototype
- **IP → "Defensible IP":** Strengthened moat language, "competitors would need to invent around our patents"
- **Contact → Lead gen:** "Whether you're an investor, enterprise buyer, or potential partner"
- **Visual Brightening:** Base background lightened (#0a0a12 → #0e0e18), aurora gradients and glow orbs boosted 40-50%
- **SEO:** Added Open Graph, Twitter Cards, canonical URL, robots meta, updated meta description

## Previous Changes (January 2026)
- Hero section VC messaging (rotating labels, business outcome cards)
- Market urgency badges (EU AI Act 2025, Enterprise Liability, AI Insurance Gap)
- Patent defensibility surfaced prominently

## Previous Changes (December 2025)
- Dark mode only, light mode disabled
- Enhanced CyberBackground with aurora gradients, glow orbs, improved particles
