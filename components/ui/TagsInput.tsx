"use client";
import { useRef, useState, type KeyboardEvent } from "react";

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export default function TagsInput({ tags, onChange, placeholder = "Add tag…" }: TagsInputProps) {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function commit() {
    const value = input.trim().replace(/,+$/, "").trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit();
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  function removeTag(index: number) {
    onChange(tags.filter((_, i) => i !== index));
  }

  return (
    <div
      className="flex flex-wrap gap-1.5 px-2.5 py-2 rounded-lg border border-ink-200 bg-white focus-within:ring-2 focus-within:ring-brand-400 focus-within:border-brand-400 transition-colors cursor-text min-h-[38px]"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-ink-100 border border-ink-200 text-ink-700 text-[12px] font-medium"
        >
          {tag}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); removeTag(i); }}
            className="text-ink-400 hover:text-red-500 transition-colors leading-none cursor-pointer ml-0.5"
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => {
          // auto-commit on comma typed
          if (e.target.value.endsWith(",")) {
            setInput(e.target.value.slice(0, -1));
            setTimeout(commit, 0);
          } else {
            setInput(e.target.value);
          }
        }}
        onKeyDown={handleKeyDown}
        onBlur={commit}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[80px] text-[13px] text-ink-800 placeholder-ink-300 bg-transparent focus:outline-none"
      />
    </div>
  );
}
