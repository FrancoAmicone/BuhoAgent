"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../components/ChatMessage";
import { ChatInput } from "../components/ChatInput";
import { Header } from "../components/Header";

interface Message {
  id: string;
  text: string;
  role: "user" | "agent";
}

export default function AppPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al final cuando llegan nuevos mensajes
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText: string) => {
    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Llamar a la API con sessionId
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: messageText,
          sessionId: sessionId 
        }),
      });

      const data = await response.json();

      // Agregar respuesta del agente
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.error ? `Error: ${data.error}` : data.reply || JSON.stringify(data, null, 2),
        role: "agent",
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      // Agregar mensaje de error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Error al conectar con el servidor",
        role: "agent",
      };

      setMessages((prev) => [...prev, errorMessage]);
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F5F5F0] animate-sunrise">
      {/* Header */}
      <Header theme="light" />

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col animate-fade-in">
        <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="text-8xl mb-8 animate-fade-in-delayed">🦉</div>
              <h2 className="text-4xl font-bold text-black mb-16 animate-fade-in-delayed">
                Bienvenido a Buho
              </h2>
              <div className="w-full max-w-xl animate-fade-in-delayed">
                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
              </div>
            </div>
          ) : (
            <div className="space-y-4 flex-1">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  role={message.role}
                />
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="animate-bounce" style={{ animationDelay: "0ms" }}>●</span>
                      <span className="animate-bounce" style={{ animationDelay: "150ms" }}>●</span>
                      <span className="animate-bounce" style={{ animationDelay: "300ms" }}>●</span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Solo visible cuando hay mensajes */}
      {messages.length > 0 && (
        <div className="px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-4 text-center text-sm text-neutral-500 animate-fade-in-delayed">
        © 2025 Buho
      </footer>
    </div>
  );
}

