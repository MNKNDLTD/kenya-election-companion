// PERSONA 4: PUBLIC API EXPLORER
// Open claim dataset, live feed, CC-BY 4.0 license, interactive playground

import { useState } from "react";
import { ArrowLeft, Code, Database, Copy, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface APIEndpoint {
  method: "GET" | "POST";
  path: string;
  description: string;
  params?: { name: string; type: string; required: boolean }[];
  response: string;
}

const API_ENDPOINTS: APIEndpoint[] = [
  {
    method: "GET",
    path: "/api/v1/claims",
    description: "Get all claims (anonymized, paginated)",
    params: [
      { name: "page", type: "number", required: false },
      { name: "limit", type: "number", required: false },
    ],
    response: `{
  "claims": [
    {
      "id": "claim-4782",
      "text": "Polling stations close at 5 PM",
      "verdict": "FALSE",
      "confidence": 98,
      "county": "Multiple",
      "topic_cluster": "voter_suppression",
      "timestamp": "2027-08-09T20:35:00Z"
    }
  ],
  "total": 1240,
  "page": 1,
  "pages": 25
}`,
  },
  {
    method: "GET",
    path: "/api/v1/claims?county=kisumu",
    description: "Get claims filtered by county",
    params: [{ name: "county", type: "string", required: true }],
    response: `{
  "claims": [
    {
      "id": "claim-4782",
      "text": "IEBC commissioners arrested",
      "verdict": "UNVERIFIED",
      "county": "Kisumu",
      "submissions": 340
    }
  ],
  "county": "Kisumu",
  "total": 280
}`,
  },
  {
    method: "GET",
    path: "/api/v1/claims?topic=vote_rigging",
    description: "Get claims by AI topic cluster",
    params: [{ name: "topic", type: "string", required: true }],
    response: `{
  "claims": [...],
  "topic": "vote_rigging",
  "total": 420,
  "percentage": 34
}`,
  },
  {
    method: "GET",
    path: "/api/v1/verdicts/{claim_id}/provenance",
    description: "Get full audit trail for a verdict",
    params: [{ name: "claim_id", type: "string", required: true }],
    response: `{
  "claim_id": "claim-4780",
  "verdict": "FALSE",
  "editor": "Jane Wanjiru",
  "second_editor": "Peter Kamau",
  "sources": [
    {
      "type": "IEBC",
      "citation": "Electoral Code Section 29(2)",
      "tier": 1
    }
  ],
  "published_at": "2027-08-09T20:35:00Z",
  "audit_hash": "0x7b8e2f1a..."
}`,
  },
];

const THIRD_PARTY_PROJECTS = [
  {
    name: "Kenya Election Tracker",
    description: "Visual dashboard showing real-time claim distribution across all 47 counties",
    users: "12,000 daily active users",
    link: "github.com/election-tracker-ke",
  },
  {
    name: "Fact-Check Bot (X/Twitter)",
    description: "Automated bot that debunks viral election rumors using Election Companion dataset",
    users: "18,000 followers",
    link: "twitter.com/FactCheckKE2027",
  },
  {
    name: "Academic Research Dataset",
    description: "University of Nairobi study on misinformation patterns in African elections",
    users: "Research publication (Aug 2027)",
    link: "uonbi.ac.ke/elections-study",
  },
];

const PublicAPIExplorer = ({ onBack }: { onBack: () => void }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(null);
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleTryEndpoint = (endpoint: APIEndpoint) => {
    setSelectedEndpoint(endpoint);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponse(endpoint.response);
      setLoading(false);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center gap-4">
          <Button variant="ghost" onClick={onBack} className="text-slate-300 hover:bg-slate-800">
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Public API Explorer</h1>
            <p className="text-slate-400">Open Claim Dataset · CC-BY 4.0 License · Live Feed</p>
          </div>
          <Button variant="outline" className="border-orange-500/50 text-orange-400">
            <Github size={16} className="mr-2" />
            View on GitHub
          </Button>
        </div>

        {/* Key Info Cards */}
        <div className="mb-6 grid gap-4 lg:grid-cols-4">
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Dataset Size</p>
            <p className="text-3xl font-bold text-white">1,240</p>
            <p className="text-xs text-slate-500">Claims (Updated Real-Time)</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">License</p>
            <p className="text-2xl font-bold text-green-400">CC-BY 4.0</p>
            <p className="text-xs text-slate-500">Open, Forkable, Commercial Use</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Update Frequency</p>
            <p className="text-2xl font-bold text-blue-400">Live</p>
            <p className="text-xs text-slate-500">Every Verdict Published</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Third-Party Builds</p>
            <p className="text-3xl font-bold text-purple-400">3+</p>
            <p className="text-xs text-slate-500">Projects Using This API</p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* API Endpoints */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">📡 API Endpoints</h2>
            <p className="mb-4 text-sm text-slate-400">
              Base URL: <code className="rounded bg-slate-900/50 px-2 py-1">https://api.election-companion.ke</code>
            </p>

            <div className="space-y-3">
              {API_ENDPOINTS.map((endpoint, i) => (
                <Card
                  key={i}
                  className="cursor-pointer border-slate-600 bg-slate-900/50 p-4 transition-all hover:border-slate-500"
                  onClick={() => handleTryEndpoint(endpoint)}
                >
                  <div className="mb-2 flex items-center gap-2">
                    <Badge className="bg-green-500/20 text-green-400">{endpoint.method}</Badge>
                    <code className="text-sm text-slate-300">{endpoint.path}</code>
                  </div>
                  <p className="mb-3 text-sm text-slate-400">{endpoint.description}</p>
                  
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mb-3 rounded bg-slate-800/50 p-2">
                      <p className="mb-1 text-xs font-semibold text-slate-400">Parameters:</p>
                      {endpoint.params.map((param, j) => (
                        <p key={j} className="text-xs text-slate-500">
                          • <code>{param.name}</code> ({param.type}) {param.required && <span className="text-red-400">*required</span>}
                        </p>
                      ))}
                    </div>
                  )}

                  <Button size="sm" variant="outline" className="border-blue-500/50 text-blue-400">
                    <Code size={14} className="mr-2" />
                    Try in Browser
                  </Button>
                </Card>
              ))}
            </div>
          </Card>

          {/* Interactive Playground */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">🎮 Interactive Playground</h2>

            {selectedEndpoint ? (
              <>
                <div className="mb-4 rounded-lg bg-slate-900/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500/20 text-green-400">{selectedEndpoint.method}</Badge>
                      <code className="text-sm text-white">{selectedEndpoint.path}</code>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(selectedEndpoint.path)}
                      className="text-slate-400"
                    >
                      <Copy size={14} />
                    </Button>
                  </div>
                  <p className="text-xs text-slate-400">{selectedEndpoint.description}</p>
                </div>

                <div className="mb-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">Response:</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(response || selectedEndpoint.response)}
                      className="text-slate-400"
                    >
                      <Copy size={14} className="mr-2" />
                      Copy
                    </Button>
                  </div>
                  
                  {loading ? (
                    <div className="flex h-64 items-center justify-center rounded-lg bg-slate-900/50">
                      <div className="flex items-center gap-2 text-slate-400">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-transparent"></div>
                        <span>Loading...</span>
                      </div>
                    </div>
                  ) : (
                    <pre className="overflow-auto rounded-lg bg-slate-900/50 p-4 text-xs text-green-400">
                      {response || selectedEndpoint.response}
                    </pre>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                    Execute Request
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedEndpoint(null)} className="border-slate-600 text-slate-300">
                    Clear
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-slate-700">
                <div className="text-center">
                  <Database className="mx-auto mb-4 text-slate-600" size={48} />
                  <p className="text-slate-400">Select an endpoint to try it in the browser</p>
                </div>
              </div>
            )}
          </Card>

          {/* Documentation */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">📚 Documentation</h2>

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-semibold text-white">Authentication</h3>
                <p className="text-sm text-slate-400">
                  No API key required. All endpoints are public and rate-limited to 100 requests/minute per IP.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-white">Data Privacy</h3>
                <p className="text-sm text-slate-400">
                  All voter phone numbers are anonymized. Only county-level geographic data is exposed.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-white">Response Formats</h3>
                <div className="flex gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400">JSON</Badge>
                  <Badge className="bg-blue-500/20 text-blue-400">CSV</Badge>
                  <Badge className="bg-blue-500/20 text-blue-400">GeoJSON</Badge>
                </div>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-white">Verifiable Provenance</h3>
                <p className="text-sm text-slate-400">
                  Each verdict includes cryptographic hash for audit trail. Use{" "}
                  <code className="rounded bg-slate-900/50 px-1">GET /verdicts/&#123;id&#125;/provenance</code> to verify.
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-sm font-semibold text-white">License</h3>
                <p className="text-sm text-slate-400">
                  CC-BY 4.0 — Open, forkable, commercial use allowed. Attribution required.
                </p>
              </div>
            </div>

            <Button variant="outline" className="mt-4 w-full border-blue-500/50 text-blue-400">
              <ExternalLink size={14} className="mr-2" />
              Full API Documentation
            </Button>
          </Card>

          {/* Third-Party Projects */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">🚀 Built on This API</h2>
            <p className="mb-4 text-sm text-slate-400">
              Third-party projects using the Election Companion dataset
            </p>

            <div className="space-y-4">
              {THIRD_PARTY_PROJECTS.map((project, i) => (
                <Card key={i} className="border-slate-600 bg-slate-900/50 p-4">
                  <h3 className="mb-1 font-semibold text-white">{project.name}</h3>
                  <p className="mb-2 text-sm text-slate-400">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{project.users}</span>
                    <Button size="sm" variant="ghost" className="text-blue-400">
                      <ExternalLink size={12} className="mr-1" />
                      View
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <Button variant="outline" className="mt-4 w-full border-purple-500/50 text-purple-400">
              Submit Your Project
            </Button>
          </Card>

          {/* Open Source Components */}
          <Card className="border-slate-700 bg-slate-800/50 p-6 lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold text-white">🔓 Open-Source Components (MIT License)</h2>

            <div className="grid gap-4 lg:grid-cols-3">
              <Card className="border-green-500/30 bg-green-500/10 p-4">
                <h3 className="mb-2 font-semibold text-green-400">Multilingual NLP Pipeline</h3>
                <p className="mb-3 text-sm text-slate-300">
                  Vernacular normalizer for English/Swahili/Sheng code-switching. First of its kind for East African political language.
                </p>
                <div className="mb-2 flex items-center gap-2">
                  <Badge className="bg-green-500/20 text-green-400">MIT License</Badge>
                  <Badge className="bg-slate-500/20 text-slate-400">Python 3.11+</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full border-green-500/50 text-green-400">
                  <Github size={14} className="mr-2" />
                  View on GitHub
                </Button>
              </Card>

              <Card className="border-blue-500/30 bg-blue-500/10 p-4">
                <h3 className="mb-2 font-semibold text-blue-400">Election Misinformation Dataset</h3>
                <p className="mb-3 text-sm text-slate-300">
                  1,240 verified claims with verdicts, sources, and audit trails. Updated live during election cycle.
                </p>
                <div className="mb-2 flex items-center gap-2">
                  <Badge className="bg-blue-500/20 text-blue-400">CC-BY 4.0</Badge>
                  <Badge className="bg-slate-500/20 text-slate-400">Live Updates</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full border-blue-500/50 text-blue-400">
                  <Database size={14} className="mr-2" />
                  Download Dataset
                </Button>
              </Card>

              <Card className="border-purple-500/30 bg-purple-500/10 p-4">
                <h3 className="mb-2 font-semibold text-purple-400">Practitioner Report</h3>
                <p className="mb-3 text-sm text-slate-300">
                  Architecture, methodology, what worked, what failed. For newsrooms and civic technologists building similar systems.
                </p>
                <div className="mb-2 flex items-center gap-2">
                  <Badge className="bg-purple-500/20 text-purple-400">PDF</Badge>
                  <Badge className="bg-slate-500/20 text-slate-400">Month 12</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full border-purple-500/50 text-purple-400">
                  <ExternalLink size={14} className="mr-2" />
                  Read Report
                </Button>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PublicAPIExplorer;
