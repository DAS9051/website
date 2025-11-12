export type TerminalMode = "hybrid" | "terminal";

export type TerminalCommandResult = {
  id: string;
  command: string;
  renderedAt: number;
  node: React.ReactNode;
};

export type CommandExecution = {
  command: string;
  timestamp: number;
};

export type TerminalState = {
  history: CommandExecution[];
  results: TerminalCommandResult[];
  mode: TerminalMode;
};

export type OnCommandExecute = (command: string) => void;

import type { CommandDefinition } from "@/data/commands";

export type TerminalProps = {
  className?: string;
  onModeChange?: (mode: TerminalMode) => void;
  onScrollToSection?: (sectionId: string) => void;
  onCommandResolved?: (command: string, definition?: CommandDefinition) => void;
};

