"use client";
import React from "react";

type TranscriptItem = { role: "user" | "expert"; text: string };

export default function ChatPanel({
  message,
  onMessageChange,
  disabled,
  onSend,
  transcript,
  selectedExpertLabel,
}: {
  message: string;
  onMessageChange: (v: string) => void;
  disabled?: boolean;
  onSend: () => void;
  transcript: TranscriptItem[];
  selectedExpertLabel?: string;
}) {
  return (
    <section>
      <h2>
        Session k0 {selectedExpertLabel ? `– ${selectedExpertLabel}` : ""}
      </h2>
      <div
        style={{
          border: "1px solid #eee",
          minHeight: 160,
          marginBottom: 8,
          padding: 8,
        }}
      >
        {transcript.length === 0 && (
          <div style={{ color: "#888" }}>Pas de messages pour l’instant.</div>
        )}
        {transcript.map((t, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <strong>{t.role === "user" ? "Vous" : "Expert"}:</strong> {t.text}
          </div>
        ))}
      </div>
      <textarea
        placeholder="Votre question..."
        style={{ width: "100%", minHeight: 60 }}
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        disabled={disabled}
      />
      <button
        style={{ marginTop: 8 }}
        onClick={onSend}
        disabled={disabled || !message.trim()}
      >
        Envoyer
      </button>
    </section>
  );
}
