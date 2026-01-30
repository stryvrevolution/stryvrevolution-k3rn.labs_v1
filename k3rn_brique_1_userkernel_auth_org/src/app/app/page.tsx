import { requireOnboarded } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function AppHome() {
  const { user, organisationId } = await requireOnboarded();
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name,last_name,technical_level,speed_vs_quality")
    .eq("id", user.id)
    .single();

  const { count } = await supabase
    .from("projects")
    .select("id", { count: "exact", head: true })
    .eq("organisation_id", organisationId);

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Aperçu</CardTitle>
          <CardDescription>Base opérationnelle. Les labs arriveront après (k0, k1…).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-neutral-700">
          <div>Profil : <span className="font-medium">{profile?.first_name} {profile?.last_name}</span></div>
          <div>Niveau technique : <span className="font-medium">{profile?.technical_level ?? 0}/5</span></div>
          <div>Vitesse vs qualité : <span className="font-medium">{profile?.speed_vs_quality ?? 0}/10</span></div>
          <div>Projets actifs : <span className="font-medium">{count ?? 0}</span></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Activité</CardTitle>
          <CardDescription>Journal (V1 minimal).</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-neutral-600">
          À venir : timeline des décisions, événements et progrès.
        </CardContent>
      </Card>
    </div>
  );
}
