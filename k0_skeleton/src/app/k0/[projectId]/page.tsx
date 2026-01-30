import React from "react";
import ExpertSelector from "./ExpertSelector";
import ChatPanel from "./ChatPanel";
import CortexPreview from "./CortexPreview";
import ScorePanel from "./ScorePanel";
import ValidateButton from "./ValidateButton";

export default function K0ProjectPage() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr",
        gap: 24,
        minHeight: 480,
      }}
    >
      <div>
        <ExpertSelector />
      </div>
      <div>
        <ChatPanel />
        <CortexPreview />
        <ScorePanel />
      </div>
      <div>
        <ValidateButton />
      </div>
    </div>
  );
}
