import EventEmitter from 'events';
import { Effects } from "../effects";
import Trigger = Effects.Trigger;
import TriggerType = Effects.TriggerType;
import TriggersObject = Effects.TriggersObject

export type ConditionSettings = {
    type: string,
    comparisonType: string,
    leftSideValue: string,
    rightSideValue: string
};

export type ConditionType = {
    id: string,
    name: string,
    description: string,
    comparisonTypes: string[],
    rightSideValueType: string,
    leftSideValueType?: string,
    triggers?: TriggerType[] | TriggersObject,
    leftSideTextPlaceholder?: string,
    rightSideTextPlaceholder?: string,
    getRightSidePresetValues?: Function,
    getLeftSidePresetValues?: Function,
    getRightSideValueDisplay?(condition: ConditionSettings, ...args: any): any,
    getLeftSideValueDisplay?(condition: ConditionSettings, ...args: any): any,
    valueIsStillValid?(condition: ConditionSettings, ...args: any): any,
    predicate(conditionSettings: ConditionSettings, trigger: Trigger): any
};

export type ConditionManager = EventEmitter & {
    registerConditionType(conditionType: ConditionType): void;
    getConditionTypeById(conditionTypeId: string): ConditionType;
    getAllConditionTypes(): ConditionType[];
    runConditions(conditionData: { conditions: ConditionSettings, mode: string }, triggerData: Trigger): Promise<boolean | null>;
};