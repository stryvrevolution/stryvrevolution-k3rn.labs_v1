"use client";
import React from "react";

export default function ValidateButton({
  onValidate,
  disabled,
}: {
  onValidate: () => void;
  disabled?: boolean;
}) {
  return (
    <section>
      <h2>Validation k0</h2>
      <button onClick={onValidate} disabled={disabled}>Valider k0</button>
    </section>
  );
}
