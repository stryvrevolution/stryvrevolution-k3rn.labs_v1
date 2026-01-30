import { requireOnboarded } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>Vue projet (V1). Cortex et labs arriveront ensuite.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-neutral-700 space-y-2">
        <div>ID : <span className="font-mono text-xs">{project.id}</span></div>
        <div>Créé : {new Date(project.created_at).toLocaleString("fr-FR")}</div>
        <div className="text-neutral-500">À venir : Cortex, décisions, labs, mind map, zip master.</div>
      </CardContent>
    </Card>
  );
}
