'use client';

import { useEffect, useRef, useState } from "react";

import { commands, primaryCommands } from "@/data/commands";

type CommandInputProps = {
  onSubmit: (command: string) => void;
  onFocusSection?: (sectionId: string) => void;
};

export function CommandInput({ onSubmit, onFocusSection }: CommandInputProps) {
  const [value, setValue] = useState("");
  const [suggestionIndex, setSuggestionIndex] = useState<number | null>(null);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const suggestions = commands
    .filter((command) => command.name.startsWith(value.toLowerCase()) && command.name !== value.toLowerCase())
    .slice(0, 5);

  const activeSuggestion = suggestionIndex !== null ? suggestions[suggestionIndex] : undefined;

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    setHistory((prev) => [trimmed, ...prev].slice(0, 50));
    onSubmit(trimmed);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
      wrapperRef.current?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    });

    setValue("");
    setSuggestionIndex(null);
    setHistoryIndex(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      if (!suggestions.length) return;
      if (suggestionIndex === null) {
        setSuggestionIndex(0);
        setValue(suggestions[0].name);
      } else {
        const nextIndex = (suggestionIndex + 1) % suggestions.length;
        setSuggestionIndex(nextIndex);
        setValue(suggestions[nextIndex].name);
      }
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex === null ? 0 : Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(nextIndex);
      setValue(history[nextIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!history.length) return;
      if (historyIndex === null || historyIndex === 0) {
        setHistoryIndex(null);
        setValue("");
      } else {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setValue(history[nextIndex]);
      }
    }

    if (event.ctrlKey && event.key === "l") {
      event.preventDefault();
      setHistory([]);
      setValue("");
    }
  };

  return (
    <div className="space-y-2" ref={wrapperRef}>
      <div className="flex items-center gap-3">
        <span aria-hidden className="text-accent-primary">
          dylan@shell:~$
        </span>
        <input
          ref={inputRef}
          aria-label="Command input"
          autoComplete="off"
          className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/30"
          onChange={(event) => {
            setValue(event.target.value);
            setSuggestionIndex(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type a command (e.g., help)"
          spellCheck={false}
          value={value}
        />
      </div>

      {suggestions.length ? (
        <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
          <span className="text-foreground/40">Suggestions:</span>
          {suggestions.map((command, index) => (
            <button
              key={command.name}
              className={`rounded-full border px-3 py-1 transition ${
                index === suggestionIndex
                  ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                  : "border-accent-primary/20 hover:border-accent-primary/50"
              }`}
              onClick={() => {
                setValue(command.name);
                setSuggestionIndex(index);
                inputRef.current?.focus();
              }}
              type="button"
            >
              {command.name}
            </button>
          ))}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-2" role="list">
        {primaryCommands.map((command) => (
          <button
            key={command.name}
            aria-label={`${command.name}: ${command.description}`}
            className="rounded-full border border-accent-primary/25 px-3 py-1 text-xs text-accent-primary transition hover:border-accent-primary hover:bg-accent-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary"
            onClick={() => {
              onSubmit(command.name);
              if (command.relatedSectionId && onFocusSection) {
                onFocusSection(command.relatedSectionId);
              }
            }}
            type="button"
          >
            <span className="font-semibold">{command.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

