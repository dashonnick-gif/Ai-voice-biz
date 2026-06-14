import React, { useState } from 'react';
import { 
  Phone, 
  Clock, 
  Users, 
  DollarSign, 
  Check, 
  Zap, 
  Calendar, 
  Brain, 
  Database, 
  ArrowRight, 
  ShieldAlert, 
  TrendingUp,
  MessageSquare,
  Sparkles,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does VoxLocal connect to my existing phone line?",
      a: "It's simple. We provide you with a dedicated local phone number. You can forward your main line to this number when you're busy, after hours, or all the time. No new hardware required."
    },
    {
      q: "Does the AI sound robotic?",
      a: "Not at all. VoxLocal uses advanced conversational models and natural text-to-speech engines. It speaks with warmth, handles pauses, understands context, and responds friendly just like a human assistant."
    },
    {
      q: "Can it really book appointments in my software?",
      a: "Yes! VoxLocal integrates directly via APIs with major calendar systems like Google Calendar, Outlook, Calendly, and industry-specific scheduling portals. It only books slots you've marked as available."
    },
    {
      q: "What happens if a customer asks a question the AI doesn't know?",
      a: "If the AI encounters a question outside its training, it can gracefully offer to transfer the caller to a live staff member, or collect the caller's details and email/SMS you a detailed message immediately."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-md shadow-indigo-500/20">
              <Phone className="w-6 h-6 text-white animate-pulse" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Vox<span className="text-indigo-400">Local</span>
            </span>
          </div>
          <nav className="hidden md:flex space-x-10 text-sm font-medium text-slate-300">
            <a href="#problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a 
              href="#pricing" 
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* Section 1 - Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white py-24 lg:py-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-slate-800/80 border border-slate-700/50 rounded-full px-4 py-1.5 mb-8 hover:bg-slate-800/100 transition-colors">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-semibold text-slate-300 tracking-wide">
              The Next Generation of Local Business Answering
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-none mb-8">
            Never Miss a <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Lead</span> Again. <br className="hidden sm:inline" />
            Meet Your 24/7 AI Receptionist.
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-12">
            VoxLocal answers your calls, books appointments, and handles FAQs — so you can focus on your work. Professional, affordable, and always on.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="#pricing" 
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              Start Your Free Trial
            </a>
            <a 
              href="mailto:demo@voxlocal.ai?subject=Requesting Live Demo" 
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              Book a Live Demo
            </a>
          </div>

          {/* Social Proof */}
          <div className="mt-16 pt-12 border-t border-slate-800/60 max-w-4xl mx-auto">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
              Empowering local medical clinics, salons, auto shops, and restaurants
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 opacity-60 text-sm font-bold text-slate-400">
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>Medical Clinics</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>Salons & Spas</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>Auto Repair</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Check className="w-4 h-4 text-indigo-400" />
                <span>Restaurants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Problem (Agitation) */}
      <section id="problem" className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
              The Cost of Silence
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Is Your Phone Costing You Customers?
            </h3>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Every missed call is a lost lead. But hiring a full-time receptionist is expensive, and traditional answering services are slow, prone to hold times, and lack the knowledge of your specific business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1">
              <div className="bg-red-50 border border-red-100 p-3 w-12 h-12 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950 mb-3">Missing After-Hours Calls</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                62% of customers hang up if their call is sent to voicemail after business hours. They will immediately call your competitor instead.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1">
              <div className="bg-red-50 border border-red-100 p-3 w-12 h-12 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950 mb-3">Frustrated Customers on Hold</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Putting leads on hold ruins their customer experience. Today's buyers expect instant responses, not muzak and waiting.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1">
              <div className="bg-red-50 border border-red-100 p-3 w-12 h-12 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950 mb-3">Overwhelmed On-site Staff</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your staff is interrupted continuously by simple FAQs like hours, locations, and pricing, pulling them away from physical clients.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1">
              <div className="bg-red-50 border border-red-100 p-3 w-12 h-12 rounded-2xl flex items-center justify-center text-red-600 mb-6">
                <DollarSign className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-950 mb-3">High Answering Service Costs</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Traditional human receptionists are expensive ($3k-$4k+/mo). Call centers charge per minute and make costly errors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Features */}
      <section id="features" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
              Tailor-Made Solutions
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The AI Receptionist Built for Local Business
            </h3>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              VoxLocal is a smart voice agent that lives on your phone line. It sounds natural, understands your business, and handles the heavy lifting of customer service without ever needing a break.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-slate-100 p-10 rounded-3xl flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 transition-all duration-300 hover:shadow-lg">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-indigo-600 shrink-0">
                <Zap className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-950 mb-3">⚡ Instant Answer, Zero Hold</h4>
                <p className="text-base text-slate-600 leading-relaxed">
                  Your customers get an immediate response every single time. No "please hold," no waiting in queues. Just instant service and warm greetings on the first ring, 24/7/365.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border border-slate-100 p-10 rounded-3xl flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 transition-all duration-300 hover:shadow-lg">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-indigo-600 shrink-0">
                <Calendar className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-950 mb-3">📅 Smart Appointment Booking</h4>
                <p className="text-base text-slate-600 leading-relaxed">
                  VoxLocal syncs directly with your existing calendar (Google, Outlook, Calendly, and more). It checks your real-time availability and books the spot — no manual entry or duplicates.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border border-slate-100 p-10 rounded-3xl flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 transition-all duration-300 hover:shadow-lg">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-indigo-600 shrink-0">
                <Brain className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-950 mb-3">🧠 Deep Business Knowledge</h4>
                <p className="text-base text-slate-600 leading-relaxed">
                  Train your agent on your specific FAQs. From "What are your holiday hours?" to "Do you handle specialized dental implants or synthetics?", VoxLocal always has accurate, instant answers.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="bg-white border border-slate-100 p-10 rounded-3xl flex flex-col sm:flex-row items-start space-y-6 sm:space-y-0 sm:space-x-8 transition-all duration-300 hover:shadow-lg">
              <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl text-indigo-600 shrink-0">
                <Database className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-slate-950 mb-3">📱 Lead Qualification & CRM Sync</h4>
                <p className="text-base text-slate-600 leading-relaxed">
                  VoxLocal doesn't just take messages; it asks the right qualifying questions. It gathers names, contact info, and specific service needs, then sends them straight to your CRM, POS, or inbox.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - How It Works */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
              Easy Three-Step Process
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Getting Started in 15 Minutes
            </h3>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              Integrating VoxLocal into your business is completely friction-free. Here's how simple it is:
            </p>
          </div>

          <div className="relative">
            {/* Desktop Connector Line */}
            <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-indigo-100 -translate-y-12 -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="bg-indigo-600 border border-indigo-500 text-white w-20 h-20 rounded-3xl text-2xl font-extrabold flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    1
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-950 mb-3">Customize Your Agent</h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm">
                  Tell us about your business, your working hours, specific service rates, and frequently asked customer questions.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="bg-indigo-600 border border-indigo-500 text-white w-20 h-20 rounded-3xl text-2xl font-extrabold flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    2
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-950 mb-3">Connect Your Calendar</h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm">
                  Link your booking software (Google Calendar, Outlook, etc.) so VoxLocal knows exactly when you're free or busy.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center flex flex-col items-center">
                <div className="relative mb-6">
                  <div className="bg-indigo-600 border border-indigo-500 text-white w-20 h-20 rounded-3xl text-2xl font-extrabold flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    3
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-slate-950 mb-3">Activate Your Line</h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-sm">
                  Forward your calls to your dedicated VoxLocal phone number and watch the automated lead booking magic happen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - Pricing */}
      <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
              Affordable Tiers
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Fair, Transparent Pricing for Every Business Size
            </h3>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">
              No long-term contracts. No hidden setup fees. Upgrade or cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Starter Tier */}
            <div className="bg-white border border-slate-200/60 p-10 rounded-[32px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div>
                <h4 className="text-xl font-extrabold text-slate-950 mb-2">Starter</h4>
                <p className="text-sm text-slate-500 mb-6">Best For: Solopreneurs & Micro-shops</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-black text-slate-950">$199</span>
                  <span className="text-slate-500 font-semibold text-sm ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 border-t border-slate-100 pt-8">
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Up to 100 calls/mo
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Basic FAQ handling
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Email call summaries
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Dedicated local phone number
                  </li>
                </ul>
              </div>
              <a 
                href="mailto:trial@voxlocal.ai?subject=Sign up for Starter Trial" 
                className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-900 py-4 px-6 rounded-2xl font-bold text-sm transition-colors duration-200"
              >
                Start Free Trial
              </a>
            </div>

            {/* Pro Tier (Popular) */}
            <div className="bg-gradient-to-b from-slate-950 to-slate-900 text-white p-10 rounded-[32px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 relative border border-slate-800">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-indigo-500/25">
                Most Popular
              </div>
              <div>
                <h4 className="text-xl font-extrabold text-white mb-2">Pro</h4>
                <p className="text-sm text-slate-400 mb-6">Best For: Growing clinics & service businesses</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-black text-white">$349</span>
                  <span className="text-slate-400 font-semibold text-sm ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 border-t border-slate-800 pt-8">
                  <li className="flex items-center text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    Up to 500 calls/mo
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    <strong>Full Appointment Booking</strong>
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    CRM Integration (Zapier)
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    SMS booking confirmations
                  </li>
                  <li className="flex items-center text-sm text-slate-300">
                    <Check className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
                    Personalized voice greeting
                  </li>
                </ul>
              </div>
              <a 
                href="mailto:trial@voxlocal.ai?subject=Sign up for Pro Trial" 
                className="block text-center bg-indigo-600 hover:bg-indigo-500 text-white py-4 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-indigo-500/20 transition-colors duration-200"
              >
                Start Free Trial
              </a>
            </div>

            {/* Business Tier */}
            <div className="bg-white border border-slate-200/60 p-10 rounded-[32px] flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div>
                <h4 className="text-xl font-extrabold text-slate-950 mb-2">Business</h4>
                <p className="text-sm text-slate-500 mb-6">Best For: High-volume offices & multi-location</p>
                <div className="flex items-baseline mb-8">
                  <span className="text-5xl font-black text-slate-950">$599</span>
                  <span className="text-slate-500 font-semibold text-sm ml-2">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 border-t border-slate-100 pt-8">
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Up to 1,500 calls/mo
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Priority 24/7 technical support
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Custom Voice Branding
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Advanced reporting & analytics
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <Check className="w-5 h-5 text-indigo-600 mr-3 shrink-0" />
                    Multi-calendar support
                  </li>
                </ul>
              </div>
              <a 
                href="mailto:trial@voxlocal.ai?subject=Sign up for Business Trial" 
                className="block text-center bg-slate-100 hover:bg-slate-200 text-slate-900 py-4 px-6 rounded-2xl font-bold text-sm transition-colors duration-200"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-extrabold text-indigo-600 uppercase tracking-widest mb-3">
              Answering Questions
            </h2>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-slate-100 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-200"
              >
                <button
                  type="button"
                  className="w-full text-left px-8 py-6 flex items-center justify-between font-bold text-lg text-slate-900 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-8 py-6 text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6 - CTA */}
      <section className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white py-24 text-center relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight mb-6">
            Give Your Business the Voice It Deserves.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Join 100+ local businesses that have stopped missing critical customer calls and started growing with automated AI assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="#pricing" 
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl text-base font-bold shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            >
              Get Started Today
            </a>
            <a 
              href="mailto:demo@voxlocal.ai" 
              className="w-full sm:w-auto bg-transparent hover:bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-white px-8 py-4 rounded-2xl text-base font-bold transition-all duration-200 active:scale-95"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 text-slate-500 py-12 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <span className="text-lg font-bold text-white tracking-tight">
              Vox<span className="text-indigo-400">Local</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-xs text-slate-600">© {new Date().getFullYear()} VoxLocal. All rights reserved.</span>
          </div>
          <div className="flex space-x-8">
            <a href="#problem" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#features" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="mailto:support@voxlocal.ai" className="hover:text-slate-400 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
