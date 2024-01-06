import {
    ApiClient,
    HelixChannel,
    HelixChannelUpdate,
    HelixTeam,
    HelixUser,
    UserIdResolvable,
} from "@twurple/api";

type TwitchCategory = {
    id: string;
    name: string;
    boxArtUrl: string;
};

type ImageSet = {
    ur11x: string;
    ur12x: string;
    ur14x: string;
};

type CustomReward = {
    broadcasterId: string;
    broadcasterLogin: string;
    broadcasterName: string;
    id: string;
    title: string;
    prompt: string;
    cost: number;
    image?: ImageSet;
    defaultImage: ImageSet;
    backgroundColor: string;
    isEnabled: boolean;
    isUserInputRequired: boolean;
    maxPerStreamSetting: {
        isEnabled: boolean;
        maxPerStream: number;
    };
    maxPerUserPerStreamSetting: {
        isEnabled: boolean;
        maxPerUserPerStream: number;
    };
    globalCooldownSetting: {
        isEnabled: boolean;
        globalCooldownSeconds: number;
    };
    isPaused: boolean;
    isInStock: boolean;
    shouldRedemptionsSkipRequestQueue: boolean;
    redemptionsRedeemedCurrentStream: number;
    cooldownExpiresAt?: string;
};

export type TwitchApi = {
    getClient(): ApiClient;
    channels: {
        triggerAdBreak(adLength?: number): Promise<boolean>;
        getOnlineStatus(username: string): Promise<boolean>;
        getChannelInformation(broadcasterId: string): Promise<HelixChannel>;
        getChannelInformationByUsername(
            username: string
        ): Promise<HelixChannel>;
        updateChannelInformation(data: HelixChannelUpdate): Promise<void>;
        raidChannel(targetUserId: string): Promise<boolean>;
        cancelRaid(): Promise<boolean>;
        getVips(): Promise<string[]>;
    };
    channelRewards: {
        createCustomChannelReward(reward: CustomReward): Promise<CustomReward>;
        getCustomChannelRewards(
            onlyManageable?: boolean
        ): Promise<CustomReward[] | null>;
        getUnmanageableCustomChannelRewards(): Promise<CustomReward[] | null>;
        getManageableCustomChannelRewards(): Promise<CustomReward[]>;
        updateCustomChannelReward(reward: CustomReward): Promise<boolean>;
        deleteCustomChannelReward(rewardId: string): Promise<boolean>;
        getTotalChannelRewardCount(): Promise<number>;
        approveOrRejectChannelRewardRedemption(
            rewardId: string,
            redemptionId: string,
            approve?: boolean
        ): Promise<boolean>;
    };
    users: {
        doesUserFollowChannel(
            username: string,
            channelName: string
        ): Promise<boolean>;
        getFollowDateForUser(username: string): Promise<Date | undefined>;
        getUserById(userId: string): Promise<HelixUser>;
        getUserByName(username: string): Promise<HelixUser>;
        getUsersByNames(usernames: string[]): Promise<HelixUser[]>;
        blockUser(
            userId: UserIdResolvable,
            reason?: "spam" | "harassment" | "other"
        ): Promise<boolean>;
        unblockUser(userId: UserIdResolvable): Promise<boolean>;
    };
    teams: {
        getTeams(broadcasterId: string): Promise<HelixTeam[]>;
        getMatchingTeams(userId: string): Promise<HelixTeam[]>;
        getStreamerTeams(): Promise<HelixTeam[] | null>;
        getMatchingTeamsById(userId: string): Promise<HelixTeam[] | null>;
        getMatchingTeamsByName(username: string): Promise<HelixTeam[] | null>;
    };
    categories: {
        getCategoryById(
            id: string,
            size?: string
        ): Promise<TwitchCategory | undefined>;
        searchCategories(query: string): Promise<TwitchCategory[]>;
    };
};
