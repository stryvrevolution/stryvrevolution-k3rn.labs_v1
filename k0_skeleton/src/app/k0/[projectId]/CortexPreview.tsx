"use client";
import React from "react";

type TranscriptItem = { role: "user" | "expert"; text: string };
type CortexNode = {
  id: string;
  type: "idea" | "question" | "hypothesis" | "constraint";
  content: string;
  source: "user" | "expert";
  timestamp: number;
  status: "brut" | "retenu" | "écarté";
};

export default function CortexPreview({
  transcript,
  cortexNodes,
}: {
  transcript: TranscriptItem[];
  cortexNodes: CortexNode[];
}) {
  const recentExpert = transcript.filter((t) => t.role === "expert").slice(-3);
  return (
    <section>
      <h2>Cortex Preview</h2>
      <div style={{ marginBottom: 8, color: "#666", fontSize: 12 }}>
        Nœuds: {cortexNodes.length}
      </div>
      {cortexNodes.length === 0 ? (
        <div style={{ color: "#888" }}>Aucun nœud pour l’instant.</div>
      ) : (
        <ul>
          {cortexNodes.slice(-10).map((n) => (
            <li key={n.id}>
              <strong>[{n.type}]</strong> {n.content} <em>({n.source}, {n.status})</em>
            </li>
          ))}
        </ul>
      )}
      {recentExpert.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <h4>Dernières réponses expert</h4>
          <ul>
            {recentExpert.map((i, idx) => (
              <li key={idx}>{i.text}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
