# Endpoint POST /api/k0/expert/chat

- Appel LLM (mock), persist llm_raw
- Body : { projectId, sessionId, expertId, message, userId }
- Réponse : { ingestionId, llmResponse }
- Preuve : log d’appel, exemple curl
