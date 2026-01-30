import Link from "next/link";
import { requireOnboarded } from "@/lib/auth/guards";
import { createClient } from "@/lib/supabase/server";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, organisationId } = await requireOnboarded();
  const supabase = createClient();
  const { data: org } = await supabase.from("organisations").select("id,name").eq("id", organisationId).single();

  return (
    <AppShell
      orgName={org?.name ?? "Organisation"}
      userEmail={user.email ?? ""}
      headerRight={
        <>
          <Link href="/app/projects/new"><Button size="sm">Nouveau projet</Button></Link>
          <form action="/auth/signout" method="post">
            <Button variant="secondary" size="sm" type="submit">Déconnexion</Button>
          </form>
        </>
      }
    >
      {children}
    </AppShell>
  );
}
