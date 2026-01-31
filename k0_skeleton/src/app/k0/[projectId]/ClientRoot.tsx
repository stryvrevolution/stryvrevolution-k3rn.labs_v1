"use client";
import React, { useEffect, useMemo, useState } from "react";
import ExpertSelector from "./ExpertSelector";
import ChatPanel from "./ChatPanel";
import CortexPreview from "./CortexPreview";
import ScorePanel from "./ScorePanel";
import ValidateButton from "./ValidateButton";
import { experts as expertsMap } from "@/llm/experts";

type TranscriptItem = { role: "user" | "expert"; text: string };
type CortexNode = {
  id: string;
  type: "idea" | "question" | "hypothesis" | "constraint";
  content: string;
  source: "user" | "expert";
  timestamp: number;
  status: "brut" | "retenu" | "écarté";
};

export default function ClientRoot({ projectId }: { projectId: string }) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [expertId, setExpertId] = useState<keyof typeof expertsMap | "">("");
  const [message, setMessage] = useState("");
  const [transcript, setTranscript] = useState<TranscriptItem[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cortexNodes, setCortexNodes] = useState<CortexNode[]>([]);

  const experts = useMemo(() => Object.values(expertsMap), []);
  const selectedExpert = expertId ? expertsMap[expertId] : undefined;

  async function startSession() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/k0/session/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, startedBy: "demo-user" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "start session failed");
      setSessionId(json.sessionId);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function sendMessage() {
    if (!message.trim() || !expertId || !sessionId) return;
    setBusy(true);
    setError(null);
    try {
      setTranscript((t) => [...t, { role: "user", text: message }]);
      const res = await fetch("/api/k0/expert/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          sessionId,
          expertId,
          message,
          userId: "demo-user",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "chat failed");
      setTranscript((t) => [
        ...t,
        { role: "expert", text: json.llmResponse as string },
      ]);
      setCortexNodes((nodes) => [
        ...nodes,
        {
          id: `${Date.now()}-u`,
          type: message.trim().endsWith("?") ? "question" : "idea",
          content: message,
          source: "user",
          timestamp: Date.now(),
          status: "brut",
        },
        {
          id: `${Date.now()}-e`,
          type: "hypothesis",
          content: json.llmResponse,
          source: "expert",
          timestamp: Date.now(),
          status: "brut",
        },
      ]);
      setMessage("");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function calculateScore() {
    if (!sessionId) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/k0/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, sessionId, userId: "demo-user" }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "score failed");
      setScore(json.score);
      setBreakdown(json.breakdown);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function validate() {
    if (!sessionId) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/k0/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          sessionId,
          validatedBy: "demo-user",
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "validate failed");
      await fetch("/api/k0/artifacts/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          sessionId,
          cortex: { nodes: cortexNodes },
          transcript,
        }),
      });
      alert(`k0 validé: ${json.validationId}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    // Démarre une session automatiquement au premier rendu
    startSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    function onIngestLink(ev: any) {
      if (!sessionId) return;
      const url = ev.detail as string;
      fetch("/api/k0/ingest/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, sessionId, url, userId: "demo-user" }),
      });
      setCortexNodes((nodes) => [
        ...nodes,
        {
          id: `${Date.now()}-l`,
          type: "constraint",
          content: `Lien ajouté: ${url}`,
          source: "user",
          timestamp: Date.now(),
          status: "brut",
        },
      ]);
    }
    function onIngestFiles(ev: any) {
      if (!sessionId) return;
      const files = ev.detail as Array<{ name: string; size: number; type?: string }>;
      fetch("/api/k0/ingest/file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, sessionId, files, userId: "demo-user" }),
      });
      setCortexNodes((nodes) => [
        ...nodes,
        {
          id: `${Date.now()}-f`,
          type: "idea",
          content: `Fichiers ajoutés: ${files.map((f) => f.name).join(", ")}`,
          source: "user",
          timestamp: Date.now(),
          status: "brut",
        },
      ]);
    }
    window.addEventListener("k0:ingest-link", onIngestLink as any);
    window.addEventListener("k0:ingest-files", onIngestFiles as any);
    return () => {
      window.removeEventListener("k0:ingest-link", onIngestLink as any);
      window.removeEventListener("k0:ingest-files", onIngestFiles as any);
    };
  }, [projectId, sessionId]);

  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 2fr 1fr", gap: 24 }}
    >
      <div>
        <ExpertSelector
          experts={experts}
          value={expertId}
          onChange={(id) => setExpertId(id as any)}
          disabled={!sessionId || busy}
        />
      </div>
      <div>
        <ChatPanel
          message={message}
          onMessageChange={setMessage}
          disabled={!sessionId || !expertId || busy}
          onSend={sendMessage}
          transcript={transcript}
          selectedExpertLabel={selectedExpert?.label}
        />
        <CortexPreview transcript={transcript} cortexNodes={cortexNodes} />
        <ScorePanel
          score={score}
          breakdown={breakdown}
          onCalculate={calculateScore}
          disabled={!sessionId || busy}
        />
      </div>
      <div>
        <ValidateButton onValidate={validate} disabled={!sessionId || busy} />
        <div style={{ marginTop: 12, color: "#888" }}>
          Session: {sessionId ? sessionId : "(en création...)"}
        </div>
        {error && (
          <div style={{ marginTop: 12, color: "#b00" }}>Erreur: {error}</div>
        )}
      </div>
    </div>
  );
}
