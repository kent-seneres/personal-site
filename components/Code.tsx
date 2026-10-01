import React from "react";
import { PrismLight, PrismAsyncLight } from "react-syntax-highlighter";
import darcula from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";

const SyntaxHighlighter: any =
  typeof window === "undefined" ? PrismLight : PrismAsyncLight;

type CodeProps = {
  language?: string;
  value: string;
};

const Code: React.FC<CodeProps> = (props) => {
  const language = props.language ?? "ts";
  const value = props.value;

  return (
    <SyntaxHighlighter
      language={language === "ts" ? "typescript" : language}
      style={darcula}
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default React.memo(Code);
