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
        | "chat based"
        | "Moderation"
        | "overlay"
        | "fun"
        | "integrations"
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

    type EffectList = {
        id?: string;
        queue?: string;
        queueDuration?: number;
        list: Effect[];
    };
}
