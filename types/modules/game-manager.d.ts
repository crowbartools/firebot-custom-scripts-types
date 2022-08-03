type SettingType =
    | "string"
    | "number"
    | "boolean"
    | "enum"
    | "filepath"
    | "currency-select"
    | "chatter-select"
    | "editable-list"
    | "role-percentages"
    | "role-numbers";

export type SettingDefinition = {
    type: SettingType;
    title: string;
    description: string;
    /**
     * Human readable tip, this is rendered below the field in smaller muted text.
     */
    tip: string;
    default: any;
    /**
     * A rank to tell the UI how to order settings.
     */
    sortRank: number;
    /*
     * Display a line under the setting.
     */
    showBottomHr: boolean;
    validation: {
        required: boolean;
        /**
         * Only needed if the `type` is `number`.
         */
        min?: number;
        /**
         * Only needed if the `type` is `number`.
         */
        max?: number;
    };
};

/**
 * A setting category which holds a dictionary of settings.
 */
export type SettingCategoryDefinition = {
    title: string;
    description: string;
    sortRank: number;
    settings: Record<string, SettingDefinition>;
};

export type GameSettings = {
    active: boolean;
    /**
     * Dictionary of dictionaries that contains game settings saved by the user.
     * Outer index: category; inner: setting in that category.
     */
    settings: Record<string, Record<string, any>>;
};

type GameFn = (gameSettings: GameSettings) => void;

export type FirebotGame = {
    /**
     * Must be unique among all games registered in the Firebot system.
     */
    id: string;
    name: string;
    subtitle: string;
    description: string;
    /**
     * Font Awesome 5 icon to use for the game, ie `fa-dice-three`.
     */
    icon: string;
    settingCategories: Record<string, SettingCategoryDefinition>;
    /**
     * Called when the game is enabled, either on app load or if the user enables the game later.
     * You can register a system command here or set up any required game state.
     */
    onLoad: GameFn;
    /**
     * Called when the game was previously active but has since been disabled.
     * You should unregister any system commands here and clear out any game state.
     */
    onUnload: GameFn;
    /**
     * Called whenever the settings from `settingCategories` are updated by the user.
     */
    onSettingsUpdate: GameFn;
};

export type GameManager = {
  /**
   * Registers a game in the Firebot system.
   *
   * Does not register the game if its `id` already exists in the Firebot system.
   * @param game that should be registered.
   */
  registerGame: (game: FirebotGame) => void;
  getGameSettings: (gameId: string) => GameSettings;
};
