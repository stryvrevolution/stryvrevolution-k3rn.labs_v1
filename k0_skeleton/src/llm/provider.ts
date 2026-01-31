// Abstraction LLM (mock V1)
export async function callLLM(prompt: string): Promise<string> {
  // Mock : retourne une réponse déterministe
  return `Réponse LLM (mock) pour : ${prompt}`;
}
