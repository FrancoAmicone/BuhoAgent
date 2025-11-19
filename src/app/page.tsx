"use client";

import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";

interface Message {
  id: string;
  text: string;
  role: "user" | "agent";
}

export default function Home() {
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
    <div className="flex flex-col h-screen bg-white dark:bg-black">
      {/* Header */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 px-4 py-4">
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">
          🦉 Buho Agent
        </h1>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="text-6xl mb-4">🦉</div>
              <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-2">
                Bienvenido a Buho
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
                Pregúntame sobre direcciones, tokens o transacciones en blockchain
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                role={message.role}
              />
            ))
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-neutral-800 text-white rounded-2xl px-4 py-3">
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
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
