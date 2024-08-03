import { ReplaceVariable } from "./replace-variable-manager";

type VariableConfig = {
    handle: string;
    description: string;
    events: string[];
    eventMetaKey: string;
    usage?: string;
    defaultValue?: unknown;
    type:
        | ReplaceVariable["definition"]["possibleDataOutput"][number]
        | ReplaceVariable["definition"]["possibleDataOutput"];
};

export type ReplaceVariableFactory = {
    createEventDataVariable(config: VariableConfig): ReplaceVariable;
};
