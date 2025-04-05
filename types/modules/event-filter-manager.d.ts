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
    events: Array<{
        eventSourceId: string;
        eventId: string;
    }>;
    comparisonTypes: string[];
    valueType: "text" | "number" | "preset";
    presetValues?(...args: any[]): Promise<PresetValue[]> | PresetValue[];
    valueIsStillValid?(filterSettings: FilterSettings, ...args: any[]): Promise<boolean> | boolean;
    getSelectedValueDisplay?(filterSettings: FilterSettings, ...args: any[]): Promise<string> | string;
    predicate(
        filterSettings: FilterSettings,
        eventData: {
            eventSourceId: string;
            eventId: string;
            eventMeta: Record<string, any>;
        }
    ): Promise<boolean> | boolean;
};

export type EventFilterManager = {
    registerFilter(filter: EventFilter): void;
};
