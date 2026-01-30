export type ArtefactKind = "text" | "file" | "link" | "image" | "audio" | "zip" | "other";
export type CortexLayer = "raw" | "clean" | "structured" | "validated";

export type Artefact = {
  id: string;
  project_id: string;
  kind: ArtefactKind;
  source_name: string | null;
  storage_path: string | null;
  raw_text: string | null;
  meta: Record<string, any>;
  created_by: string;
  created_at: string;
};

export type ArtefactLayer = {
  id: string;
  artefact_id: string;
  layer: CortexLayer;
  content: Record<string, any>;
  created_at: string;
};

export type Decision = {
  id: string;
  project_id: string;
  scope: "global" | "project" | "lab";
  lab_code: string | null;
  question: string;
  options: any[];
  selection: any;
  rationale: string | null;
  created_by: string;
  created_at: string;
};
