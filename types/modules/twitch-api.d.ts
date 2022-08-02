import { ApiClient } from "@twurple/api";
import { HelixTeam } from "@twurple/api/lib/api/helix/team/HelixTeam";

type TwitchGame = {
    id: string;
    name: string;
    boxArtUrl: string;
};

type TwitchChannelInformation = {
    broadcaster_id: string;
    game_name: string;
    game_id: string;
    title: string;
    broadcaster_language: string;
};

type ChatUserInfo = {
    _id: string;
    login: string;
    display_name: string;
    color: string;
    is_verified_bot: boolean;
    is_known_bot: boolean;
    badges: Array<{ id: string; version: string }>;
};

type ChatRole = "broadcaster" | "sub" | "vip" | "mod";

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

type TwitchStreamTag = {
    id: string;
    isAuto: boolean;
    name: string;
    description: string;
};

export type TwitchApi = {
    getClient(): ApiClient;
    channels: {
        triggerAdBreak(adLength?: number): Promise<boolean>;
        getOnlineStatus(username: string): Promise<boolean>;
        getChannelInformation(
            broadcasterId: string
        ): Promise<TwitchChannelInformation | null>;
        getChannelInformationByUsername(
            username: string
        ): Promise<TwitchChannelInformation | null>;
        updateChannelInformation(
            title?: string,
            gameId?: string
        ): Promise<void>;
    };
    channelRewards: {
        createCustomChannelReward(reward: CustomReward): Promise<CustomReward>;
        getCustomChannelRewards(
            onlyManageable?: boolean
        ): Promise<CustomReward[] | null>;
        getUnmanageableCustomChannelRewards(): Promise<CustomReward[] | null>;
        updateCustomChannelReward(reward: CustomReward): Promise<boolean>;
        deleteCustomChannelReward(rewardId: string): Promise<boolean>;
        getTotalChannelRewardCount(): Promise<number>;
    };
    users: {
        doesUserFollowChannel(
            username: string,
            channelName: string
        ): Promise<boolean>;
        getFollowDateForUser(username: string): Promise<Date | undefined>;
    };
    teams: {
        getStreamerTeams(): Promise<HelixTeam[] | null>;
        getMatchingTeamsById(userId: string): Promise<HelixTeam[] | null>;
        getMatchingTeamsByName(username: string): Promise<HelixTeam[] | null>;
    };
    categories: {
        getCategoryById(
            id: string,
            size?: string
        ): Promise<TwitchGame | undefined>;
        searchCategories(query: string): Promise<TwitchGame[]>;
    };
    streamTags: {
        getAllStreamTags(): Promise<TwitchStreamTag[] | []>;
        getChannelStreamTags(): Promise<TwitchStreamTag[] | []>;
        updateChannelStreamTags(tagIds: string[]): Promise<void>;
    };
};
