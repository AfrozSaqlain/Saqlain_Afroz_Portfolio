"use client";

import React from "react";
import katex from "katex";

interface MathProps {
  math: string;
  display?: boolean;
}

export const Math: React.FC<MathProps> = ({ math, display = false }) => {
  try {
    const html = katex.renderToString(math, {
      throwOnError: false,
      displayMode: display,
    });
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  } catch {
    return <span>{math}</span>;
  }
};

export default Math;
