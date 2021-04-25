import { Firebot } from "../index";

export type EffectManager = {
  registerEffect: <EffectModel>(
    effectType: Firebot.EffectType<EffectModel>
  ) => void;
};
