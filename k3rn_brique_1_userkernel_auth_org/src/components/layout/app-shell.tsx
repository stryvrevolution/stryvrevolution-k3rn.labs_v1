import * as React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/ui/cn";

const NAV = [
  { href: "/app", label: "Aperçu" },
  { href: "/app/projects", label: "Projets" },
  { href: "/app/settings", label: "Paramètres" }
];

export function AppShell({
  orgName,
  userEmail,
  headerRight,
  children
}: {
  orgName: string;
  userEmail: string;
  headerRight?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen">
        <aside className="w-[280px] border-r border-neutral-200 bg-white">
          <div className="p-5">
            <div className="text-sm font-semibold tracking-tight">k3rn.labs</div>
            <div className="mt-2 text-xs text-neutral-500">Organisation</div>
            <div className="text-sm">{orgName}</div>
          </div>
          <Separator />
          <nav className="p-3">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn("block rounded-md px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors")}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto p-5 text-xs text-neutral-500">
            <div className="truncate">{userEmail}</div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4">
            <div className="text-sm font-medium text-neutral-800">Espace de travail</div>
            <div className="flex items-center gap-2">{headerRight}</div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
