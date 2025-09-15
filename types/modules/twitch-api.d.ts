import {
    ApiClient,
    HelixAdSchedule,
    HelixBitsLeaderboardEntry,
    HelixBitsLeaderboardPeriod,
    HelixChannel,
    HelixChannelFollower,
    HelixChannelUpdate,
    HelixChatChatter,
    HelixCheermoteList,
    HelixGoal,
    HelixHypeTrainEvent,
    HelixModerator,
    HelixPoll,
    HelixPrediction,
    HelixStream,
    HelixTeam,
    HelixUser,
    HelixUserEmote,
    HelixUserRelation,
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

type RewardRedemption = {
    id: string;
    rewardId: string;
    redemptionDate: Date;
    userId: string;
    userName: string;
    userDisplayName: string;
    rewardMessage?: string;
};

type RewardRedemptionsApprovalRequest = {
    rewardId: string;
    redemptionIds?: string[];
    approve?: boolean;
};

type ResultWithError<TResult, TError> = {
    success: boolean;
    result?: TResult;
    error?: TError;
};

export type TwitchApi = {
    getClient(): ApiClient;
    bits: {
        getChannelBitsLeaderboard(
            count?: number,
            period?: HelixBitsLeaderboardPeriod,
            startDate?: Date,
            userId?: string
        ): Promise<HelixBitsLeaderboardEntry[]>;
        getChannelBitsTopCheerers(
            count?: number,
            period?: HelixBitsLeaderboardPeriod,
            startDate?: Date
        ): Promise<string[]>;
        getChannelCheermotes(): Promise<HelixCheermoteList>;
    };
    categories: {
        getCategoryById(
            id: string,
            size?: string
        ): Promise<TwitchCategory | undefined>;
        searchCategories(query: string): Promise<TwitchCategory[]>;
    };
    channelRewards: {
        getCustomChannelRewards(
            onlyManageable?: boolean
        ): Promise<CustomReward[] | null>;
        getCustomChannelReward(rewardId: string): Promise<CustomReward>;
        getManageableCustomChannelRewards(): Promise<CustomReward[]>;
        getUnmanageableCustomChannelRewards(): Promise<CustomReward[] | null>;
        getTotalChannelRewardCount(): Promise<number>;
        createCustomChannelReward(reward: CustomReward): Promise<CustomReward>;
        updateCustomChannelReward(reward: CustomReward): Promise<boolean>;
        deleteCustomChannelReward(rewardId: string): Promise<boolean>;
        getOpenChannelRewardRedemptions(): Promise<Record<string, RewardRedemption[]>>;
        approveOrRejectChannelRewardRedemption(
            request: RewardRedemptionsApprovalRequest
        ): Promise<boolean>;
        approveOrRejectAllRedemptionsForChannelRewards(
            rewardIds: string[],
            approve?: boolean
        ): Promise<boolean>;
    };
    channels: {
        getChannelInformation(broadcasterId: string): Promise<HelixChannel>;
        getOnlineStatus(username: string): Promise<boolean>;
        updateChannelInformation(data: HelixChannelUpdate): Promise<void>;
        getChannelInformationByUsername(
            username: string
        ): Promise<HelixChannel>;
        getAdSchedule(): Promise<HelixAdSchedule>
        triggerAdBreak(adLength?: number): Promise<boolean>;
        snoozeAdBreak(): Promise<boolean>
        raidChannel(targetUserId: string): Promise<boolean>;
        cancelRaid(): Promise<boolean>;
        getVips(): Promise<HelixUserRelation[]>;
    };
    charity: {
        getCurrentCharityFundraiserTotal(): Promise<number>;
        getCurrentCharityFundraiserGoal(): Promise<number>;
    };
    chat: {
        getAllChatters(): Promise<HelixChatChatter[]>;
        sendShoutout(targetUserId: string): Promise<ResultWithError<undefined, string>>;
        deleteChatMessage(messageId: string): Promise<boolean>;
        clearChat(): Promise<boolean>;
        setEmoteOnlyMode(enable?: boolean): Promise<boolean>;
        setFollowerOnlyMode(enable?: boolean, duration?: number): Promise<boolean>;
        setSubscriberOnlyMode(enable?: boolean): Promise<boolean>;
        setSlowMode(enable?: boolean, duration?: number): Promise<boolean>;
        setUniqueMode(enable?: boolean): Promise<boolean>;
        getColorForUser(targetUserId: string): Promise<string>;
        getAllUserEmotes(account?: "streamer" | "bot"): Promise<HelixUserEmote[]>;
    };
    goals: {
        getCurrentChannelGoals(): Promise<HelixGoal[]>;
    };
    hypeTrain: {
        getRecentHypeTrainEvents(): Promise<HelixHypeTrainEvent[]>;
    };
    moderation: {
        isUserTimedOut(userId: UserIdResolvable): Promise<boolean>;
        timeoutUser(
            userId: UserIdResolvable,
            duration: number,
            reason?: string
        ): Promise<boolean>;
        isUserBanned(userId: UserIdResolvable): Promise<boolean>;
        banUser(userId: UserIdResolvable, reason?: string): Promise<boolean>;
        unbanUser(userId: UserIdResolvable): Promise<boolean>;
        getModerators(): Promise<HelixModerator[]>;
        addChannelModerator(userId: UserIdResolvable): Promise<boolean>;
        removeChannelModerator(userId: UserIdResolvable): Promise<boolean>;
        addChannelVip(userId: UserIdResolvable): Promise<boolean>;
        removeChannelVip(userId: UserIdResolvable): Promise<boolean>;
    };
    polls: {
        createPoll(
            title: string,
            choices: string[],
            duration: number,
            channelPointsPerVote?: number
        ): Promise<void>;
        endPoll(pollId: string, showResult?: boolean): Promise<void>;
        getMostRecentPoll(): Promise<HelixPoll>;
    };
    predictions: {
        createPrediction(
            title: string,
            outcomes: string[],
            duration: number
        ): Promise<void>;
        lockPrediciton(predictionId: string): Promise<void>;
        cancelPrediction(predictionId: string): Promise<void>;
        resolvePrediction(predictionId: string, outcomeId: string): Promise<void>
        getMostRecentPrediction(): Promise<HelixPrediction>;
    };
    streams: {
        createStreamMarker(description?: string): Promise<void>;
        getStreamersCurrentStream(): Promise<HelixStream | null>;
    };
    subscriptions: {
        getSubscriberCount(): Promise<number>;
        getSubPointCount(): Promise<number>;
    };
    teams: {
        getTeams(broadcasterId: string): Promise<HelixTeam[]>;
        getMatchingTeams(userId: string): Promise<HelixTeam[]>;
        getMatchingTeamsByName(username: string): Promise<HelixTeam[] | null>;
        getMatchingTeamsById(userId: string): Promise<HelixTeam[] | null>;
        getStreamerTeams(): Promise<HelixTeam[]>;
    };
    users: {
        getUserById(userId: string): Promise<HelixUser>;
        getUsersByIds(userIds: string[]): Promise<HelixUser[]>;
        getUserByName(username: string): Promise<HelixUser>;
        getUsersByNames(usernames: string[]): Promise<HelixUser[]>;
        getFollowDateForUser(username: string): Promise<Date | undefined>;
        getUserChannelFollow(
            username: string,
            channelName: string
        ): Promise<HelixChannelFollower | boolean>;
        doesUserFollowChannel(
            username: string,
            channelName: string
        ): Promise<boolean>;
        blockUser(
            userId: UserIdResolvable,
            reason?: "spam" | "harassment" | "other"
        ): Promise<boolean>;
        unblockUser(userId: UserIdResolvable): Promise<boolean>;
    };
    whispers: {
        sendWhisper(
            recipientUserId: UserIdResolvable,
            message: string,
            sendAsBot?: boolean
        ): Promise<boolean>;
    }
};
