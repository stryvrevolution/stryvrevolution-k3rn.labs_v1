import { requireOnboarded } from "@/lib/auth/guards";
import { CreateProjectForm } from "@/components/projects/create-project-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function NewProjectPage() {
  await requireOnboarded();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouveau projet</CardTitle>
        <CardDescription>Créer un conteneur projet. Le Cortex sera ajouté en brique 2.</CardDescription>
      </CardHeader>
      <CardContent><CreateProjectForm /></CardContent>
    </Card>
  );
}
