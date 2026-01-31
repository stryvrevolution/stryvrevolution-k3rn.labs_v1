import { NextRequest } from "next/server";
import { ingestText } from "@/app/api/_shared/k0Db";

export async function POST(req: NextRequest) {
  const { projectId, sessionId, text, userId } = await req.json();
  const ingestionId = await ingestText(projectId, sessionId, text, userId);
  return Response.json({ ingestionId });
}
