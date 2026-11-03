import React, { useState } from 'react';
import { Terminal, Copy, Check, ShieldCheck, Zap, Layers, Bot, Network } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

export const AboutSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'agent' | 'metrics' | 'infra'>('bio');
  const [copied, setCopied] = useState(false);

  const tabs = [
    { id: 'bio' as const, label: 'whoami.sh', icon: Terminal },
    { id: 'agent' as const, label: 'agent_graph.py', icon: Bot },
    { id: 'metrics' as const, label: 'metrics.json', icon: Zap },
    { id: 'infra' as const, label: 'cloud_infra.yml', icon: Network }
  ];

  const codeSnippets = {
    bio: `#!/usr/bin/env bash
# Profile: ${PERSONAL_INFO.name}
# Role: ${PERSONAL_INFO.title}
# Location: ${PERSONAL_INFO.location}

echo "Initializing Agentic AI Engineering Environment..."
status="${PERSONAL_INFO.status}"

core_engineering_tenets=(
  "1. Multi-Agent Orchestration: LangGraph & Google ADK graph workflows"
  "2. Parallel Execution: 75% latency reduction (25s -> 6s) via asyncio.gather"
  "3. Hybrid RAG: BM25 + dense vector embeddings with Pydantic validation"
  "4. Full Observability: 100% distributed tracing with OpenTelemetry & App Insights"
  "5. Standardized Tools: Model Context Protocol (MCP) server integration"
)

for tenet in "\${core_engineering_tenets[@]}"; do
  echo "✔ \$tenet"
done

echo "System ready to ship enterprise GenAI systems at scale."`,

    agent: `import asyncio
from langgraph.graph import StateGraph, END
from pydantic import BaseModel, Field
from typing import TypedDict, Annotated, List

class AgentState(TypedDict):
    query: str
    user_intent: str
    context: List[str]
    final_output: dict

DISPATCHER_PROMPT = """
You are the master routing dispatcher. Evaluate the user's intent across 14+ specialized
agents and route with sub-2-second deterministic decision boundaries.
"""

async def run_parallel_pipeline(state: AgentState):
    # 4x response improvement: 25s -> 6s parallel execution
    seo_task = asyncio.create_task(seo_agent.ainvoke(state))
    aeo_task = asyncio.create_task(aeo_agent.ainvoke(state))
    geo_task = asyncio.create_task(geo_agent.ainvoke(state))
    
    results = await asyncio.gather(seo_task, aeo_task, geo_task)
    return {"final_output": synthesize_responses(results)}

workflow = StateGraph(AgentState)
workflow.add_node("dispatcher", dynamic_intent_router)
workflow.add_node("parallel_agents", run_parallel_pipeline)
workflow.set_entry_point("dispatcher")
workflow.add_edge("dispatcher", "parallel_agents")
workflow.add_edge("parallel_agents", END)
app = workflow.compile()`,

    metrics: `{
  "production_benchmarks": {
    "end_to_end_latency_reduction": "75% (25s -> 6s)",
    "parallel_execution_method": "asyncio.gather concurrency",
    "llm_routing_decision_latency": "< 2.0s with GPT-4o",
    "agent_mesh_scale": "14+ specialized LangGraph agents",
    "distributed_tracing_coverage": "100% API & LLM calls (OpenTelemetry)",
    "incident_troubleshooting_reduction": "40% faster root-cause triage",
    "deployment_uptime_sla": "Zero-downtime releases via Azure Pipelines"
  },
  "cloud_credentials": [
    "Google Cloud - Professional Machine Learning Engineer (2026)",
    "Google Cloud - Generative AI Leader",
    "Microsoft - Azure AI Fundamentals (2025)"
  ]
}`,

    infra: `version: "3.8"
services:
  agentic-runtime:
    image: sathish/langgraph-orchestrator:latest
    deploy:
      platform: "Azure Container Apps"
      scaling:
        minReplicas: 2
        maxReplicas: 16
        cpu: "2.0"
        memory: "4Gi"
    environment:
      - AZURE_OPENAI_ENDPOINT=\${AZURE_ENDPOINT}
      - AZURE_AI_SEARCH_INDEX="hybrid-bm25-vector-rag"
      - OTEL_EXPORTER_OTLP_ENDPOINT="azure-app-insights"
      - MCP_SERVER_DISCOVERY="http://mcp-gateway:8080"
      - THINKING_BUDGET=1024
      - MAX_OUTPUT_TOKENS=4096`
  };

  const handleCopy = () => {
    sound.playSuccess();
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pillars = [
    {
      icon: Zap,
      title: "Ultra-Low Latency Routing",
      desc: "Engineered custom DISPATCHER_PROMPTs that make sub-2-second routing decisions across 14+ specialized agents."
    },
    {
      icon: Layers,
      title: "Parallel Agentic Graph Concurrency",
      desc: "Achieved a 4x response time improvement (25s → 6s) utilizing Python asyncio.gather across SEO, AEO, and GEO pipelines."
    },
    {
      icon: ShieldCheck,
      title: "100% Distributed Observability",
      desc: "Integrated OpenTelemetry and Azure Application Insights covering 100% of agent executions, cutting triage time by 40%."
    }
  ];

  return (
    <section id="about" className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>&lt;Architecture & Systems /&gt;</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Agentic Systems Architecture & Mindset
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg">
            Where multi-agent graph workflows, low-latency LLM routing, and enterprise hybrid RAG meet.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Terminal Window */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden glass-panel border border-slate-800 shadow-2xl">
            {/* Terminal Window Header Bar */}
            <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              {/* Traffic light window dots */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                  sathish@agentic-core:~/{activeTab}
                </span>
              </div>

              {/* Tab Switchers */}
              <div className="flex items-center gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        sound.playKey();
                        setActiveTab(tab.id);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-all duration-200 ${
                        isActive
                          ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30 shadow'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Copy snippet button */}
              <button
                onClick={handleCopy}
                title="Copy contents"
                className="p-1.5 rounded bg-slate-800/70 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors ml-2"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Terminal Code Body */}
            <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto max-h-[420px] bg-slate-950/90">
              <pre className="whitespace-pre">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>
          </div>

          {/* Right Column: Portrait Badge & Pillars */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Holographic Portrait Card */}
            <div className="p-4 rounded-2xl glass-panel border border-amber-500/30 flex items-center gap-4 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/20 shadow-xl group">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-500/50 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={`${import.meta.env.BASE_URL}sathish-portrait.png`}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <div className="overflow-hidden">
                <div className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                  {PERSONAL_INFO.name}
                </div>
                <div className="text-xs font-mono text-cyan-400 truncate">
                  GenAI & Agentic Systems
                </div>
                <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{PERSONAL_INFO.location}</span>
                </div>
              </div>
            </div>

            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
