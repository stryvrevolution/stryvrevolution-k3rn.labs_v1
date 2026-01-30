import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireUser() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/auth");
  return data.user;
}

export async function requireOnboarded() {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) redirect("/auth");

  const { data: profile } = await supabase.from("profiles").select("id").eq("id", userData.user.id).maybeSingle();
  const { data: membership } = await supabase
    .from("memberships")
    .select("id, organisation_id")
    .eq("user_id", userData.user.id)
    .limit(1)
    .maybeSingle();

  if (!profile || !membership) redirect("/onboarding");
  return { user: userData.user, organisationId: membership.organisation_id as string };
}
