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

export type FirebotSettings = {
    flushSettingsCache(): void;

    /** @returns JsonDB */
    getSettingsFile(): any;

    pushDataToFile(path: string, data: any): void;
    getDataFromFile(path: string, forceCacheUpdate?: boolean): any;

    getEventSettings(): unknown;

    isCustomScriptsEnabled(): boolean;
    setCustomScriptsEnabled(enabled: boolean): void;

    ignoreSubsequentSubEventsAfterCommunitySub(): void;

    hasJustUpdated(): boolean;
    setJustUpdated(justUpdated: boolean): void;

    getOverlayVersion(): string;
    setOverlayVersion(newVersion: string): void;

    getClearCustomScriptCache(): boolean;
    setClearCustomScriptCache(clear: boolean): void;

    getCustomScriptsEnabled(): boolean;
    setCustomScriptsEnabled(enabled: boolean): void;

    getPersistCustomVariables(): boolean;
    setPersistCustomVariables(enabled: boolean): void;

    useOverlayInstances(): boolean;
    setUseOverlayInstances(oi: boolean): void;

    getOverlayInstances(): unknown[];
    setOverlayInstances(ois: unknown[]): void;

    backupKeepAll(): boolean;

    backupOnExit(): boolean;

    backupBeforeUpdates(): boolean;

    backupOnceADay(): boolean;
    setBackupOnceADay(backupOnceADay: boolean): void;

    lastBackupDate(): Date;
    setLastBackupDate(lastBackup: Date): void;

    maxBackupCount(): number;
    setMaxBackupCount(maxBackupCount: number): void;

    getAllowQuoteCSVDownloads(): boolean;

    getActiveChatUserListTimeout(): number;

    getWebSocketPort(): number;

    getWebServerPort(): number;

    getViewerDbStatus(): boolean;

    getAutoUpdateLevel(): FirebotAutoUpdateLevel;

    getAudioOutputDevice(): FirebotAudioOutputDevice;

    debugModeEnabled(): boolean;

    getWhileLoopEnabled(): boolean;
    setWhileLoopEnabled(enabled: boolean): void;

    getSidebarControlledServices(): string[];

    getMinimizeToTray(): boolean;
    setMinimizeToTray(minimizeToTray: boolean): void;
};
