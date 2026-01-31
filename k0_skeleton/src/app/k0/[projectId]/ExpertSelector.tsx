"use client";
import React from "react";

type Expert = { id: string; label: string; role?: string };

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
      <div>
        {experts.map((expert) => (
          <label key={expert.id} style={{ display: "block", marginBottom: 8 }}>
            <input
              type="radio"
              name="expert"
              value={expert.id}
              checked={value === expert.id}
              onChange={() => onChange(expert.id)}
              disabled={disabled}
            />
            <span style={{ marginLeft: 8, fontWeight: 600 }}>
              {expert.label}
            </span>
            {expert.role && (
              <div style={{ marginLeft: 26, color: "#666", fontSize: 12 }}>
                {expert.role}
              </div>
            )}
            <div
              style={{
                marginLeft: 26,
                fontSize: 12,
                color: value === expert.id ? "#0a0" : "#888",
              }}
            >
              {value === expert.id ? "actif" : "inactif"}
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}
