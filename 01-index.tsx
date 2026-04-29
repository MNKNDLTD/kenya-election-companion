// KENYA 2027 ELECTION COMPANION — MAIN ENTRY POINT
// 4-Persona Demo: Voter / Newsroom Editor / Civil Society / Public API

import { useState } from "react";
import { Card } from "@/components/ui/card";
import VoterInterface from "./personas/VoterInterface";
import NewsroomDashboard from "./personas/NewsroomDashboard";
import CivilSocietyDashboard from "./personas/CivilSocietyDashboard";
import PublicAPIExplorer from "./personas/PublicAPIExplorer";

type Persona = "voter" | "newsroom" | "civil-society" | "api" | null;

const ElectionCompanion = () => {
  const [activePersona, setActivePersona] = useState<Persona>(null);

  if (activePersona === "voter") return <VoterInterface onBack={() => setActivePersona(null)} />;
  if (activePersona === "newsroom") return <NewsroomDashboard onBack={() => setActivePersona(null)} />;
  if (activePersona === "civil-society") return <CivilSocietyDashboard onBack={() => setActivePersona(null)} />;
  if (activePersona === "api") return <PublicAPIExplorer onBack={() => setActivePersona(null)} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">
            Kenya 2027 Election Companion
          </h1>
          <p className="text-lg text-slate-300">
            WhatsApp-native civic infrastructure · Fact-checking · Editorial integrity · Open data
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Built for Mozilla AIxD Incubator · MNKND Limited · Royal Media Services Partnership
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* PERSONA 1: VOTER */}
          <Card 
            className="cursor-pointer border-2 border-green-500/20 bg-slate-800/50 p-6 transition-all hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/20"
            onClick={() => setActivePersona("voter")}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20 text-2xl">
                🗳️
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Voter</h2>
                <p className="text-sm text-slate-400">WhatsApp Interface</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-300">
              Fact-check rumors, find polling stations, ask about manifestos, track live results. 
              English, Swahili, Sheng support.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                Fact-Checking
              </span>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                Polling Station Lookup
              </span>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                Multilingual
              </span>
            </div>
            <button className="mt-4 w-full rounded-lg bg-green-500 py-2 font-semibold text-white transition-colors hover:bg-green-600">
              Enter as Voter
            </button>
          </Card>

          {/* PERSONA 2: NEWSROOM EDITOR */}
          <Card 
            className="cursor-pointer border-2 border-blue-500/20 bg-slate-800/50 p-6 transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20"
            onClick={() => setActivePersona("newsroom")}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20 text-2xl">
                📰
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Newsroom Editor</h2>
                <p className="text-sm text-slate-400">RMS Editorial Dashboard</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-300">
              Claim queue, verdict workflow, source citations, regional correspondent routing. 
              Royal Media Services integration.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                Claim Triage
              </span>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                Editorial Sign-Off
              </span>
              <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                Audit Trail
              </span>
            </div>
            <button className="mt-4 w-full rounded-lg bg-blue-500 py-2 font-semibold text-white transition-colors hover:bg-blue-600">
              Enter as Editor
            </button>
          </Card>

          {/* PERSONA 3: CIVIL SOCIETY */}
          <Card 
            className="cursor-pointer border-2 border-purple-500/20 bg-slate-800/50 p-6 transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
            onClick={() => setActivePersona("civil-society")}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20 text-2xl">
                🌍
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Civil Society Partner</h2>
                <p className="text-sm text-slate-400">Misinfo Intelligence Dashboard</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-300">
              Geographic heatmaps, topical clustering, early-warning alerts 12-24hrs before peak. 
              Uraia Trust & Code for Africa.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                County Heatmaps
              </span>
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                Early Warning
              </span>
              <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs text-purple-400">
                Intervention Briefs
              </span>
            </div>
            <button className="mt-4 w-full rounded-lg bg-purple-500 py-2 font-semibold text-white transition-colors hover:bg-purple-600">
              Enter as Civil Society
            </button>
          </Card>

          {/* PERSONA 4: PUBLIC API */}
          <Card 
            className="cursor-pointer border-2 border-orange-500/20 bg-slate-800/50 p-6 transition-all hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/20"
            onClick={() => setActivePersona("api")}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-2xl">
                🔓
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Public API Explorer</h2>
                <p className="text-sm text-slate-400">Open Claim Dataset</p>
              </div>
            </div>
            <p className="mb-4 text-sm text-slate-300">
              Live claim dataset, anonymized feed, verifiable provenance. CC-BY 4.0 license. 
              Interactive playground.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                Open Data
              </span>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                MIT License
              </span>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs text-orange-400">
                API Playground
              </span>
            </div>
            <button className="mt-4 w-full rounded-lg bg-orange-500 py-2 font-semibold text-white transition-colors hover:bg-orange-600">
              Explore API
            </button>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>
            Open-source components: Multilingual NLP pipeline (MIT) · Election misinformation dataset (CC-BY 4.0) · Practitioner report
          </p>
          <p className="mt-2">
            Partners: Royal Media Services · Uraia Trust · Code for Africa · IEBC · Africa Check
          </p>
        </div>
      </div>
    </div>
  );
};

export default ElectionCompanion;
