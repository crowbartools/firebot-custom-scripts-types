import { Effects } from "../effects";
import EffectType = Effects.EffectType;

export type EffectManager = {
  registerEffect: <EffectModel>(
    effectType: EffectType<EffectModel>
  ) => void;
};
