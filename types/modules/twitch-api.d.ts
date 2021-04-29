import { ApiClient } from "twitch";
import { Team } from "twitch/lib/API/Kraken/Team/Team";

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

export type TwitchApi = {
  getClient(): ApiClient;
  channel: {
    triggerAdBreak(adLength?: number): Promise<boolean>;
    getOnlineStatus(username: string): Promise<boolean>;
    getChannelInformation(
      broadcasterId: string
    ): Promise<TwitchChannelInformation | null>;
    getChannelInformationByUsername(
      username: string
    ): Promise<TwitchChannelInformation | null>;
    updateChannelInformation(title?: string, gameId?: string): Promise<void>;
  };
  users: {
    doesUserFollowChannel(
      username: string,
      channelName: string
    ): Promise<boolean>;
    toggleFollowOnChannel(
      channelIdToFollow: string,
      shouldFollow?: boolean
    ): Promise<void>;
    getFollowDateForUser(username: string): Promise<Date | undefined>;
    getUsersChatRoles(userIdOrName: string): Promise<ChatRole[]>;
    getUserChatInfoByName(username: string): Promise<ChatUserInfo | undefined>;
  };
  teams: {
    getStreamerTeams(): Promise<Team[] | null>;
    getMatchingTeamsById(userId: string): Promise<Team[] | null>;
    getMatchingTeamsByName(username: string): Promise<Team[] | null>;
  };
  categories: {
    getCategoryById(id: string, size?: string): Promise<TwitchGame | undefined>;
    searchCategories(query: string): Promise<TwitchGame[]>;
  };
};
