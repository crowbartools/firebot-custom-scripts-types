export type EventFilter = {
    id: string;
    name: string;
    description: string;
    events: Array<{
        eventSourceId: string;
        eventId: string;
    }>;
    comparisonTypes: string[];
    valueType: "text" | "preset";
    presetValues(...args: any[]): Promise<any[]>;
    predicate(
        filterSettings: { comparisonType: string; value: any },
        eventData: {
            eventSourceId: string;
            eventId: string;
            eventMeta: Record<string, any>;
        }
    ): Promise<boolean>;
};

export type EventFilterManager = {
    registerFilter(filter: EventFilter): void;
};
