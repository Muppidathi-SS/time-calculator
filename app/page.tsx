"use client";

import { useCalculator } from "@/hooks/useCalculator";
import { useState } from "react";

export default function Home() {
  const { extractJson } = useCalculator();
  const [json, setJson] = useState("");

  return (
    <>
      <div className="w-260">
        {/* <textarea
          value={json}
          onChange={(e) => setJson(e.target.value)}
          placeholder="Paste your JSON here..."
          className="h-80 w-full rounded-lg border p-4 font-mono text-sm"
        /> */}
        <button
          onClick={() => extractJson(json)}
          className="bg-black text-white px-2 py-1 rounded-md cursor-pointer"
        >
          Extract Values
        </button>
      </div>
    </>
  );
}
