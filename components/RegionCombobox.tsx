"use client";

import { useState, useRef, useEffect } from "react";
import { searchRegions, type Region } from "@/lib/regions";
import { searchCities, searchCountries, searchAirportsByCodeOrName, type CityResult, type CountryResult, type Airport } from "@/lib/airports";

type SuggestionGroup =
  | { type: "city"; item: CityResult }
  | { type: "country"; item: CountryResult }
  | { type: "region"; item: Region }
  | { type: "airport"; item: Airport };

type Props = {
  value: Region | null;
  onChange: (region: Region) => void;
  inputClass: string;
  placeholder?: string;
};

export default function RegionCombobox({ value, onChange, inputClass, placeholder = "e.g. JFK, Paris, France, US Northeast…" }: Props) {
  const [query, setQuery] = useState(value?.label ?? "");
  const [groups, setGroups] = useState<SuggestionGroup[]>([]);
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

  function buildGroups(q: string): SuggestionGroup[] {
    const cities = searchCities(q).map((c): SuggestionGroup => ({ type: "city", item: c }));
    const countries = searchCountries(q).map((c): SuggestionGroup => ({ type: "country", item: c }));
    const regions = searchRegions(q).map((r): SuggestionGroup => ({ type: "region", item: r }));
    const airports = searchAirportsByCodeOrName(q).map((a): SuggestionGroup => ({ type: "airport", item: a }));
    return [...airports, ...cities, ...countries, ...regions];
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    const results = buildGroups(q);
    setGroups(results);
    setOpen(results.length > 0);
    setHighlighted(0);
  }

  function handleSelect(suggestion: SuggestionGroup) {
    let region: Region;
    if (suggestion.type === "airport") {
      const a = suggestion.item as Airport;
      region = { key: `airport__${a.iata}`, label: `${a.city} (${a.iata})`, airports: [a.iata] };
    } else if (suggestion.type === "city") {
      const c = suggestion.item as CityResult;
      region = { key: c.key, label: c.label, airports: c.airports };
    } else if (suggestion.type === "country") {
      const c = suggestion.item as CountryResult;
      region = { key: c.key, label: c.label, airports: c.airports };
    } else {
      region = suggestion.item as Region;
    }
    onChange(region);
    setQuery(region.label);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, groups.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (groups[highlighted]) handleSelect(groups[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function renderSection(
    label: string,
    items: SuggestionGroup[],
    renderItem: (g: SuggestionGroup, idx: number) => React.ReactNode
  ) {
    if (items.length === 0) return null;
    return (
      <>
        <li className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 select-none">
          {label}
        </li>
        {items.map((g, _) => renderItem(g, groups.indexOf(g)))}
      </>
    );
  }

  const airportItems = groups.filter((g) => g.type === "airport");
  const cityItems = groups.filter((g) => g.type === "city");
  const countryItems = groups.filter((g) => g.type === "country");
  const regionItems = groups.filter((g) => g.type === "region");

  return (
    <div ref={containerRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        onFocus={() => { if (query) { const g = buildGroups(query); setGroups(g); setOpen(g.length > 0); } }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`${inputClass} w-full placeholder:text-gray-400`}
        autoComplete="off"
      />
      {open && groups.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto max-h-64">
          {renderSection("Airports", airportItems, (g, idx) => {
            const a = g.item as Airport;
            return (
              <li
                key={a.iata}
                onMouseDown={() => handleSelect(g)}
                onMouseEnter={() => setHighlighted(idx)}
                className={`px-4 py-2.5 cursor-pointer text-sm flex justify-between items-center ${
                  idx === highlighted ? "bg-blue-50 text-blue-800" : "text-gray-700"
                }`}
              >
                <span>
                  <span className="font-mono font-bold text-blue-600 mr-2">{a.iata}</span>
                  <span className="font-medium">{a.name}</span>
                </span>
                <span className="text-xs text-gray-400 ml-2">{a.city}</span>
              </li>
            );
          })}
          {renderSection("Cities", cityItems, (g, idx) => {
            const c = g.item as CityResult;
            return (
              <li
                key={c.key}
                onMouseDown={() => handleSelect(g)}
                onMouseEnter={() => setHighlighted(idx)}
                className={`px-4 py-2.5 cursor-pointer text-sm flex justify-between items-center ${
                  idx === highlighted ? "bg-blue-50 text-blue-800" : "text-gray-700"
                }`}
              >
                <span>
                  <span className="font-medium">{c.label}</span>
                  <span className="text-gray-400 ml-1 text-xs">{c.country}</span>
                </span>
                <span className="text-xs text-gray-400 ml-2">{c.airports.join(", ")}</span>
              </li>
            );
          })}
          {renderSection("Countries", countryItems, (g, idx) => {
            const c = g.item as CountryResult;
            return (
              <li
                key={c.key}
                onMouseDown={() => handleSelect(g)}
                onMouseEnter={() => setHighlighted(idx)}
                className={`px-4 py-2.5 cursor-pointer text-sm flex justify-between items-center ${
                  idx === highlighted ? "bg-blue-50 text-blue-800" : "text-gray-700"
                }`}
              >
                <span className="font-medium">{c.label}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {c.airports.slice(0, 4).join(", ")}{c.airports.length > 4 ? "…" : ""}
                </span>
              </li>
            );
          })}
          {renderSection("Regions", regionItems, (g, idx) => {
            const r = g.item as Region;
            return (
              <li
                key={r.key}
                onMouseDown={() => handleSelect(g)}
                onMouseEnter={() => setHighlighted(idx)}
                className={`px-4 py-2.5 cursor-pointer text-sm flex justify-between items-center ${
                  idx === highlighted ? "bg-blue-50 text-blue-800" : "text-gray-700"
                }`}
              >
                <span>{r.label}</span>
                <span className="text-xs text-gray-400 ml-2">
                  {r.airports.slice(0, 4).join(", ")}{r.airports.length > 4 ? "…" : ""}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
