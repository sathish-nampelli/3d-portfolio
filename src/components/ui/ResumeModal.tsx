import React from 'react';
import { X, Printer, Mail, MapPin, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO, EXPERIENCES, CERTIFICATIONS, PROJECTS } from '../../data/portfolioData';
import { sound } from '../../utils/audio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playBlip(900, 0.03);
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 sm:p-10 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Actions Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between pb-4 mb-6 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/40">
              Nampelli Sathish — GenAI Engineer Resume
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow transition-all hover:scale-105 active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={() => {
                sound.playBlip(600, 0.02);
                onClose();
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Container */}
        <div id="printable-resume" className="space-y-7 print:text-black print:bg-white text-sm">
          {/* Header */}
          <div className="border-b border-slate-800 pb-5 print:border-gray-300">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white print:text-black uppercase">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-cyan-400 print:text-blue-600 font-semibold text-sm sm:text-base mt-1">
              GenAI Engineer · Agentic AI Systems · LangGraph · Google ADK · Azure OpenAI · AWS Bedrock
            </p>

            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3 mt-3 text-xs text-slate-400 print:text-gray-700 font-mono">
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-500 print:text-black" />
                {PERSONAL_INFO.phone}
              </span>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-500 print:text-black" />
                {PERSONAL_INFO.email}
              </span>
              <span>|</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3" />
                linkedin.com/in/sathish-nampelli
              </a>
              <span>|</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                <GithubIcon className="w-3 h-3" />
                github.com/sathish-nampelli
              </a>
              <span>|</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-500 print:text-black" />
                {PERSONAL_INFO.location}
              </span>
            </div>

            <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed mt-3 pt-3 border-t border-slate-800/60 print:border-gray-200">
              {PERSONAL_INFO.tagline}
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-blue-700 mb-2 border-b border-slate-800 print:border-gray-300 pb-1">
              Skills
            </h2>
            <div className="space-y-2 text-xs">
              <div className="leading-relaxed">
                <strong className="text-slate-200 print:text-black">Agentic AI & LLM: </strong>
                <span className="text-slate-300 print:text-gray-800">
                  LangGraph, LangChain, Google ADK, multi-agent orchestration, agentic AI pipelines, LLM routing, tool calling, function calling, LLM evaluation, prompt engineering, structured output
                </span>
              </div>
              <div className="leading-relaxed">
                <strong className="text-slate-200 print:text-black">RAG & Vector Search: </strong>
                <span className="text-slate-300 print:text-gray-800">
                  Azure AI Search, Vertex AI RAG corpus, FAISS, Pinecone, Chroma, Weaviate, embeddings, Hybrid Search, Semantic search, retrieval optimization, top_k tuning
                </span>
              </div>
              <div className="leading-relaxed">
                <strong className="text-slate-200 print:text-black">LLM Models & APIs: </strong>
                <span className="text-slate-300 print:text-gray-800">
                  Azure OpenAI, Gemini 2.5 Flash-Lite, AWS Bedrock (Claude, Titan), LLaMA, Mistral, OpenAI API
                </span>
              </div>
              <div className="leading-relaxed">
                <strong className="text-slate-200 print:text-black">Azure: </strong>
                <span className="text-slate-300 print:text-gray-800">
                  Azure Container Apps, Azure OpenAI, Azure AI Search, Cosmos DB, Azure Blob Storage, Key Vault, App Insights, Azure Pipelines, CI/CD
                </span>
              </div>
              <div className="leading-relaxed">
                <strong className="text-slate-200 print:text-black">GCP: </strong>
                <span className="text-slate-300 print:text-gray-800">
                  Vertex AI (RAG, Vector Search, Model Armor), BigQuery, Google ADK, Cloud Run, Cloud Logging
                </span>
              </div>
              <div className="leading-relaxed">
                <strong className="text-slate-200 print:text-black">AWS: </strong>
                <span className="text-slate-300 print:text-gray-800">
                  Bedrock (Agents, Knowledge Bases), Lambda, DynamoDB, S3, EC2, CloudWatch, API Gateway
                </span>
              </div>
              <div className="leading-relaxed">
                <strong className="text-slate-200 print:text-black">Backend & Observability: </strong>
                <span className="text-slate-300 print:text-gray-800">
                  Python, FastAPI, Pydantic, asyncio, Docker, OpenTelemetry, Distributed tracing, Azure Application Insights, REST APIs, Git
                </span>
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-blue-700 mb-3 border-b border-slate-800 print:border-gray-300 pb-1">
              Experience
            </h2>
            <div className="space-y-5">
              {EXPERIENCES.map((exp) => (
                <div key={exp.id} className="text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-1 mb-1 font-semibold text-slate-100 print:text-black">
                    <div>
                      <span>{exp.role}</span> · <span className="text-cyan-400 print:text-blue-700">{exp.company}</span> · <span className="text-slate-400 print:text-gray-600 font-normal">{exp.location}</span>
                    </div>
                    <span className="font-mono text-slate-400 print:text-gray-600 text-[11px]">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1 mt-1 pl-3">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="text-slate-300 print:text-gray-800 leading-relaxed list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-blue-700 mb-3 border-b border-slate-800 print:border-gray-300 pb-1">
              Projects
            </h2>
            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-200 print:text-black mb-1">
                    <span>
                      {proj.title} <span className="text-cyan-400 print:text-blue-600 font-normal">| {proj.tags.slice(0, 4).join(' · ')}</span>
                    </span>
                  </div>
                  <p className="text-slate-300 print:text-gray-800 leading-relaxed">
                    {proj.description}
                  </p>
                  {proj.metrics && proj.metrics.length > 0 && (
                    <div className="mt-1 text-cyan-300 print:text-blue-800 font-mono text-[11px]">
                      ✔ Key impact: {proj.metrics.join('; ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 print:text-blue-700 mb-2 border-b border-slate-800 print:border-gray-300 pb-1">
              Education & Certifications
            </h2>
            <div className="text-xs space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white print:text-black">
                  B.Tech in Mechanical Engineering · Guru Nanak Institutions Technical Campus, Hyderabad
                </span>
                <span className="font-mono text-slate-400 print:text-gray-600">2019 – 2022</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-emerald-400 print:text-blue-800 font-medium">
                {CERTIFICATIONS.map((cert, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    ✔ {cert.issuer} – {cert.title} {cert.year && `(${cert.year})`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
