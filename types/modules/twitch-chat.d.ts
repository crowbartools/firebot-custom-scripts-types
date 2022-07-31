export type TwitchChat = {
    sendChatMessage(
        message: string,
        whisperTarget?: string,
        accountType?: "bot" | "streamer"
    ): void;
};
