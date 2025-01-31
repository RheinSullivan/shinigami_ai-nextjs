import React from "react";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Props {
  data: string;
}

export default function SyntaxHighlightComponent({ data }: Props) {
  if (!data) return null;

  return (
    <div className="max-h-80 w-full bg-white overflow-y-auto border rounded-md p-2">
      <SyntaxHighlight language="swift" wrapLongLines={true} style={a11yLight}>
        {data}
      </SyntaxHighlight>
    </div>
  );
}
