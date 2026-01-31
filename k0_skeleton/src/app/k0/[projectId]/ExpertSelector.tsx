"use client";
import React from "react";

type Expert = { id: string; label: string };

export default function ExpertSelector({
  experts,
  value,
  onChange,
  disabled,
}: {
  experts: Expert[];
  value: string | "";
  onChange: (id: string) => void;
  disabled?: boolean;
}) {
  return (
    <section>
      <h2>Experts</h2>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{ width: "100%" }}
      >
        <option value="">Choisir un expert…</option>
        {experts.map((expert) => (
          <option key={expert.id} value={expert.id}>
            {expert.label}
          </option>
        ))}
      </select>
    </section>
  );
}
