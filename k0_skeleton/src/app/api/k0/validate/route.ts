import { NextRequest } from "next/server";
import { validateK0 } from "@/app/api/_shared/k0Db";

export async function POST(req: NextRequest) {
  const { projectId, sessionId, validatedBy } = await req.json();
  const validationId = await validateK0(projectId, sessionId, validatedBy);
  return Response.json({ validationId });
}
