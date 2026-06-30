export interface Citation {
  title: string;
  url: string;
}

export interface NewsResponse {
  success: boolean;
  content: string;
  citations: Citation[];
  searchQueries: string[];
  timestamp: string;
  error?: string;
}

export interface TrendItem {
  topic: string;
  category: string;
  volume: string;
  sentiment: string;
  description: string;
}

export interface ChannelInfo {
  id: string;
  name: string;
  description: string;
  iconName: string;
  accentColor: string;
  samplePrompt: string;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  status: "success" | "error" | "running";
  details: string;
}
