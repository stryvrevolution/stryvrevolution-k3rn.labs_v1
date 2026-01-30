import * as React from "react";
import { Card } from "@/components/ui/card";

export function K0Layout({
  left,
  center,
  right
}: {
  left: React.ReactNode;
  center: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <div className="lg:col-span-3">{left}</div>
      <div className="lg:col-span-6">{center}</div>
      <div className="lg:col-span-3">{right}</div>
    </div>
  );
}
