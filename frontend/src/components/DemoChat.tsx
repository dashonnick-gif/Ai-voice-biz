import { useState, useEffect, useRef } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Volume2, 
  VolumeX, 
  Mic, 
  MicOff, 
  Send, 
  RefreshCw, 
  CheckCircle, 
  Play
} from 'lucide-react';

interface Message {
  sender: 'agent' | 'user' | 'system';
  text: string;
  time: string;
}

export default function DemoChat() {
  const [isCalling, setIsCalling] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [duration, setDuration] = useState(0);
  const [suggestedReplies, setSuggestedReplies] = useState<string[]>([]);
  const [agentName] = useState('Lucy (AI)');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking]);

  // Duration Timer
  useEffect(() => {
    if (isCalling && !isCallEnded) {
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCalling, isCallEnded]);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Text-to-Speech (TTS)
  const speakText = (text: string) => {
    if (speechEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.05;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Apple')));
      if (preferredVoice) utterance.voice = preferredVoice;
      
      setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Start Call
  const startCall = () => {
    setIsCalling(true);
    setIsCallEnded(false);
    setStep(0);
    setDuration(0);
    
    const initialText = "Thank you for calling BrightSmile Dental Clinic. This is your AI assistant. How can I help you today?";
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setMessages([
      { sender: 'system', text: "Call Connected with BrightSmile Dental AI Receptionist", time: now },
      { sender: 'agent', text: initialText, time: now }
    ]);
    setSuggestedReplies([
      "Hi, I'd like to book an appointment for a cleaning. I have a bit of a toothache too.",
      "What are your working hours?"
    ]);
    
    setTimeout(() => {
      speakText(initialText);
    }, 500);
  };

  // Hang Up Call
  const endCall = () => {
    setIsCallEnded(true);
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setMessages(prev => [
      ...prev,
      { sender: 'system', text: "Call Disconnected", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
  };

  // Handles Agent Dialogue Tree
  const processInput = (text: string) => {
    if (!text.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Add user message
    const updatedMessages = [
      ...messages,
      { sender: 'user', text, time: now } as Message
    ];
    setMessages(updatedMessages);
    setInputText('');
    
    // Set loading/typing state
    setIsSpeaking(true);
    
    setTimeout(() => {
      let responseText = "";
      let nextStep = step;
      let nextReplies: string[] = [];
      const lower = text.toLowerCase();

      switch (step) {
        case 0:
          if (lower.includes('book') || lower.includes('appointment') || lower.includes('schedule') || lower.includes('cleaning') || lower.includes('toothache')) {
            responseText = "I'm sorry to hear about your toothache. We can certainly get you scheduled for a cleaning and have the doctor take a look at that tooth. Are you a new or returning patient at BrightSmile?";
            nextStep = 1;
            nextReplies = ["I'm a new patient.", "I'm a returning patient."];
          } else if (lower.includes('hour') || lower.includes('open') || lower.includes('work')) {
            responseText = "We are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturdays from 9:00 AM to 2:00 PM. Would you like to schedule an appointment during these times?";
            nextReplies = ["Yes, let's book an appointment.", "No, just checking. Thanks!"];
          } else {
            responseText = "Got it. I can assist with that. Are you a new patient or a returning patient at BrightSmile?";
            nextStep = 1;
            nextReplies = ["I'm a new patient.", "I'm a returning patient."];
          }
          break;

        case 1:
          if (lower.includes('new')) {
            responseText = "Welcome! We’d love to have you. To get started, could you please tell me your full name and a good phone number to reach you at?";
            nextStep = 2;
            nextReplies = ["My name is Sarah Miller, and my number is 555-0123."];
          } else {
            responseText = "Welcome back! To lookup your patient file, could you please tell me your full name and your phone number?";
            nextStep = 2;
            nextReplies = ["My name is Sarah Miller, and my number is 555-0123."];
          }
          break;

        case 2:
          responseText = "Got it, Sarah. Thank you. Now, let's look at the schedule. Dr. Aris has openings this coming Tuesday, June 16th. We have slots at 10:00 AM, 1:30 PM, and 4:00 PM. Do any of those work for you?";
          nextStep = 3;
          nextReplies = ["Tuesday at 1:30 PM sounds perfect.", "Tuesday at 10:00 AM.", "Tuesday at 4:00 PM."];
          break;

        case 3:
          responseText = "Excellent choice. Just to confirm, I have you down for a cleaning and a toothache exam with Dr. Aris this Tuesday, June 16th, at 1:30 PM. Does that all look correct?";
          nextStep = 4;
          nextReplies = ["Yes, that's right.", "No, let's select a different time."];
          break;

        case 4:
          if (lower.includes('yes') || lower.includes('right') || lower.includes('correct') || lower.includes('sure')) {
            responseText = "Perfect. I’ve reserved that spot for you. You’ll receive a confirmation text shortly with our address and a link to fill out your new patient forms online to save time. Is there anything else I can help you with today?";
            nextStep = 5;
            nextReplies = ["No, that's all. Thank you so much!"];
          } else {
            responseText = "No problem! Let's choose another slot. Dr. Aris has openings on Tuesday, June 16th at 10:00 AM, 1:30 PM, and 4:00 PM. Which works best?";
            nextStep = 3;
            nextReplies = ["Tuesday at 1:30 PM.", "Tuesday at 10:00 AM.", "Tuesday at 4:00 PM."];
          }
          break;

        case 5:
          responseText = "You're very welcome, Sarah! We look forward to seeing you on Tuesday. Have a great day!";
          nextStep = 6;
          nextReplies = [];
          setTimeout(() => endCall(), 4000);
          break;

        default:
          responseText = "Thank you for calling. If you need any further assistance, feel free to redial. Have a wonderful day!";
          nextReplies = [];
          break;
      }

      setStep(nextStep);
      setSuggestedReplies(nextReplies);
      setMessages(prev => [
        ...prev,
        { sender: 'agent', text: responseText, time: now }
      ]);
      speakText(responseText);
    }, 1200);
  };

  // Speech Recognition (STT)
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInputText(text);
      };
      recognition.onerror = () => {
        setIsListening(false);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
      recognition.start();
    } else {
      alert("Speech recognition is not supported in this browser. Please type your response.");
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-slate-950 p-4 rounded-[42px] border-4 border-slate-800 shadow-2xl relative">
      {/* Smartphone Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-full z-20 flex items-center justify-center space-x-2">
        <div className="w-2.5 h-2.5 bg-slate-950 rounded-full" />
        <div className="w-10 h-1 bg-slate-900 rounded-full" />
      </div>

      {/* Screen */}
      <div className="bg-slate-900 rounded-[32px] overflow-hidden h-[540px] flex flex-col justify-between border border-slate-850 relative z-10">
        
        {/* Top Status Bar */}
        <div className="bg-slate-950 px-6 pt-5 pb-2 flex justify-between items-center text-xs text-slate-400 font-semibold select-none">
          <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          <div className="flex items-center space-x-1.5">
            <div className="flex space-x-0.5 items-end h-2.5">
              <div className="w-0.5 h-1 bg-indigo-400 rounded-full" />
              <div className="w-0.5 h-1.5 bg-indigo-400 rounded-full" />
              <div className="w-0.5 h-2 bg-indigo-400 rounded-full" />
              <div className="w-0.5 h-2.5 bg-indigo-400 rounded-full" />
            </div>
            <span>5G</span>
            <div className="w-5 h-2.5 border border-slate-500 rounded flex items-center p-0.5">
              <div className="h-full w-4 bg-indigo-400 rounded-xs" />
            </div>
          </div>
        </div>

        {/* Brand/Active Call Header */}
        <div className="bg-slate-950/85 backdrop-blur-md px-4 py-3 border-b border-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${isCalling && !isCallEnded ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
            <div>
              <p className="text-white text-xs font-bold leading-tight">BrightSmile Dental Clinic</p>
              <p className="text-slate-400 text-[10px] leading-tight">
                {isCalling && !isCallEnded ? `Connected • ${formatDuration(duration)}` : 'Offline • AI Answering Active'}
              </p>
            </div>
          </div>
          
          <button 
            type="button"
            className={`p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors border border-slate-800 hover:bg-slate-850 ${speechEnabled ? 'bg-indigo-950/40 text-indigo-400' : ''}`}
            onClick={() => setSpeechEnabled(!speechEnabled)}
            title={speechEnabled ? "Voice Synthesis On" : "Voice Synthesis Off"}
          >
            {speechEnabled ? <Volume2 className="w-4 h-4 text-indigo-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900 scrollbar-thin">
          {!isCalling ? (
            /* Idle Screen */
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-full mb-6 text-indigo-400 animate-bounce">
                <Phone className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-black text-white mb-2">Test Dr. Aris's AI Agent</h4>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs mb-8">
                Place a virtual call to BrightSmile Dental Clinic. Lucy, the AI voice agent, will handle your appointment and toothache questions instantly.
              </p>
              <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm px-8 py-3.5 rounded-2xl flex items-center space-x-3 shadow-lg shadow-indigo-500/20 active:scale-95 transition-all duration-150"
                onClick={startCall}
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Call AI Receptionist</span>
              </button>
            </div>
          ) : (
            /* Active Call Screen */
            <div className="space-y-4">
              {messages.map((msg, index) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={index} className="text-center text-[10px] text-indigo-400 font-bold tracking-wide uppercase my-2 py-1 bg-indigo-950/20 rounded-lg border border-indigo-900/10">
                      {msg.text}
                    </div>
                  );
                }
                const isAgent = msg.sender === 'agent';
                return (
                  <div key={index} className={`flex ${isAgent ? 'justify-start' : 'justify-end'}`}>
                    <div className="max-w-[85%]">
                      <div className="flex items-center space-x-1.5 mb-1 select-none">
                        <span className="text-[10px] font-bold text-slate-400">
                          {isAgent ? agentName : 'You'}
                        </span>
                        <span className="text-[9px] text-slate-500">• {msg.time}</span>
                      </div>
                      <div className={`p-3.5 rounded-2xl text-xs leading-relaxed font-semibold ${isAgent ? 'bg-slate-800 text-slate-100 rounded-tl-sm' : 'bg-indigo-600 text-white rounded-tr-sm'}`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Speech Output Wave Animation */}
              {isSpeaking && !isCallEnded && (
                <div className="flex items-center space-x-2 p-3 bg-slate-850/60 rounded-xl max-w-max border border-slate-800 select-none">
                  <div className="flex space-x-0.5 items-center h-4">
                    <div className="w-0.5 h-3 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-0.5 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <div className="w-0.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <div className="w-0.5 h-4 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    <div className="w-0.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400 tracking-wider uppercase">Lucy is speaking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input/Suggestions Panel */}
        {isCalling && !isCallEnded && (
          <div className="bg-slate-950 p-4 border-t border-slate-800 shrink-0 space-y-3">
            {/* Click-to-Reply Suggestion Prompts */}
            {suggestedReplies.length > 0 && (
              <div className="flex flex-col space-y-1.5 select-none">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Suggested Responses</span>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedReplies.map((reply, index) => (
                    <button
                      key={index}
                      type="button"
                      className="bg-slate-850 hover:bg-slate-800 active:bg-slate-750 text-slate-200 border border-slate-750 font-bold text-[11px] px-3 py-2 rounded-xl text-left transition-colors active:scale-97 select-none leading-tight"
                      onClick={() => processInput(reply)}
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form Controls */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className={`p-3 rounded-xl border border-slate-800 hover:bg-slate-850 transition-colors ${isListening ? 'bg-red-950/40 text-red-500 border-red-900/20' : 'text-slate-400'}`}
                onClick={startListening}
                title="Speak to Agent (Mic)"
              >
                {isListening ? <Mic className="w-4 h-4 text-red-500" /> : <MicOff className="w-4 h-4" />}
              </button>
              
              <input
                type="text"
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl text-xs px-3.5 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 font-semibold"
                placeholder={isListening ? "Listening..." : "Type response here..."}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    processInput(inputText);
                  }
                }}
                disabled={isListening}
              />
              
              <button
                type="button"
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white p-3 rounded-xl transition-colors active:scale-95"
                onClick={() => processInput(inputText)}
                disabled={!inputText.trim() || isListening}
              >
                <Send className="w-4 h-4 fill-white" />
              </button>
            </div>

            {/* End Call / Hang Up Controls */}
            <div className="flex justify-center pt-2 select-none border-t border-slate-850/60">
              <button
                type="button"
                className="bg-red-600 hover:bg-red-500 text-white font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-full flex items-center space-x-2 active:scale-95 transition-all shadow-lg shadow-red-500/10"
                onClick={endCall}
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>Hang Up</span>
              </button>
            </div>
          </div>
        )}

        {/* Post-Call Finished Screen */}
        {isCalling && isCallEnded && (
          <div className="bg-slate-950 p-6 border-t border-slate-800 shrink-0 text-center space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 w-12 h-12 rounded-full flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-white text-sm font-black">Interactive Call Simulation Over</h5>
              <p className="text-slate-400 text-[11px] max-w-xs mx-auto mt-1 leading-normal">
                Lucy successfully captured Sarah Miller's name, registered her number, verified booking info, and locked in an appointment with Dr. Aris for Tuesday, June 16th at 1:30 PM.
              </p>
            </div>
            <button
              type="button"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-2.5 rounded-xl flex items-center space-x-2 mx-auto active:scale-95 transition-all shadow-md"
              onClick={startCall}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Redial Agent</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
