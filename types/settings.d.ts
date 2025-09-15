import type { TypedEmitter } from "tiny-typed-emitter";

export enum FirebotAutoUpdateLevel {
    Off = 0,
    Bugfix = 1,
    Feature = 2,
    MajorRelease = 3,
    Betas = 4,
}

export type FirebotAudioOutputDevice = {
    label: string;
    deviceId: string;
};

export type FirebotSettingsTypes = {
    ActiveChatUserListTimeout: number;
    ActiveProfiles: string[];
    AllowCommandsInSharedChat: boolean;
    AllowQuoteCSVDownloads: boolean;
    AllowedActivityEvents: string[];
    AudioOutputDevice: FirebotAudioOutputDevice;
    AutoFlagBots: boolean;
    AutoUpdateLevel: FirebotAutoUpdateLevel;
    BackupBeforeUpdates: boolean;
    BackupIgnoreResources: boolean;
    BackupKeepAll: boolean;
    BackupLocation: string;
    BackupOnceADay: boolean;
    BackupOnExit: boolean;
    ChatAlternateBackgrounds: boolean;
    ChatAvatars: boolean;
    ChatCompactMode: boolean;
    ChatCustomFontFamily: string;
    ChatCustomFontFamilyEnabled: boolean;
    ChatCustomFontSize: number;
    ChatCustomFontSizeEnabled: boolean;
    ChatGetAllEmotes: boolean;
    ChatHideBotAccountMessages: boolean;
    ChatHideDeletedMessages: boolean;
    ChatHideWhispers: boolean;
    ChatPronouns: boolean;
    ChatShowBttvEmotes: boolean;
    ChatShowFfzEmotes: boolean;
    ChatShowSevenTvEmotes: boolean;
    ChatTaggedNotificationSound: { name: string, path?: string | undefined };
    ChatTaggedNotificationVolume: number;
    ChatTimestamps: boolean;
    ClearChatFeedMode: "never" | "onlyStreamer" | "always";
    ClearCustomScriptCache: boolean;
    CopiedOverlayVersion: string;
    DashboardLayout: {
        dashboardViewerList: string;
        dashboardChatWindow: string;
        dashboardActivityFeed: string;
    };
    DebugMode: boolean;
    DefaultEffectLabelsEnabled: boolean;
    DefaultToAdvancedCommandMode: boolean;
    DefaultTtsVoiceId: string;
    DeleteProfile: string;
    EventSettings: object; //TODO
    FirstTimeUse: boolean;
    ForceOverlayEffectsToContinueOnRefresh: boolean;
    IgnoreSubsequentSubEventsAfterCommunitySub: boolean;
    JustUpdated: boolean;
    LastBackupDate: Date;
    LegacySortTagsImported: boolean;
    LoggedInProfile: string;
    MaxBackupCount: number | "All";
    MinimizeToTray: boolean;
    NotifyOnBeta: boolean;
    OpenEffectQueueMonitorOnLaunch: boolean;
    OpenStreamPreviewOnLaunch: boolean;
    OverlayInstances: string[];
    PersistCustomVariables: boolean;
    QuickActions: Record<string, {
        enabled: boolean;
        position: number;
    }>;
    RunCustomScripts: boolean;
    SeenAdvancedCommandModePopup: boolean;
    ShowAdBreakIndicator: boolean;
    ShowActivityFeed: boolean;
    ShowChatViewerList: boolean;
    ShowHypeTrainIndicator: boolean;
    ShowUptimeStat: boolean;
    ShowViewerCountStat: boolean;
    SidebarControlledServices: string[];
    SidebarExpanded: boolean;
    SoundsEnabled: "On" | "Off";
    Theme: string;
    TriggerUpcomingAdBreakMinutes: number;
    TtsVoiceRate: number;
    TtsVoiceVolume: number;
    UseExperimentalTwitchClipUrlResolver: boolean;
    UseOverlayInstances: boolean;
    ViewerDB: boolean;
    ViewerListPageSize: number;
    WebhookDebugLogs: boolean;
    WebOnlineCheckin: boolean;
    WebServerPort: number;
    WhileLoopEnabled: boolean;
    WysiwygBackground: "black" | "white";
}

type UpdatedEvents = {
    [Key in keyof FirebotSettingsTypes as `settings:setting-updated:${Key}`]: (data: FirebotSettingsTypes[Key]) => void;
};
type DeletedEvents = {
    [Key in keyof FirebotSettingsTypes as `settings:setting-deleted:${Key}`]: () => void;
};
interface SettingsEvents extends DeletedEvents, UpdatedEvents {}

export type FirebotSettings = TypedEmitter<SettingsEvents> & {
    /** Delete a Firebot setting, and emits a "settings:setting-deleted:settingName"
     * event with no data.
     * @param settingName The name of the setting to delete.
     */
    deleteSetting<SettingName extends keyof FirebotSettingsTypes>(
        settingName: SettingName
    ): void;

    /** Flushes the settings cache, forcing all settings to be retrieved from file on the next retrieval. */
    flushSettingsCache(): void;

    /** Get a plugin setting or its default.
     * @template T The type of the settings value.
     * @param pluginName The name of the plugin.
     * @param settingName The name of the setting.
     * @param forceCacheUpdate (optional; default `false`) `true` to force an update to the settings cache.
     * @param defaultValue (optional) The default value to return if one isn't explicitly defined.
     * @returns The saved plugin setting value, or the default if one doesn't exist.
     */
    getPluginSetting<T = unknown>(
        pluginName: string,
        settingName: string,
        forceCacheUpdate?: boolean,
        defaultValue?: T
    ): T | undefined | null;

    /** Get a Firebot setting value or its default.
     * @param settingName The name of the setting to get.
     * @param forceCacheUpdate (optional; default `false`) If `true`, forces an update to the settings cache.
     * @returns The setting value, or the default if one isn't explicitly set.
     */
    getSetting<SettingName extends keyof FirebotSettingsTypes>(
        settingName: SettingName,
        forceCacheUpdate?: boolean
    ): FirebotSettingsTypes[SettingName] | null | undefined;

    /** Get the JSON data path for a specific Firebot setting in the settings file.
     * @param settingName Name of the setting.
     * @returns A string representing the full JSON path of the setting data.
     */
    getSettingPath<SettingName extends keyof FirebotSettingsTypes>(
        settingName: SettingName
    ): string;

    /** Save a Firebot setting, and emits an "settings:setting-updated:settingName" event
     * with the provided `data`.
     * @param settingName The name of the setting to save.
     * @param data The data to save to the setting.
     */
    saveSetting<SettingName extends keyof FirebotSettingsTypes>(
        settingName: SettingName,
        data: FirebotSettingsTypes[SettingName]
    ): void;


    // Everything below this is deprecated. Leaving them for back compat with scripts.
    // You should use either getSetting or saveSetting with the relevant setting name.

    /** @deprecated Use `getSetting("EventSettings")` instead */
    getEventSettings(): unknown;

    /** @deprecated Use `getSetting("IgnoreSubsequentSubEventsAfterCommunitySub")` instead */
    ignoreSubsequentSubEventsAfterCommunitySub(): void;

    /** @deprecated Use `getSetting("JustUpdated")` instead */
    hasJustUpdated(): boolean;
    /** @deprecated Use `saveSetting("JustUpdated", value)` instead */
    setJustUpdated(justUpdated: boolean): void;

    /** @deprecated Use `getSetting("CopiedOverlayVersion")` instead */
    getOverlayVersion(): string;
    /** @deprecated Use `saveSetting("CopiedOverlayVersion", value)` instead */
    setOverlayVersion(newVersion: string): void;

    /** @deprecated Use `getSetting("ClearCustomScriptCache")` instead */
    getClearCustomScriptCache(): boolean;
    /** @deprecated Use `saveSetting("ClearCustomScriptCache", value)` instead */
    setClearCustomScriptCache(clear: boolean): void;

    /** @deprecated Use `getSetting("RunCustomScripts")` instead */
    isCustomScriptsEnabled(): boolean;
    /** @deprecated Use `getSetting("RunCustomScripts")` instead */
    getCustomScriptsEnabled(): boolean;
    /** @deprecated Use `saveSetting("RunCustomScripts", value)` instead */
    setCustomScriptsEnabled(enabled: boolean): void;

    /** @deprecated Use `getSetting("PersistCustomVariables")` instead */
    getPersistCustomVariables(): boolean;
    /** @deprecated Use `saveSetting("PersistCustomVariables", value)` instead */
    setPersistCustomVariables(enabled: boolean): void;

    /** @deprecated Use `getSetting("UseOverlayInstances")` instead */
    useOverlayInstances(): boolean;
    /** @deprecated Use `saveSetting("UseOverlayInstances", value)` instead */
    setUseOverlayInstances(oi: boolean): void;

    /** @deprecated Use `getSetting("OverlayInstances")` instead */
    getOverlayInstances(): string[];
    /** @deprecated Use `saveSetting("OverlayInstances", value)` instead */
    setOverlayInstances(ois: string[]): void;

    /** @deprecated Use `getSetting("BackupKeepAll")` instead */
    backupKeepAll(): boolean;

    /** @deprecated Use `getSetting("BackupOnExit")` instead */
    backupOnExit(): boolean;

    /** @deprecated Use `getSetting("BackupBeforeUpdates")` instead */
    backupBeforeUpdates(): boolean;

    /** @deprecated Use `getSetting("BackupOnceADay")` instead */
    backupOnceADay(): boolean;
    /** @deprecated Use `saveSetting("BackupOnceADay", value)` instead */
    setBackupOnceADay(backupOnceADay: boolean): void;

    /** @deprecated Use `getSetting("LastBackupDate")` instead */
    lastBackupDate(): Date;
    /** @deprecated Use `saveSetting("LastBackupDate", value)` instead */
    setLastBackupDate(lastBackup: Date): void;

    /** @deprecated Use `getSetting("MaxBackupCount")` instead */
    maxBackupCount(): number;
    /** @deprecated Use `getSetting("MaxBackupCount")` instead */
    setMaxBackupCount(maxBackupCount: number): void;

    /** @deprecated Use `getSetting("AllowQuoteCSVDownloads")` instead */
    getAllowQuoteCSVDownloads(): boolean;

    /** @deprecated Use `getSetting("ActiveChatUserListTimeout")` instead */
    getActiveChatUserListTimeout(): number;

    /** @deprecated Use `getSetting("WebServerPort")` instead */
    getWebSocketPort(): number;
    /** @deprecated Use `getSetting("WebServerPort")` instead */
    getWebServerPort(): number;

    /** @deprecated Use `getSetting("ViewerDB")` instead */
    getViewerDbStatus(): boolean;

    /** @deprecated Use `getSetting("AutoUpdateLevel")` instead */
    getAutoUpdateLevel(): FirebotAutoUpdateLevel;

    /** @deprecated Use `getSetting("AudioOutputDevice")` instead */
    getAudioOutputDevice(): FirebotAudioOutputDevice;

    /** @deprecated Use `getSetting("DebugMode")` instead */
    debugModeEnabled(): boolean;

    /** @deprecated Use `getSetting("WhileLoopEnabled")` instead */
    getWhileLoopEnabled(): boolean;
    /** @deprecated Use `saveSetting("WhileLoopEnabled", value)` instead */
    setWhileLoopEnabled(enabled: boolean): void;

    /** @deprecated Use `getSetting("SidebarControlledServices")` instead */
    getSidebarControlledServices(): string[];

    /** @deprecated Use `getSetting("MinimizeToTray")` instead */
    getMinimizeToTray(): boolean;
    /** @deprecated Use `saveSetting("MinimizeToTray", value)` instead */
    setMinimizeToTray(minimizeToTray: boolean): void;
};
