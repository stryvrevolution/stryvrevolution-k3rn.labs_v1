import { NextRequest } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const { projectId, sessionId, cortex, transcript } = await req.json();
  const baseDir = path.join(process.cwd(), "data", "k0", projectId, sessionId);
  await mkdir(baseDir, { recursive: true });
  // cortex_k0.json
  await writeFile(
    path.join(baseDir, "cortex_k0.json"),
    JSON.stringify(cortex ?? {}, null, 2),
    "utf8",
  );
  // k0_session.log
  const log = Array.isArray(transcript)
    ? transcript.map((t: any) => `[${t.role}] ${t.text}`).join("\n")
    : "";
  await writeFile(path.join(baseDir, "k0_session.log"), log, "utf8");
  // k0_summary.md
  const summary = `# k0 Summary\n\nProject: ${projectId}\n\nSession: ${sessionId}\n\nNodes: ${cortex?.nodes?.length ?? 0}\n`;
  await writeFile(path.join(baseDir, "k0_summary.md"), summary, "utf8");
  return Response.json({ ok: true, dir: baseDir });
}
