import React from "react";

// Simple rich text renderer for Strapi content
export function CustomMDX({ source }: { source: string }) {
  return (
    <div 
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: source }}
    />
  );
}

