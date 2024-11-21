import React from "react";
import { globalStyles } from "./globalStyles";

// Scoped styles wrapper
const ScopedStyles: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  globalStyles(); // Apply styles dynamically here
  return <>{children}</>;
};

export default ScopedStyles;


