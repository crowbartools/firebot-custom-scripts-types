import { Effects } from "../effects";
import EffectType = Effects.EffectType;

export type EffectManager = {
    /**
     * Retrieves an effect by the given ID
     * @param effectId ID of the effect you want to retrieve
     * @returns The {@linkcode EffectModel} of the specified effect, or `undefined` if it doesn't exist
     */
    getEffectById: <EffectModel>(
        effectId: string
    ) => EffectType<EffectModel> | undefined;

    /**
     * Registers an effect in Firebot
     * @param effectType The {@linkcode EffectType} you want to register
     */
    registerEffect: <EffectModel>(effectType: EffectType<EffectModel>) => void;

    /**
     * Unregisters an effect from Firebot
     * @param effectId ID of the effect to unregister
     */
    unregisterEffect: (effectId: string) => void;

    /**
     * Adds an event trigger to an existing Firebot effect
     * @param effectId ID of the effect
     * @param eventSourceId Event source ID of the event to add
     * @param eventId Event ID of the event to add
     */
    addEventToEffect: (effectId: string, eventSourceId: string, eventId: string) => void;
    
    /**
     * Removes an event trigger from an existing Firebot effect
     * @param effectId ID of the effect
     * @param eventSourceId Event source ID of the event to remove
     * @param eventId Event ID of the event to remove
     */
    removeEventFromEffect: (effectId: string, eventSourceId: string, eventId: string) => void;
};
