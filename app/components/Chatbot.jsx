"use client";

import { useState } from "react";

const Chatbot = ({ selectedFund }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  
  // Format AI response text into clean numbered points
  const formatResponse = (text) => {
    text = text.replace(/<think>.*?<\/think>/gs, "");
    const lines = text.split('\n')
      .map(line => line.trim())
      .filter(line => line);
      
    return lines.map((line, index) => {
      if (/^\d+\./.test(line)) return line;
      return `${index + 1}. ${line}`;
    }).join('\n');
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const prompt = selectedFund
      ? `Context: Discussing ${selectedFund.name} (${selectedFund.code}).\nQuestion: ${input}\n\nProvide a clear, concise analysis or advice about this investment, focusing on the specific query. Format the response in 2-5 key points. ${webSearchEnabled ? 'Use current market data and recent information when available.' : ''}`
      : `Question: ${input}\n\nProvide general investment guidance or mutual fund advice, formatted in 2-5 key points. Focus on education and clarity. ${webSearchEnabled ? 'Include recent market trends and current information when relevant.' : ''}`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          prompt,
          enableWebSearch: webSearchEnabled 
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Chat API error:', response.status, errorData);
        throw new Error(errorData || "Failed to get response");
      }

      const reader = response.body.getReader();
      let botResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        botResponse += chunk;
        
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          
          if (lastMessage?.role === "assistant") {
            lastMessage.content = botResponse;
          } else {
            newMessages.push({ role: "assistant", content: botResponse });
          }
          
          return newMessages;
        });
      }

      const cleanedResponse = formatResponse(botResponse);

      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.role === "assistant") {
          newMessages[newMessages.length - 1].content = cleanedResponse;
        }
        return newMessages;
      });

    } catch (error) {
      console.error("Chat error:", error);
      let errorMessage = "Oops! Something went wrong. Please try again in a moment.";

      setMessages((prev) => [...prev, { 
        role: "assistant", 
        content: errorMessage
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-r from-[#1EFD68] to-[#19C559] rounded-full text-[#06050B] shadow-[0_0_30px_rgba(30,253,104,0.4)] hover:scale-105 transition-all flex items-center justify-center font-bold text-xl"
          aria-label="Open AI Assistant"
        >
          🤖
        </button>
      ) : (
        <div className="bg-[#0D0A16]/95 backdrop-blur-xl rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col border border-[var(--border-subtle)] overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-[#14101F] border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1EFD68] shadow-[0_0_8px_#1EFD68] animate-pulse"></span>
              <h3 className="font-grotesk font-bold text-sm text-[var(--text-primary)]">NiveshAI</h3>
              {webSearchEnabled && (
                <span className="px-2 py-0.5 bg-[#1EFD68]/10 border border-[#1EFD68]/30 text-[#1EFD68] text-[10px] font-semibold rounded-full">
                  Live Market
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setWebSearchEnabled(!webSearchEnabled)}
                className={`px-2 py-1 text-[11px] font-medium rounded-lg transition-colors border ${
                  webSearchEnabled 
                    ? 'bg-[#1EFD68]/10 text-[#1EFD68] border-[#1EFD68]/30' 
                    : 'bg-white/5 text-[var(--text-muted)] border-white/10'
                }`}
                title={webSearchEnabled ? "Disable web search" : "Enable web search"}
              >
                Web
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[var(--text-muted)] hover:text-white transition-colors p-1"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto font-inter text-sm text-[var(--text-primary)] space-y-3">
            {messages.length === 0 ? (
              <div className="py-6 text-center text-[var(--text-muted)] text-xs">
                <span className="text-2xl block mb-2">👋</span>
                Ask me anything about {selectedFund ? selectedFund.name : "stocks, crypto & mutual funds"}!
              </div>
            ) : (
              messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`max-w-[85%] p-3 rounded-xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-[#1EFD68] text-[#06050B] font-medium rounded-br-none"
                        : "bg-[var(--surface-glass-hover)] border border-white/10 text-[var(--text-primary)] rounded-bl-none border-l-2 border-l-[#1EFD68]"
                    }`}
                  >
                    {msg.content}
                  </span>
                </div>
              ))
            )}
            {loading && (
              <div className="flex justify-start">
                <span className="p-3 bg-[var(--surface-glass)] border border-white/10 rounded-xl text-xs text-[var(--text-muted)] animate-pulse">
                  Analyzing market data...
                </span>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-3 border-t border-[var(--border-subtle)] bg-[#14101F]">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="w-full p-2.5 bg-[var(--surface-glass)] text-[var(--text-primary)] placeholder-[var(--text-faint)] rounded-xl border border-white/10 focus:outline-none focus:border-[#1EFD68] text-xs resize-none"
              placeholder="Ask an investment query..."
              rows="2"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className={`mt-2 w-full btn-primary-green !py-2 !text-xs ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Send Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
