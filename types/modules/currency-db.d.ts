import { FirebotUser } from "./user-db";

type CurrencyAdjustType = "set" | "adjust";

type Currency = {
    id: string;
    name: string;
    active: boolean;
    limit: number;
    transfer: "Allow" | "Disallow";
    interval: number;
    payout: number;
    /** Offline payout */
    offline: number;
    /** Maps user role IDs to the amount of bonus payout they receive. */
    bonus: Record<string, number>;
};

export type CurrencyDB = {
    adjustCurrencyForUser: (
        username: string,
        currencyId: string,
        value: number,
        adjustType?: CurrencyAdjustType
    ) => Promise<boolean>;
    addCurrencyToOnlineUsers: (
        currencyId: string,
        value: string,
        ignoreDisposable?: boolean,
        adjustType?: CurrencyAdjustType
    ) => Promise<void>;
    getUserCurrencyAmount: (
        username: string,
        currencyId: string
    ) => Promise<number>;
    purgeCurrencyById: (currencyId: string) => void;
    refreshCurrencyCache: () => void;
    getCurrencies: () => Array<Currency>;
    getCurrencyById: (currencyId: string) => Currency | undefined;
    getCurrencyByName: (currencyName: string) => Currency | undefined;
    addCurrencyToUserGroupOnlineUsers: (
        roleIds: Array<string>,
        currencyId: string,
        value: string,
        ignoreDisposable?: boolean,
        adjustType?: CurrencyAdjustType
    ) => Promise<void>;
    isViewerDBOn: () => boolean;
    getTopCurrencyHolders: (
        currencyId: string,
        count: number
    ) => Promise<Array<FirebotUser>>;
    getTopCurrencyPosition: (
        currencyId: string,
        position?: number
    ) => Promise<FirebotUser | undefined>;
};
