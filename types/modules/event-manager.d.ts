export type EventSource = {
    id: string;
    name: string;
    events: Array<{
        id: string;
        name: string;
        description: string;
        cached?: boolean;
        manualMetadata?: Record<string, unknown>;
        isIntegration?: boolean;
        activityFeed?: {
            icon: string;
            getMessage: (eventData: Record<string, unknown>) => string;
        };
    }>;
};

export type EventManager = {
    /**
     * Registers an event source in Firebot.
     * @param eventSource The {@linkcode EventSource} you want to register.
     */
    registerEventSource: (eventSource: EventSource) => void;

    /**
     * Unregisters an event source from Firebot.
     * @param eventSourceId The ID of the event source to unregister.
     */
    unregisterEventSource: (eventSourceId: string) => void;

    /**
     * Triggers an event in Firebot.
     * @param eventSourceId The ID of the event source.
     * @param eventId The ID of the event.
     * @param meta Any metadata you want to include with the event.
     * @param isManual `true` if the event is being triggered manually, `false` otherwise.
     */
    triggerEvent: (
        eventSourceId: string,
        eventId: string,
        meta: Record<string, unknown>,
        isManual?: boolean
    ) => void;
};
