import { OverlayWidgetConfig } from "../overlay-widgets"

export type OverlayWidgetConfigManager = {
    /**
     * Saves an overlay widget config
     * @param config The {@linkcode OverlayWidgetConfig} to save
     * @param isNew Whether this is a new widget. Default is `false`.
     * @returns A {@linkcode OverlayWidgetConfig} object representing the saved widget
     */
    saveWidgetConfig: (config: OverlayWidgetConfig, isNew?: boolean) => OverlayWidgetConfig;

    /**
     * Removes an overlay widget config by the given ID
     * @param id ID of the widget
     * @returns `true` if the config exists and was successfully removed, or `false` otherwise
     */
    removeWidgetConfigById: (id: string) => boolean;

    /**
     * Gets all overlay widgets of the given type
     * @param typeId ID of the widget type
     * @returns An array of {@linkcode Config} objects matching the given widget type
     */
    getConfigsOfType: <Config extends OverlayWidgetConfig = OverlayWidgetConfig>(typeId: string) => Config[];

    /**
     * Gets a widget's state for the given ID
     * @param id ID of the widget
     * @returns The {@linkcode State} of the widget, or `null` if no widget exists witht the given ID
     */
    getWidgetStateById: <State = Record<string, unknown>>(id: string) => State | null;

    /**
     * Sets a widget's state for the given ID
     * @param id ID of the widget
     * @param state A {@linkcode Record<string, unknown>} representing the new widget state
     */
    setWidgetStateById: <State extends Record<string, unknown> = Record<string, unknown>>(id: string, state: State) => void;

    /**
     * Forces the Firebot frontend to reload overlay widget types and configs
     */
    triggerUiRefresh: () => void;
}