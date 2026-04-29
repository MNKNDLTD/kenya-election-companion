// PERSONA 3: CIVIL SOCIETY DASHBOARD
// Uraia Trust & Code for Africa - Geographic heatmaps, early-warning alerts, intervention briefs

import { useState } from "react";
import { ArrowLeft, AlertTriangle, TrendingUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MisinfoCluster {
  id: number;
  topic: string;
  volume: number;
  trend: number; // percentage change
  counties: string[];
  peak: string;
  severity: "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  intervention?: string;
}

const MOCK_CLUSTERS: MisinfoCluster[] = [
  {
    id: 3,
    topic: "Vote Rigging (IEBC Commissioner Arrest)",
    volume: 340,
    trend: 420,
    counties: ["Kisumu", "Siaya", "Homa Bay"],
    peak: "10:00 PM (1 hr 15 min from now)",
    severity: "CRITICAL",
  },
  {
    id: 2,
    topic: "Voter Suppression (Early Polling Station Closures)",
    volume: 280,
    trend: 180,
    counties: ["Nairobi", "Kiambu", "Machakos"],
    peak: "9:30 PM (45 min from now)",
    severity: "HIGH",
  },
  {
    id: 1,
    topic: "Fake Results (Premature Victory Claims)",
    volume: 120,
    trend: 85,
    counties: ["Multiple"],
    peak: "11:00 PM (2 hrs from now)",
    severity: "MODERATE",
    intervention: "Proactive IEBC statement scheduled",
  },
];

const COUNTY_DATA = [
  { name: "Nairobi", claims: 340, severity: "HIGH" },
  { name: "Kisumu", claims: 280, severity: "CRITICAL" },
  { name: "Mombasa", claims: 180, severity: "HIGH" },
  { name: "Nakuru", claims: 45, severity: "MODERATE" },
  { name: "Kiambu", claims: 38, severity: "MODERATE" },
  { name: "Kakamega", claims: 32, severity: "MODERATE" },
];

const TOPIC_CATEGORIES = [
  { name: "Vote Rigging", claims: 420, percentage: 34 },
  { name: "Voter Suppression", claims: 280, percentage: 23 },
  { name: "Candidate Health", claims: 180, percentage: 15 },
  { name: "Fake Results", claims: 120, percentage: 10 },
  { name: "Electoral Violence", claims: 90, percentage: 7 },
];

const CivilSocietyDashboard = ({ onBack }: { onBack: () => void }) => {
  const [selectedCluster, setSelectedCluster] = useState<MisinfoCluster | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "HIGH":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "MODERATE":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "LOW":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  if (selectedCluster) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6 flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedCluster(null)}
              className="text-slate-300 hover:bg-slate-800"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <div className="mb-4">
              <Badge className={getSeverityColor(selectedCluster.severity)}>{selectedCluster.severity}</Badge>
            </div>

            <h2 className="mb-6 text-2xl font-bold text-white">Cluster #{selectedCluster.id}: {selectedCluster.topic}</h2>

            <div className="mb-6 grid grid-cols-2 gap-4 border-b border-slate-700 pb-6">
              <div>
                <p className="mb-1 text-sm text-slate-400">Current Volume</p>
                <p className="text-3xl font-bold text-white">{selectedCluster.volume}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-slate-400">Volume Trend (2 hrs)</p>
                <p className="flex items-center gap-2 text-3xl font-bold text-red-400">
                  <TrendingUp size={24} />↑ {selectedCluster.trend}%
                </p>
              </div>
              <div>
                <p className="mb-1 text-sm text-slate-400">Projected Peak</p>
                <p className="text-lg text-white">{selectedCluster.peak}</p>
              </div>
              <div>
                <p className="mb-1 text-sm text-slate-400">Geographic Concentration</p>
                <p className="text-lg text-white">{selectedCluster.counties.join(", ")}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="mb-3 text-lg font-bold text-white">Recommended Intervention</h3>
              <div className="space-y-3">
                <Card className="border-purple-500/30 bg-purple-500/10 p-4">
                  <p className="mb-1 font-semibold text-purple-400">📱 SMS Blast Debunk</p>
                  <p className="text-sm text-slate-300">
                    Send SMS correction to 12,000 voters in Kisumu, Siaya, Homa Bay (Uraia voter database)
                  </p>
                  <Button className="mt-3 bg-purple-500 hover:bg-purple-600" size="sm">
                    Activate SMS Campaign
                  </Button>
                </Card>

                <Card className="border-blue-500/30 bg-blue-500/10 p-4">
                  <p className="mb-1 font-semibold text-blue-400">📻 On-Air Correction</p>
                  <p className="text-sm text-slate-300">
                    Coordinate with RMS for immediate on-air debunk (Radio Ramogi - Nyanza coverage)
                  </p>
                  <Button className="mt-3 bg-blue-500 hover:bg-blue-600" size="sm">
                    Contact RMS Newsroom
                  </Button>
                </Card>

                <Card className="border-green-500/30 bg-green-500/10 p-4">
                  <p className="mb-1 font-semibold text-green-400">🚶 Field Team Deployment</p>
                  <p className="text-sm text-slate-300">
                    Deploy Uraia voter-education teams to 4 high-concentration wards in Kisumu County
                  </p>
                  <Button className="mt-3 bg-green-500 hover:bg-green-600" size="sm">
                    Deploy Field Teams
                  </Button>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="mb-3 text-lg font-bold text-white">Intervention Impact Forecast</h3>
              <div className="rounded-lg bg-slate-900/50 p-4">
                <p className="mb-2 text-sm text-slate-300">
                  <strong>Expected Outcome:</strong> Claim volume reduction 50-70% within 1-2 hours
                </p>
                <p className="mb-2 text-sm text-slate-300">
                  <strong>Reach:</strong> 12,000 voters (SMS) + 240,000 listeners (Radio Ramogi) + 2,000 in-person (field teams)
                </p>
                <p className="text-sm text-slate-300">
                  <strong>Cost:</strong> KES 36,000 (SMS) + KES 0 (Radio airtime donated) + KES 8,000 (field transport) = KES 44,000 total
                </p>
              </div>
            </div>
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
            <h1 className="text-3xl font-bold text-white">Misinfo Intelligence Dashboard</h1>
            <p className="text-slate-400">Uraia Trust · Code for Africa</p>
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-300">
            <Download size={16} className="mr-2" />
            Export Weekly Brief
          </Button>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-4 gap-4">
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Claims Today</p>
            <p className="text-3xl font-bold text-white">1,240</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Counties Mapped</p>
            <p className="text-3xl font-bold text-white">47</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Active Clusters</p>
            <p className="text-3xl font-bold text-orange-400">8</p>
          </Card>
          <Card className="border-slate-700 bg-slate-800/50 p-4">
            <p className="mb-1 text-sm text-slate-400">Hrs to Next Peak</p>
            <p className="text-3xl font-bold text-red-400">1.2</p>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Geographic Heatmap */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">🗺️ Geographic Heatmap</h2>
            <p className="mb-4 text-sm text-slate-400">Rumor concentration by county</p>

            <div className="mb-6 h-64 rounded-lg bg-slate-900/50 p-4">
              <div className="flex h-full items-center justify-center text-slate-500">
                [Interactive Kenya Map - Counties Color-Coded by Claim Volume]
              </div>
            </div>

            <div className="space-y-2">
              <p className="mb-2 text-sm font-semibold text-white">County Rankings:</p>
              {COUNTY_DATA.map((county, i) => (
                <div key={county.name} className="flex items-center justify-between rounded-lg bg-slate-900/50 p-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-400">#{i + 1}</span>
                    <span className="text-sm font-semibold text-white">{county.name}</span>
                    <Badge className={getSeverityColor(county.severity)} size="sm">
                      {county.severity}
                    </Badge>
                  </div>
                  <span className="text-lg font-bold text-white">{county.claims}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Topical Clustering */}
          <Card className="border-slate-700 bg-slate-800/50 p-6">
            <h2 className="mb-4 text-xl font-bold text-white">📊 Topical Clustering</h2>
            <p className="mb-4 text-sm text-slate-400">AI-identified rumor categories</p>

            <div className="space-y-3">
              {TOPIC_CATEGORIES.map((topic, i) => (
                <div key={topic.name}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">
                      {i + 1}. {topic.name}
                    </span>
                    <span className="text-sm text-slate-400">
                      {topic.claims} claims ({topic.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className={`h-full ${
                        i === 0
                          ? "bg-red-500"
                          : i === 1
                          ? "bg-orange-500"
                          : i === 2
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${topic.percentage * 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
              <p className="mb-2 text-sm font-semibold text-blue-400">📈 Trend Analysis</p>
              <p className="text-sm text-slate-300">
                "Vote Rigging" claims up 420% in last 2 hours — geographic concentration in Nyanza region. Early
                intervention recommended.
              </p>
            </div>
          </Card>

          {/* Early Warning Alerts */}
          <Card className="border-slate-700 bg-slate-800/50 p-6 lg:col-span-2">
            <h2 className="mb-4 text-xl font-bold text-white">🚨 Early-Warning Alerts (12-24 Hrs to Peak)</h2>

            <div className="space-y-4">
              {MOCK_CLUSTERS.map((cluster) => (
                <Card
                  key={cluster.id}
                  className="cursor-pointer border-slate-600 bg-slate-900/50 p-4 transition-all hover:border-slate-500"
                  onClick={() => setSelectedCluster(cluster)}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="text-orange-400" size={20} />
                      <h3 className="font-semibold text-white">{cluster.topic}</h3>
                    </div>
                    <Badge className={getSeverityColor(cluster.severity)}>{cluster.severity}</Badge>
                  </div>

                  <div className="mb-3 grid grid-cols-4 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">Volume</p>
                      <p className="font-bold text-white">{cluster.volume}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Trend (2 hrs)</p>
                      <p className="font-bold text-red-400">↑ {cluster.trend}%</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Peak ETA</p>
                      <p className="font-bold text-white">{cluster.peak}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Counties</p>
                      <p className="font-bold text-white">{cluster.counties.length}</p>
                    </div>
                  </div>

                  {cluster.intervention ? (
                    <div className="rounded-lg bg-green-500/10 px-3 py-2 text-sm text-green-400">
                      ✅ {cluster.intervention}
                    </div>
                  ) : (
                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                      Activate Intervention
                    </Button>
                  )}
                </Card>
              ))}
            </div>
          </Card>
        </div>

        {/* Weekly Brief Preview */}
        <Card className="mt-6 border-slate-700 bg-slate-800/50 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">📝 This Week's Intervention Brief (Aug 2-9, 2027)</h2>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-lg bg-slate-900/50 p-4">
              <p className="mb-2 text-2xl font-bold text-white">8</p>
              <p className="text-sm text-slate-400">Clusters Identified</p>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-4">
              <p className="mb-2 text-2xl font-bold text-green-400">5</p>
              <p className="text-sm text-slate-400">Interventions Activated</p>
            </div>
            <div className="rounded-lg bg-slate-900/50 p-4">
              <p className="mb-2 text-2xl font-bold text-blue-400">47,000</p>
              <p className="text-sm text-slate-400">Voters Reached (SMS + Radio + Field)</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <p className="mb-1 font-semibold text-green-400">✅ Intervention #1: Vote Rigging (Nairobi)</p>
              <p className="text-sm text-slate-300">
                SMS blast to 18,000 voters + Citizen TV on-air debunk → Claim volume dropped 68% within 2 hours
              </p>
            </div>
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <p className="mb-1 font-semibold text-green-400">✅ Intervention #2: Voter Suppression (Kisumu)</p>
              <p className="text-sm text-slate-300">
                Field teams deployed + Radio Ramogi correction → Claim volume dropped 52% within 1 hour
              </p>
            </div>
          </div>

          <Button variant="outline" className="mt-4 border-blue-500/50 text-blue-400">
            <Download size={16} className="mr-2" />
            Download Full Weekly Brief
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default CivilSocietyDashboard;
