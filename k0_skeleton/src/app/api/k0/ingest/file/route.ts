import { NextRequest } from "next/server";
import { ingestFile } from "@/app/api/_shared/k0Db";

export async function POST(req: NextRequest) {
  // V1 mock: attend JSON avec métadonnées, pas de multipart réel
  const { projectId, sessionId, files, userId } = await req.json();
  const ingestionId = await ingestFile(projectId, sessionId, files, userId);
  return Response.json({ ingestionId });
}
