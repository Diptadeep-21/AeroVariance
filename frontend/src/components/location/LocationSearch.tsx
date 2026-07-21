"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  onSearch: (query: string) => void;
  loading?: boolean;
}

export default function LocationSearch({
  onSearch,
  loading = false,
}: Props) {
  const [query, setQuery] = useState("");

  const submit = () => {
    const q = query.trim();

    if (!q) return;

    onSearch(q);
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        value={query}
        placeholder="Search any location..."
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit();
          }
        }}
        className="w-72"
      />

      <Button
        onClick={submit}
        disabled={loading}
      >
        <Search className="mr-2 h-4 w-4" />
        Search
      </Button>
    </div>
  );
}