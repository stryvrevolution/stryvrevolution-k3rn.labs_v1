import { supabase } from "./supabaseClient";

// Sessions k0
export async function startK0Session(projectId: string, startedBy: string) {
  const { data, error } = await supabase
    .from("k0_sessions")
    .insert({ project_id: projectId, started_by: startedBy })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

// Ingestion texte
export async function ingestText(
  projectId: string,
  sessionId: string,
  text: string,
  userId: string,
) {
  const { data, error } = await supabase
    .from("k0_ingestions")
    .insert({
      project_id: projectId,
      session_id: sessionId,
      source: "user_text",
      payload: { text },
      created_by: userId,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

// Score k0
export async function insertK0Score(
  projectId: string,
  sessionId: string,
  score: number,
  breakdown: any,
  userId: string,
) {
  const { data, error } = await supabase
    .from("k0_scores")
    .insert({
      project_id: projectId,
      session_id: sessionId,
      score,
      breakdown,
      created_by: userId,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

// Validation k0
export async function validateK0(
  projectId: string,
  sessionId: string,
  validatedBy: string,
) {
  const { data, error } = await supabase
    .from("k0_validations")
    .insert({
      project_id: projectId,
      session_id: sessionId,
      validated_by: validatedBy,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}

// Members
export async function addProjectMember(
  projectId: string,
  userId: string,
  role: "owner" | "collaborator" | "viewer",
) {
  const { data, error } = await supabase
    .from("project_members")
    .insert({
      project_id: projectId,
      user_id: userId,
      role,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id;
}
