import { CommandDefinition } from "./modules/command-manager";

export type TriggerType =
    | "command"
    | "custom_script"
    | "startup_script"
    | "api"
    | "event"
    | "hotkey"
    | "timer"
    | "counter"
    | "preset"
    | "quick_action"
    | "manual"
    | "channel_reward";

export type TriggerMeta = {
    triggerId?: string;
    [x: string]: unknown;
}

export type Trigger = {
    type: TriggerType;
    metadata: {
        username: string;
        hotkey?: unknown;
        command?: CommandDefinition;
        userCommand?: {
            trigger: string;
            args: string[],
            triggeredArg?: string,
            triggeredSubcmd?: CommandDefinition,
            subcommandId?: string
        };
        chatMessage?: unknown;
        event?: { id: string; name: string };
        eventSource?: { id: string; name: string };
        eventData?: {
            chatMessage?: unknown;
            [x: string]: unknown
        };
        counter?: {
            id: string;
            name: string;
            previousValue: number;
            value: number;
            minimum?: number;
            maximum?: number;
        };
        [x: string]: unknown;
    };
    effectOutputs?: { [key: string]: unknown };
};

export type TriggersObject = {
    [T in TriggerType]?: T extends "event" ? string[] | boolean : boolean;
};