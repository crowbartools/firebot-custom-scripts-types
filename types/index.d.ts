import * as FsExtra from "fs-extra";
import * as Path from "path";
import Moment from "moment";
import { FirebotSettings } from "./settings";
import { CommandManager } from "./modules/command-manager";
import { CounterManager } from "./modules/counter-manager";
import { CurrencyDB } from "./modules/currency-db";
import { CurrencyManager } from "./modules/currency-manager";
import { CustomVariableManager } from "./modules/custom-variable-manager";
import { EffectManager } from "./modules/effect-manager";
import { Effects } from "./effects";
import { EventFilterManager } from "./modules/event-filter-manager";
import { EventManager } from "./modules/event-manager";
import { FirebotRolesManager } from "./modules/firebot-roles-manager";
import { FrontendCommunicator } from "./modules/frontend-communicator";
import { GameManager } from "./modules/game-manager";
import { HttpServerManager } from "./modules/http-server-manager";
import { Logger } from "./modules/logger";
import { QuotesManager } from "./modules/quotes-manager";
import { ReplaceVariableManager } from "./modules/replace-variable-manager";
import { ResourceTokenManager } from "./modules/resource-token-manager";
import { TwitchApi } from "./modules/twitch-api";
import { TwitchChat } from "./modules/twitch-chat";
import { UserDb } from "./modules/user-db";
import { Utils } from "./modules/utils";
import { ConditionManager } from "./modules/condition-manager";
import { RestrictionManager } from "./modules/restriction-manager";
import { IntegrationManager } from "./modules/integration-manager";

export type BaseParameter = {
    description?: string;
    secondaryDescription?: string;
    showBottomHr?: boolean;
};

export type StringParameter = BaseParameter & {
    type: "string";
    useTextArea?: boolean;
    default: string;
};

export type PasswordParameter = BaseParameter & {
    type: "password";
    default: string;
};

export type BooleanParameter = BaseParameter & {
    type: "boolean";
    default: boolean;
};

export type NumberParameter = BaseParameter & {
    type: "number";
    default: number;
};

export type EnumParameter = BaseParameter & {
    type: "enum";
    options: Array<string | number>;
    default: string | number;
};

export type FilepathParameter = BaseParameter & {
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

export type EffectListParameter = BaseParameter & {
    type: "effectlist";
};

export type UserAccount = {
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

export type CustomScriptManifest = {
    name: string;
    description: string;
    version: string;
    author: string;
    website?: string;
    startupOnly?: boolean;
    firebotVersion?: "5";
};

export type ScriptModules = {
    childProcess: unknown;
    commandManager: CommandManager;
    conditionManager: ConditionManager;
    counterManager: CounterManager;
    currencyDb: CurrencyDB;
    currencyManager: CurrencyManager;
    customVariableManager: CustomVariableManager;
    effectManager: EffectManager;
    eventFilterManager: EventFilterManager;
    eventManager: EventManager;
    firebotRolesManager: FirebotRolesManager;
    frontendCommunicator: FrontendCommunicator;
    fs: typeof FsExtra;
    gameManager: GameManager;
    howler: unknown;
    httpServer: HttpServerManager;
    integrationManager: IntegrationManager;
    JsonDb: unknown;
    logger: Logger;
    moment: typeof Moment;
    path: typeof Path;
    quotesManager: QuotesManager;
    replaceVariableManager: ReplaceVariableManager;
    resourceTokenManager: ResourceTokenManager;
    request: unknown;
    restrictionManager: RestrictionManager;
    spawn: unknown;
    twitchApi: TwitchApi;
    twitchChat: TwitchChat;
    userDb: UserDb;
    utils: Utils;
    /** Remove the below line after we have all modules defined */
    [x: string]: unknown;
};

export type RunRequest<P extends Record<string, unknown>> = {
    parameters: P;
    modules: ScriptModules;
    firebot: {
        accounts: {
            streamer: UserAccount;
            bot: UserAccount;
        };
        settings: FirebotSettings;
        version: string;
    };
    trigger: Effects.Trigger;
};

export type ScriptParameter =
    | StringParameter
    | PasswordParameter
    | BooleanParameter
    | NumberParameter
    | EnumParameter;

export type DefaultParametersConfig<P> = {
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

export type ScriptReturnObject = {
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

        /**
         * Called at app start and when the script is added to Firebot
         */
        run(
            runRequest: RunRequest<P>
        ):
            | void
            | PromiseLike<void>
            | ScriptReturnObject
            | Promise<ScriptReturnObject>;

        /**
         * Called when the user saves script parameters
         */
        parametersUpdated?(parameters: P): void;

        /**
         * Called when the script is removed from Firebot. Use this to clean up registered effects/connections/etc
         */
        stop?(): void;
    };

    type EffectType<EffectModel> = Effects.EffectType<EffectModel>;

    type EffectList = Effects.EffectList;
}

export * from "./modules/integration-manager";
