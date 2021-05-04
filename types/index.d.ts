import * as FsExtra from "fs-extra";
import * as Path from "path";
import { CurrencyManager } from "./modules/currency-manager";
import { CustomVariableManager } from "./modules/custom-variable-manager";
import { EffectManager } from "./modules/effect-manager";
import { EventManager } from "./modules/event-manager";
import { FrontendCommunicator } from "./modules/frontend-communicator";
import { FirebotRolesManager } from "./modules/firebot-roles-manager";
import { TwitchChat } from "./modules/twitch-chat";
import { Logger } from "./modules/logger";
import { ReplaceVariableManager } from "./modules/replace-variable-manager";
import { EventFilterManager } from "./modules/event-filter-manager";
import { UserDb } from "./modules/user-db";
import { CounterManager } from "./modules/counter-manager";
import { QuotesManager } from "./modules/quotes-manager";
import { Effects } from "./effects";
import { TwitchApi } from "./modules/twitch-api";
import { Utils } from "./modules/utils";
import { GameManager } from "./modules/game-manager";

type BaseParameter = {
  description?: string;
  secondaryDescription?: string;
  showBottomHr?: boolean;
};

type StringParameter = BaseParameter & {
  type: "string";
  useTextArea?: boolean;
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

type FilepathParameter = BaseParameter & {
  type: "filepath";
  fileOptions?: {
    directoryOnly: boolean;
    filters: Array<{
      name: string;
      extensions: string[];
    }>;
    title: string;
    buttonLabel: string;
  };
};

type EffectListParameter = BaseParameter & {
  type: "effectlist";
};

type UserAccount = {
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

type CustomScriptManifest = {
  name: string;
  description: string;
  version: string;
  author: string;
  website?: string;
  startupOnly?: boolean;
  firebotVersion?: "5";
};

type ScriptModules = {
  currencyManager: CurrencyManager;
  effectManager: EffectManager;
  eventManager: EventManager;
  frontendCommunicator: FrontendCommunicator;
  gameManager: GameManager;
  twitchApi: TwitchApi;
  twitchChat: TwitchChat;
  logger: Logger;
  customVariableManager: CustomVariableManager;
  replaceVariableManager: ReplaceVariableManager;
  eventFilterManager: EventFilterManager;
  userDb: UserDb;
  firebotRolesManager: FirebotRolesManager;
  counterManager: CounterManager;
  quotesManager: QuotesManager;
  utils: Utils;
  path: typeof Path;
  fs: typeof FsExtra;
  /** Remove the below line after we have all modules defined */
  [x: string]: unknown;
};

type RunRequest<P extends Record<string, any>> = {
  parameters: P;
  modules: ScriptModules;
  firebot: {
    accounts: {
      streamer: UserAccount;
      bot: UserAccount;
    };
    settings: {
      webServerPort: number;
    };
    version: string;
  };
  trigger: Effects.Trigger;
};

type ScriptParameter =
  | StringParameter
  | PasswordParameter
  | BooleanParameter
  | NumberParameter
  | EnumParameter;

type DefaultParametersConfig<P> = {
  [K in keyof P]: P[K] extends string
    ? StringParameter | PasswordParameter | FilepathParameter
    : P[K] extends number
    ? NumberParameter
    : P[K] extends boolean
    ? BooleanParameter
    : P[K] extends Array<any>
    ? EnumParameter
    : P[K] extends Firebot.EffectList
    ? EffectListParameter
    : ScriptParameter;
};

type ScriptReturnObject = {
  success: boolean;
  errorMessage?: string;
  effects: Array<Effects.Effect> | Firebot.EffectList;
  callback?: VoidFunction;
};

export namespace Firebot {
  type CustomScript<P extends Record<string, any> = {}> = {
    getScriptManifest():
      | CustomScriptManifest
      | PromiseLike<CustomScriptManifest>;
    getDefaultParameters(): DefaultParametersConfig<P>;
    run(
      runRequest: RunRequest<P>
    ): void | ScriptReturnObject | Promise<ScriptReturnObject>;
  };

  type EffectType<EffectModel> = Effects.EffectType<EffectModel>;

  type EffectList = Effects.EffectList;
}
