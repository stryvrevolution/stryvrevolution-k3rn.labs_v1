import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { Artefact } from "@/lib/cortex/types";

export function CortexPanel({ artefacts }: { artefacts: Artefact[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cortex</CardTitle>
        <CardDescription>Artefacts du projet (V1).</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-neutral-100 rounded-md border border-neutral-200">
          {artefacts.map((a) => (
            <div key={a.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  {a.kind.toUpperCase()} {a.source_name ? `• ${a.source_name}` : ""}
                </div>
                <div className="text-xs text-neutral-500">{new Date(a.created_at).toLocaleString("fr-FR")}</div>
              </div>
              <div className="mt-2 text-sm text-neutral-700">
                {a.raw_text ? (
                  <span className="line-clamp-3 whitespace-pre-wrap">{a.raw_text}</span>
                ) : a.storage_path ? (
                  <span className="font-mono text-xs">{a.storage_path}</span>
                ) : (
                  <span className="text-neutral-500">—</span>
                )}
              </div>
            </div>
          ))}
          {artefacts.length === 0 && <div className="p-4 text-sm text-neutral-500">Aucun artefact. Commence par ingérer du texte ou des fichiers.</div>}
        </div>
      </CardContent>
    </Card>
  );
}
