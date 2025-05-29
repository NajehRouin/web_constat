// src/components/forms/ErrorMessage.jsx
import React from "react";
import AppText from "./AppText";

function ErrorMessage({ error, visible, id }) {
  if (!visible || !error) return null;
  return (
    <AppText className="text-red-500" role="alert" id={id}>
      {error}
    </AppText>
  );
}

export default ErrorMessage;