type FirebotUser = {
    readonly _id: string;
    username: string;
    displayName: string;
    profilePicUrl: string;
    twitch: boolean;
    twitchRoles: string[];
    online: boolean;
    /** Timestamp value */
    onlineAt: number;
    /** Timestamp value */
    lastSeen: number;
    /** Timestamp value */
    joinDate: number;
    minutesInChannel: number;
    chatMessages: number;
    disableAutoStatAccrual: boolean;
    disableActiveUserList: boolean;
    /**
     * Allows storing arbitrary objects as additional data in key-value pairs into the user object in the database.
     */
    metadata: Record<string, any>;
    /**
     * Maps currency-id to the amount the user has.
     */
    currency: Record<string, number>;
};

export type UserDb = {
    getTwitchUserByUsername: (
        username: string
    ) => Promise<FirebotUser | null>;
    /**
     * Creates a new user in the database. Returns the created user if successful.
     * 
     * @param userId User's Twitch account ID
     * @param username Twitch username
     * @param displayName Twitch display name
     * @param profilePicUrl Profile pic URL, if available
     * @param twitchRoles List of role strings, if applicable
     * @param isOnline Whether the user is currently online, defaults to false
     */
    createNewUser: (
        userId: string,
        username: string,
        displayName: string,
        profilePicUrl?: string,
        twitchRoles?: string[],
        isOnline?: boolean) => Promise<FirebotUser | null>;
    /**
     * Updates the given user in the database. Returns true if successful.
     * @param user that should be updated.
     */
    updateUser: (user: FirebotUser) => Promise<boolean>;
    /**
     * Adds some metadata to a user.
     * @param username of the user that should be updated.
     * @param key the metadata value should be saved under.
     * @param value to store under the key.
     * @param propertyPath defines in dot-notation which sub-element of value should be stored.
     *                     If omitted, stores the given value as-is.
     */
    updateUserMetadata: (
        username: string,
        key: string,
        value: any,
        propertyPath?: string
    ) => Promise<void>;
    /**
     * Retrieves metadata associated with the given user.
     * @param username of the user that has the metadata.
     * @param key of the metadata to retrieve.
     * @param propertyPath defines in dot-notation which sub-element of value should be retrieved.
     *                     If omitted, retrieves the whole value stored under the given key.
     */
    getUserMetadata: (
        username: string,
        key: string,
        propertyPath?: string
    ) => Promise<any>;
    getUserById: (id: string) => Promise<FirebotUser | undefined>;
    /**
     * Return all users with a username that contains `usernameFragment`.
     * @param usernameFragment the username should contain.
     */
    searchUsers: (
        usernameFragment: string
    ) => Promise<FirebotUser[] | undefined>;
    /**
     * Returns the top users with the most view time.
     * @param count how many users should be returned.
     */
    getTopViewTimeUsers: (
        count: number
    ) => Promise<Array<{ username: string; minutesInChannel: number }>>;
    getUserOnlineMinutes: (username: string) => Promise<number>;
    getOnlineUsers: () => Promise<FirebotUser[]>;
};
