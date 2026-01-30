import Link from "next/link";
import { requireOnboarded } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProjectsPage() {
  const { organisationId } = await requireOnboarded();
  const supabase = createClient();

  const { data: projects } = await supabase
    .from("projects")
    .select("id,name,created_at")
    .eq("organisation_id", organisationId)
    .order("created_at", { ascending: false });

  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-3 md:flex-row md:items-center">
        <div>
          <CardTitle>Projets</CardTitle>
          <CardDescription>Chaque projet possède un Cortex vivant.</CardDescription>
        </div>
        <Link href="/app/projects/new"><Button size="sm">Créer un projet</Button></Link>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-neutral-100 rounded-md border border-neutral-200">
          {(projects ?? []).map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4">
              <div>
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs text-neutral-500">{new Date(p.created_at).toLocaleString("fr-FR")}</div>
              </div>
              <Link className="text-sm text-neutral-700 hover:text-neutral-900" href={`/app/projects/${p.id}`}>Ouvrir →</Link>
            </div>
          ))}
          {(!projects || projects.length === 0) && <div className="p-4 text-sm text-neutral-500">Aucun projet pour l’instant.</div>}
        </div>
      </CardContent>
    </Card>
  );
}
