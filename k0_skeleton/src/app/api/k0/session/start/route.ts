import { NextRequest } from "next/server";
import { startK0Session } from "@/app/api/_shared/k0Db";

export async function POST(req: NextRequest) {
  const { projectId, startedBy } = await req.json();
  const sessionId = await startK0Session(projectId, startedBy);
  return Response.json({ sessionId });
}
