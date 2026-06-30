import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";
import { 
  Bot, 
  Newspaper, 
  Search, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  ExternalLink, 
  Calendar, 
  ArrowUpRight, 
  Activity, 
  TrendingUp, 
  Check, 
  Copy, 
  Terminal, 
  ArrowRight, 
  BookOpen, 
  Cpu, 
  Layers, 
  Send, 
  Share2, 
  AlertCircle
} from "lucide-react";
import { Citation, NewsResponse, TrendItem, ChannelInfo, AgentLog } from "../types";

// Standard AI curation channels configuration
const CHANNELS: ChannelInfo[] = [
  {
    id: "breaking-news",
    name: "Breaking News Curation",
    description: "Aggregates breaking developments, hardware breakthroughs, startup releases, and major LLM updates over the past 48 hours.",
    iconName: "Newspaper",
    accentColor: "from-orange-500 to-amber-500",
    samplePrompt: "Latest announcements from OpenAI, Anthropic, or Google DeepMind this week."
  },
  {
    id: "research-papers",
    name: "Deep Research Analyst",
    description: "Crawls academic portals, arXiv, and labs to analyze major breakthroughs, architectural paradigm shifts, and theoretical deep-dives.",
    iconName: "BookOpen",
    accentColor: "from-blue-500 to-indigo-500",
    samplePrompt: "New breakthrough architectures, mixture-of-experts updates, or reasoning model mechanisms."
  },
  {
    id: "agentic-trends",
    name: "Agentic Workflows Specialist",
    description: "Focuses on Agentic AI, autonomous multi-agent developer frameworks (CrewAI, LangGraph), and production enterprise deployments.",
    iconName: "Cpu",
    accentColor: "from-rose-500 to-pink-500",
    samplePrompt: "Enterprise frameworks for multi-agent negotiation, planning capabilities, or self-correcting agents."
  },
  {
    id: "robotics",
    name: "Humanoid & Physical Embodiment",
    description: "Tracks physical neural-policies, humanoid robotic kits (Figure, Tesla Optimus, Boston Dynamics), and industrial automation.",
    iconName: "Layers",
    accentColor: "from-emerald-500 to-teal-500",
    samplePrompt: "Latest updates on Tesla Optimus Gen 3, Figure 02, or reinforcement learning for complex dexterity."
  }
];

export default function Dashboard() {
  const [activeChannel, setActiveChannel] = useState<string>("breaking-news");
  const [customQuery, setCustomQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [curatedData, setCuratedData] = useState<NewsResponse | null>(null);
  
  // Trending Topics HUD State
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [trendsLoading, setTrendsLoading] = useState<boolean>(false);
  
  // Live log telemetry state
  const [logs, setLogs] = useState<AgentLog[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);
  
  // Clipboard/Share Copy state
  const [copied, setCopied] = useState<boolean>(false);
  const [newsletterCopied, setNewsletterCopied] = useState<boolean>(false);
  
  // Custom loading message rotation
  const [loadingMsgIdx, setLoadingMsgIdx] = useState<number>(0);
  const loadingMessages = [
    "Establishing secure orbital connection...",
    "Querying Google Search Grounding engine...",
    "Crawling recent AI developer publications...",
    "Synthesizing grounding metadata chunks...",
    "Filtering hallucinations & checking claims...",
    "Deduplicating references & citations...",
    "Formulating news agent briefing outline..."
  ];

  // Initialize and load default state
  useEffect(() => {
    // Generate some initial mock logs for the telemetry console
    addLog("SYSTEM", "AI News Agent core booting up...", "success");
    addLog("SYSTEM", "Google Search Grounding module loaded successfully.", "success");
    addLog("SYSTEM", "Gemini 3.5 Flash Model selected as main processing unit.", "success");
    
    // Fetch initial news and trends
    fetchCuratedNews("breaking-news");
    fetchTrendingTopics();
  }, []);

  // Telemetry auto scroll
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Rotate loading messages
  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % loadingMessages.length);
      }, 2500);
    } else {
      setLoadingMsgIdx(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Helper to append a telemetry log
  const addLog = (agent: string, action: string, status: "success" | "error" | "running", details: string = "") => {
    const newLog: AgentLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString(),
      agent,
      action,
      status,
      details
    };
    setLogs((prev) => [...prev, newLog].slice(-50)); // keep last 50 logs
  };

  // Fetch Curated News via Backend Proxy
  const fetchCuratedNews = async (channelId: string, customSearchPrompt?: string) => {
    setLoading(true);
    const targetChannel = CHANNELS.find((c) => c.id === channelId);
    const channelName = targetChannel ? targetChannel.name : "Custom Query";
    
    addLog("AGENT", `Triggering curation routine for [${channelName}]...`, "running");
    
    try {
      const response = await fetch("/api/news/curate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: customSearchPrompt ? undefined : channelId,
          query: customSearchPrompt || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

      const data: NewsResponse = await response.json();
      
      if (data.success) {
        setCuratedData(data);
        addLog(
          "GEMINI", 
          `Curation complete! Generated ${data.citations.length} verified citations using ${data.searchQueries.length} Google search prompts.`, 
          "success",
          `Queries formulated: ${JSON.stringify(data.searchQueries)}`
        );
      } else {
        throw new Error(data.error || "Unknown server error during curation.");
      }
    } catch (err: any) {
      console.error(err);
      addLog("SYSTEM", `Curation failed: ${err.message}`, "error");
      // Provide fallback data structure for user feedback
      setCuratedData({
        success: false,
        content: `### ⚠️ Connection or API Limitation\n\nUnable to curate live news agent feed. Details: \n*${err.message}*\n\nPlease confirm your \`GEMINI_API_KEY\` is correctly configured in your **Secrets panel** under **Settings > Secrets** in the AI Studio UI, then try again.`,
        citations: [],
        searchQueries: [],
        timestamp: new Date().toISOString(),
        error: err.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch Trending Topics via Backend Proxy
  const fetchTrendingTopics = async () => {
    setTrendsLoading(true);
    addLog("ANALYST", "Initiating trend analysis engine...", "running");
    try {
      const response = await fetch("/api/news/trending");
      if (!response.ok) throw new Error("Trends endpoint failed");
      const data = await response.json();
      if (data.success && data.trends) {
        setTrends(data.trends);
        addLog("ANALYST", `Successfully retrieved top ${data.trends.length} trending AI topics in structured format.`, "success");
      }
    } catch (err: any) {
      console.error(err);
      addLog("ANALYST", "Trend engine retrieval failure. Using local structural fallbacks.", "error");
      // Fallback structured tech-radar data
      setTrends([
        { topic: "Agentic AI Orchestrators", category: "Frameworks", volume: "96%", sentiment: "Bullish", description: "Widespread development of autonomous multi-agent loops that can plan, execute, and self-correct with high autonomy." },
        { topic: "Mixture-of-Experts (MoE)", category: "Architectures", volume: "88%", sentiment: "Steady", description: "Widespread integration of sparse routing to decrease model latency and inference costs on edge and server clusters." },
        { topic: "Humanoid Neural Controllers", category: "Robotics", volume: "92%", sentiment: "Skyrocketing", description: "Direct control policies of physical limbs using end-to-end multimodal transformers trained on humanoid simulation sets." },
        { topic: "Hardware Acceleration (TPUs)", category: "Infrastructures", volume: "84%", sentiment: "High Interest", description: "Sourcing alternative silicon computing architectures due to supply constraints and demand for lower thermal footprints." },
        { topic: "Retrieval Grounded LLMs", category: "Information Retrieval", volume: "90%", sentiment: "Standard", description: "Production systems bypassing basic semantic vectors in favor of deep-reasoning multi-step internet searches." }
      ]);
    } finally {
      setTrendsLoading(false);
    }
  };

  // Execute Custom Research Grounded Query
  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    setActiveChannel("custom");
    addLog("USER", `Dispatched research query: "${customQuery}"`, "success");
    fetchCuratedNews("custom", customQuery);
  };

  // Copy Brief to Clipboard
  const handleCopyContent = () => {
    if (!curatedData?.content) return;
    navigator.clipboard.writeText(curatedData.content);
    setCopied(true);
    addLog("SYSTEM", "Curated brief copied successfully to local clipboard.", "success");
    setTimeout(() => setCopied(false), 2000);
  };

  // Compose Newsletter Daily Bulletin helper
  const handleCopyNewsletter = () => {
    if (!curatedData?.content) return;
    const newsletterDraft = `
=============================================
COSMOQ AI NEWS AGENT - DAILY BULLETIN
Generated on: ${new Date(curatedData.timestamp).toLocaleString()}
Curation channel / Query: ${activeChannel === "custom" ? `Custom Research: "${customQuery}"` : CHANNELS.find(c => c.id === activeChannel)?.name}
=============================================

${curatedData.content}

---------------------------------------------
VERIFIED SOURCE CITATIONS:
${curatedData.citations.map((c, idx) => `[${idx + 1}] ${c.title} - ${c.url}`).join("\n")}

---------------------------------------------
This bulletin was synthesized autonomously by COSMOQ AI News Agent using Google Search Grounding.
For full insights, visit the COSMOQ workspace portal.
=============================================
`;
    navigator.clipboard.writeText(newsletterDraft.trim());
    setNewsletterCopied(true);
    addLog("SYSTEM", "Newsletter Daily Bulletin compiled and copied to clipboard.", "success");
    setTimeout(() => setNewsletterCopied(false), 2000);
  };

  // Helper to map icon names to JSX components
  const renderChannelIcon = (iconName: string) => {
    switch (iconName) {
      case "Newspaper": return <Newspaper className="w-5 h-5 text-inherit" />;
      case "BookOpen": return <BookOpen className="w-5 h-5 text-inherit" />;
      case "Cpu": return <Cpu className="w-5 h-5 text-inherit" />;
      case "Layers": return <Layers className="w-5 h-5 text-inherit" />;
      default: return <Bot className="w-5 h-5 text-inherit" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#07070a] text-gray-100 font-sans pb-16">
      
      {/* Aurora glow indicators */}
      <div className="absolute top-0 right-[15%] w-[400px] h-[400px] bg-gradient-to-b from-blue-500/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-[30%] left-[5%] w-[350px] h-[350px] bg-gradient-to-br from-orange-500/5 to-transparent blur-[110px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 relative z-10">
        
        {/* ---------------- GRID LAYOUT ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT SIDE: CHANNELS & INPUTS (COLS: 4) ================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. AGENT SELECTION CONTROL PANEL */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" />
                <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300 font-mono">Agent Channels</h2>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Deploy specialized AI agent minds. Each is optimized with specific parameters to process deep-grounded search feeds.
              </p>

              <div className="space-y-3">
                {CHANNELS.map((channel) => {
                  const isActive = activeChannel === channel.id;
                  return (
                    <button
                      id={`channel-btn-${channel.id}`}
                      key={channel.id}
                      onClick={() => {
                        setActiveChannel(channel.id);
                        fetchCuratedNews(channel.id);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl transition-all border flex items-start gap-3 group relative cursor-pointer ${
                        isActive 
                          ? "bg-white/[0.04] border-white/20 shadow-inner" 
                          : "bg-transparent border-transparent hover:bg-white/[0.01] hover:border-white/5"
                      }`}
                    >
                      {/* Left indicator glow */}
                      {isActive && (
                        <div className={`absolute left-0 top-3 bottom-3 w-1 rounded-r bg-gradient-to-b ${channel.accentColor}`} />
                      )}

                      <div className={`p-2 rounded-lg shrink-0 transition-colors ${
                        isActive 
                          ? "bg-white/10 text-white" 
                          : "bg-white/[0.02] text-gray-400 group-hover:text-white"
                      }`}>
                        {renderChannelIcon(channel.iconName)}
                      </div>

                      <div className="space-y-0.5">
                        <div className={`text-xs font-semibold tracking-wide transition-colors ${
                          isActive ? "text-white" : "text-gray-300 group-hover:text-white"
                        }`}>
                          {channel.name}
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal line-clamp-2">
                          {channel.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. CUSTOM DEEP-CRAWL RESEARCH PANEL */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-orange-400" />
                <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300 font-mono">Custom Grounded Query</h2>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Research a specific topic or ask the agent a question. Our system will generate tailored queries to fetch fresh verified web summaries.
              </p>

              <form onSubmit={handleCustomSearch} className="space-y-3">
                <div className="relative">
                  <input
                    id="dashboard-custom-query-input"
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="e.g., Gemini 3.5 capabilities or AI agent models..."
                    className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 transition-all"
                  />
                  <button
                    id="dashboard-query-submit-btn"
                    type="submit"
                    disabled={loading || !customQuery.trim()}
                    className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Sample quick tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-gray-500 block">Or try quick prompts:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "Anthropic Claude 3.7", query: "What is Anthropic Claude 3.7 and its computer-use capabilities?" },
                      { label: "Nvidia Blackwell chipsets", query: "What are the latest updates and shipments of Nvidia Blackwell GPUs?" },
                      { label: "OpenAI Operator Agent", query: "Summarize the capabilities of the OpenAI Operator computer-controlling agent." }
                    ].map((tag, idx) => (
                      <button
                        id={`quick-tag-${idx}`}
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCustomQuery(tag.query);
                          setActiveChannel("custom");
                          addLog("USER", `Dispatched quick tag: "${tag.query}"`, "success");
                          fetchCuratedNews("custom", tag.query);
                        }}
                        className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/5 hover:bg-white/10 text-[9px] text-gray-400 hover:text-white transition-all cursor-pointer"
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* 3. VERIFIED CITATIONS INTERACTIVE HUD */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-300 font-mono">Sources & Citations</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[9px] font-mono">
                  {curatedData?.citations ? curatedData.citations.length : 0} Verified
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                These are the real-time search references processed and aggregated by the agent to construct this briefing.
              </p>

              <div className="space-y-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
                {curatedData && curatedData.citations && curatedData.citations.length > 0 ? (
                  curatedData.citations.map((citation, idx) => (
                    <a
                      key={idx}
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-2 p-2 rounded-lg bg-black/30 border border-white/5 hover:border-white/15 transition-all text-left group"
                    >
                      <span className="w-4 h-4 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-mono flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-0.5 overflow-hidden">
                        <div className="text-[10px] font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                          {citation.title}
                        </div>
                        <div className="text-[9px] text-gray-500 truncate flex items-center gap-0.5">
                          {citation.url}
                          <ExternalLink className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500 text-xs font-mono border border-dashed border-white/5 rounded-xl">
                    No active citations listed.
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ================= RIGHT SIDE: MAIN CURATION FEED (COLS: 8) ================= */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. AGENT VIEWPORT & BRIEF PREVIEW */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md relative overflow-hidden min-h-[450px] flex flex-col justify-between">
              
              {/* Heading Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                      {activeChannel === "custom" 
                        ? `Research Agent: "${customQuery.substring(0, 24)}${customQuery.length > 24 ? '...' : ''}"` 
                        : CHANNELS.find((c) => c.id === activeChannel)?.name || "AI News Agent"}
                    </h1>
                    <div className="text-[10px] text-gray-500 flex items-center gap-2 font-mono">
                      <span>Telemetry Mode: Grounded</span>
                      <span>•</span>
                      <span>Update: Live</span>
                    </div>
                  </div>
                </div>

                {/* Toolbar Buttons */}
                <div className="flex items-center gap-2.5">
                  <button
                    id="dashboard-copy-content-btn"
                    onClick={handleCopyContent}
                    disabled={!curatedData || loading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/10 hover:bg-white/10 text-xs text-gray-300 hover:text-white transition-all cursor-pointer disabled:opacity-40"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy Raw"}
                  </button>
                  <button
                    id="dashboard-composer-bulletin-btn"
                    onClick={handleCopyNewsletter}
                    disabled={!curatedData || loading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/25 hover:bg-orange-500/20 text-xs text-orange-400 hover:text-orange-300 transition-all cursor-pointer disabled:opacity-40"
                  >
                    {newsletterCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    {newsletterCopied ? "Compiled!" : "Export Daily Bulletin"}
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="py-6 flex-grow relative z-10">
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 py-20"
                    >
                      <div className="relative w-16 h-16">
                        {/* Elegant outer loading rings */}
                        <div className="absolute inset-0 rounded-full border-2 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" style={{ animationDuration: '0.8s' }} />
                        <div className="absolute inset-2 rounded-full border border-dashed border-blue-400/40 animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }} />
                        <div className="absolute inset-4 rounded-full bg-white/[0.03] flex items-center justify-center">
                          <Bot className="w-5 h-5 text-orange-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-white font-mono">Agent Curating Live Intelligence...</p>
                        <p className="text-xs text-gray-500 h-5 italic transition-all duration-500">
                          {loadingMessages[loadingMsgIdx]}
                        </p>
                      </div>
                    </motion.div>
                  ) : curatedData ? (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="prose prose-invert prose-xs max-w-none text-gray-300 leading-relaxed text-xs space-y-4"
                    >
                      {/* Search Queries badge view */}
                      {curatedData.searchQueries && curatedData.searchQueries.length > 0 && (
                        <div className="p-3 rounded-xl bg-black/40 border border-white/5 mb-6">
                          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-2">Google Searches Conducted:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {curatedData.searchQueries.map((queryText, idx) => (
                              <div key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[9px] font-mono text-gray-400">
                                <Search className="w-2.5 h-2.5 text-orange-500" />
                                {queryText}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Decoded Markdown Text */}
                      <div className="markdown-body select-text space-y-4 pr-1">
                        <ReactMarkdown 
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-lg font-bold text-white mt-6 mb-3 border-b border-white/5 pb-1 font-sans" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-base font-semibold text-white mt-5 mb-2 font-sans" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-sm font-semibold text-orange-300 mt-4 mb-2 font-sans" {...props} />,
                            p: ({node, ...props}) => <p className="mb-3 leading-relaxed text-xs text-gray-300 font-sans" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-3 space-y-1.5 text-xs text-gray-300" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-3 space-y-1.5 text-xs text-gray-300" {...props} />,
                            li: ({node, ...props}) => <li className="marker:text-orange-500" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                            code: ({node, ...props}) => <code className="bg-black/50 text-orange-300 px-1 py-0.5 rounded text-[10px] font-mono border border-white/5" {...props} />,
                            blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-orange-500/50 pl-3 italic my-3 text-gray-400 bg-white/[0.01] py-1 pr-2 rounded-r" {...props} />
                          }}
                        >
                          {curatedData.content}
                        </ReactMarkdown>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-24 space-y-3">
                      <AlertCircle className="w-10 h-10 text-gray-600" />
                      <div className="space-y-1">
                        <p className="text-sm text-gray-400">No active curated feeds loaded.</p>
                        <p className="text-xs text-gray-600">Select an agent channel above to trigger curated reports.</p>
                      </div>
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Timestamp Info Footer */}
              <div className="pt-4 border-t border-white/5 text-[10px] font-mono text-gray-600 flex items-center justify-between relative z-10">
                <span>SYNTHESIS LATENCY: ~4.1s</span>
                <span>SYSTEM STATUS: STABLE</span>
                <span>
                  TIMESTAMP: {curatedData ? new Date(curatedData.timestamp).toLocaleString() : "N/A"}
                </span>
              </div>
            </div>

            {/* 2. STRUCTURED MARKET TREND ANALYSIS HUD */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold tracking-wide uppercase text-gray-300 font-mono">Structured AI Market Trends HUD</h2>
                </div>
                <button
                  id="dashboard-refresh-trends-btn"
                  onClick={fetchTrendingTopics}
                  disabled={trendsLoading}
                  className="p-1.5 rounded-lg bg-white/[0.03] border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-45"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${trendsLoading ? 'animate-spin text-orange-400' : ''}`} />
                </button>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                Analyzing search volumes, developer forums, and venture reports to isolate trending frameworks, architectures, and infrastructures.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
                {trends.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/10 transition-all flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 gap-1.5">
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 font-mono uppercase tracking-wider overflow-hidden truncate max-w-[85px]">
                          {item.category}
                        </span>
                        <span className={`text-[9px] font-mono font-bold ${
                          item.sentiment.includes('Skyrocketing') || item.sentiment.includes('Bullish') 
                            ? 'text-emerald-400' 
                            : 'text-blue-400'
                        }`}>
                          {item.sentiment}
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white group-hover:text-orange-400 transition-colors leading-tight mb-2">
                        {item.topic}
                      </h4>
                    </div>
                    
                    <div className="space-y-2 mt-2">
                      <p className="text-[10px] text-gray-500 leading-normal line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Metric Indicator */}
                      <div className="space-y-1 pt-1.5 border-t border-white/5">
                        <div className="flex items-center justify-between text-[9px] font-mono text-gray-500">
                          <span>VOLUME INDEX</span>
                          <span className="text-white font-bold">{item.volume}</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full" 
                            style={{ width: item.volume }} 
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. AGENT ACTIVITY HUD & TELEMETRY TERMINAL */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider text-gray-300 uppercase">Agent Telemetry & Grounding Logs</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Curation Engine online</span>
                </div>
              </div>

              {/* Logs viewport */}
              <div className="h-44 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin text-[10px] leading-normal font-mono select-text">
                {logs.map((log) => (
                  <div key={log.id} className="text-gray-400 flex items-start gap-2">
                    <span className="text-gray-600 shrink-0 select-none">[{log.timestamp}]</span>
                    <span className={`font-semibold shrink-0 select-none ${
                      log.agent === "SYSTEM" ? "text-blue-400" :
                      log.agent === "USER" ? "text-teal-400" :
                      log.agent === "GEMINI" ? "text-purple-400" : "text-amber-400"
                    }`}>
                      {log.agent}:
                    </span>
                    <div className="space-y-0.5">
                      <span className={`${
                        log.status === "error" ? "text-red-400" :
                        log.status === "running" ? "text-amber-400 animate-pulse" : "text-gray-300"
                      }`}>
                        {log.action}
                      </span>
                      {log.details && (
                        <div className="text-[9px] text-gray-600 font-mono italic pl-2 border-l border-white/10">
                          {log.details}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
