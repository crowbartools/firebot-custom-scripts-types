import { Effects } from "../effects";
import EffectType = Effects.EffectType;

export type EffectManager = {
    getEffectById: (effectId: string) => EffectType<unknown> | undefined;
    registerEffect: <EffectModel>(effectType: EffectType<EffectModel>) => void;
};
