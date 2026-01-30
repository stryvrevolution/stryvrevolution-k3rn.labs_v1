import { requireUser } from "@/lib/auth/guards";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default async function OnboardingPage() {
  const user = await requireUser();
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Onboarding</CardTitle>
            <CardDescription>Avant de démarrer, on crée ton profil et ton organisation.</CardDescription>
          </CardHeader>
          <CardContent><OnboardingForm userEmail={user.email ?? ""} /></CardContent>
        </Card>
      </div>
    </div>
  );
}
