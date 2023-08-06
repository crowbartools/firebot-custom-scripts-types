export type ResourceTokenManager = {
    /**
     * Retrieves a path from a token, starting the deletion timeout.
     * @param token the resource token to retrieve.
     */
    getResourcePath: (token: string) => any | null;
    /**
     * Stores a path and returns a resource token.
     * @param path Path to save.
     * @param length Duration of resource token in seconds after first time accessing it.
     */
    storeResourcePath: (path: string, length: number) => string;
}
