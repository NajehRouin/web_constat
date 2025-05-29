// src/components/forms/AppText.jsx
import React from "react";

function AppText({ children, style, className, ...otherProps }) {
  return (
    <span
      className={`text-[#ff6347] text-lg font-roboto ${className || ""}`}
      style={style}
      {...otherProps}
    >
      {children}
    </span>
  );
}

export default AppText;