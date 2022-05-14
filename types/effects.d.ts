interface EffectScope<EffectModel> extends ng.IScope {
  effect: EffectModel;
  [x: string]: unknown;
}

type EffectTriggerResponse = {
  success: boolean; 
  //outputs: Record<string, unknown>;
  execution?: {
    stop: boolean;
    bubbleStop: boolean;
  }
}

export namespace Effects {
  type TriggerType =
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
    | "manual";

  type Trigger = {
    type: TriggerType;
    metadata: {
      username: string;
      hotkey?: any;
      command?: any;
      userCommand?: { trigger: string; args: string[] };
      chatMessage?: any;
      event?: { id: string; name: string };
      eventSource?: { id: string; name: string };
      eventData?: Record<string, unknown>;
      [x: string]: unknown;
    };
  };

  type TriggersObject = {
    [T in TriggerType]?: T extends "event" ? string[] | boolean : boolean;
  };

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
    | "firebot:update-counter";

  type Effect<T = KnownEffectType> = {
    id?: string;
    type: T;
    [x: string]: unknown;
  };

  type EffectType<EffectModel, OverlayData = unknown> = {
    definition: {
      id: string;
      name: string;
      description: string;
      icon: string;
      categories: EffectCategory[];
      triggers?: TriggerType[] | TriggersObject;
      dependencies?: Array<"chat">;
    };
    optionsTemplate: string;
    optionsController?: (
      $scope: EffectScope<EffectModel>,
      ...args: unknown[]
    ) => void;
    optionsValidator?: (effect: EffectModel) => string[];
    onTriggerEvent: (event: {
      effect: EffectModel;
      trigger: Trigger;
      sendDataToOverlay: (data: OverlayData, overlayInstance?: string) => void
    }) => Promise<void | boolean | EffectTriggerResponse>;
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
