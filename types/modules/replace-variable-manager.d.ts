import { Effects } from "../effects";
import TriggersObject = Effects.TriggersObject;
import Trigger = Effects.Trigger;

export type ReplaceVariable = {
    definition: {
        handle: string;
        aliases?: string[];
        usage?: string;
        description: string;
        examples?: Array<{
            usage: string;
            description: string;
        }>;
        categories?: VariableCategory[];
        triggers?: TriggersObject;
        possibleDataOutput: Array<
            "null" | "bool" | "number" | "text" | "array" | "object" | "ALL"
        >;
        hidden?: boolean;
    };
    evaluator(trigger: Trigger, ...args: any[]): any;
};

export type VariableCategory =
    | "common"
    | "trigger based"
    | "user based"
    | "text"
    | "numbers"
    | "advanced";

export type ReplaceVariableManager = {
    registerReplaceVariable(replaceVariable: ReplaceVariable): void;
};
