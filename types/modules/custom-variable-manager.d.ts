export type CustomVariableManager = {
    /**
     * Replaces the contents of the variable `name` with `data` completely or only some part of it.
     * @param name the identifier of the custom variable.
     * @param data that should be saved.
     * @param ttl how long in seconds the variable should be saved; Defaults to `0` for storing until a restart of Firebot.
     * @param propertyPath if variable already has some saved structured data, you can overwrite only some parts of it by
     *                     giving a path to the part in dot-notation.
     *                     Default: `null`, overwrites old contents of the variable completely.
     */
    addCustomVariable: (
        name: string,
        data: any,
        ttl?: number,
        propertyPath?: string
    ) => void;
    /**
     * Returns the content of the custom variable or parts thereof.
     * @param name the identifier of the custom variable.
     * @param propertyPath if variable already has some saved structured data, you can read only some parts of it by
     *                     giving a path to the part in dot-notation.
     *                     Default: `null`, reads the contents of the variable completely.
     * @return (part of the) content of the variable `name`, or `undefined` if no such variable exists.
     */
    getCustomVariable: (name: string, propertyPath?: string) => any | undefined;
};
