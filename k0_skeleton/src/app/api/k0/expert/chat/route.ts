import { NextRequest } from "next/server";
import { callLLM } from "@/app/api/_shared/provider";
import { ingestText } from "@/app/api/_shared/k0Db";
import { experts } from "@/app/api/_shared/experts";

export async function POST(req: NextRequest) {
  const { projectId, sessionId, expertId, message, userId } = await req.json();
  type ExpertId = keyof typeof experts;
  const id = expertId as ExpertId;
  const expert = experts[id];
  if (!expert)
    return Response.json({ error: "Expert inconnu" }, { status: 400 });
  const prompt = `${expert.prompt}\n${message}`;
  const llmResponse = await callLLM(prompt);
  // Persist LLM response as ingestion (llm_raw)
  const ingestionId = await ingestText(
    projectId,
    sessionId,
    llmResponse,
    userId,
  );
  return Response.json({ ingestionId, llmResponse });
}
