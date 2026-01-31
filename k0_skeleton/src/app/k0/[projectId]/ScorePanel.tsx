"use client";
import React from "react";

export default function ScorePanel({
  score,
  breakdown,
  onCalculate,
  disabled,
}: {
  score: number | null;
  breakdown: any | null;
  onCalculate: () => void;
  disabled?: boolean;
}) {
  return (
    <section>
      <h2>Score k0</h2>
      <div>Score : {score ?? "—"}</div>
      {breakdown && (
        <pre style={{ background: "#fafafa", padding: 8 }}>
{JSON.stringify(breakdown, null, 2)}
        </pre>
      )}
      <button style={{ marginTop: 8 }} onClick={onCalculate} disabled={disabled}>
        Calculer score
      </button>
    </section>
  );
}
