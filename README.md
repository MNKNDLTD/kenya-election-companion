# Kenya 2027 Election Companion — 4-Persona Demo

**Mozilla Foundation AIxD Incubator Grant Submission**  
**Organization:** MNKND Limited  
**Grant Amount:** $50,000 USD  
**Duration:** 14 months (Jul 2026 – Aug 2027)

---

## Overview

Kenya 2027 Election Companion is a WhatsApp-native, AI-powered civic infrastructure platform that fact-checks election rumors in under 10 seconds, makes party manifestos conversationally accessible in English/Swahili/Sheng, tracks live verified results on election day, and surfaces emerging misinformation trends to civil-society partners 12–24 hours before they peak.

**Target:** 22 million Kenyan voters, especially first-time, rural, and women voters most targeted by misinformation.

**Partnership:** Built alongside Royal Media Services (Kenya's largest media group: Citizen TV, Radio Citizen, 11 vernacular stations), Uraia Trust, and Code for Africa.

---

## 4-Persona Architecture

This demo implements the complete 4-persona system described in the Mozilla grant application:

### **1. VOTER (WhatsApp Interface)**
- Fact-check rumors (submit claim, get verdict in <10 seconds)
- Find polling station (IEBC voter lookup by ID)
- Ask about manifestos (party positions on healthcare, education, jobs, etc.)
- Live results tracker (election day real-time tallying)
- Multilingual support (English, Swahili, Sheng)

**Key Features:**
- Verdict cards with source citations, editor attribution, timestamps
- Multilingual UI toggle (3 language modes)
- WhatsApp-style chat interface
- Example fact-check flow with FALSE/TRUE/MISLEADING verdicts

### **2. NEWSROOM EDITOR (RMS Dashboard)**
- Claim queue (high-priority pending review vs auto-verified)
- Verdict workflow (TRUE/FALSE/MISLEADING/UNVERIFIABLE selection)
- Source citation manager (search RMS archive, IEBC docs)
- Regional correspondent routing (Inooro FM, Ramogi FM, Kameme FM, etc.)
- Editorial sign-off (two-editor rule for FALSE verdicts on candidates)

**Key Features:**
- AI confidence scoring (auto-verify if >80%, route to human if <80%)
- Sensitivity flagging (CRITICAL for election commissioners, vote rigging)
- Editorial audit trail (every verdict logged with cryptographic hash)
- Real-time stats (1,240 claims, 87% auto-verified, 13% human review)

### **3. CIVIL SOCIETY PARTNER (Misinfo Dashboard)**
- Geographic heatmap (47 counties, claim concentration visualization)
- Topical clustering (Vote Rigging 34%, Voter Suppression 23%, etc.)
- Early-warning alerts (12-24 hrs before peak, volume trend analysis)
- Intervention briefs (SMS blast, on-air correction, field team deployment)

**Key Features:**
- County rankings with severity levels (Nairobi 340 claims, Kisumu 280)
- AI topic categorization (5 main rumor types)
- Intervention impact forecasting (50-70% volume reduction, reach calculations)
- Weekly intervention brief (auto-generated for Uraia Trust, Code for Africa)

### **4. PUBLIC API EXPLORER (Open Dataset)**
- Live claim dataset feed (anonymized, CC-BY 4.0 license)
- Interactive playground (try endpoints in browser)
- Verifiable provenance (audit trail, editor signatures, cryptographic hash)
- Third-party forks gallery (shows ecosystem innovation)

**Key Features:**
- 4 API endpoints (all claims, filter by county, filter by topic, verdict provenance)
- Open-source documentation (MIT multilingual NLP, CC-BY 4.0 dataset)
- Third-party project showcase (Kenya Election Tracker, Fact-Check Bot, academic research)

---

## Tech Stack

**Frontend:**
- React 18+ with TypeScript
- Tailwind CSS for styling
- shadcn/ui components (Button, Card, Badge)
- Lucide React icons

**Backend (for production implementation):**
- Supabase (PostgreSQL database)
- WhatsApp Business API (Meta)
- Africa's Talking SMS gateway
- Claude API (Anthropic)

---

## Repository Structure

```
kenya-2027-election-companion/
├── 01-index.tsx                    # Main entry point (role selection screen)
├── 02-voter-interface.tsx          # PERSONA 1: Voter WhatsApp chat
├── 03-newsroom-dashboard.tsx       # PERSONA 2: RMS Editorial dashboard
├── 04-civil-society-dashboard.tsx  # PERSONA 3: Uraia/Code for Africa dashboard
├── 05-public-api-explorer.tsx      # PERSONA 4: Public API documentation
└── README.md                        # This file
```

---

## Running Locally

```bash
# Clone repository
git clone https://github.com/mnknd/kenya-2027-election-companion.git
cd kenya-2027-election-companion

# Install dependencies
npm install

# Required dependencies:
# - react, react-dom
# - typescript
# - tailwindcss
# - lucide-react
# - @/components/ui/* (shadcn/ui components)

# Run development server
npm run dev

# Build production bundle
npm run build
```

**Note:** This is a demonstrative frontend implementation. Production deployment requires backend integration (Supabase, WhatsApp Business API, Claude API).

---

## Grant Submission Checklist

For Mozilla Foundation AIxD Incubator grant reviewers:

- [x] **4-persona architecture** — All personas implemented (Voter, Newsroom, Civil Society, Public API)
- [x] **Fact-checking pipeline** — Visible in Newsroom Dashboard (AI confidence scoring, source citation, editorial workflow)
- [x] **Multilingual support** — English/Swahili/Sheng toggle in Voter interface
- [x] **Editorial integrity** — Two-editor sign-off for FALSE verdicts, audit trail
- [x] **Civil-society coordination** — Geographic heatmaps, early-warning alerts, intervention briefs
- [x] **Open-source commitment** — Public API Explorer shows MIT NLP pipeline, CC-BY 4.0 dataset
- [x] **RMS integration** — Newsroom Dashboard shows Citizen TV/Radio Citizen workflow
- [x] **IEBC integration** — Polling station lookup, electoral code citations
- [x] **Supabase schema** — 10-table database architecture (described below)

---

## Database Schema (Supabase)

**10 tables for production implementation:**

1. **voters** — id, phone_anonymized, county, language_preference
2. **claims** — id, claim_text, claim_hash, submission_count, county, topic_cluster
3. **verdicts** — id, claim_id, verdict, confidence, editor_id, second_editor_id, published_timestamp
4. **sources** — id, verdict_id, source_type, source_url, citation_tier
5. **rms_archive** — id, article_title, article_text, publish_date, outlet
6. **iebc_docs** — id, doc_title, doc_text, doc_type
7. **manifestos** — id, party, topic, position_text
8. **correspondents** — id, name, region, contact, outlet
9. **misinfo_clusters** — id, topic, county, claim_count, peak_time_projected, intervention_status
10. **api_usage** — id, endpoint, caller_id, timestamp

**Inter-Persona Data Flow:**

```
Voter submits claim (WhatsApp)
  → Insert into claims table, check claim_hash for deduplication
  → AI retrieves from rms_archive + iebc_docs + manifestos
  → If AI confidence >80%, auto-publish verdict
  → If AI confidence <80%, route to Newsroom Editor claim queue

Newsroom Editor publishes verdict
  → Update verdicts table with editor signature
  → Voter receives WhatsApp notification with verdict
  → Civil Society dashboard sees new claim in misinfo_clusters
  → Public API exposes new row in /api/v1/claims (anonymized)

Civil Society activates intervention
  → Log intervention in misinfo_clusters.intervention_status
  → SMS blast sent to voters in affected county
  → RMS contacted for on-air correction
```

---

## Mozilla Grant Requirements Met

### **C.1 Technical Architecture ✅**
- Data-first architecture (RMS archive, IEBC docs, manifestos)
- 4-layer verification (RMS → external sources → correspondents → editorial)
- Multilingual normalizer (English/Swahili/Sheng code-switching)
- RAG with source citations (not model memory)

### **C.2 Open-Source Components ✅**
1. Multilingual NLP pipeline (MIT, months 4-6) — shown in API Explorer
2. Election misinformation dataset (live, weekly updates, CC-BY 4.0) — shown in API endpoints
3. Practitioner report (month 12) — shown in API Explorer "Practitioner Report" card

### **C.3 Code Repository ✅**
- This repository contains all 4 personas for Mozilla reviewer evaluation
- Complete architecture visible in code structure
- README documentation included

### **C.4 Critical Dependencies ✅**
- Royal Media Services integration (shown in Newsroom Dashboard)
- Uraia Trust & Code for Africa (shown in Civil Society Dashboard)
- IEBC data (shown in Voter polling station lookup, electoral code citations)
- WhatsApp Business API (shown in Voter interface)

---

## Grant Submission (Mozilla AIxD Incubator)

### **For Grant Reviewers:**

This repository contains the complete 4-persona implementation described in the Mozilla Foundation AIxD Incubator grant application.

**Grant Application Section C.3 (Code Repository):**
- Repository URL: `https://github.com/mnknd/kenya-election-companion`

**What This Repository Demonstrates:**

1. **4-Persona Architecture** — Voter, Newsroom Editor, Civil Society Partner, Public API Explorer
2. **Fact-Checking Pipeline** — AI confidence scoring, source citation, editorial workflow visible in Newsroom Dashboard
3. **Multilingual Support** — English/Swahili/Sheng toggle in Voter interface
4. **Editorial Integrity** — Two-editor sign-off workflow, audit trail, cryptographic hashing
5. **Civil Society Coordination** — Geographic heatmaps, early-warning alerts, intervention briefs
6. **Open-Source Commitment** — MIT NLP pipeline, CC-BY 4.0 dataset, practitioner report (all visible in Public API Explorer)

### **Next Steps (Post-Grant Award):**

If Mozilla awards the $50K grant, the production roadmap is:

1. **Month 1-3:** Supabase database implementation (10 tables), RMS API integration
2. **Month 4-6:** Multilingual NLP pipeline development and MIT open-source release
3. **Month 7-9:** WhatsApp Business API deployment, SMS fallback for rural voters
4. **Month 10-12:** Scale to 200,000+ voter interactions, weekly dataset updates
5. **Month 13-14:** Independent impact evaluation, practitioner report publication

---

## Contact

**Organization:** MNKND Limited  
**Lead:** Allan Mwaniki  
**Email:** allan@mnknd.studio  
**Location:** Nairobi, Kenya

**Partners:**
- Royal Media Services (Citizen TV, Radio Citizen)
- Uraia Trust (47-county voter education network)
- Code for Africa (civic tech, misinformation research)
- IEBC (Independent Electoral and Boundaries Commission)

---

## License

**Code:** MIT License (open-source components)  
**Dataset:** CC-BY 4.0 (election misinformation claims)  
**Platform:** Proprietary (MNKND Limited, commercial sustainability)

---

**Built for Mozilla Foundation AIxD Incubator**  
**Submission Date:** April 2026  
**Election Day:** August 9, 2027
