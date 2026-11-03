import type { Project, SkillCategory, ExperienceItem, EducationItem, TestimonialItem } from '../types';

export const PERSONAL_INFO = {
  name: "Nampelli Sathish",
  shortName: "Sathish",
  title: "GenAI Engineer · Agentic AI Systems Architect",
  tagline: "Production GenAI engineer shipping agentic AI systems at enterprise scale. Specializes in multi-agent orchestration, RAG pipeline architecture, and LLM-powered workflow automation across Azure, GCP, and AWS Bedrock.",
  location: "Hyderabad, India",
  status: "Open for High-Impact GenAI & Agentic Roles",
  statusColor: "#10b981",
  email: "sathishnampelli6@gmail.com",
  phone: "+91-9177626712",
  github: "https://github.com/sathish-nampelli",
  linkedin: "https://linkedin.com/in/sathish-nampelli",
  twitter: "https://x.com/sathish_nampelli",
  leetcode: "https://leetcode.com",
  bio: [
    "Production GenAI engineer shipping agentic AI systems at enterprise scale.",
    "Specializes in multi-agent orchestration (LangGraph, Google ADK, AWS Bedrock), hybrid RAG pipeline architecture (BM25 + vector embeddings), and low-latency LLM-powered workflow automation.",
    "Proven track record building systems that reduce latency by 75%, cut infrastructure costs, and achieve sub-2-second routing decisions across 14+ specialized agents in high-volume production environments."
  ],
  stats: [
    { label: "Latency Reduction", value: "75% (25s → 6s)" },
    { label: "Orchestrated Agents", value: "14+ Agents" },
    { label: "Observability Coverage", value: "100% Tracing" },
    { label: "Cloud Ecosystems", value: "Azure · GCP · AWS" }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "seo-aeo-geo-optimization-platform",
    title: "AI-Powered SEO/AEO/GEO Optimization Platform",
    tagline: "Enterprise Multi-Agent Orchestration with 14+ LangGraph Agents & Hybrid RAG",
    description: "Production-grade multi-agent platform orchestrating 14+ specialized LangGraph agents for Search Engine, Answer Engine (AEO), and Generative Engine Optimization (GEO). Employs a custom DISPATCHER_PROMPT achieving sub-2-second routing decisions with GPT-4o and parallel execution via asyncio.gather.",
    category: "AI & Cloud",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80",
    tags: ["LangGraph", "Azure OpenAI", "GPT-4o", "FastAPI", "Azure AI Search", "OpenTelemetry", "Docker", "Azure Container Apps"],
    metrics: [
      "4x speedup: 75% latency reduction (25s → 6s) via asyncio.gather",
      "Sub-2s dynamic routing decisions across 14+ agents",
      "100% OpenTelemetry + Azure App Insights distributed tracing coverage",
      "Zero-downtime CI/CD deployments on Azure Container Apps"
    ],
    liveUrl: "https://github.com/sathish-nampelli",
    githubUrl: "https://github.com/sathish-nampelli",
    featured: true,
    architectureNotes: [
      "Dynamic workflow selection with custom DISPATCHER_PROMPT evaluating user intent across 14+ specialized agents",
      "Hybrid RAG pipeline combining Azure AI Search BM25 keyword matching with vector embeddings",
      "Pydantic schema validation guaranteeing deterministic, structured outputs for enterprise consumers",
      "Azure Blob Storage (JSONL) state persistence with automated smart URL recovery mechanisms"
    ]
  },
  {
    id: "marketing-campaign-intelligence",
    title: "Marketing Campaign Intelligence System",
    tagline: "Multi-Agent Graph Workflow with Google ADK, Vertex AI RAG & Gemini 2.5",
    description: "Autonomous multi-agent system built on Google Agent Development Kit (ADK) featuring dynamic graph workflows. Features an LLM intent router classifying enterprise requests across 5 categories, with parallel execution for Insight and Segmentation agents.",
    category: "AI & Cloud",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80",
    tags: ["Google ADK", "Vertex AI RAG", "Gemini 2.5 Flash-Lite", "FastAPI", "GCP Cloud Run", "Python asyncio", "BigQuery"],
    metrics: [
      "50% latency reduction through concurrent Insight & Segmentation agent runs",
      "Sub-second semantic search over Vertex AI historical RAG corpus",
      "Optimized token economy using dynamic thinking_budget & max_output_tokens tuning",
      "Production deployment via FastAPI REST API on serverless GCP Cloud Run"
    ],
    liveUrl: "https://github.com/sathish-nampelli",
    githubUrl: "https://github.com/sathish-nampelli",
    featured: true,
    architectureNotes: [
      "Google ADK graph workflow with dynamic intent routing across 5 distinct business queries",
      "Vertex AI RAG corpus with vector similarity search and fine-tuned top_k optimization",
      "Shared ctx.state key-value store enabling seamless inter-agent message passing and memory",
      "High-concurrency FastAPI async endpoints hosted on GCP Cloud Run"
    ]
  },
  {
    id: "aws-bedrock-agentic-system",
    title: "AWS Bedrock Enterprise Agentic System",
    tagline: "Intelligent Task Decomposition with Strands Framework & Bedrock Knowledge Bases",
    description: "Enterprise multi-agent framework on AWS Bedrock using the Strands agent framework. Orchestrates specialized agents for intelligent task decomposition, dynamic tool invocation, serverless action groups, and foundation model routing across Claude and Titan.",
    category: "Systems",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
    tags: ["AWS Bedrock", "Strands Framework", "Claude 3.5 Sonnet", "AWS Lambda", "DynamoDB", "S3", "EC2", "Titan"],
    metrics: [
      "Serverless action groups scaling automatically via Python AWS Lambda",
      "Sub-second state retrieval using Amazon DynamoDB agent session memory",
      "Dual foundation model routing optimizing cost vs reasoning capability",
      "Secure enterprise RAG integrated with Amazon S3 Knowledge Bases"
    ],
    liveUrl: "https://github.com/sathish-nampelli",
    githubUrl: "https://github.com/sathish-nampelli",
    featured: true,
    architectureNotes: [
      "Strands agent architecture for recursive task decomposition and autonomous tool execution",
      "DynamoDB session state persistence and episodic memory management for multi-turn chats",
      "Integrated AWS Bedrock Knowledge Bases with automated chunking and vector indexing",
      "Cost-optimized hybrid routing: lightweight queries to Titan, complex reasoning to Claude"
    ]
  },
  {
    id: "mcp-enterprise-server",
    title: "Model Context Protocol (MCP) Server",
    tagline: "Standardized Tool Discovery & Secure Invocation Layer for LangGraph Agents",
    description: "Production MCP (Model Context Protocol) server exposing internal microservice tools to LangGraph agents. Standardizes tool discovery, schema definition, and execution boundaries, drastically cutting integration overhead across distributed enterprise systems.",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80",
    tags: ["MCP Protocol", "Python", "FastAPI", "JSON-RPC", "LangGraph", "Docker", "Security"],
    metrics: [
      "Standardized 20+ enterprise internal tools across engineering teams",
      "Reduced tool integration overhead and development cycle time by 60%",
      "Strict parameter schema validation preventing hallucinated API calls"
    ],
    liveUrl: "https://github.com/sathish-nampelli",
    githubUrl: "https://github.com/sathish-nampelli",
    featured: false,
    architectureNotes: [
      "Compliant with Anthropic / Open Source Model Context Protocol specifications",
      "Dynamic capability registration and health monitoring for microservice endpoints",
      "RBAC security policies restricting privileged tool invocations"
    ]
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Agentic AI & LLMs",
    icon: "Cpu",
    skills: [
      { name: "LangGraph & LangChain", level: 98, experience: "Production" },
      { name: "Google ADK (Agent Dev Kit)", level: 92, experience: "Production" },
      { name: "Multi-Agent Orchestration", level: 96, experience: "Production" },
      { name: "LLM Routing & Tool Calling", level: 95, experience: "Production" },
      { name: "Model Context Protocol (MCP)", level: 90, experience: "Production" },
      { name: "Prompt Eng & Structured Output", level: 98, experience: "Production" }
    ]
  },
  {
    name: "RAG & Vector Search",
    icon: "Database",
    skills: [
      { name: "Azure AI Search (BM25 + Vector)", level: 96, experience: "Production" },
      { name: "Vertex AI RAG Corpus", level: 92, experience: "Production" },
      { name: "FAISS, Pinecone & Chroma", level: 90, experience: "Production" },
      { name: "Embeddings & Semantic Search", level: 94, experience: "Production" },
      { name: "Retrieval Optimization & Top_k", level: 95, experience: "Production" },
      { name: "Pydantic Schema Validation", level: 96, experience: "Production" }
    ]
  },
  {
    name: "Cloud & GenAI Platforms",
    icon: "Server",
    skills: [
      { name: "Azure (Container Apps, OpenAI, Cosmos)", level: 95, experience: "Production" },
      { name: "GCP (Vertex AI, Cloud Run, BigQuery)", level: 90, experience: "Production" },
      { name: "AWS (Bedrock, Lambda, DynamoDB, S3)", level: 92, experience: "Production" },
      { name: "Foundation Models (GPT-4o, Gemini 2.5, Claude)", level: 96, experience: "Production" },
      { name: "Azure Pipelines & CI/CD", level: 88, experience: "Production" },
      { name: "Docker Containerization", level: 92, experience: "Production" }
    ]
  },
  {
    name: "Backend & Observability",
    icon: "Layout",
    skills: [
      { name: "Python & Asyncio Parallelism", level: 97, experience: "Production" },
      { name: "FastAPI REST Framework", level: 95, experience: "Production" },
      { name: "OpenTelemetry Distributed Tracing", level: 94, experience: "Production" },
      { name: "Azure Application Insights", level: 92, experience: "Production" },
      { name: "REST APIs & JSON-RPC", level: 95, experience: "Production" },
      { name: "Git, Linux & Enterprise Systems", level: 93, experience: "Production" }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-accenture",
    role: "Software Engineer — GenAI / Agentic AI",
    company: "Accenture",
    period: "May 2024 – Present",
    location: "Hyderabad, India",
    type: "Full-Time",
    description: [
      "Architected production-grade agentic AI platform using LangGraph with 14+ specialized agents, reducing end-to-end latency by 75% (25s → 6s) via asyncio.gather parallel execution across SEO, AEO, and GEO enterprise workflows.",
      "Engineered LLM-powered intelligent routing using a custom DISPATCHER_PROMPT for dynamic agentic workflow selection across 14+ agents, achieving sub-2-second routing decisions with GPT-4o.",
      "Built enterprise hybrid RAG pipeline using Azure AI Search (BM25 + vector) with Pydantic structured output validation, significantly improving contextual LLM response accuracy for mission-critical workloads.",
      "Implemented MCP (Model Context Protocol) server exposing internal microservice tools to LangGraph agents for standardized tool discovery and execution, cutting integration overhead across engineering services.",
      "Integrated OpenTelemetry + Azure Application Insights for distributed tracing of 100% API and LLM executions, reducing production incident troubleshooting time by 40%.",
      "Deployed containerized FastAPI services to Azure Container Apps via Docker and automated Azure Pipelines CI/CD with zero-downtime releases across DEV and UAT environments."
    ],
    technologies: ["LangGraph", "Azure OpenAI", "FastAPI", "Python", "OpenTelemetry", "Azure AI Search", "Docker", "Azure Container Apps", "MCP"],
    metricHighlight: "75% latency reduction (25s → 6s) & 100% distributed tracing coverage across 14+ agents."
  },
  {
    id: "exp-dazn",
    role: "Technical Specialist",
    company: "DAZN",
    period: "Nov 2023 – Apr 2024",
    location: "Hyderabad, India",
    type: "Full-Time",
    description: [
      "Resolved production API failures, CDN configurations, and critical incidents on a high-concurrency global sports streaming platform.",
      "Investigated network latency bottlenecks and ensured high-availability streaming delivery for millions of live viewers."
    ],
    technologies: ["CDN Optimization", "API Diagnostics", "Production Incident Triage", "Distributed Systems", "Monitoring"],
    metricHighlight: "Maintained critical streaming uptime during high-traffic global sports broadcasts."
  },
  {
    id: "exp-genpact",
    role: "Intern",
    company: "Genpact (GoDaddy)",
    period: "Oct 2022 – Aug 2023",
    location: "Hyderabad, India",
    type: "Internship",
    description: [
      "Troubleshot DNS configurations, web server infrastructure, and REST API issues for enterprise cloud hosting platform.",
      "Assisted clients and engineering teams with domain routing, SSL certificates, and hosting performance optimization."
    ],
    technologies: ["DNS", "Web Server Infrastructure", "API Troubleshooting", "Linux", "Cloud Hosting"],
    metricHighlight: "Resolved over 500+ hosting and DNS routing incidents with 98% resolution SLA."
  }
];

export const EDUCATION: EducationItem[] = [
  {
    degree: "B.Tech in Mechanical Engineering",
    institution: "Guru Nanak Institutions Technical Campus, Hyderabad",
    period: "2019 – 2022",
    honors: "Technical Excellence in Computational Systems",
    coursework: [
      "Machine Learning Fundamentals",
      "Data Structures & Algorithms",
      "Computational Numerical Analysis",
      "System Engineering & Automation",
      "Applied Mathematics & Modeling"
    ]
  }
];

export const CERTIFICATIONS = [
  {
    title: "Professional Machine Learning Engineer",
    issuer: "Google Cloud",
    year: "2026",
    badge: "GCP Certified"
  },
  {
    title: "Generative AI Leader",
    issuer: "Google Cloud",
    year: "Verified",
    badge: "GenAI Specialist"
  },
  {
    title: "Azure AI Fundamentals",
    issuer: "Microsoft",
    year: "2025",
    badge: "Azure Certified"
  }
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Enterprise Architecture Lead",
    role: "Principal AI Architect",
    company: "Accenture",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    text: "Sathish is exceptional when it comes to orchestrating multi-agent systems. His work cutting LangGraph pipeline latency from 25 seconds down to 6 seconds while maintaining 100% OpenTelemetry distributed observability made our enterprise GenAI platform production-ready."
  },
  {
    name: "Senior Delivery Manager",
    role: "GenAI Engineering Director",
    company: "Accenture",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    text: "Sathish's mastery of hybrid RAG on Azure AI Search and multi-cloud LLM routing across Azure OpenAI, Vertex AI, and AWS Bedrock is top tier. He delivers robust, production-tested architectures that immediately impact client ROI."
  }
];
