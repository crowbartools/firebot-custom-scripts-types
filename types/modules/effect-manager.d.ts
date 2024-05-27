import { Effects } from "../effects";
import EffectType = Effects.EffectType;

export type EffectManager = {
    getEffectById: <EffectModel>(effectId: string) => EffectType<EffectModel> | undefined;
    registerEffect: <EffectModel>(effectType: EffectType<EffectModel>) => void;
};
