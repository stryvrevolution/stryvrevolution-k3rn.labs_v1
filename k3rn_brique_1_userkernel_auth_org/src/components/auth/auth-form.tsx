"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

type Mode = "signin" | "signup";

export function AuthForm() {
  const supabase = React.useMemo(() => createClient(), []);
  const [mode, setMode] = React.useState<Mode>("signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setMessage("Compte créé. Tu peux te connecter.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = "/app";
      }
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
        <Label htmlFor="email">Adresse e-mail</Label>
        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mot de passe</Label>
        <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={8} />
        <p className="text-xs text-neutral-500">Minimum 8 caractères.</p>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "..." : mode === "signup" ? "Créer un compte" : "Se connecter"}
      </Button>

      <div className="flex items-center justify-between text-sm">
        <button type="button" className="text-neutral-600 hover:text-neutral-900" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
          {mode === "signin" ? "Créer un compte" : "J’ai déjà un compte"}
        </button>

        <button type="button" className="text-neutral-600 hover:text-neutral-900" onClick={async () => { await supabase.auth.signOut(); window.location.href = "/auth"; }}>
          Déconnexion
        </button>
      </div>
    </form>
  );
}
