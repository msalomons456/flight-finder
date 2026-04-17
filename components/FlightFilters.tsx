"use client";

export type TimeWindow = { label: string; start: number; end: number };

export const TIME_WINDOWS: TimeWindow[] = [
  { label: "Early Morning", start: 0,  end: 6  },
  { label: "Morning",       start: 6,  end: 12 },
  { label: "Afternoon",     start: 12, end: 18 },
  { label: "Evening",       start: 18, end: 24 },
];

type Props = {
  isRoundTrip: boolean;
  outboundTimes: string[];
  returnTimes: string[];
  onChange: (outbound: string[], ret: string[]) => void;
};

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function TimeFilter({
  label,
  selected,
  onChange,
  disabled,
}: {
  label: string;
  selected: string[];
  onChange: (v: string[]) => void;
  disabled?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 ${disabled ? "opacity-40" : ""}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-gray-600">{label}</span>
        {disabled && <span className="text-xs text-gray-400 italic">(outbound only — return times unavailable)</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {TIME_WINDOWS.map((w) => {
          const key = `${w.start}-${w.end}`;
          const active = selected.includes(key);
          return (
            <button
              key={key}
              type="button"
              disabled={disabled}
              onClick={() => onChange(toggle(selected, key))}
              className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${
                active
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-400"
              }`}
            >
              <span>{w.label}</span>
              <span className="ml-1 text-xs opacity-70">
                {w.start === 0 ? "12am" : w.start < 12 ? `${w.start}am` : w.start === 12 ? "12pm" : `${w.start - 12}pm`}
                –
                {w.end === 24 ? "12am" : w.end < 12 ? `${w.end}am` : w.end === 12 ? "12pm" : `${w.end - 12}pm`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FlightFilters({ isRoundTrip, outboundTimes, returnTimes, onChange }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex flex-col gap-4">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Filter Results</h3>
      <TimeFilter
        label="Outbound Departure"
        selected={outboundTimes}
        onChange={(v) => onChange(v, returnTimes)}
      />
      {isRoundTrip && (
        <TimeFilter
          label="Return Departure"
          selected={returnTimes}
          onChange={(v) => onChange(outboundTimes, v)}
          disabled
        />
      )}
    </div>
  );
}
