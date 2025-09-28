import { IOverlayWidgetUtils, OverlayWidgetConfig, OverlayWidgetType, WidgetOverlayEvent } from "../overlay-widgets";
import { FirebotParameterArray } from "../parameters";

export type OverlayWidgetsManager = {
    /**
     * Registers an overlay widget type with Firebot
     * @param overlayWidgetType The {@linkcode OverlayWidgetType} to register
     */
    registerOverlayWidgetType: (overlayWidgetType: OverlayWidgetType<any, any>) => void;

    /**
     * Gets an overlay widget type by the given ID
     * @param id ID of the widget type
     * @returns The {@linkcode OverlayWidgetType} that matches the given ID, or `null` if none match
     */
    getOverlayWidgetType: (id: string) => OverlayWidgetType | null;

    /**
     * Gets an array of the currently registered overlay widget types, formatted for Firebot frontend use
     */
    getOverlayWidgetTypesForFrontend: () => Array<{
        id: string;
        name: string;
        description: string;
        icon: string;
        settingsSchema?: FirebotParameterArray<Record<string, unknown>>;
        userCanConfigure?: {
            position?: boolean;
            zIndex?: boolean;
            entryAnimation?: boolean;
            exitAnimation?: boolean;
        },
        supportsLivePreview?: boolean;
        initialState?: Record<string, unknown>;
        initialAspectRatio?: {
            width: number;
            height: number;
        };
    }>;

    /**
     * Gets an array of overlay extensions for all registered overlay widget types
     */
    getOverlayExtensions: () => Array<{
        typeId: string;
        dependencies?: {
            css?: string[];
            js?: string[];
            globalStyles?: string;
        };
        eventHandler: (event: WidgetOverlayEvent<Record<string, unknown>, Record<string, unknown>>, utils: IOverlayWidgetUtils) => void;
        onInitialLoad?: () => void | Promise<void>;
    }>;

    /**
     * Sends a widget event to the overlay
     * @param eventName Name of the event
     * @param widgetConfig Configuration for the widget
     * @param messageInfo Message data to send with the `message` event, or `undefined` otherwise
     * @param previewMode `true` if sending in preview mode, `false` otherwise
     */
    sendWidgetEventToOverlay: <EventName extends WidgetOverlayEvent["name"]>(
        eventName: EventName,
        widgetConfig: OverlayWidgetConfig,
        messageInfo: EventName extends "message" ? { messageName: string; messageData?: unknown } : undefined,
        previewMode: boolean
    ) => Promise<void>;
}