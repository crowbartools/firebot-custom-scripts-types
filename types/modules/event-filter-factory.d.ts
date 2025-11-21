import {
    EventData,
    EventFilter,
    FilterEvent,
    FilterSettings,
    PresetValue,
} from "./event-filter-manager";

export type MetadataKey =
    | string
    | ((eventData: any, filterSettings: FilterSettings) => string);

type FilterConfig = {
    id: string;
    name: string;
    description: string;
    events: Array<FilterEvent>;
    eventMetaKey:
        | string
        | ((eventData: EventData, filterSettings: FilterSettings) => string);
    caseInsensitive?: boolean;
};

type PresetFilterConfig = Omit<FilterConfig, "caseInsensitive"> & {
    presetValues: (
        ...args: unknown[]
    ) => Promise<PresetValue[]> | PresetValue[];
    valueIsStillValid?(
        filterSettings: FilterSettings,
        ...args: unknown[]
    ): Promise<boolean> | boolean;
    getSelectedValueDisplay?(
        filterSettings: FilterSettings,
        ...args: unknown[]
    ): Promise<string> | string;
    allowIsNot?: boolean;
};

export type EventFilterFactory = {
    createTextFilter: ({
        eventMetaKey,
        caseInsensitive,
        ...config
    }: FilterConfig) => EventFilter;
    createNumberFilter: ({
        eventMetaKey,
        ...config
    }: Omit<FilterConfig, "caseInsensitive">) => EventFilter;
    createTextOrNumberFilter: ({
        eventMetaKey,
        caseInsensitive,
        ...config
    }: FilterConfig) => EventFilter;
    createPresetFilter: ({
        eventMetaKey,
        presetValues,
        getSelectedValueDisplay,
        valueIsStillValid,
        allowIsNot,
        ...config
    }: PresetFilterConfig) => EventFilter;
};
