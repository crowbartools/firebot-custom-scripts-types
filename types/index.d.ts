import * as FS from "fs";
import * as Path from "path";
import ChildProcess from "child_process";
import Moment from "moment";
import { FirebotSettings } from "./settings";
import { CommandManager } from "./modules/command-manager";
import { CounterManager } from "./modules/counter-manager";
import { CurrencyDB } from "./modules/currency-db";
import { CurrencyManager } from "./modules/currency-manager";
import { CustomVariableManager } from "./modules/custom-variable-manager";
import { EffectManager } from "./modules/effect-manager";
import { EffectRunner } from "./modules/effect-runner";
import { Effects } from "./effects";
import { EventFilterManager } from "./modules/event-filter-manager";
import { EventFilterFactory } from "./modules/event-filter-factory";
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
import { ReplaceVariableFactory } from "./modules/replace-variable-factory";
import { ParametersConfig } from "./modules/firebot-parameters";
import { NotificationManager } from "./modules/notification-manager";
import { UIExtensionManager } from "./modules/ui-extension-manager";
import { WebhookManager } from "./modules/webhook-manager";
import { OverlayWidgetConfigManager } from "./modules/overlay-widget-config-manager";
import { OverlayWidgetsManager } from "./modules/overlay-widgets-manager";
import { Trigger } from "./triggers";
import { Awaitable } from "./util-types";

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
    initBeforeShowingParams?: boolean;
    firebotVersion?: "5";
};

export type ScriptModules = {
    childProcess: typeof ChildProcess;
    commandManager: CommandManager;
    conditionManager: ConditionManager;
    counterManager: CounterManager;
    currencyDb: CurrencyDB;
    currencyManager: CurrencyManager;
    customVariableManager: CustomVariableManager;
    effectManager: EffectManager;
    effectRunner: EffectRunner;
    eventFilterManager: EventFilterManager;
    eventFilterFactory: EventFilterFactory;
    eventManager: EventManager;
    firebotRolesManager: FirebotRolesManager;
    frontendCommunicator: FrontendCommunicator;
    fs: typeof FS;
    gameManager: GameManager;
    howler: unknown;
    httpServer: HttpServerManager;
    integrationManager: IntegrationManager;
    JsonDb: unknown;
    logger: Logger;
    moment: typeof Moment;
    notificationManager: NotificationManager;
    path: typeof Path;
    overlayWidgetConfigManager: OverlayWidgetConfigManager;
    overlayWidgetsManager: OverlayWidgetsManager;
    quotesManager: QuotesManager;
    replaceVariableManager: ReplaceVariableManager;
    replaceVariableFactory: ReplaceVariableFactory;
    resourceTokenManager: ResourceTokenManager;
    request: unknown;
    restrictionManager: RestrictionManager;
    spawn: typeof ChildProcess["spawn"];
    scriptDataDir: string;
    twitchApi: TwitchApi;
    twitchChat: TwitchChat;
    /** Added in Firebot v5.64 */
    uiExtensionManager?: UIExtensionManager;
    userDb: UserDb;
    utils: Utils;
    webhookManager: WebhookManager;

    // Remove the below line after we have all modules defined
    [x: string]: unknown;
};

type ValidParamKeys<T> = {
    [P in keyof T]: Exclude<T[P], undefined> extends void | undefined | null
        ? never
        : P;
}[keyof T];

export type RunRequestParameters<P> = Pick<P, ValidParamKeys<P>>;

export type RunRequest<P extends Record<string, unknown>> = {
    parameters: RunRequestParameters<P>;
    modules: ScriptModules;
    firebot: {
        accounts: {
            streamer: UserAccount;
            bot: UserAccount;
        };
        settings: FirebotSettings;
        version: string;
    };
    trigger: Trigger;
};

export type ScriptReturnObject = {
    success: boolean;
    errorMessage?: string;
    effects: Array<Effects.Effect> | Firebot.EffectList;
    callback?: VoidFunction;
};

export namespace Firebot {
    type CustomScript<P extends Record<string, any> = {}> = {
        getScriptManifest(): Awaitable<CustomScriptManifest>;

        getDefaultParameters(): ParametersConfig<P>;

        /**
         * Called at app start and when the script is added to Firebot
         */
        run(
            runRequest: RunRequest<P>
        ): Awaitable<void> | Awaitable<ScriptReturnObject>;

        /**
         * Called when the user saves script parameters
         */
        parametersUpdated?(parameters: P): void;

        /**
         * Called when the script is stopped in Firebot. Use this to clean up registered effects/connections/etc.
         * @param uninstalling `true` if the plugin is being uninstalled/deleted from Firebot. Useful when you need to remove persistent data (e.g. webhooks).
         */
        stop?(uninstalling?: boolean): void;
    };

    type EffectType<EffectModel> = Effects.EffectType<EffectModel>;

    type EffectList = Effects.EffectList;
}

export * from "./modules/integration-manager";
