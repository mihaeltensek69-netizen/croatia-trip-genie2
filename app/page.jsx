// @ts-nocheck
"use client";

import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, MapPin, Ship, Hotel, Calendar, MessageCircleMore, ArrowRight, CheckCircle2, Mail, Euro, Sparkles, Fax, ExternalLink } from "lucide-react";
import Button from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input, Textarea } from "../components/ui/Input";

/**
 * Croatia Trip Genie — full landing page
 * Works out-of-the-box with /api/chat as the chatbot endpoint.
 */

// -----------------
// QUICK CONFIG AREA
// -----------------
const CHAT_API_URL = "/api/chat"; // already wired to serverless route

// Affiliate links — replace with your tracking links TODAY to start earning
const AFFILIATE_HOTELS = "https://www.booking.com/index.html?aid=YOUR_AID"; // Booking.com or preferred OTA
const AFFILIATE_TOURS = "https://www.getyourguide.com/-l169/?partner_id=YOUR_PID"; // GetYourGuide example
const AFFILIATE_FERRIES = "https://www.directferries.com/croatia.htm?ref=YOUR_REF"; // Ferry aggregator example

// Lead capture — paste your Formspree URL or Google Forms endpoint (POST). If empty, a hint will show.
const LEAD_FORM_ACTION = ""; // e.g. https://formspree.io/f/xxxxxx

// -----------------
// UTILITIES
// -----------------
const cities = [
  "Dubrovnik",
  "Split",
  "Zadar",
  "Šibenik",
  "Trogir",
  "Zagreb",
  "Pula",
  "Rovinj",
  "Hvar",
  "Korčula",
  "Vis",
  "Krk",
  "Pag",
  "Brač",
];

const tags = [
  "hidden beaches",
  "island hopping",
  "wine & oysters",
  "UNESCO old towns",
  "national parks",
  "sea kayaking",
  "foodie tour",
  "family friendly",
  "nightlife",
  "history & culture",
];

function randomPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function synthPlan(days, baseCity) {
  const dayPlans = [];
  for (let d = 1; d <= days; d++) {
    const city = Math.random() < 0.6 ? baseCity : randomPick(cities);
    const spice = randomPick(tags);
    dayPlans.push({
      title: `Day ${d}: ${city}`,
      details: `Morning: espresso & pastry in the old town. Midday: ${spice}. Afternoon: swim at a nearby cove. Sunset: viewpoint walk. Dinner: local konoba with seafood.`,
    });
  }
  return dayPlans;
}

async function callChatAPI(message) {
  const res = await fetch(CHAT_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: [{ role: "user", content: message }] }),
  });
  if (!res.ok) {
    return {
      role: "assistant",
      content: "I had trouble reaching the chat service. Make sure you set your OPENAI_API_KEY in Vercel.",
    };
  }
  return await res.json();
}

export default function CroatiaTripGenie() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-800">
      <Hero />
      <MonetizeRow />
      <ItineraryGenerator />
      <ChatbotPanel />
      <HostSaaS />
      <FAQ />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-6xl px-6 pt-16 pb-8"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Croatia Trip Genie <span className="text-blue-600">AI</span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-600">
              Personalized plans for travelers • 24/7 chatbot • Instant booking links. Start earning today via affiliates & host subscriptions.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="px-5 h-11" href="#plan">
                <Sparkles className="mr-2 h-4 w-4" /> Generate Plan
              </Button>
              <Button variant="secondary" className="px-5 h-11" href="#book">
                <Euro className="mr-2 h-4 w-4" /> Start Earning
              </Button>
            </div>
            <ul className="mt-6 space-y-2 text-slate-600">
              {[
                "Affiliate-ready: Hotels, Tours, Ferries",
                "Works today; just add your OpenAI key on Vercel",
                "Host chatbot lead-gen for recurring revenue",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <Card className="rounded-2xl shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5" /> Live Demo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Try a quick chat and generate a 3-day plan. Booking buttons use your affiliate IDs.
                </p>
                <DemoStrip />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function DemoStrip() {
  return (
    <div className="grid sm:grid-cols-3 gap-3" id="book">
      <a className="flex items-center justify-between rounded-2xl border p-4 hover:shadow-md transition" href={AFFILIATE_HOTELS} target="_blank" rel="noreferrer">
        <div className="flex items-center gap-3">
          <Hotel className="h-5 w-5" /> Hotels
        </div>
        <ExternalLink className="h-4 w-4" />
      </a>
      <a className="flex items-center justify-between rounded-2xl border p-4 hover:shadow-md transition" href={AFFILIATE_TOURS} target="_blank" rel="noreferrer">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5" /> Tours
        </div>
        <ExternalLink className="h-4 w-4" />
      </a>
      <a className="flex items-center justify-between rounded-2xl border p-4 hover:shadow-md transition" href={AFFILIATE_FERRIES} target="_blank" rel="noreferrer">
        <div className="flex items-center gap-3">
          <Ship className="h-5 w-5" /> Ferries
        </div>
        <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

function MonetizeRow() {
  return (
    <section className="mx-auto max-w-6xl px-6 mt-10">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: <Hotel className="h-6 w-6" />,
            title: "Affiliate — Hotels",
            body: "Paste your Booking/Agoda link to earn on stays across Croatia.",
            href: AFFILIATE_HOTELS,
          },
          {
            icon: <MapPin className="h-6 w-6" />,
            title: "Affiliate — Tours",
            body: "Link GetYourGuide/Viator for commissions on activities.",
            href: AFFILIATE_TOURS,
          },
          {
            icon: <Ship className="h-6 w-6" />,
            title: "Affiliate — Ferries",
            body: "Earn from island-hopping bookings via ferry affiliates.",
            href: AFFILIATE_FERRIES,
          },
        ].map((c) => (
          <Card key={c.title} className="rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">{c.icon} {c.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">{c.body}</p>
              <Button variant="secondary" href={c.href} className="rounded-2xl">
                Open <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ItineraryGenerator() {
  const [days, setDays] = useState(3);
  const [city, setCity] = useState("Split");
  const plan = useMemo(() => synthPlan(days, city), [days, city]);

  return (
    <section id="plan" className="mx-auto max-w-6xl px-6 mt-14">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" /> Build a quick plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-3 items-end">
            <div className="md:col-span-2">
              <label className="text-sm text-slate-600">Base city</label>
              <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. Split" />
            </div>
            <div className="md:col-span-1">
              <label className="text-sm text-slate-600">Days</label>
              <Input type="number" min={1} max={14} value={days} onChange={(e) => setDays(parseInt(e.target.value || "1"))} />
            </div>
            <div className="md:col-span-2 flex gap-2">
              <Button href={AFFILIATE_HOTELS} className="w-full">
                <Hotel className="mr-2 h-4 w-4" /> Find stays
              </Button>
              <Button variant="secondary" href={AFFILIATE_TOURS} className="w-full">
                <MapPin className="mr-2 h-4 w-4" /> Book tours
              </Button>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-3">
            {plan.map((d) => (
              <div key={d.title} className="rounded-2xl border p-4 bg-white">
                <h3 className="font-semibold">{d.title}</h3>
                <p className="text-slate-600 mt-2 text-sm">{d.details}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function ChatbotPanel() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Dobrodošli! How can I help plan your Croatia trip today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const ai = await callChatAPI(userMsg.content);
      setMessages((m) => [...m, ai]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I had trouble reaching the chat service. Check your API key." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), 0);
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircleMore className="h-5 w-5" /> AI Chat (Live)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-2xl border p-4 h-72 overflow-y-auto bg-white">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
                <div className={`inline-block max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "user" ? "bg-blue-50" : "bg-slate-50"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about beaches, ferries, islands, food…"
            />
            <Button onClick={send}>
              Send <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            If chat fails, add your OpenAI key in Vercel → Settings → Environment Variables → <code>OPENAI_API_KEY</code>.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}

function HostSaaS() {
  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fax className="h-5 w-5" /> Chatbot for Airbnb Hosts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600 mb-4">
              Rent a WhatsApp/Website bot that answers guest FAQs (check-in, Wi‑Fi, parking, beaches) and shares your city tips. You charge hosts monthly — recurring revenue for you.
            </p>
            <ul className="text-slate-600 space-y-2 mb-4 text-sm">
              {[
                "€39/month per listing",
                "Auto replies 24/7 in EN/HR/DE/IT",
                "Upsell tours with your affiliate links",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-600" />{t}
                </li>
              ))}
            </ul>
            <HostLeadForm />
          </CardContent>
        </Card>
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>How to wire real AI (already done)</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600 text-sm">
              <li>A serverless function is included at <strong>/api/chat</strong>.</li>
              <li>Set your secret key in Vercel as <code>OPENAI_API_KEY</code>.</li>
              <li>That’s it — the chat on this page will reply using AI.</li>
            </ol>
            <p className="text-xs text-slate-500 mt-3">You can earn from affiliate links and host leads now.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function HostLeadForm() {
  return (
    <form
      method="POST"
      action={LEAD_FORM_ACTION || "#"}
      onSubmit={(e) => {
        if (!LEAD_FORM_ACTION) {
          e.preventDefault();
          alert("Add your Formspree/Google Forms endpoint to LEAD_FORM_ACTION in the config section at the top of this page.");
        }
      }}
      className="grid sm:grid-cols-2 gap-3"
    >
      <Input name="name" required placeholder="Your name" />
      <Input type="email" name="email" required placeholder="Email" />
      <Input name="property" placeholder="Property/Listing URL" className="sm:col-span-2" />
      <Textarea name="message" placeholder="Tell us your biggest guest pain points…" className="sm:col-span-2" />
      <Button type="submit" className="sm:col-span-2">
        <Mail className="mr-2 h-4 w-4" /> Request demo
      </Button>
    </form>
  );
}

function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-6 mt-14">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            q: "How do I earn today?",
            a: "Replace the affiliate links, deploy, and share your site in traveler Facebook groups, Reddit, and Google Maps lists. Add QR codes in local cafes (with permission).",
          },
          {
            q: "Is this really AI?",
            a: "Yes. The chat panel calls your /api/chat route which talks to OpenAI. Add your API key in Vercel.",
          },
          {
            q: "What markets does this cover?",
            a: "English by default; the copy is Croatia‑focused. You can adapt text to German/Italian quickly for summer visitors.",
          },
        ].map((f) => (
          <Card key={f.q} className="rounded-2xl">
            <CardHeader><CardTitle>{f.q}</CardTitle></CardHeader>
            <CardContent><p className="text-slate-600 text-sm">{f.a}</p></CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 mt-16 pb-16 text-sm text-slate-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="flex items-center gap-2"><Bot className="h-4 w-4" /> Croatia Trip Genie © {new Date().getFullYear()}</p>
        <div className="flex items-center gap-4">
          <a href="#plan" className="hover:underline">Plan</a>
          <a href="#book" className="hover:underline">Book</a>
          <a href="#" className="hover:underline">Privacy</a>
        </div>
      </div>
    </footer>
  );
}