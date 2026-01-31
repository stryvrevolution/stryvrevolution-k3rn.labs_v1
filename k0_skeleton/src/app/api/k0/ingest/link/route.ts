import { NextRequest } from "next/server";
import { ingestLink } from "@/app/api/_shared/k0Db";

export async function POST(req: NextRequest) {
  const { projectId, sessionId, url, userId } = await req.json();
  const ingestionId = await ingestLink(projectId, sessionId, url, userId);
  return Response.json({ ingestionId });
}
