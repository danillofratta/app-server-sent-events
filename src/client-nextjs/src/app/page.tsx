"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Connect to your SSE endpoint
    const source = new EventSource("https://localhost:7073/api/v1/Notifications/getstream");

    source.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    source.onerror = (err) => {
      console.error("SSE error:", err);
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  return (
    <div style={{ color: "#000", background: "#fff", padding: "1rem" }}>
      <h2>Notificações</h2>
      {messages.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
