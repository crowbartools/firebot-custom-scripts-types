import { Effects } from "../effects";
import EffectList = Effects.EffectList;

type Counter = {
    id: string;
    name: string;
    value: number;
    saveToTxtFile: boolean;
    /**
     * Effects that are triggered when the counter value has reached its maximal value.
     */
    maximumEffects: EffectList;
    /**
     * Effects that are triggered when the counter value has reached its minimal value.
     */
    minimumEffects: EffectList;
    /**
     * Effects that are triggered when the counter value is updated.
     */
    updateEffects: EffectList;
};

export type CounterManager = {
    createCounter: (name: string) => Counter;
    getCounter: (id: string) => Counter | undefined;
    /**
     * Finds a counter with the given name.
     * @param name the human-readable name of the counter.
     */
    getCounterByName: (name: string) => Counter | undefined;
    /**
     * Changes the value of the counter by/to value.
     * @param id of the counter that should be changed.
     * @param value the counter should be changed by/to. Can be negative.
     * @param overridePreviousValue if true: sets the counter to `value`; if false: adds `value` to the counter.
     */
    updateCounterValue: (
        id: string,
        value: number,
        overridePreviousValue: boolean
    ) => Promise<void>;
};
