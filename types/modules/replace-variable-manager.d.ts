import { Trigger, TriggerType, TriggerMeta, TriggersObject } from "../triggers";
import { Awaitable } from "../util-types";

type VariableUsage = {
    usage: string;
    description?: string;
};

export type ReplaceVariable = {
    definition: {
        handle: string;
        aliases?: string[];
        usage?: string;
        description: string;
        examples?: VariableUsage[];
        hasSuggestions?: boolean;
        noSuggestionsText?: string;
        categories?: VariableCategory[];
        triggers?: TriggersObject;
        possibleDataOutput: Array<
            "null" | "bool" | "number" | "text" | "array" | "object" | "ALL"
        >;
        hidden?: boolean;
    };
    getSuggestions?: (triggerType: TriggerType, triggerMeta?: TriggerMeta) => Awaitable<VariableUsage[]>;
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

    /**
     * Removes an event trigger from an existing Firebot variable.
     * @param variableHandle Handle of the variable (e.g. `donationAmount`).
     * @param eventSourceId Event source ID of the event to remove.
     * @param eventId Event ID of the event to remove.
     */
    removeEventFromVariable: (variableHandle: string, eventSourceId: string, eventId: string) => void;
};
