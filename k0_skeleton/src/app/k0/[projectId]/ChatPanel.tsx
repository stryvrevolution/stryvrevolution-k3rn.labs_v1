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
  const [link, setLink] = React.useState("");
  const [dropHover, setDropHover] = React.useState(false);

  async function ingestLink() {
    if (!link.trim()) return;
    const ev = new CustomEvent("k0:ingest-link", { detail: link });
    window.dispatchEvent(ev);
    setLink("");
  }

  async function onDropFiles(e: React.DragEvent) {
    e.preventDefault();
    setDropHover(false);
    const files = Array.from(e.dataTransfer.files || []);
    const ev = new CustomEvent("k0:ingest-files", {
      detail: files.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    });
    window.dispatchEvent(ev);
  }

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

      <div style={{ marginTop: 16 }}>
        <h3>Ingestion — Lien</h3>
        <input
          type="url"
          placeholder="https://..."
          value={link}
          onChange={(e) => setLink(e.target.value)}
          disabled={disabled}
          style={{ width: "100%" }}
        />
        <button
          style={{ marginTop: 8 }}
          onClick={ingestLink}
          disabled={disabled || !link.trim()}
        >
          Ajouter le lien
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <h3>Ingestion — Fichiers (drag & drop)</h3>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDropHover(true);
          }}
          onDragLeave={() => setDropHover(false)}
          onDrop={onDropFiles}
          style={{
            border: "2px dashed #ccc",
            padding: 16,
            textAlign: "center",
            background: dropHover ? "#f7f7f7" : "transparent",
          }}
        >
          Déposez vos fichiers ici…
        </div>
      </div>
    </section>
  );
}
