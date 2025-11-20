interface ChatMessageProps {
  message: string;
  role: "user" | "agent";
}

export function ChatMessage({ message, role }: ChatMessageProps) {
  const isUser = role === "user";

  // Detectar si el mensaje contiene HTML (específicamente tablas)
  const containsHTML = /<table|<div|<span|<p/i.test(message);

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[90%] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-[#F5EFE6] text-black"
            : "bg-black text-white"
        }`}
      >
        {containsHTML ? (
          <div 
            className="text-sm leading-relaxed agent-message-content"
            dangerouslySetInnerHTML={{ __html: message }}
          />
        ) : (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

