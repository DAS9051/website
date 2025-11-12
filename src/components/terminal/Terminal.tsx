'use client';

import { useEffect } from "react";

import { commandDictionary } from "@/data/commands";

import { buildCommandResult, CommandResultLog } from "./CommandOutput";
import { CommandInput } from "./CommandInput";
import { useTerminal } from "./useTerminal";
import type { TerminalMode, TerminalProps } from "./types";

export function Terminal({ className, onModeChange, onScrollToSection, onCommandResolved }: TerminalProps) {
  const { state, executeCommand, getCommandDefinition, clearResults } = useTerminal();

  useEffect(() => {
    onModeChange?.(state.mode);
  }, [state.mode, onModeChange]);

  const handleSubmit = (commandString: string) => {
    const normalized = commandString.trim().toLowerCase();
    if (!normalized) return;

    const definition = getCommandDefinition(normalized);

    if (!definition) {
      onCommandResolved?.(commandString, undefined);
      executeCommand(commandString, {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-200">
            Command not found: <span className="font-semibold">{normalized}</span>. Type `help` to see available
            commands.
          </div>
        )
      });
      return;
    }

    if (definition.name === "scroll" && definition.relatedSectionId && onScrollToSection) {
      onScrollToSection(definition.relatedSectionId);
      onCommandResolved?.(commandString, definition);
    }

    if (definition.name === "clear") {
      clearResults();
      onCommandResolved?.(commandString, definition);
      return;
    }

    if (definition.name === "toggle") {
      const nextMode: TerminalMode = state.mode === "hybrid" ? "terminal" : "hybrid";
      executeCommand(commandString, {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <p className="text-sm text-foreground/65">
            Toggled mode to <span className="font-semibold text-accent-primary">{nextMode}</span>.
          </p>
        )
      });
      onModeChange?.(nextMode);
      onCommandResolved?.(commandString, definition);
      return;
    }

    if (definition.name === "download") {
      executeCommand(commandString, {
        id: `result-${Date.now()}`,
        command: commandString,
        renderedAt: Date.now(),
        node: (
          <div className="space-y-2 text-sm text-foreground/75">
            <p>PDF download support is on the roadmap. For now:</p>
            <ol className="list-decimal space-y-1 pl-5 text-foreground/65">
              <li>Use the print dialog (`Cmd/Ctrl + P`) and save as PDF.</li>
              <li>Or reach out via email and I will share the current résumé.</li>
            </ol>
          </div>
        )
      });
      onCommandResolved?.(commandString, definition);
      return;
    }

    if (definition.relatedSectionId && onScrollToSection) {
      onScrollToSection(definition.relatedSectionId);
    }

    const result = buildCommandResult(commandString, definition);
    executeCommand(commandString, result ?? null);
    if (definition.name !== "scroll") {
      onCommandResolved?.(commandString, definition);
    }
  };

  const containerClassName = ["flex h-full flex-col gap-6", className].filter(Boolean).join(" ");

  return (
    <div className={containerClassName}>
      <div className="flex-1 overflow-hidden">
        <CommandResultLog results={state.results} />
      </div>
      <CommandInput onFocusSection={onScrollToSection} onSubmit={handleSubmit} />
      <div className="flex flex-wrap gap-4 text-xs text-foreground/50">
        <span>Shortcuts:</span>
        <span>
          <kbd className="rounded border border-white/10 bg-background/60 px-2 py-1 text-foreground/70">Tab</kbd> autocomplete
        </span>
        <span>
          <kbd className="rounded border border-white/10 bg-background/60 px-2 py-1 text-foreground/70">↑</kbd> history
        </span>
        <span>
          <kbd className="rounded border border-white/10 bg-background/60 px-2 py-1 text-foreground/70">Ctrl</kbd>+
          <kbd className="rounded border border-white/10 bg-background/60 px-2 py-1 text-foreground/70">L</kbd> clear input
        </span>
      </div>
    </div>
  );
}

