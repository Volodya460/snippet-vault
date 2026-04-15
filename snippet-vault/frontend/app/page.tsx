"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSnippets } from "@/services/snippet.service";
import { useDebounce } from "@/hooks/useDebounce";
import { Snippet } from "./types/snippet";
import Link from "next/link";

export default function Home() {
  const [search, setSearch] = useState("");
  const [tag, setTag] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useQuery<Snippet[]>({
    queryKey: ["snippets", debouncedSearch, tag],
    queryFn: () => getSnippets(debouncedSearch, tag),
  });

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Snippets</h1>
      <div className="flex justify-between items-center mb-4">
        <Link href="/snippets/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            + Create
          </button>
        </Link>
      </div>


      <input
        className="border p-2 w-full mb-2"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      <input
        className="border p-2 w-full mb-4"
        placeholder="Filter by tag..."
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      />


      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error loading data</p>}
      {!isLoading && !data?.length && <p>No snippets found</p>}


      <div className="flex flex-col gap-2">
        {data?.map((s) => (
          <Link href={`/snippets/${s._id}`} key={s._id}>
            <div className="border rounded p-3 hover:shadow transition cursor-pointer">
              <h3 className="font-semibold hover:underline">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.content}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
