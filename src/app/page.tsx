"use client";
import { useState } from "react";
import { requestGroq } from "@/utils/groq";
import Image from "next/image";
import ShinigamiLogo from "/public/icons/shinigami_ai_logo.svg";
import ToastProvider from "@/component/react_toaster/toaster";
import { showSuccessToast, showErrorToast } from "@/component/react_toaster/toasterHandler";
import SyntaxHighlightComponent from "@/component/syntax_highlighter/highlight";

export default function Home() {
  const [content, setContent] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (content.trim() === "") return;

    setLoading(true);
    try {
      const groqAI = await requestGroq(content);
      setData(groqAI ?? "");
      showSuccessToast();
      setContent("");
    } catch {
      showErrorToast();
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <main className="flex flex-col justify-center items-center  max-w-xl min-h-[100vh] w-full mx-auto">
      <ToastProvider />

      <div className="flex space-x-5 items-center fixed top-16">
        <Image className="size-20" src={ShinigamiLogo} alt="Logo Shinigami AI" />
        <div className="border py-8" />
        <div className="flex-col">
          <h1 className="text-3xl font-bold text-red">Shinigami AI</h1>
          <p className="text-lg italic">Rhein Sullivan</p>
        </div>
      </div>

      <div className="mx-auto my-5 max-w-xl w-full">
        <SyntaxHighlightComponent data={data} />
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex w-full max-w-2xl justify-center fixed bottom-36">
        <input
          placeholder="Message Shinigami AI"
          type="text"
          className="bg-white py-3 px-4 rounded-l-md text-md text-black outline-none flex-1"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="bg-red hover:bg-blue-800 hover:italic hover:font-bold py-3 px-4 font-bold rounded-r-md flex items-center justify-center min-w-[80px]" onClick={handleSubmit} type="button" disabled={loading}>
          {loading ? <span className="loader"></span> : "SEND"}
        </button>
      </form>

      <footer className="text-center text-gray-400 pt-4 mt-10 border-t border-gray-700 fixed w-[50%] bottom-12">
        Copyright © 2024 <span className="text-white font-semibold italic">Rhein Sullivan</span>. All rights reserved.
      </footer>
    </main>
  );
}
