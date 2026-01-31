import { NextRequest } from "next/server";
import { insertK0Score } from "@/app/api/_shared/k0Db";

export async function POST(req: NextRequest) {
  const { projectId, sessionId, userId } = await req.json();
  // Mock scoring : score 50, breakdown factice
  const score = 50;
  const breakdown = {
    completude: 15,
    diversite: 15,
    contradictions: 10,
    gaps: 10,
  };
  const scoreId = await insertK0Score(
    projectId,
    sessionId,
    score,
    breakdown,
    userId,
  );
  return Response.json({ score, breakdown, scoreId });
}
