"use client";
import React from "react";

type TranscriptItem = { role: "user" | "expert"; text: string };

export default function CortexPreview({
  transcript,
}: {
  transcript: TranscriptItem[];
}) {
  const ideas = transcript.filter((t) => t.role === "expert").slice(-5);
  return (
    <section>
      <h2>Cortex Preview</h2>
      {ideas.length === 0 ? (
        <div style={{ color: "#888" }}>Aucune idée générée pour l’instant.</div>
      ) : (
        <ul>
          {ideas.map((i, idx) => (
            <li key={idx}>{i.text}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
