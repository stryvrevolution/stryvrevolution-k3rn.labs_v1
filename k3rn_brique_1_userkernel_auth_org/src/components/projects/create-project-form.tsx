"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

export function CreateProjectForm() {
  const supabase = React.useMemo(() => createClient(), []);
  const [name, setName] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Session invalide.");

      const { data: membership } = await supabase
        .from("memberships")
        .select("organisation_id")
        .eq("user_id", auth.user.id)
        .limit(1)
        .maybeSingle();

      if (!membership?.organisation_id) throw new Error("Organisation introuvable.");

      const { data: project, error } = await supabase
        .from("projects")
        .insert({ organisation_id: membership.organisation_id, name })
        .select("id")
        .single();

      if (error) throw error;
      window.location.href = `/app/projects/${project.id}`;
    } catch (err: any) {
      setMessage(err?.message ?? "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {message ? <Alert>{message}</Alert> : null}
      <div className="space-y-2">
        <Label htmlFor="name">Nom du projet</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <Button type="submit" disabled={loading || name.trim().length < 2}>{loading ? "..." : "Créer"}</Button>
    </form>
  );
}
