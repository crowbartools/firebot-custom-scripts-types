export interface FirebotCustomScriptManifest {
  name: string;
  description: string;
  version: string;
  author: string;
  website?: string;
  startupOnly?: boolean;
  firebotVersion?: "5";
}

type BaseParameter = {
  description?: string;
  secondaryDescription?: string;
  showBottomHr?: boolean;
};

type StringParameter = BaseParameter & {
  type: "string";
  default: string;
};

type PasswordParameter = BaseParameter & {
  type: "password";
  default: string;
};

type BooleanParameter = BaseParameter & {
  type: "boolean";
  default: boolean;
};

type NumberParameter = BaseParameter & {
  type: "number";
  default: number;
};

type EnumParameter = BaseParameter & {
  type: "enum";
  options: Array<string | number>;
  default: string | number;
};

export type Parameter =
  | StringParameter
  | PasswordParameter
  | BooleanParameter
  | NumberParameter
  | EnumParameter;
export type DefaultParametersConfig = Record<string, Parameter>;

type FirebotAccount = {
  username: string;
  displayName: string;
  userId: string;
  avatar: string;
  loggedIn: boolean;
  auth: {
    access_token: string;
    expires_at: string;
    refresh_token: string;
  };
};
type FirebotTriggerType =
  | "command"
  | "custom_script"
  | "startup_script"
  | "api"
  | "event"
  | "hotkey"
  | "timer"
  | "counter"
  | "preset"
  | "manual";

export type RunRequest<P extends Record<string, any>> = {
  parameters: P;
  modules: any;
  firebot: {
    accounts: {
      streamer: FirebotAccount;
      bot: FirebotAccount;
    };
    settings: {
      webServerPort: number;
    };
    version: string;
  };
  trigger: {
    type: FirebotTriggerType;
    metadata: {
      username: string;
      hotkey?: any;
      command?: any;
      userCommand?: any;
      chatMessage?: any;
      event?: { id: string; name: string };
      eventSource?: { id: string; name: string };
      eventData?: Record<string, unknown>;
      [x: string]: unknown;
    };
  };
};

export interface FirebotCustomScript<P extends Record<string, any> = {}> {
  getScriptManifest():
    | FirebotCustomScriptManifest
    | PromiseLike<FirebotCustomScriptManifest>;
  getDefaultParameters(): DefaultParametersConfig;
  run(runRequest: RunRequest<P>): void;
}

export as namespace FirebotCustomScripts;
