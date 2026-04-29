// PERSONA 1: VOTER INTERFACE (WhatsApp-Style)
// Fact-checking, polling station lookup, manifesto Q&A, live results, multilingual

import { useState, useRef, useEffect } from "react";
import { Send, ArrowLeft, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  time: string;
  buttons?: { label: string; value: string }[];
  verdict?: {
    status: "TRUE" | "FALSE" | "MISLEADING" | "UNVERIFIABLE";
    source: string;
    editor: string;
    timestamp: string;
  };
}

type Language = "english" | "swahili" | "sheng";

const TRANSLATIONS = {
  english: {
    greeting: "🗳️ Habari! Welcome to Kenya 2027 Election Companion.\n\nI help you verify election information, find your polling station, and track results. What can I help with?",
    buttons: ["Fact-Check a Rumor", "Find Polling Station", "Ask About Manifestos", "Live Results", "Report Issue", "Language / Lugha"],
  },
  swahili: {
    greeting: "🗳️ Habari! Karibu kwa Kenya 2027 Election Companion.\n\nNinakusaidia kuthibitisha habari za uchaguzi, kupata kituo chako cha kupiga kura, na kufuatilia matokeo. Naweza kukusaidiaje?",
    buttons: ["Kagua Uvumi", "Tafuta Kituo cha Kura", "Uliza Kuhusu Manifesto", "Matokeo Hai", "Ripoti Tatizo", "Language / Lugha"],
  },
  sheng: {
    greeting: "🗳️ Niaje! Karibu kwa Kenya 2027 Election Companion.\n\nNinakusort na info za uchaguzi, kuspot polling station yako, na kutrack results. Nikusaidie aje?",
    buttons: ["Check Rumor", "Pata Polling Station", "Uliza Manifesto", "Results Live", "Report Shida", "Language / Lugha"],
  },
};

const VoterInterface = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState<Language>("english");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial greeting
    setMessages([
      {
        id: 1,
        text: TRANSLATIONS[language].greeting,
        sender: "bot",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        buttons: TRANSLATIONS[language].buttons.map((label) => ({ label, value: label.toLowerCase() })),
      },
    ]);
  }, [language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response based on input
    setTimeout(() => {
      const botMsg = getBotResponse(text.toLowerCase());
      setMessages((m) => [...m, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): Message => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // Language toggle
    if (input.includes("language") || input.includes("lugha")) {
      return {
        id: Date.now(),
        text: "Select your language / Chagua lugha yako:",
        sender: "bot",
        time,
        buttons: [
          { label: "English", value: "english" },
          { label: "Kiswahili", value: "swahili" },
          { label: "Sheng", value: "sheng" },
        ],
      };
    }

    // Fact-check flow
    if (input.includes("fact") || input.includes("rumor") || input.includes("kagua") || input.includes("uvumi") || input.includes("check")) {
      return {
        id: Date.now(),
        text: "📝 Submit the claim you want me to verify:\n\nYou can:\n• Type the rumor you heard\n• Paste a forwarded message\n• Describe what you saw online\n\nI'll check it against IEBC records, RMS archive, and verified sources.",
        sender: "bot",
        time,
      };
    }

    // Polling station lookup
    if (input.includes("polling") || input.includes("station") || input.includes("kituo") || input.includes("kura") || input.includes("pata")) {
      return {
        id: Date.now(),
        text: "🏢 Polling Station Lookup\n\nEnter your ID number (format: 12345678):\n\nI'll find your assigned polling station, location, and opening hours.\n\n🔒 Privacy: Your ID is only used for lookup, never stored.",
        sender: "bot",
        time,
      };
    }

    // Manifesto Q&A
    if (input.includes("manifesto") || input.includes("party") || input.includes("position")) {
      return {
        id: Date.now(),
        text: "📋 Ask About Party Manifestos\n\nWhat issue do you want to know about?\n\nExamples:\n• Healthcare policy\n• Education funding\n• Devolution\n• Job creation\n• Agriculture support\n\nI'll show you each major party's position.",
        sender: "bot",
        time,
        buttons: [
          { label: "Healthcare", value: "healthcare" },
          { label: "Education", value: "education" },
          { label: "Jobs", value: "jobs" },
          { label: "Agriculture", value: "agriculture" },
        ],
      };
    }

    // Live results
    if (input.includes("results") || input.includes("matokeo") || input.includes("live")) {
      return {
        id: Date.now(),
        text: "📊 Live Results Tracker\n\n⚠️ Results tracker activates on Election Day (August 9, 2027).\n\nOn election day, you'll see:\n• Real-time IEBC tallying\n• Presidential race\n• Gubernatorial races\n• Ward-by-ward breakdown\n\nSource: Official IEBC portal (verified every 5 minutes)\n\nCurrent status: 104 days until election day.",
        sender: "bot",
        time,
      };
    }

    // Example fact-check response (if user typed a claim)
    if (input.length > 20 && !input.includes("polling") && !input.includes("manifesto")) {
      return {
        id: Date.now(),
        text: `🔍 Checking claim...\n\n"${input}"\n\n✅ **VERDICT: FALSE**\n\nThis claim has been debunked. IEBC regulations require polling stations to remain open until the last voter in queue casts their ballot, regardless of the 5 PM closing time.\n\n📄 **Source:** IEBC Electoral Code Section 29(2)\n\n✅ **Verified by:** Jane Wanjiru (RMS Fact-Check Desk)\n📅 **Timestamp:** ${time}\n\n🔗 Full audit trail: claim-4782-verified\n\nWas this helpful?`,
        sender: "bot",
        time,
        verdict: {
          status: "FALSE",
          source: "IEBC Electoral Code Section 29(2)",
          editor: "Jane Wanjiru (RMS Fact-Check Desk)",
          timestamp: time,
        },
        buttons: [
          { label: "Report Where I Saw This", value: "report_source" },
          { label: "Ask Another Question", value: "fact" },
          { label: "Main Menu", value: "menu" },
        ],
      };
    }

    // Main menu
    if (input.includes("menu") || input.includes("main") || input.includes("start")) {
      return {
        id: Date.now(),
        text: TRANSLATIONS[language].greeting,
        sender: "bot",
        time,
        buttons: TRANSLATIONS[language].buttons.map((label) => ({ label, value: label.toLowerCase() })),
      };
    }

    // Healthcare manifesto example
    if (input.includes("healthcare")) {
      return {
        id: Date.now(),
        text: "🏥 Party Positions on Healthcare:\n\n**ODM (Raila Odinga)**\n• Universal Health Coverage (UHC) expansion\n• Free maternal care in all public hospitals\n• NHIF → SHA transition complete\n• Budget: 15% of national budget\n\n**UDA (William Ruto)**\n• Bottom-up healthcare model\n• Community health workers in every ward\n• NHIF expansion to cover 100M Kenyans\n• Budget: 12% of national budget\n\n**Wiper (Kalonzo Musyoka)**\n• County health system strengthening\n• Medical equipment leasing program\n• NHIF premium reduction for low-income\n• Budget: 10% of national budget\n\n📄 Sources: Party manifestos (verified July 2026)\n\nCompare another issue?",
        sender: "bot",
        time,
        buttons: [
          { label: "Education", value: "education" },
          { label: "Jobs", value: "jobs" },
          { label: "Agriculture", value: "agriculture" },
          { label: "Main Menu", value: "menu" },
        ],
      };
    }

    // Default response
    return {
      id: Date.now(),
      text: "I didn't quite catch that. What would you like help with?",
      sender: "bot",
      time,
      buttons: TRANSLATIONS[language].buttons.map((label) => ({ label, value: label.toLowerCase() })),
    };
  };

  const handleButtonClick = (value: string) => {
    // Language selection
    if (value === "english" || value === "swahili" || value === "sheng") {
      setLanguage(value as Language);
      return;
    }

    handleSend(value);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0b141a]">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#202c33] px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="text-slate-300 hover:bg-slate-700"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 text-xl">
          🗳️
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#e9edef]">Election Companion</p>
          <p className="text-xs text-[#8696a0]">{isTyping ? "typing..." : "online"}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleButtonClick("language")}
          className="text-slate-300 hover:bg-slate-700"
        >
          <Globe size={20} />
        </Button>
      </div>

      {/* Language indicator */}
      <div className="bg-[#111b21] px-4 py-2 text-center">
        <span className="text-xs text-slate-400">
          Language: {language === "english" ? "English" : language === "swahili" ? "Kiswahili" : "Sheng"}
        </span>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id}>
              <div className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-sm shadow ${
                    msg.sender === "user"
                      ? "bg-[#005c4b] text-[#e9edef]"
                      : "bg-[#202c33] text-[#e9edef]"
                  }`}
                >
                  {msg.text}
                  <span className="ml-2 inline-block text-[10px] text-[#8696a0]">{msg.time}</span>
                </div>
              </div>

              {/* Verdict card */}
              {msg.verdict && (
                <div className="ml-2 mt-2 max-w-[85%] rounded-lg border border-green-500/30 bg-slate-800/50 p-3">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                        msg.verdict.status === "TRUE"
                          ? "bg-green-500/20 text-green-400"
                          : msg.verdict.status === "FALSE"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {msg.verdict.status}
                    </span>
                    <span className="text-xs text-slate-400">Verified Claim</span>
                  </div>
                  <p className="mb-1 text-xs text-slate-300">
                    <strong>Source:</strong> {msg.verdict.source}
                  </p>
                  <p className="mb-1 text-xs text-slate-300">
                    <strong>Editor:</strong> {msg.verdict.editor}
                  </p>
                  <p className="text-xs text-slate-400">{msg.verdict.timestamp}</p>
                </div>
              )}

              {/* Buttons */}
              {msg.buttons && (
                <div className="ml-2 mt-2 flex flex-wrap gap-2">
                  {msg.buttons.map((btn, i) => (
                    <button
                      key={i}
                      onClick={() => handleButtonClick(btn.value)}
                      className="rounded-full border border-green-500/50 bg-slate-800/50 px-3 py-1.5 text-xs font-medium text-green-400 transition-colors hover:bg-green-500/10"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-lg bg-[#202c33] px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="inline-block h-2 w-2 animate-bounce rounded-full bg-[#8696a0]"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="flex items-center gap-2 bg-[#202c33] px-3 py-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            language === "english"
              ? "Type a message"
              : language === "swahili"
              ? "Andika ujumbe"
              : "Type message"
          }
          className="flex-1 rounded-lg bg-[#2a3942] px-4 py-2 text-sm text-[#e9edef] placeholder-[#8696a0] outline-none"
        />
        <Button
          type="submit"
          size="icon"
          className="h-10 w-10 rounded-full bg-green-500 hover:bg-green-600"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default VoterInterface;
