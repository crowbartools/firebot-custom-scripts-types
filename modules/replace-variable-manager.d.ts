import { Trigger, TriggersObject } from "../index";

type ReplaceVariable = {
  definition: {
    handle: string;
    usage?: string;
    description: string;
    examples?: Array<{
      usage: string;
      description: string;
    }>;
    triggers?: TriggersObject;
    possibleDataOutput: Array<"text" | "number">;
  };
  evaluator(trigger: Trigger, ...args: any[]): any;
};

export type ReplaceVariableManager = {
  registerReplaceVariable(replaceVariable: ReplaceVariable): void;
};
