import { requireOnboarded } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { K0Layout } from "@/components/k0/k0-layout";
import { ExpertsPanel } from "@/components/k0/experts-panel";
import { IngestionPanel } from "@/components/k0/ingestion-panel";
import { CortexPanel } from "@/components/k0/cortex-panel";
import { LedgerPanel } from "@/components/k0/ledger-panel";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function K0Page({ params }: { params: { projectId: string } }) {
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

  const { data: artefacts } = await supabase
    .from("artefacts")
    .select("id,project_id,kind,source_name,storage_path,raw_text,meta,created_by,created_at")
    .eq("project_id", project.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>k0 — Brainstorming & Ingestion</CardTitle>
          <CardDescription>
            Espace de coworking (V1). Ingestion + Cortex + Ledger.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-neutral-700">
          Projet : <span className="font-medium">{project.name}</span>
        </CardContent>
      </Card>

      <K0Layout
        left={<ExpertsPanel />}
        center={<CortexPanel artefacts={(artefacts ?? []) as any} />}
        right={
          <div className="space-y-6">
            <IngestionPanel projectId={project.id} />
            <LedgerPanel projectId={project.id} />
          </div>
        }
      />
    </div>
  );
}
