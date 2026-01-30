"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function makeSafeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function IngestionPanel({ projectId }: { projectId: string }) {
  const supabase = React.useMemo(() => createClient(), []);
  const [message, setMessage] = React.useState<string | null>(null);
  const [loadingText, setLoadingText] = React.useState(false);
  const [loadingFile, setLoadingFile] = React.useState(false);
  const [text, setText] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);

  async function ingestText() {
    setLoadingText(true);
    setMessage(null);
    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Session invalide.");

      const { data: artefact, error } = await supabase
        .from("artefacts")
        .insert({
          project_id: projectId,
          kind: "text",
          raw_text: text,
          meta: { source: "manual_text" },
          created_by: auth.user.id
        })
        .select("id")
        .single();

      if (error) throw error;

      const { error: layerErr } = await supabase.from("artefact_layers").insert({
        artefact_id: artefact.id,
        layer: "raw",
        content: { text }
      });
      if (layerErr) throw layerErr;

      setText("");
      setMessage("Texte ingéré (raw).");
    } catch (err: any) {
      setMessage(err?.message ?? "Erreur inconnue.");
    } finally {
      setLoadingText(false);
    }
  }

  async function ingestFile() {
    if (!file) return;
    setLoadingFile(true);
    setMessage(null);

    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Session invalide.");

      const safe = makeSafeFilename(file.name);
      const path = `${projectId}/${crypto.randomUUID()}_${safe}`;

      const up = await supabase.storage.from("project-files").upload(path, file, {
        cacheControl: "3600",
        upsert: false
      });
      if (up.error) throw up.error;

      const { data: artefact, error } = await supabase
        .from("artefacts")
        .insert({
          project_id: projectId,
          kind: "file",
          source_name: file.name,
          storage_path: path,
          meta: { size: file.size, type: file.type },
          created_by: auth.user.id
        })
        .select("id")
        .single();
      if (error) throw error;

      const { error: layerErr } = await supabase.from("artefact_layers").insert({
        artefact_id: artefact.id,
        layer: "raw",
        content: { storage_path: path, filename: file.name, size: file.size, type: file.type }
      });
      if (layerErr) throw layerErr;

      setFile(null);
      setMessage("Fichier uploadé et ingéré (raw).");
    } catch (err: any) {
      setMessage(err?.message ?? "Erreur inconnue.");
    } finally {
      setLoadingFile(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingestion</CardTitle>
        <CardDescription>Ajoute des entrées au Cortex (couche raw).</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {message ? <Alert>{message}</Alert> : null}

        <div className="space-y-2">
          <Label>Texte</Label>
          <textarea
            className="min-h-[140px] w-full rounded-md border border-neutral-200 bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Colle ici un dump d’idées, un brief, un vocal transcrit…"
          />
          <Button onClick={ingestText} disabled={loadingText || text.trim().length < 10}>
            {loadingText ? "..." : "Ingérer le texte"}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Fichier</Label>
          <Input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          <p className="text-xs text-neutral-500">
            Nécessite le bucket Supabase Storage <span className="font-mono">project-files</span>.
          </p>
          <Button variant="secondary" onClick={ingestFile} disabled={loadingFile || !file}>
            {loadingFile ? "..." : "Uploader + ingérer"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
