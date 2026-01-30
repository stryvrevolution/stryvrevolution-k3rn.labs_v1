"use client";

import * as React from "react";
import { createClient } from "@/lib/supabase/browser";
import { onboardingSchema, type OnboardingInput } from "@/components/onboarding/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert } from "@/components/ui/alert";

const COMPANY_TYPES: { value: OnboardingInput["company_type"]; label: string }[] = [
  { value: "solo", label: "Solo" },
  { value: "startup", label: "Startup" },
  { value: "sme", label: "PME" },
  { value: "enterprise", label: "Entreprise" },
  { value: "agency", label: "Agence" },
  { value: "other", label: "Autre" }
];

export function OnboardingForm({ userEmail }: { userEmail: string }) {
  const supabase = React.useMemo(() => createClient(), []);
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);

  const [form, setForm] = React.useState<OnboardingInput>({
    organisation_name: "",
    first_name: "",
    last_name: "",
    company_type: "solo",
    industry: "",
    employee_count_range: "1",
    budget_range: "0",
    technical_level: 1,
    speed_vs_quality: 8
  });

  function update<K extends keyof OnboardingInput>(key: K, value: OnboardingInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const parsed = onboardingSchema.safeParse(form);
    if (!parsed.success) {
      setLoading(false);
      setMessage(parsed.error.issues[0]?.message ?? "Formulaire invalide.");
      return;
    }

    try {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) throw new Error("Session invalide.");

      const { data: org, error: orgErr } = await supabase
        .from("organisations")
        .insert({ name: parsed.data.organisation_name })
        .select("id")
        .single();
      if (orgErr) throw orgErr;

      const { error: memberErr } = await supabase
        .from("memberships")
        .insert({ organisation_id: org.id, user_id: auth.user.id, role: "owner" });
      if (memberErr) throw memberErr;

      const { error: profileErr } = await supabase.from("profiles").upsert({
        id: auth.user.id,
        email: userEmail,
        first_name: parsed.data.first_name,
        last_name: parsed.data.last_name,
        company_type: parsed.data.company_type,
        industry: parsed.data.industry,
        employee_count_range: parsed.data.employee_count_range,
        budget_range: parsed.data.budget_range,
        technical_level: parsed.data.technical_level,
        speed_vs_quality: parsed.data.speed_vs_quality
      });
      if (profileErr) throw profileErr;

      window.location.href = "/app";
    } catch (err: any) {
      setMessage(err?.message ?? "Erreur inconnue.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {message ? <Alert>{message}</Alert> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="organisation_name">Nom de l’organisation</Label>
          <Input id="organisation_name" value={form.organisation_name} onChange={(e) => update("organisation_name", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="first_name">Prénom</Label>
          <Input id="first_name" value={form.first_name} onChange={(e) => update("first_name", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last_name">Nom</Label>
          <Input id="last_name" value={form.last_name} onChange={(e) => update("last_name", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company_type">Type d’entreprise</Label>
          <select
            id="company_type"
            className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            value={form.company_type}
            onChange={(e) => update("company_type", e.target.value as any)}
          >
            {COMPANY_TYPES.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Secteur</Label>
          <Input id="industry" value={form.industry} onChange={(e) => update("industry", e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="employee_count_range">Taille</Label>
          <select
            id="employee_count_range"
            className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            value={form.employee_count_range}
            onChange={(e) => update("employee_count_range", e.target.value as any)}
          >
            {["1","2-5","6-10","11-50","51-200","200+"].map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget_range">Budget</Label>
          <select
            id="budget_range"
            className="h-10 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
            value={form.budget_range}
            onChange={(e) => update("budget_range", e.target.value as any)}
          >
            {[
              ["0","0 € (bootstrapped)"],
              ["1-500","1–500 € / mois"],
              ["500-2000","500–2 000 € / mois"],
              ["2000-10000","2 000–10 000 € / mois"],
              ["10000+","10 000 €+ / mois"]
            ].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="technical_level">Niveau technique (0–5)</Label>
          <Input id="technical_level" type="number" min={0} max={5} value={form.technical_level} onChange={(e) => update("technical_level", Number(e.target.value) as any)} />
          <p className="text-xs text-neutral-500">0 = aucun • 5 = très technique.</p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="speed_vs_quality">Vitesse ↔ Qualité (0–10)</Label>
          <Input id="speed_vs_quality" type="number" min={0} max={10} value={form.speed_vs_quality} onChange={(e) => update("speed_vs_quality", Number(e.target.value) as any)} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-neutral-500">Connecté : {userEmail}</div>
        <Button type="submit" disabled={loading}>{loading ? "..." : "Créer et continuer"}</Button>
      </div>
    </form>
  );
}
