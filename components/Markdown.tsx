import React from "react";
import ReactMarkdown from "react-markdown";

export const Markdown: React.FC<{ source: any }> = (props) => {
  return (
    <div style={{ width: "100%" }}>
      <ReactMarkdown children={props.source} />
    </div>
  );
};
