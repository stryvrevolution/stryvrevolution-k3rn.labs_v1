import React from "react";

export default function ChatPanel() {
  return (
    <section>
      <h2>Session k0</h2>
      <div
        style={{ border: "1px solid #eee", minHeight: 120, marginBottom: 8 }}
      >
        {/* Zone de chat mockée */}
        <div>Message utilisateur</div>
        <div>Réponse expert</div>
      </div>
      <textarea
        placeholder="Votre question..."
        style={{ width: "100%", minHeight: 40 }}
      />
      <button style={{ marginTop: 8 }}>Envoyer</button>
    </section>
  );
}
