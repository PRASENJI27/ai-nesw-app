import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Sparkles, 
  ArrowRight, 
  TrendingUp, 
  Cpu, 
  Globe, 
  Terminal, 
  Zap, 
  Layers,
  Check,
  Star,
  Quote,
  Shield,
  HelpCircle,
  Clock,
  ArrowUpRight
} from "lucide-react";

interface LandingPageProps {
  onStartAgent: () => void;
}

export default function LandingPage({ onStartAgent }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annually">("monthly");

  // Reviews/Testimonials data
  const REVIEWS = [
    {
      id: 1,
      name: "Sophia Vance",
      role: "Lead Tech Journalist at VentureVibe",
      quote: "COSMOQ has cut our editorial research overhead by 80%. Instead of scrolling through dozens of RSS feeds, our team gets grounded, structured bullet points directly with source verification.",
      rating: 5,
      avatarInitials: "SV",
      bgGradient: "from-orange-500/10 to-amber-500/5"
    },
    {
      id: 2,
      name: "Marcus Kaelen",
      role: "VP of Product, Synthesis AI",
      quote: "The Google Search Grounding capabilities of this agent are unmatched. We depend on precise dates and hardware specs. COSMOQ acts as an automated researcher that never hallucinates.",
      rating: 5,
      avatarInitials: "MK",
      bgGradient: "from-blue-500/10 to-indigo-500/5"
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Founder, Future-Mind Media",
      quote: "I love the Multi-Agent Personas. We can instantly pivot the engine from drafting technical briefs to compiling high-impact newsletter summaries in one click. Absolutely pristine UI.",
      rating: 5,
      avatarInitials: "ER",
      bgGradient: "from-rose-500/10 to-pink-500/5"
    }
  ];

  // Pricing Tiers data
  const PRICING_TIERS = [
    {
      name: "Starter Sandbox",
      price: { monthly: 0, annually: 0 },
      description: "Perfect for developers and AI enthusiasts looking to test grounded search agents.",
      features: [
        "Access to default Breaking News Channel",
        "Standard Google Grounded Search queries",
        "Up to 25 daily agent synthesis runs",
        "Standard telemetry logger interface",
        "Community Discord support"
      ],
      ctaText: "Launch Sandbox Portal",
      isPopular: false,
      accentColor: "border-white/10 text-white"
    },
    {
      name: "Pro Curator",
      price: { monthly: 49, annually: 39 },
      description: "Optimized for creators, media outlets, and intelligence teams requiring high-frequency curation.",
      features: [
        "All Starter capabilities included",
        "Unlock deep-academic research pipelines",
        "Access to multi-agent intelligence personas",
        "Infinite custom queries & deep web searches",
        "Premium structured market analytics",
        "Export Daily Bulletin direct newsletters"
      ],
      ctaText: "Go Pro Now",
      isPopular: true,
      accentColor: "border-orange-500/40 text-orange-400"
    },
    {
      name: "Enterprise Node",
      price: { monthly: 199, annually: 149 },
      description: "Dedicated high-frequency workspace built for deep analysis and proprietary integrations.",
      features: [
        "All Pro capabilities included",
        "API access with custom token buffers",
        "Private database persistence (Firestore)",
        "Zero-throttling on concurrent web research",
        "Custom branding export layouts",
        "24/7 Priority support hotline"
      ],
      ctaText: "Contact Sales Node",
      isPopular: false,
      accentColor: "border-blue-500/40 text-blue-400"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-hidden font-sans">
      
      {/* ---------------- PREMIUM CINEMATIC VIDEO GRADIENT ANIMATIONS ---------------- */}
      {/* Faint Starfield Layer for cosmic depth */}
      <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white rounded-full"
            style={{
              top: `${Math.random() * 85}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Absolute space grid with perspective warping for 3D depth */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none opacity-40 z-0" 
        style={{ transform: 'perspective(1000px) rotateX(65deg) translateY(-100px) translateZ(-50px)' }}
      />
      
      {/* ---------------- VERTICAL LIGHT COLUMNS / SHAFTS (Matching Reference Image) ---------------- */}
      {/* Left side: Golden / Amber / Orange vertical curtains of light with organic wave movement */}
      <div className="absolute top-0 bottom-0 left-0 w-1/2 pointer-events-none overflow-hidden z-0 flex gap-4 opacity-75">
        {/* Shaft 1 */}
        <motion.div 
          animate={{
            x: [-10, 15, -10],
            opacity: [0.3, 0.55, 0.3],
            width: ["140px", "190px", "140px"],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-[120%] bg-gradient-to-r from-orange-500/20 via-amber-500/10 to-transparent blur-[70px] transform -rotate-12 origin-top-left"
        />
        {/* Shaft 2 */}
        <motion.div 
          animate={{
            x: [10, -15, 10],
            opacity: [0.2, 0.45, 0.2],
            width: ["100px", "140px", "100px"],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="h-[120%] bg-gradient-to-r from-orange-600/15 via-red-500/5 to-transparent blur-[90px] transform -rotate-6 origin-top-left ml-16"
        />
        {/* Shaft 3 (ambient spill) */}
        <motion.div 
          animate={{
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute left-[-5%] top-0 bottom-0 w-[300px] bg-gradient-to-r from-amber-600/15 via-orange-500/5 to-transparent blur-[120px]"
        />
      </div>

      {/* Right side: Cool Electric Blue / Cyan / Indigo vertical curtains of light */}
      <div className="absolute top-0 bottom-0 right-0 w-1/2 pointer-events-none overflow-hidden z-0 flex flex-row-reverse gap-4 opacity-75">
        {/* Shaft 1 */}
        <motion.div 
          animate={{
            x: [10, -15, 10],
            opacity: [0.35, 0.6, 0.35],
            width: ["150px", "200px", "150px"],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="h-[120%] bg-gradient-to-l from-cyan-500/20 via-blue-500/10 to-transparent blur-[75px] transform rotate-12 origin-top-right"
        />
        {/* Shaft 2 */}
        <motion.div 
          animate={{
            x: [-10, 15, -10],
            opacity: [0.2, 0.4, 0.2],
            width: ["110px", "150px", "110px"],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="h-[120%] bg-gradient-to-l from-blue-600/15 via-indigo-500/5 to-transparent blur-[90px] transform rotate-6 origin-top-right mr-16"
        />
        {/* Shaft 3 (ambient spill) */}
        <motion.div 
          animate={{
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute right-[-5%] top-0 bottom-0 w-[300px] bg-gradient-to-l from-cyan-600/15 via-indigo-500/5 to-transparent blur-[120px]"
        />
      </div>

      {/* ---------------- DYNAMIC CURVED PLANETARY ATMOSPHERE / HORIZON (At bottom of fold) ---------------- */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[160vw] h-[250px] sm:h-[400px] pointer-events-none z-0">
        <motion.div 
          animate={{
            opacity: [0.6, 0.75, 0.6],
            scaleY: [1, 1.03, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full rounded-[100%] border-t-2 border-cyan-500/35 bg-gradient-to-b from-cyan-950/20 via-[#050508]/80 to-[#050508] shadow-[0_-25px_80px_rgba(6,182,212,0.18)]"
        />
      </div>

      {/* Cinematic subtle grid overlay vignetting */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-[#050508] pointer-events-none z-0" />

      {/* Central horizontal splitting laser glow line */}
      <div className="absolute top-[45%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-[2px] pointer-events-none z-0" />

      {/* ---------------- HERO SECTION ---------------- */}
      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-24 z-10 flex flex-col items-center text-center">
        {/* Launch Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs text-gray-300 font-mono mb-8 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
          Beta Version is launching on 12th September
        </motion.div>

        {/* Hero Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold tracking-tight text-white max-w-4xl leading-[1.1] mb-6"
        >
          Next-gen enterprise <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-rose-400 to-blue-400">
            with AI Agents
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-lg text-gray-400 max-w-2xl font-sans tracking-wide leading-relaxed mb-10"
        >
          Accelerate the speed of curation with the COSMOQ Platform and our AI solutions for autonomous search, deep analysis, and intelligence compilation.
        </motion.p>

        {/* Central CTA button with glowing hover effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative group mb-4"
        >
          <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-500" />
          <button 
            id="landing-hero-cta"
            onClick={onStartAgent}
            className="relative flex items-center gap-3 px-8 py-4 rounded-full bg-black text-white border border-white/10 text-sm font-semibold tracking-wide hover:bg-neutral-900 transition-all cursor-pointer duration-300"
          >
            Launch Curation Portal
            <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* ---------------- HIGH CLASS LOGO INFINITE SCROLL MARQUEE LOOP ---------------- */}
      <div className="relative border-y border-white/[0.06] bg-[#07070a]/45 backdrop-blur-md py-10 z-10 overflow-hidden">
        
        {/* Ambient background glow for brand row */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <p className="text-center text-xs font-mono text-gray-400 uppercase tracking-widest mb-8">
            Empowering AI Teams & Newsrooms Globally
          </p>

          {/* Masked fading boundaries for high class look */}
          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]">
            <motion.div 
              className="flex gap-20 whitespace-nowrap w-max"
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity,
              }}
            >
              {/* Duplicate 3 times to guarantee continuous loop covering standard wide screens */}
              {[1, 2, 3].map((groupNum) => (
                <div key={groupNum} className="flex gap-20 shrink-0 items-center justify-around">
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="font-mono text-lg font-extrabold tracking-tight text-white/50 group-hover:text-white transition-colors flex items-center gap-1">
                      LO<span className="text-orange-500/70 group-hover:text-orange-400 transition-colors">CO</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="font-mono text-lg font-extrabold tracking-widest text-white/50 group-hover:text-white transition-colors">
                      LOGO! IPSUM
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="font-mono text-lg font-extrabold tracking-tighter text-white/50 group-hover:text-white transition-colors">
                      L.0.9.D
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="font-mono text-lg font-bold text-white/40 group-hover:text-white transition-colors italic">
                      IPSUM
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="font-mono text-lg font-extrabold text-white/50 group-hover:text-white transition-colors flex items-center gap-0.5">
                      C<span className="text-blue-500/70 group-hover:text-blue-400 transition-colors">∞</span>SMO
                    </span>
                  </div>
                  <div className="flex items-center gap-2 group cursor-pointer">
                    <span className="font-mono text-lg font-bold text-white/45 group-hover:text-white transition-colors tracking-widest">
                      HLOGO
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------------- SPHERE SHOWCASE PANEL (Matching 2nd reference image) ---------------- */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10 border-t border-white/[0.05]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl font-sans font-medium tracking-tight leading-snug text-gray-100"
            >
              We help enterprises reimagine business growth with our AI Platform, Work Solutions, and Intelligent Marketplace. 
              <span className="text-gray-500 block mt-2">
                Unlock efficiency, automation, and innovation across every workflow.
              </span>
            </motion.h2>
            <div className="h-[1px] w-20 bg-gradient-to-r from-orange-400 to-transparent" />
          </div>

          {/* Right Orb Display */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80">
              {/* Spinning orbital ring */}
              <div className="absolute inset-0 border border-white/[0.03] rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-4 border border-dashed border-white/[0.05] rounded-full animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
              
              {/* Glowing backdrops */}
              <div className="absolute inset-10 bg-gradient-to-br from-orange-500 to-blue-500 rounded-full blur-[50px] opacity-25" />

              {/* Glossy Translucent Sphere */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="absolute inset-4 rounded-full bg-gradient-to-b from-white/10 to-white/[0.02] border border-white/20 shadow-2xl backdrop-blur-xl flex flex-col items-center justify-center overflow-hidden"
              >
                {/* Radial internal glow */}
                <div className="absolute inset-4 bg-radial-gradient from-orange-500/20 via-blue-500/10 to-transparent rounded-full pointer-events-none" />
                
                {/* Brand Graphic / Seal */}
                <div className="relative z-10 flex flex-col items-center text-center px-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-orange-500/30 to-blue-500/30 border border-white/20 flex items-center justify-center shadow-lg mb-4">
                    <Sparkles className="w-7 h-7 text-orange-400" />
                  </div>
                  <span className="font-mono text-xl font-bold tracking-wider text-white">COSMOQ</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest font-mono mt-1">Intelligence Node</span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>

      {/* ---------------- AI SOLUTIONS / FEATURES BENTO ---------------- */}
      <div id="landing-features" className="relative max-w-7xl mx-auto px-6 py-20 z-10 border-t border-white/[0.05]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-orange-400 font-mono font-semibold">Workspace Capabilities</span>
          <h2 className="text-3xl font-sans font-bold tracking-tight mt-2 text-white">Autonomous Agent Features</h2>
          <p className="text-gray-400 text-sm mt-3">COSMOQ combines real-time deep web research and advanced Gemini intelligence to automate content synthesis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-orange-500/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5">
              <Globe className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-white mb-2">Google Grounded Curation</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Fetches real-time web news and research to ensure your curated updates contain current dates, facts, and sources.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-white mb-2">Trend Deep-Dive</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Provides structured JSON-driven analysis on trending tech metrics, consumer sentiment, and developer forum activities.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-rose-500/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-5">
              <Cpu className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-white mb-2">Multi-Agent Personas</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Deploy specific agent minds: standard Tech Journalist, academic Deep-Dive Reviewer, or high-density Bullet Composers.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
              <Terminal className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-sans font-semibold text-white mb-2">Developer Workspace</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Includes an active logs telemetry console where you can inspect agent prompts, citations, and search parameters.
            </p>
          </motion.div>

        </div>
      </div>

      {/* ---------------- NEW: TESTIMONIALS & REVIEWS SECTION ---------------- */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10 border-t border-white/[0.05]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-blue-400 font-mono font-semibold">User Experience</span>
          <h2 className="text-3xl font-sans font-bold tracking-tight mt-2 text-white">Trusted by Curation Pioneers</h2>
          <p className="text-gray-400 text-sm mt-3">See how leading researchers, journalists, and media engineers leverage our autonomous intelligence engine.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-2xl bg-gradient-to-br ${review.bgGradient} border border-white/10 backdrop-blur-md flex flex-col justify-between`}
            >
              <div>
                {/* Stars and icon quote */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-white/15" />
                </div>

                <p className="text-xs sm:text-sm text-gray-200 italic leading-relaxed mb-6">
                  "{review.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                {/* Graphic placeholder avatar */}
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/15 flex items-center justify-center font-mono text-xs text-white font-bold tracking-wider shrink-0">
                  {review.avatarInitials}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white font-sans">{review.name}</h4>
                  <p className="text-[10px] text-gray-500 font-mono">{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ---------------- NEW: INTERACTIVE PRICING TIERS SECTION ---------------- */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 z-10 border-t border-white/[0.05]">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-orange-400 font-mono font-semibold">Flexible Subscription</span>
          <h2 className="text-3xl font-sans font-bold tracking-tight mt-2 text-white">Predictable Curation Economics</h2>
          <p className="text-gray-400 text-sm mt-3">Choose the frequency and power tier your newsroom or development cycle demands.</p>

          {/* Monthly / Annually toggle */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/[0.02] border border-white/10 mt-8 backdrop-blur-md">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                billingCycle === "monthly" 
                  ? "bg-white text-black shadow" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly billing
            </button>
            <button
              onClick={() => setBillingCycle("annually")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                billingCycle === "annually" 
                  ? "bg-white text-black shadow" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Annually billing
              <span className="px-1.5 py-0.5 rounded bg-orange-500 text-[8px] text-white font-mono uppercase tracking-widest">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch pt-6">
          {PRICING_TIERS.map((tier, idx) => {
            const isPro = tier.isPopular;
            const displayPrice = billingCycle === "monthly" ? tier.price.monthly : tier.price.annually;

            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between backdrop-blur-md transition-all duration-300 ${
                  isPro 
                    ? "bg-white/[0.04] border-2 border-orange-500/50 shadow-2xl shadow-orange-500/5" 
                    : "bg-white/[0.02] border border-white/10 hover:border-white/20"
                }`}
              >
                {/* Popular Badge */}
                {isPro && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-[9px] font-bold uppercase tracking-widest font-mono text-white shadow-md">
                    Curator's Choice
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold font-sans text-white mb-2">{tier.name}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-6">{tier.description}</p>

                  {/* Price display */}
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span className="text-4xl sm:text-5xl font-bold font-mono text-white">
                      ${displayPrice}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">
                      / month
                    </span>
                  </div>

                  <div className="h-[1px] bg-white/5 mb-6" />

                  {/* Features List */}
                  <ul className="space-y-3.5">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                  <button
                    onClick={onStartAgent}
                    className={`w-full py-3 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                      isPro 
                        ? "bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white shadow-lg" 
                        : "bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 hover:text-white"
                    }`}
                  >
                    {tier.ctaText}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ---------------- SECONDARY CALL TO ACTION ---------------- */}
      <div className="relative py-20 bg-gradient-to-b from-transparent to-black/60 border-t border-white/[0.05] z-10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-2xl sm:text-4xl font-sans font-bold text-white mb-4">Ready to deploy your AI curator?</h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8">
            Access the sandbox portal immediately. Search for breaking models, summarize complicated research, or write custom briefs.
          </p>
          <button 
            id="landing-bottom-cta"
            onClick={onStartAgent}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 hover:opacity-90 text-white text-sm font-semibold tracking-wide shadow-lg transition cursor-pointer"
          >
            Start Curation Portal
          </button>
        </div>
      </div>

      {/* ---------------- NEW: HIGH-CLASS FOOTER SECTION ---------------- */}
      <footer className="relative border-t border-white/[0.05] bg-black/40 pt-16 pb-12 z-10 font-sans">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/[0.05]">
            
            {/* Logo and brief brand text (4 columns) */}
            <div className="md:col-span-4 space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-orange-500 to-rose-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-sans font-bold text-lg tracking-wider text-white">COSMOQ</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                A next-generation enterprise workspace designed to analyze, filter, and compile AI breakthroughs through real-time search grounding and multi-agent personas.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[10px] font-mono text-gray-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  All Systems Operational
                </span>
              </div>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 font-mono">Solutions</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li><a href="#landing-features" className="hover:text-white transition-colors">Grounded Curation</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">Market Analytics HUD</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">Multi-Agent Personas</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">Academic Portals</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 font-mono">Resources</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li><button onClick={onStartAgent} className="hover:text-white transition-colors text-left cursor-pointer">Curation Portal</button></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">System Telemetry</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">Beta Releases</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">API Docs</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 font-mono">Company</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li><a href="#landing-features" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">Newsroom</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#landing-features" className="hover:text-white transition-colors">Contact Node</a></li>
              </ul>
            </div>

            {/* Compliance & Secure Lock (2 columns) */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-300 font-mono">Security</h4>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono">
                  <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>ISO 27001</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-normal">
                  Our system keeps all Gemini api transactions secure via server-side encapsulation.
                </p>
              </div>
            </div>

          </div>

          {/* Bottom layout */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] font-mono text-gray-600">
            <div>
              © {new Date().getFullYear()} COSMOQ AI Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="#privacy" className="hover:text-gray-400 transition-colors">Privacy Protocol</a>
              <span>•</span>
              <a href="#terms" className="hover:text-gray-400 transition-colors">Terms of Node Service</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
