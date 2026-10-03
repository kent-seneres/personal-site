import React from "react";
import ReactMarkdown from "react-markdown";
import Code from "@components/Code";

type MarkdownProps = {
  content: string;
  customClassName?: string;
};

const Markdown: React.FC<MarkdownProps> = (props) => {
  return (
    <div className={`prose ${props.customClassName}`}>
      <ReactMarkdown
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className ?? "") ?? [];
            const language = match[1];
            return (
              <Code language={language} value={String(children).trimEnd()} />
            );
          },
        }}
      >
        {props.content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
