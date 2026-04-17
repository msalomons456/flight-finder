"use client";

import { useState, useRef, useEffect } from "react";
import { searchAirports, getNearbyAirports, type Airport } from "@/lib/airports";

type Props = {
  value: Airport | null;
  onChange: (airport: Airport | null) => void;
  inputClass: string;
};

export default function DestinationCombobox({ value, onChange, inputClass }: Props) {
  const [query, setQuery] = useState(value ? `${value.city} (${value.iata})` : "");
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [nearbyDismissed, setNearbyDismissed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const nearby = value && !nearbyDismissed ? getNearbyAirports(value) : [];

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    onChange(null);
    if (q.trim().length >= 1) {
      setSuggestions(searchAirports(q));
      setOpen(true);
    } else {
      setSuggestions([]);
      setOpen(false);
    }
    setActiveIndex(-1);
  }

  function select(airport: Airport) {
    onChange(airport);
    setQuery(`${airport.city} (${airport.iata})`);
    setSuggestions([]);
    setOpen(false);
    setActiveIndex(-1);
    setNearbyDismissed(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      select(suggestions[activeIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        placeholder="e.g. Tokyo, Paris, London"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
        autoComplete="off"
        className={`${inputClass} w-full`}
      />
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
          {suggestions.map((airport, i) => (
            <li
              key={airport.iata}
              onMouseDown={() => select(airport)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`flex items-center justify-between px-4 py-2.5 cursor-pointer text-sm ${
                i === activeIndex ? "bg-blue-50 text-blue-900" : "text-gray-800 hover:bg-gray-50"
              }`}
            >
              <span>
                <span className="font-semibold">{airport.city}</span>
                <span className="text-gray-500 ml-1">— {airport.name}</span>
              </span>
              <span className="ml-3 font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                {airport.iata}
              </span>
            </li>
          ))}
        </ul>
      )}
      {nearby.length > 0 && (
        <div className="mt-1.5 flex items-center gap-2 flex-wrap px-1">
          <span className="text-xs text-gray-400">Also in {value!.city}:</span>
          {nearby.map((a) => (
            <button
              key={a.iata}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); select(a); }}
              className="text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-100 px-2 py-0.5 rounded transition-colors"
            >
              {a.iata} · {a.name}
            </button>
          ))}
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); setNearbyDismissed(true); }}
            className="ml-auto text-gray-300 hover:text-gray-500 text-xs leading-none"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
