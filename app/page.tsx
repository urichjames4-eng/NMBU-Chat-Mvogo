"use client";

import { useState, useEffect, useRef } from "react";

type Message = {
  id: number;
  text: string;
  type: string;
  from: "me" | "system";
};

type SearchResult = {
  urichIntro: string;
  correction: string;
  images: string[];
};

const stickerPacks = [
  { id: 1, name: "Meme 237 🔥", preview: ["😂", "🇨🇲", "💪", "😎"], size: "2 Mo" },
  { id: 2, name: "Drague Mvogo 😍", preview: ["❤️", "😘", "🥰", "🔥"], size: "1.8 Mo" },
  { id: 3, name: "Droit L1 ⚖️", preview: ["📚", "⚖️", "👨‍⚖️", "✅"], size: "2.1 Mo" },
  { id: 4, name: "Épée Bois ⚔️", preview: ["⚔️", "🪵", "🔨", "👑"], size: "2.3 Mo" },
];

export default function NMBUChatFinal() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Mvogo présente NMBU CHAT 🇨🇲 Créé par Urich - Je sais où tu vas", type: "mvogo", from: "system" },
  ]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("NMBU");
  const [bg, setBg] = useState("auto");
  const [showStickers, setShowStickers] = useState(false);
  const [inCall, setInCall] = useState(false);
  const [callTime, setCallTime] = useState(0);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    const nextBackground = bg === "auto" ? (hour > 18 ? "#0a1a12" : "#f0fdf4") : "#f0fdf4";
    document.body.style.background = nextBackground;
  }, [bg]);

  useEffect(() => {
    if (inCall) {
      intervalRef.current = window.setInterval(() => {
        setCallTime((current) => {
          if (current >= 10) {
            window.clearInterval(intervalRef.current ?? undefined);
            if (window.confirm("⏱️ 5 min Mvogo - Voir pub pour continuer 10 min? +30F")) {
              window.alert("Pub vue! Mvogo +30F pub-107305635");
              return 0;
            }
            setInCall(false);
            return 0;
          }
          return current + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      setCallTime(0);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [inCall]);

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, type: mode.toLowerCase(), from: "me" },
    ]);

    if (messages.length % 5 === 0) {
      window.alert("📢 Pub Mvogo - pub-107305635 - Tu gagnes!");
    }

    setInput("");
  };

  const handleSearch = () => {
    if (!search.trim()) return;

    setSearchResult({
      urichIntro: `Hi! Moi c'est Urich ton fidèle ami!! 😎 Tu as cherché "${search}"? Je sais où tu vas, laisse-moi t'aider...`,
      correction: `📚 Corrigé MVOGO pour "${search}"\n1. Intro avec accroche 237\n2. Dév. avec exemples\n3. Conclusion Mvogo\n\nAstuce Urich: Retiens 3 mots clés!`,
      images: [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=200",
        "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=200",
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200",
      ],
    });
  };

  return (
    <main className="min-h-screen flex flex-col p-3 max-w-md mx-auto relative">
      <div className="absolute top-1 right-2 text-[9px] font-black text-green-700 opacity-20 tracking-[0.25em]">MVOGO</div>

      <header className="flex justify-between items-center bg-green-800 text-white p-3 rounded-xl shadow-md">
        <div>
          <h1 className="font-black text-base">NMBU CHAT</h1>
          <p className="text-[8px] tracking-[3px] -mt-1">MVOGO EDITION</p>
        </div>

        <div className="flex gap-1">
          <button onClick={() => setInCall(true)} className="bg-white text-green-800 px-3 py-1 rounded-full text-[10px] font-bold">
            📞 Appel
          </button>
          <button onClick={() => setShowStickers((value) => !value)} className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-bold">
            😍 Stickers
          </button>
        </div>
      </header>

      <section className="mt-2 bg-white p-2 rounded-xl shadow border-l-4 border-green-800">
        <div className="flex gap-2">
          <div className="w-7 h-7 bg-green-800 rounded-full flex items-center justify-center text-white font-bold">U</div>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Demande à Urich: épreuve, image..."
            className="flex-1 p-2 border rounded-full text-[11px] outline-none"
          />
          <button onClick={handleSearch} className="bg-green-800 text-white px-3 rounded-full text-[10px] font-bold">
            Urich
          </button>
        </div>

        {searchResult && (
          <div className="mt-2 p-2 bg-green-50 rounded-xl">
            <p className="text-[11px] font-bold text-green-800">{searchResult.urichIntro}</p>
            <p className="mt-1 whitespace-pre-line text-[11px]">{searchResult.correction}</p>
            <div className="flex gap-1 mt-2">
              {searchResult.images.map((img, index) => (
                <img key={index} src={img} alt="" className="w-16 h-16 rounded object-cover border" />
              ))}
            </div>
            <p className="text-[8px] text-right opacity-40 mt-1">MVOGO © URICH - JE SAIS OU TU VAS</p>
          </div>
        )}
      </section>

      <section className="flex-1 mt-2 space-y-1 overflow-y-auto h-[280px]">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 rounded-xl max-w-[85%] text-[11px] ${
              message.from === "me" ? "bg-green-700 text-white ml-auto" : "bg-white shadow"
            }`}
          >
            <span className="text-[7px] font-black opacity-60">{message.type.toUpperCase()} - MVOGO</span>
            <p>{message.text}</p>
          </div>
        ))}
      </section>

      {showStickers && (
        <section className="bg-white p-3 rounded-xl shadow-2xl mt-2 border-2 border-green-800 max-h-[250px] overflow-y-auto">
          <h3 className="font-black text-sm flex justify-between items-center">
            <span>MVOGO STORE</span>
            <button onClick={() => setShowStickers(false)} className="text-xs">X</button>
          </h3>

          {stickerPacks.map((pack) => (
            <div key={pack.id} className="flex justify-between items-center mt-2 p-2 bg-gray-50 rounded-lg gap-2">
              <div>
                <p className="font-bold text-[11px]">{pack.name}</p>
                <p className="text-[9px] opacity-60">{pack.size} - 20 stickers - 100F</p>
                <div className="flex gap-1 mt-1">
                  {pack.preview.map((emoji, index) => (
                    <span key={index} className="text-sm">{emoji}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <button
                  onClick={() => window.alert(`PayUnit Mvogo: Payer 100F pour ${pack.name} - Taille réelle ${pack.size}`)}
                  className="bg-green-800 text-white px-3 py-1 rounded-full text-[9px] font-bold"
                >
                  100F
                </button>
                <button
                  onClick={() => window.alert(`Pub vue! Pack débloqué - Mvogo gagne 20F pub-107305635`)}
                  className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-[8px] font-bold"
                >
                  Pub gratuite
                </button>
              </div>
            </div>
          ))}

          <p className="text-[9px] text-center mt-2 bg-black text-white p-2 rounded">
            💰 Tu gagnes 20F/pub + 100F/achat - 1000/j = 20.000F
          </p>
        </section>
      )}

      <footer className="mt-2 bg-white p-2 rounded-2xl shadow flex flex-col gap-2 border">
        <div className="flex gap-1 text-[10px]">
          <button onClick={() => setMode("NMBU")} className={`px-2 py-1 rounded-full font-bold ${mode === "NMBU" ? "bg-green-800 text-white" : "bg-gray-100"}`}>
            NMBU
          </button>
          <button onClick={() => setMode("SMS")} className={`px-2 py-1 rounded-full font-bold ${mode === "SMS" ? "bg-blue-600 text-white" : "bg-gray-100"}`}>
            SMS
          </button>
          <button onClick={() => setMode("FLASH")} className={`px-2 py-1 rounded-full font-bold ${mode === "FLASH" ? "bg-red-600 text-white" : "bg-gray-100"}`}>
            FLASH
          </button>
          <span className="ml-auto text-[9px] font-black self-center">MVOGO</span>
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={`Via ${mode}...`}
            className="flex-1 p-2 rounded-full bg-gray-100 text-[11px] outline-none"
          />
          <button onClick={sendMessage} className="bg-green-800 text-white px-4 rounded-full text-[11px] font-black">
            MVOGO
          </button>
        </div>
      </footer>

      {inCall && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl text-center">
            <p className="text-4xl">📞</p>
            <p className="font-black">Appel Mvogo par Urich</p>
            <p className="text-xl font-mono">{Math.floor(callTime / 60)}:{String(callTime % 60).padStart(2, "0")}</p>
            <p className="text-[9px] opacity-60">Test à 10 sec, après 5 min en vrai</p>
            <button onClick={() => setInCall(false)} className="mt-4 bg-red-600 text-white px-6 py-2 rounded-full font-bold">
              Raccrocher
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-[7px] mt-2 opacity-30 font-black tracking-[0.3em]">
        MVOGO © 2026 BY URICH MVOGO - JE SAIS OU TU VAS - pub-107305635
      </p>
    </main>
  );
}
