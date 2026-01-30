import Link from "next/link";
import { requireOnboarded } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function ProjectPage({ params }: { params: { projectId: string } }) {
  const { organisationId } = await requireOnboarded();
  const supabase = createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("id,name,created_at")
    .eq("organisation_id", organisationId)
    .eq("id", params.projectId)
    .single();

  if (!project) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Projet introuvable</CardTitle>
          <CardDescription>Accès refusé ou projet inexistant.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const { count: artefactsCount } = await supabase
    .from("artefacts")
    .select("id", { count: "exact", head: true })
    .eq("project_id", project.id);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>Vue projet (V1+). Cortex et labs démarrent maintenant.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-neutral-700 space-y-2">
          <div>ID : <span className="font-mono text-xs">{project.id}</span></div>
          <div>Créé : {new Date(project.created_at).toLocaleString("fr-FR")}</div>
          <div>Artefacts Cortex : <span className="font-medium">{artefactsCount ?? 0}</span></div>

          <div className="pt-2">
            <Link href={`/app/projects/${project.id}/k0`}>
              <Button>Ouvrir k0</Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Raccourcis</CardTitle>
          <CardDescription>Actions.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-neutral-600 space-y-2">
          <div>• Ingestion (texte / fichiers)</div>
          <div>• Decision Ledger</div>
          <div>• Cortex (couche raw)</div>
        </CardContent>
      </Card>
    </div>
  );
}
