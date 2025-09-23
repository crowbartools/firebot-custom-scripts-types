type EventData = {
    eventSourceId: string;
    eventId: string;
    eventMeta: Record<string, unknown>;
}

type FilterEvent = Omit<EventData, "eventMeta">;

export type FilterSettings = {
    comparisonType: string;
    value: any;
};

export type PresetValue = {
    value: any;
    display: string;
}

export type EventFilter = {
    id: string;
    name: string;
    description: string;
    events: Array<FilterEvent>;
    comparisonTypes: string[];
    valueType: "text" | "number" | "preset";
    presetValues?(...args: any[]): Promise<PresetValue[]> | PresetValue[];
    valueIsStillValid?(filterSettings: FilterSettings, ...args: any[]): Promise<boolean> | boolean;
    getSelectedValueDisplay?(filterSettings: FilterSettings, ...args: any[]): Promise<string> | string;
    predicate(
        filterSettings: FilterSettings,
        eventData: EventData,
    ): Promise<boolean> | boolean;
};

export type EventFilterManager = {
    /**
     * Registers an event filter in Firebot.
     * @param filter The {@linkcode EventFilter} to register.
     */
    registerFilter: (filter: EventFilter) => void;

    /**
     * Unregisters an event filter from Firebot.
     * @param filterId The ID of the filter to unregister.
     */
    unregisterFilter: (filterId: string) => void;

    /**
     * Adds an event to an existing Firebot event filter.
     * @param filterId The ID of the filter.
     * @param eventSourceId The ID of the event source you want to add.
     * @param eventId The ID of the event you want to add.
     */
    addEventToFilter: (filterId: string, eventSourceId: string, eventId: string) => void;
};
