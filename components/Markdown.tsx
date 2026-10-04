import React from "react";
import ReactMarkdown from "react-markdown";
import Code from "@components/Code";
import Image from "next/image";

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
          img({ src, alt }) {
            try {
              // parse the URL query params (using a dummy base for relative paths)
              const imageSrc = typeof src === "string" ? src : "";
              const url = new URL(imageSrc, "https://localhost");
              const widthParam = url.searchParams.get("width");
              const heightParam = url.searchParams.get("height");

              const resolvedWidth = widthParam ? parseInt(widthParam, 10) : 800;
              const resolvedHeight: number = heightParam
                ? parseInt(heightParam, 10)
                : 450;

              const resolvedSrc = url.pathname;
              return (
                <span className="flex flex-col">
                  <Image
                    src={resolvedSrc}
                    alt={alt || "Markdown image"}
                    width={resolvedWidth}
                    height={resolvedHeight}
                    className="block rounded-2xl w-full max-w-sm h-auto mx-auto mt-2 mb-2"
                  />

                  {alt && <span className="text-sm text-center">{alt}</span>}
                </span>
              );
            } catch (e) {
              console.error(
                "Failed to parse Markdown image source dimensions",
                e,
              );
            }
          },
        }}
      >
        {props.content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
