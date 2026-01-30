import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AuthForm } from "@/components/auth/auth-form";

export default function AuthPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Connexion</CardTitle>
            <CardDescription>Accède à ton espace <span className="font-medium">k3rn.labs</span>.</CardDescription>
          </CardHeader>
          <CardContent><AuthForm /></CardContent>
        </Card>
      </div>
    </div>
  );
}
