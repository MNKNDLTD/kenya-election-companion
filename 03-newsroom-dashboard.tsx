// PERSONA 2: NEWSROOM EDITOR DASHBOARD
// Royal Media Services editorial control center - claim triage, verdict workflow, audit trail

import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Claim {
  id: number;
  text: string;
  submissions: number;
  county: string;
  timestamp: string;
  aiConfidence: number;
  sensitivity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "pending" | "verified" | "escalated";
  verdict?: "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE";
  sources?: string[];
  editor?: string;
}

const MOCK_CLAIMS: Claim[] = [
  {
    id: 4782,
    text: "IEBC commissioners arrested for vote rigging in Kisumu",
    submissions: 340,
    county: "Nyanza",
    timestamp: "8:42 PM",
    aiConfidence: 32,
    sensitivity: "CRITICAL",
    status: "pending",
  },
  {
    id: 4781,
    text: "Raila Odinga conceded at 8:30 PM",
    submissions: 12,
    county: "Nairobi",
    timestamp: "8:38 PM",
    aiConfidence: 18,
    sensitivity: "CRITICAL",
    status: "pending",
  },
  {
    id: 4780,
    text: "Polling stations close at 5 PM",
    submissions: 8,
    county: "Multiple",
    timestamp: "8:35 PM",
    aiConfidence: 98,
    sensitivity: "MEDIUM",
    status: "verified",
    verdict: "FALSE",
    sources: ["IEBC Electoral Code Section 29(2)"],
    editor: "System Auto-Verified",
  },
  {
    id: 4779,
    text: "You can vote with a photocopy of your ID",
    submissions: 24,
    county: "Central",
    timestamp: "8:30 PM",
    aiConfidence: 95,
    sensitivity: "HIGH",
    status: "verified",
    verdict: "FALSE",
    sources: ["IEBC Voter Guidelines 2027"],
    editor: "System Auto-Verified",
  },
];

const NewsroomDashboard = ({ onBack }: { onBack: () => void }) => {
  const [claims] = useState<Claim[]>(MOCK_CLAIMS);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [verdictDraft, setVerdictDraft] = useState<"TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE" | null>(null);

  const pendingClaims = claims.filter((c) => c.status === "pending");
  const verifiedClaims = claims.filter((c) => c.status === "verified");
  const autoVerified = verifiedClaims.filter((c) => c.editor?.includes("Auto"));

  const getSensitivityColor = (sensitivity: Claim["sensitivity"]) => {
    switch (sensitivity) {
      case "CRITICAL":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "HIGH":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW":
        return "bg-green-500/20 text-green-400 border-green-500/30";
    }
  };

  const getVerdictIcon = (verdict?: Claim["verdict"]) => {
    switch (verdict) {
      case "TRUE":
        return <CheckCircle className="text-green-400" size={16} />;
      case "FALSE":
        return <XCircle className="text-red-400" size={16} />;
      case "MISLEADING":
        return <AlertTriangle className="text-yellow-400" size={16} />;
      default:
        return <Clock className="text-slate-400" size={16} />;
    }
  };

  if (selectedClaim) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedClaim(null)}
              className="text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Queue
            </Button>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">Claim #{selectedClaim.id} — Editorial Review</h2>
              <p className="text-sm text-slate-400">RMS Fact-Check Desk · Citizen TV</p>
            </div>
          </div>

          {/* Claim Details */}
          <Card className="mb-6 border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-4">
              <Badge className={getSensitivityColor(selectedClaim.sensitivity)}>
                {selectedClaim.sensitivity} SENSITIVITY
              </Badge>
            </div>

            <h3 className="mb-4 text-xl font-bold text-white">Claim Text:</h3>
            <p className="mb-6 text-lg text-slate-200">"{selectedClaim.text}"</p>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-700 pt-4">
              <div>
                <p className="text-sm text-slate-400">Submissions</p>
                <p className="text-2xl font-bold text-white">{selectedClaim.submissions}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">AI Confidence</p>
                <p className="text-2xl font-bold text-white">{selectedClaim.aiConfidence}%</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Geographic</p>
                <p className="text-lg text-white">{selectedClaim.county}</p>
              </div>
              <div>
                <p className="text-sm text-slate-400">Timestamp</p>
                <p className="text-lg text-white">{selectedClaim.timestamp}</p>
              </div>
            </div>
          </Card>

          {/* AI Analysis */}
          <Card className="mb-6 border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-4 text-lg font-bold text-white">AI Analysis</h3>
            <div className="mb-4 rounded-lg bg-slate-900/50 p-4">
              <p className="mb-2 text-sm text-slate-300">
                <strong>Confidence:</strong> {selectedClaim.aiConfidence}% (
                {selectedClaim.aiConfidence > 80 ? "HIGH" : "LOW"})
              </p>
              <p className="mb-2 text-sm text-slate-300">
                <strong>Reason:</strong> No official statement found in:
              </p>
              <ul className="ml-6 list-disc text-sm text-slate-400">
                <li>RMS archive (Citizen TV/Radio Citizen/Citizen Digital)</li>
                <li>IEBC bulletins</li>
                <li>Verified social media accounts</li>
                <li>Africa Check database</li>
              </ul>
            </div>

            <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-4">
              <p className="font-semibold text-orange-400">⚠️ Recommended Action:</p>
              <p className="mt-1 text-sm text-slate-300">
                HUMAN VERIFICATION REQUIRED — Route to RMS political correspondent for direct confirmation
              </p>
            </div>
          </Card>

          {/* Verdict Workflow */}
          <Card className="mb-6 border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Your Verdict</h3>

            <div className="mb-4 grid grid-cols-4 gap-2">
              {(["TRUE", "FALSE", "MISLEADING", "UNVERIFIABLE"] as const).map((v) => (
                <Button
                  key={v}
                  variant={verdictDraft === v ? "default" : "outline"}
                  onClick={() => setVerdictDraft(v)}
                  className={
                    verdictDraft === v
                      ? v === "TRUE"
                        ? "bg-green-500 hover:bg-green-600"
                        : v === "FALSE"
                        ? "bg-red-500 hover:bg-red-600"
                        : v === "MISLEADING"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-slate-500 hover:bg-slate-600"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700"
                  }
                >
                  {v}
                </Button>
              ))}
            </div>

            {verdictDraft && (
              <>
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Source Citations (Required for FALSE/MISLEADING verdicts)
                  </label>
                  <textarea
                    placeholder="Add sources that support your verdict (e.g., IEBC Electoral Code Section X, RMS Archive, Africa Check)"
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-3 text-sm text-slate-200 placeholder-slate-500"
                    rows={3}
                  />
                  <div className="mt-2 flex gap-2">
                    <Button variant="outline" size="sm" className="text-slate-300">
                      Search RMS Archive
                    </Button>
                    <Button variant="outline" size="sm" className="text-slate-300">
                      Search IEBC Docs
                    </Button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2 block text-sm font-semibold text-white">
                    Editorial Note (Internal)
                  </label>
                  <textarea
                    placeholder="Why did you reach this verdict? (Internal notes for audit trail)"
                    className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-3 text-sm text-slate-200 placeholder-slate-500"
                    rows={2}
                  />
                </div>

                {verdictDraft === "FALSE" && (
                  <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                    <p className="mb-2 font-semibold text-red-400">
                      ⚠️ Two-Editor Sign-Off Required (FALSE verdict on candidate)
                    </p>
                    <p className="mb-3 text-sm text-slate-300">
                      RMS policy requires a second editor to approve FALSE verdicts on candidate-specific claims.
                    </p>
                    <Button variant="outline" size="sm" className="border-red-500/50 text-red-400">
                      Request Peter Kamau Approval
                    </Button>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="bg-blue-500 hover:bg-blue-600">Publish Verdict</Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    Save Draft
                  </Button>
                  <Button variant="outline" className="border-orange-500/50 text-orange-400">
                    Escalate to Managing Editor
                  </Button>
                </div>
              </>
            )}
          </Card>

          {/* Regional Correspondent Routing */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h3 className="mb-4 text-lg font-bold text-white">Route to Regional Correspondent</h3>
            <p className="mb-4 text-sm text-slate-300">
              For claims that need on-ground verification (e.g., polling station incidents, local rallies), route to
              RMS regional correspondent for direct confirmation.
            </p>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold text-white">Select Correspondent</label>
              <select className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-2 text-sm text-slate-200">
                <option>Inooro FM (Central Region)</option>
                <option>Ramogi FM (Nyanza Region)</option>
                <option>Kameme FM (Mt Kenya Region)</option>
                <option>Mulembe FM (Western Region)</option>
                <option>Bahari FM (Coast Region)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="mb-2 block text-sm font-semibold text-white">Deadline</label>
              <select className="w-full rounded-lg border border-slate-600 bg-slate-900/50 p-2 text-sm text-slate-200">
                <option>Urgent: 15 minutes</option>
                <option>Standard: 1 hour</option>
                <option>Low Priority: 4 hours</option>
              </select>
            </div>

            <Button variant="outline" className="border-blue-500/50 text-blue-400">
              Send to Correspondent
            </Button>
          </Card>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl font-bold text-white">RMS Editorial Dashboard</h1>
            <p className="text-slate-400">Citizen TV · Radio Citizen · Citizen Digital</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 animate-pulse rounded-full bg-red-500"></span>
            <span className="text-sm text-slate-300">LIVE (Election Day - August 9, 2027)</span>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Claims Today</p>
            <p className="text-3xl font-bold text-white">1,240</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Auto-Verified</p>
            <p className="text-3xl font-bold text-green-400">87%</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Human Review</p>
            <p className="text-3xl font-bold text-orange-400">13%</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Errors</p>
            <p className="text-3xl font-bold text-green-400">0</p>
          </Card>
        </div>

        {/* Claim Queue */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* High Priority */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">🔴 High Priority ({pendingClaims.length})</h2>
            <p className="mb-4 text-sm text-slate-400">Requires Human Review</p>

            <div className="space-y-3">
              {pendingClaims.map((claim) => (
                <Card
                  key={claim.id}
                  className="cursor-pointer border-slate-600 bg-slate-900/50 p-4 transition-all hover:border-slate-500 hover:bg-slate-900"
                  onClick={() => setSelectedClaim(claim)}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <Badge className={getSensitivityColor(claim.sensitivity)}>{claim.sensitivity}</Badge>
                    <span className="text-xs text-slate-500">#{claim.id}</span>
                  </div>

                  <p className="mb-3 text-sm font-semibold text-white">{claim.text}</p>

                  <div className="mb-2 grid grid-cols-3 gap-2 text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500">Submissions:</span> {claim.submissions}
                    </div>
                    <div>
                      <span className="text-slate-500">County:</span> {claim.county}
                    </div>
                    <div>
                      <span className="text-slate-500">AI:</span> {claim.aiConfidence}%
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 border-blue-500/50 text-blue-400">
                      Review Claim
                    </Button>
                    <Button size="sm" variant="outline" className="border-orange-500/50 text-orange-400">
                      Escalate
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Auto-Verified */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">🟢 Auto-Verified ({autoVerified.length})</h2>
            <p className="mb-4 text-sm text-slate-400">Published to Voters</p>

            <div className="space-y-3">
              {verifiedClaims.map((claim) => (
                <Card key={claim.id} className="border-slate-600 bg-slate-900/50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getVerdictIcon(claim.verdict)}
                      <Badge
                        className={
                          claim.verdict === "FALSE"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-green-500/20 text-green-400"
                        }
                      >
                        {claim.verdict}
                      </Badge>
                    </div>
                    <span className="text-xs text-slate-500">#{claim.id}</span>
                  </div>

                  <p className="mb-2 text-sm font-semibold text-white">{claim.text}</p>

                  <div className="text-xs text-slate-400">
                    <p className="mb-1">
                      <span className="text-slate-500">Source:</span> {claim.sources?.[0]}
                    </p>
                    <p>
                      <span className="text-slate-500">Editor:</span> {claim.editor}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NewsroomDashboard;
