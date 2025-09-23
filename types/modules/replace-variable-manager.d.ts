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
    /**
     * Registers a replace variable in Firebot.
     * @param replaceVariable The {@linkcode ReplaceVariable} you want to register.
     */
    registerReplaceVariable: (replaceVariable: ReplaceVariable) => void;

    /**
     * Unregisters a replace variable from Firebot.
     * @param handle The handle of the variable you want to unregister.
     */
    unregisterReplaceVariable: (handle: string) => void;

    /**
     * Adds an event trigger to an existing Firebot variable.
     * @param variableHandle Handle of the variable (e.g. `donationAmount`).
     * @param eventSourceId Event source ID of the event to add.
     * @param eventId Event ID of the event to add.
     */
    addEventToVariable: (variableHandle: string, eventSourceId: string, eventId: string) => void;
};
