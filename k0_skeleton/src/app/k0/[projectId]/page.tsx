import React from "react";
import ClientRoot from "./ClientRoot";

export default function K0ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  return <ClientRoot projectId={params.projectId} />;
}
