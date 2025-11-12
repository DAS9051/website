import { useCallback, useMemo, useReducer } from "react";

import { commandDictionary, type CommandDefinition } from "@/data/commands";

import type { CommandExecution, TerminalCommandResult, TerminalMode, TerminalState } from "./types";

type TerminalAction =
  | { type: "EXECUTE"; payload: { command: string; result: TerminalCommandResult | null } }
  | { type: "CLEAR" }
  | { type: "SET_MODE"; payload: TerminalMode };

const initialState: TerminalState = {
  history: [],
  results: [],
  mode: "hybrid"
};

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case "EXECUTE": {
      const execution: CommandExecution = {
        command: action.payload.command,
        timestamp: Date.now()
      };
      const updatedHistory = [execution, ...state.history].slice(0, 50);
      const updatedResults = action.payload.result
        ? [...state.results, action.payload.result].slice(-20)
        : state.results;

      return {
        ...state,
        history: updatedHistory,
        results: updatedResults
      };
    }
    case "CLEAR": {
      return {
        ...state,
        results: []
      };
    }
    case "SET_MODE": {
      return {
        ...state,
        mode: action.payload
      };
    }
    default:
      return state;
  }
}

export function useTerminal() {
  const [state, dispatch] = useReducer(terminalReducer, initialState);

  const getCommandDefinition = useCallback((command: string): CommandDefinition | undefined => {
    const normalized = command.trim().toLowerCase();
    return commandDictionary[normalized];
  }, []);

  const executeCommand = useCallback(
    (command: string, result: TerminalCommandResult | null) => {
      if (command.trim() === "clear") {
        dispatch({ type: "CLEAR" });
        return;
      }

      if (command.trim() === "toggle") {
        const nextMode: TerminalMode = state.mode === "hybrid" ? "terminal" : "hybrid";
        dispatch({ type: "SET_MODE", payload: nextMode });
      }

      dispatch({ type: "EXECUTE", payload: { command, result } });
    },
    [state.mode]
  );

  const value = useMemo(
    () => ({
      state,
      executeCommand,
      getCommandDefinition,
      setMode: (mode: TerminalMode) => dispatch({ type: "SET_MODE", payload: mode }),
      clearResults: () => dispatch({ type: "CLEAR" })
    }),
    [state, executeCommand, getCommandDefinition]
  );

  return value;
}

