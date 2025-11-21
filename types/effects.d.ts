import ng from "angular";
import { Trigger, TriggerType, TriggersObject } from "./triggers";

interface EffectScope<EffectModel> extends ng.IScope {
    effect: EffectModel;
    [x: string]: unknown;
}

export type EffectOutput<Outputs = Record<string, unknown>> = {
    label: string;
    description: string;
    defaultName: keyof Outputs;
};

type EffectTriggerResponse<Outputs = Record<string, unknown>> = {
    success: boolean;
    outputs?: Outputs;
    execution?: {
        stop: boolean;
        bubbleStop: boolean;
    };
};

export namespace Effects {
    type EffectCategory =
        | "common"
        | "twitch"
        | "moderation"
        | "chat based"
        | "dashboard"
        | "overlay"
        | "fun"
        | "integrations"
        | "firebot control"
        | "advanced"
        | "scripting";

    type KnownEffectType =
        | "firebot:chat"
        | "firebot:currency"
        | "firebot:delay"
        | "firebot:run-effect-list"
        | "firebot:filewriter"
        | "firebot:html"
        | "firebot:loopeffects"
        | "firebot:playsound"
        | "firebot:playvideo"
        | "firebot:randomeffect"
        | "firebot:runcommand"
        | "firebot:sequentialeffect"
        | "firebot:set-user-metadata"
        | "firebot:showImage"
        | "firebot:showtext"
        | "firebot:update-counter"
        | "firebot:cooldown-command";

    type Effect<T = KnownEffectType> = {
        id?: string;
        type: T;
        [x: string]: unknown;
    };

    type EffectType<
        EffectModel,
        OverlayData = unknown,
        Outputs = Record<string, unknown>
    > = {
        definition: {
            id: string;
            name: string;
            description: string;
            icon: string;
            categories: EffectCategory[];
            triggers?: TriggerType[] | TriggersObject;
            dependencies?: Array<"chat">;
            outputs?: EffectOutput<Outputs>[];
            /**
             * If true, this effect cannot be aborted via the "Timeout" feature
             */
            exemptFromTimeouts?: boolean;
            /**
             * Keys of the effect model that should be exempt from having variables replaced in them automatically.
             * This is useful when you want to run variable replacement manually, or not at all.
             */
            keysExemptFromAutoVariableReplacement?: Array<keyof EffectModel>;
            /**
             * If true, this effect does nothing when triggered (ex Comment effect)
             * No-op effects are ignored by the random and sequential effects
             */
            isNoOp?: boolean;
        };
        optionsTemplate: string;
        optionsController?: (
            $scope: EffectScope<EffectModel>,
            ...args: unknown[]
        ) => void;
        optionsValidator?: (effect: EffectModel) => string[];
        getDefaultLabel?: (
            effect: EffectModel,
            ...args: any[]
        ) => string | undefined | Promise<string | undefined>;
        onTriggerEvent: (event: {
            effect: EffectModel;
            trigger: Trigger;
            sendDataToOverlay: (
                data: OverlayData,
                overlayInstance?: string
            ) => void;
            outputs?: Record<string, unknown>;
            abortSignal: AbortSignal;
        }) => Promise<void | boolean | EffectTriggerResponse<Outputs>>;
        overlayExtension?: {
            dependencies?: {
                globalStyles?: string;
                css?: string[];
                js?: string[];
            };
            event: {
                name: string;
                onOverlayEvent: (data: OverlayData) => void;
            };
        };
    };

    type EffectListRunMode = "all" | "random" | "sequential";

    type EffectList = {
        id: string;
        list: Effect[];
        queue?: string;
        queuePriority?: "high" | "none";
        queueDuration?: number;
        /**
         * @default "all"
         */
        runMode?: EffectListRunMode;
        weighted?: boolean;
        dontRepeatUntilAllUsed?: boolean;
    };
}
