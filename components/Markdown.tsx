import React from "react";
import ReactMarkdown from "react-markdown";
import Code from "@components/Code";
import Image from "next/image";
import rehypeRaw from "rehype-raw";

type MarkdownProps = {
  content: string;
  customClassName?: string;
};

const Markdown: React.FC<MarkdownProps> = (props) => {
  return (
    <div className={`prose ${props.customClassName}`}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
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

              // one of the tailwind sizes below
              const sizeParam = url.searchParams.get("size");

              // tailwind cannot doesnt allow dynamic string interpolation for the class names,
              // so need to define a mapping here
              const maxWidthMap = {
                "3xs": "max-w-3xs",
                "2xs": "max-w-2xs",
                xs: "max-w-xs",
                sm: "max-w-sm",
                md: "max-w-md",
                lg: "max-w-lg",
                xl: "max-w-xl",
              };
              const maxWidthClass = maxWidthMap[sizeParam] ?? "max-w-sm";

              const resolvedSrc = url.pathname;
              return (
                <span className="flex flex-col">
                  <Image
                    src={resolvedSrc}
                    alt={alt || "Markdown image"}
                    width={resolvedWidth}
                    height={resolvedHeight}
                    className={`rounded-2xl w-full ${maxWidthClass} h-auto mx-auto mt-2 mb-2`}
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
          details: ({ node, ...props }) => (
            <details
              className="prose-sm group rounded-lg border border-sky-200 bg-blue-100 px-4 py-2 dark:border-sky-700
                     open:pb-4 [&>*:last-child]:mb-0"
              {...props}
            />
          ),
          summary: ({ node, children, ...props }) => (
            <summary
              className="flex cursor-pointer list-none items-center justify-between font-semibold
                     [&::-webkit-details-marker]:hidden"
              {...props}
            >
              {children}
              <svg
                className="h-4 w-4 transition-transform group-open:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
          ),
        }}
      >
        {props.content}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
