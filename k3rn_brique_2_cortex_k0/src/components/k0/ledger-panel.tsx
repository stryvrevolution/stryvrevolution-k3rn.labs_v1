"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/browser";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";

export function LedgerPanel({ projectId }: { projectId: string }) {
  const supabase = React.useMemo(() => createClient(), []);
  const [question, setQuestion] = React.useState("");
  const [rationale, setRationale] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function createDecision() {
    setLoading(true);
    setMessage(null);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Session invalide.");

      const { error } = await supabase.from("decisions").insert({
        project_id: projectId,
        scope: "project",
        lab_code: "k0",
        question,
        options: [],
        selection: { status: "manual" },
        rationale,
        created_by: auth.user.id
      });
      if (error) throw error;

      setQuestion("");
      setRationale("");
      setMessage("Décision enregistrée.");
    } catch (err: any) {
      setMessage(err?.message ?? "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Decision Ledger</CardTitle>
        <CardDescription>Empreinte minimale (V1).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {message ? <Alert>{message}</Alert> : null}

        <div className="space-y-2">
          <Label>Question / décision</Label>
          <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ex. Priorité : prototyper vite ou industrialiser ?" />
        </div>

        <div className="space-y-2">
          <Label>Rationale</Label>
          <textarea
            className="min-h-[90px] w-full rounded-md border border-neutral-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Pourquoi ce choix ? Quels trade-offs ?"
          />
        </div>

        <Button onClick={createDecision} disabled={loading || question.trim().length < 5}>
          {loading ? "..." : "Enregistrer"}
        </Button>
      </CardContent>
    </Card>
  );
}
