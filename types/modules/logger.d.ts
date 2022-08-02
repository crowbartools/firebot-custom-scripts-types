interface LeveledLogMethod {
    (msg: string, ...meta: any[]): void;
}

export type Logger = {
    debug: LeveledLogMethod;
    info: LeveledLogMethod;
    warn: LeveledLogMethod;
    error: LeveledLogMethod;
};
