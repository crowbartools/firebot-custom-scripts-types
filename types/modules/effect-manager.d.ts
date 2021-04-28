import { EffectType } from "../effects";

export type EffectManager = {
  registerEffect: <EffectModel>(
    effectType: EffectType<EffectModel>
  ) => void;
};
