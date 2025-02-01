import React from "react";
import Image from "next/image";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ShinigamiLogo from "/public/icons/shinigami_ai_logo.svg";

interface Props {
  data: string;
}

export default function SyntaxHighlightComponent({ data }: Props) {
  if (!data) return null;

  return (
    <div className="max-h-80 w-full overflow-y-auto flex items-start gap-4 ">
      <Image className="size-10 bg-white rounded-full" src={ShinigamiLogo} alt="Logo Shinigami AI" />
      <SyntaxHighlight language="swift" wrapLongLines={true} style={a11yLight} className="rounded-lg p-2">
        {data}
      </SyntaxHighlight>
    </div>
  );
}
