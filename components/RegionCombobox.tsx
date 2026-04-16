"use client";

import { useState, useRef, useEffect } from "react";
import { searchRegions, type Region } from "@/lib/regions";

type Props = {
  value: Region | null;
  onChange: (region: Region) => void;
  inputClass: string;
};

export default function RegionCombobox({ value, onChange, inputClass }: Props) {
  const [query, setQuery] = useState(value?.label ?? "");
  const [suggestions, setSuggestions] = useState<Region[]>([]);
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setQuery(value.label);
  }, [value]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    const results = searchRegions(q);
    setSuggestions(results);
    setOpen(results.length > 0);
    setHighlighted(0);
  }

  function handleSelect(region: Region) {
    onChange(region);
    setQuery(region.label);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions[highlighted]) handleSelect(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => query && setSuggestions(searchRegions(query)) && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="e.g. France, Europe, Japan…"
        className={`${inputClass} w-full placeholder:text-gray-400`}
        autoComplete="off"
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((r, i) => (
            <li
              key={r.key}
              onMouseDown={() => handleSelect(r)}
              onMouseEnter={() => setHighlighted(i)}
              className={`px-4 py-2.5 cursor-pointer text-sm flex justify-between items-center ${
                i === highlighted ? "bg-blue-50 text-blue-800" : "text-gray-700"
              }`}
            >
              <span>{r.label}</span>
              <span className="text-xs text-gray-400 ml-2">{r.airports.slice(0, 4).join(", ")}{r.airports.length > 4 ? "…" : ""}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
