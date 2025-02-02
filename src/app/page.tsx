"use client";
import { useState } from "react";
import { requestGroq } from "@/utils/groq";
import Image from "next/image";
import ShinigamiLogo from "/public/icons/shinigami_ai_logo.svg";
import ToastProvider from "@/component/react_toaster/toaster";
import { showSuccessToast, showErrorToast } from "@/component/react_toaster/toasterHandler";
import SyntaxHighlightComponent from "@/component/syntax_highlighter/highlight";
import { MdOutlineStar } from "react-icons/md";

export default function Home() {
  const [content, setContent] = useState("");
  const [history, setHistory] = useState<{ question: string; answer: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (content.trim() === "") return;

    setLoading(true);
    try {
      const groqAI = await requestGroq(content);
      setHistory((prev) => [...prev, { question: content, answer: groqAI ?? "" }]);
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
    <main className="flex flex-col justify-center items-center max-w-[680px] min-h-[100vh] w-full mx-auto">
      {/* Toaster Notification */}
      <ToastProvider />

      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-[680px] fixed top-10 px-4">
        <figure className="flex items-center space-x-2.5 xl:space-x-5">
          <Image className="size-12 xl:size-20" src={ShinigamiLogo} alt="Logo Shinigami AI" />
          <div className="border-l-2 border-gray-700 py-6 xl:py-8" />
          <figcaption className="flex flex-col">
            <h1 className="text-lg xl:text-3xl font-bold text-red">Shinigami AI</h1>
            <p className="xl:text-lg italic text-gray-500">Rhein Sullivan</p>
          </figcaption>
        </figure>
        <a href="https://github.com/RheinSullivan/shinigami_ai-nextjs" className="flex items-center gap-x-1  py-2 px-3 lg:py-2 lg:px-4  rounded-md hover:bg-red bg-blue-800 text-sm lg:text-lg">
          <MdOutlineStar className="text-yellow-300 text-lg xl:text-2xl" /> Give me Star!
        </a>
      </div>

      {/* Message History */}
      <div className="w-full max-w-[680px] fixed top-40 overflow-y-auto rounded-lg space-y-5 py-10 px-4">
        {history.map((item, index) => (
          <div key={index} className="flex flex-col overscroll-y-auto items-end">
            <div className="flex self-end gap-4 max-w-[80%]">
              <span className="bg-gray-500 text-gray-300 p-3 rounded-lg">{item.question}</span>
              <Image className="size-9 xl:size-10 bg-white rounded-full" src={ShinigamiLogo} alt="Logo" />
            </div>
            <SyntaxHighlightComponent data={item.answer} />
          </div>
        ))}
      </div>

      {/* Form & Button */}
      <form onSubmit={(e) => e.preventDefault()} className="flex w-[90%] xl:w-full max-w-[680px] justify-center fixed bottom-32 lg:bottom-36">
        <input
          placeholder="Message Shinigami AI..."
          type="text"
          className="bg-white py-2 px-3 lg:py-3 lg:px-4 rounded-l-md text-md text-black outline-none flex-1"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="bg-red hover:bg-blue-800 hover:italic hover:font-bold py-2 px-3 lg:py-3 lg:px-4 font-bold rounded-r-md flex items-center justify-center text-sm lg:text-lg min-w-[80px]"
          onClick={handleSubmit}
          type="button"
          disabled={loading}
        >
          {loading ? <span className="loader"></span> : "SEND"}
        </button>
      </form>

      {/* Footer */}
      <footer className="text-center text-gray-500 pt-4 lg:text-lg text-sm mt-5 lg:mt-10 border-t-2 border-gray-700 fixed lg:w-[50%] bottom-12">
        Copyright © 2025{" "}
        <a href="https://www.rheinsullivan.web.id/" className="text-white font-semibold italic">
          Rhein Sullivan
        </a>
        . All rights reserved.
      </footer>
    </main>
  );
}
