import { requireOnboarded } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default async function SettingsPage() {
  const { user } = await requireOnboarded();
  const supabase = createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("first_name,last_name,company_type,industry,budget_range,technical_level,speed_vs_quality")
    .eq("id", user.id)
    .single();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres</CardTitle>
        <CardDescription>User Kernel (lecture seule en V1).</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-neutral-700 space-y-2">
        <div>Nom : {profile?.first_name} {profile?.last_name}</div>
        <div>Type : {profile?.company_type}</div>
        <div>Secteur : {profile?.industry}</div>
        <div>Budget : {profile?.budget_range}</div>
        <div>Niveau technique : {profile?.technical_level}/5</div>
        <div>Vitesse vs qualité : {profile?.speed_vs_quality}/10</div>
      </CardContent>
    </Card>
  );
}
