import { PublicAppCodeData } from './types';

export const aiAgentData: PublicAppCodeData = {
	fileTree: [
		{
			name: 'frontend',
			type: 'folder',
			children: [
				{ name: 'App.tsx', type: 'file' },
				{ name: 'index.tsx', type: 'file' },
				{ name: 'index.css', type: 'file' },
				{ name: 'wmill.ts', type: 'file' },
				{ name: 'package.json', type: 'file' },
			],
		},
		{
			name: 'backend',
			type: 'folder',
			children: [
				{ name: 'sendAiMessage', type: 'file' },
				{ name: 'getMarketingActivations', type: 'file' },
				{ name: 'getSalesMetrics', type: 'file' },
			],
		},
	],

	flowDescriptions: {
		'sendAiMessage': [
			'// This flow takes the user message as input and passes it to a built-in AI agent step',
			'// When the query is about sales or marketing, the AI agent calls getSalesMetrics or getMarketingActivations to fetch data',
			'// Otherwise, these scripts will not be called',
			'// The AI agent uses this data to return an appropriate answer to the user in the "Result" step',
		],
	},

	flowData: {
		'sendAiMessage': [
			{ id: 'input', label: 'Input (user message)', type: 'input' },
			{
				id: 'parallel',
				label: '',
				type: 'script',
				parallel: [
					{ id: 'a', label: 'sales', type: 'script' },
					{ id: 'b', label: 'marketing', type: 'script' },
				],
			},
			{ id: 'c', label: 'Generate AI response', type: 'ai', tag: 'call_ai' },
			{ id: 'output', label: 'Output (AI response)', type: 'output' },
		],
	},

	fileContents: {
		'App.tsx': `import React, { useState, useEffect, useRef } from 'react'
import { backend } from './wmill'
import './index.css'

type Message = { role: "user" | "assistant"; content: string; timestamp?: Date; toolsUsed?: string[] };

const SYSTEM_PROMPT = \`You are Boris, the internal AI assistant for Acme Corporation...

## Company Overview
- **Company Name**: Acme Corporation
- **CEO**: Sarah Johnson
- **Number of Employees**: 450+

## Key Contacts
- **HR Director**: Maria Garcia (maria.garcia@acme.com)
- **IT Support**: helpdesk@acme.com or ext. 5555

## Payroll & Compensation
- **Pay Schedule**: Bi-weekly, every other Friday
- **Annual Raises**: Performance reviews in March, raises effective April 1st

## Time Off & Leave
- **PTO Policy**: 20 days per year for all full-time employees
- **Sick Leave**: 10 days per year (separate from PTO)
- **Parental Leave**: 16 weeks paid for primary caregivers\`;

const SUGGESTIONS = [
  "When is payday?",
  "Who is in charge of HR?",
  "How many sales did we make this week?",
  "Which marketing campaign had the highest ROI?",
];

type Tool = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  backendMethod: string;
};

const TOOLS: Tool[] = [
  {
    id: 'get_sale_metrics',
    name: 'Sales Metrics',
    description: 'Triggers a script that gets sales metrics from the last 30 days',
    enabled: true,
    backendMethod: 'c',
  },
  {
    id: 'get_marketing_activations',
    name: 'Marketing Activations',
    description: 'Triggers a script that gets marketing activations from the last 30 days',
    enabled: true,
    backendMethod: 'b',
  },
];

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'context' | 'tools'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: new Date() }]);

    try {
      const response = await backend.sendAiMessage({
        message: userMessage,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: response, timestamp: new Date() }]);
    } catch (e) {
      console.error('Failed to send message:', e);
    }
    setLoading(false);
  }

  return (
    <div className="chat-app">
      <div className="chat-container">
        <header className="chat-header">
          <div className="header-left">
            <div className="bot-avatar"><BotIcon /></div>
            <div className="header-info">
              <h1>Boris</h1>
              <span className="subtitle">AI Assistant</span>
            </div>
          </div>
        </header>

        <div className="tabs">
          <button className={\`tab \${activeTab === 'chat' ? 'active' : ''}\`} onClick={() => setActiveTab('chat')}>
            Chat
          </button>
          <button className={\`tab \${activeTab === 'context' ? 'active' : ''}\`} onClick={() => setActiveTab('context')}>
            Knowledge Base
          </button>
          <button className={\`tab \${activeTab === 'tools' ? 'active' : ''}\`} onClick={() => setActiveTab('tools')}>
            Tools
          </button>
        </div>

        {activeTab === 'chat' && (
          <main className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-state">
                <h2>Hi, I'm Boris!</h2>
                <p>Ask me anything about your company</p>
                <div className="suggestions">
                  {SUGGESTIONS.map((suggestion, idx) => (
                    <button key={idx} className="suggestion-btn" onClick={() => setInput(suggestion)}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map((msg, idx) => (
                  <div key={idx} className={\`message-wrapper \${msg.role}\`}>
                    <div className="message-bubble">
                      <div className="message-content">{msg.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  )
}

export default App`,

		'index.tsx': `import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

const root = createRoot(document.getElementById('root')!)
root.render(<App />)`,

		'index.css': `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary: #18181b;
  --bg-main: #f8fafc;
  --bg-chat: #ffffff;
  --bg-user: #18181b;
  --bg-assistant: #f1f5f9;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border: #e2e8f0;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: var(--bg-main);
  color: var(--text-primary);
}

.chat-app {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.chat-container {
  width: 100%;
  max-width: 1000px;
  height: calc(100vh - 40px);
  background: var(--bg-chat);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.bot-avatar {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--primary), #09090b);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}`,

		'wmill.ts': `// THIS FILE IS READ-ONLY
// GENERATED AUTOMATICALLY FROM YOUR RUNNABLES

export declare const backend: {
  sendAiMessage: (args: {}) => Promise<any>;
  getSalesMetrics: (args: {}) => Promise<any>;
  getMarketingActivations: (args: {}) => Promise<any>;
};

export declare const backendAsync: {
  sendAiMessage: (args: {}) => Promise<string>;
  getSalesMetrics: (args: {}) => Promise<string>;
  getMarketingActivations: (args: {}) => Promise<string>;
};

export type Job = {
  type: "QueuedJob" | "CompletedJob";
  id: string;
  created_at: number;
  started_at: number | undefined;
  duration_ms: number;
  success: boolean;
  args: any;
  result: any;
};

export declare function waitJob(id: string): Promise<Job>;
export declare function getJob(id: string): Promise<Job>;
export declare function streamJob(id: string, onUpdate?: (data: any) => void): Promise<any>;`,

		'package.json': `{
  "dependencies": {
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "windmill-client": "^1"
  },
  "devDependencies": {
    "@types/react-dom": "^19.0.0",
    "@types/react": "^19.0.0"
  }
}`,

		'getMarketingActivations': `// Returns marketing activations with dates, budgets, and reach
// Allows the AI to correlate marketing efforts with sales

export async function main() {
  const today = new Date();

  const campaigns = [
    { daysAgo: 28, name: "Monthly Newsletter", type: "email", budget: 500, reach: 15000 },
    { daysAgo: 25, name: "Instagram Ads", type: "social_media", budget: 1200, reach: 45000 },
    { daysAgo: 21, name: "Google Search Ads", type: "paid_search", budget: 800, reach: 8000 },
    { daysAgo: 17, name: "Influencer Partnership", type: "influencer", budget: 2000, reach: 120000 },
    { daysAgo: 14, name: "Flash Sale Newsletter", type: "email", budget: 300, reach: 18000 },
    { daysAgo: 10, name: "TikTok Campaign", type: "social_media", budget: 1500, reach: 85000 },
  ];

  return campaigns.map(c => ({
    date: new Date(today.getTime() - c.daysAgo * 86400000).toISOString().split('T')[0],
    name: c.name,
    type: c.type,
    budget: c.budget,
    reach: c.reach
  }));
}`,

		'getSalesMetrics': `// Give sales metrics, and allow you to manipulate them on specific date ranges.
// We use mock data to keep things simple for this example
// But you can can easily create a script that gets this data from your own database

export async function main() {
  const today = new Date();
  const results = [];

  // Sales values that create realistic patterns (weekends lower, some spikes for promotions)
  const baseSales = [1200, 850, 720, 1150, 1180, 1220, 1190, 3850, 3620, 3290,
                     1450, 1280, 890, 1100, 6420, 5890, 5240, 1520, 1380, 1050,
                     920, 1180, 1240, 1210, 1290, 1350, 1180, 1220, 1340, 1410];

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    results.push({
      date: dateStr,
      sales: baseSales[29 - i]
    });
  }

  return results;
}`
	}
};
