import React from "react";
import { experts } from "@/llm/experts";

export default function ExpertSelector() {
  return (
    <section>
      <h2>Experts</h2>
      <ul>
        {Object.values(experts).map((expert) => (
          <li key={expert.id}>{expert.label}</li>
        ))}
      </ul>
    </section>
  );
}
