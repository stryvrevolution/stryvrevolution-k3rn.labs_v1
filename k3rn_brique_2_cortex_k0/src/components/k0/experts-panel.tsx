import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function ExpertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Équipe (k0)</CardTitle>
        <CardDescription>Experts (LLM) — placeholder V1.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-neutral-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Stratège</div>
            <div className="text-xs text-neutral-500">Challenge la vision</div>
          </div>
          <span className="text-xs text-neutral-500">offline</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Produit</div>
            <div className="text-xs text-neutral-500">Structure le besoin</div>
          </div>
          <span className="text-xs text-neutral-500">offline</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Marché</div>
            <div className="text-xs text-neutral-500">Concurrence & différenciation</div>
          </div>
          <span className="text-xs text-neutral-500">offline</span>
        </div>

        <div className="rounded-md border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-600">
          Les experts arriveront en brique ultérieure. Ici, on verrouille la collecte (ingestion) et la structure Cortex.
        </div>
      </CardContent>
    </Card>
  );
}
