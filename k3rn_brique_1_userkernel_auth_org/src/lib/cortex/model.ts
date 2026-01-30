// Cortex Core Model — Brique 1

export type CortexLayer = "brut" | "interprete" | "valide";

export type CortexNode = {
  id: string;
  project_id: string;
  type: string;
  content: any;
  layer: CortexLayer;
  created_by: string;
  created_at: string;
};

export type CortexHistory = {
  id: string;
  node_id: string;
  action: string;
  from_layer: CortexLayer;
  to_layer: CortexLayer;
  author_id: string;
  timestamp: string;
};

export type Project = {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  created_at: string;
};
