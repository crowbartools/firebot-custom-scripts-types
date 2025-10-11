export type TwitchChat = {
    /** 
     * @deprecated Use `twitchApi.chat.sendChatMessage` instead.
     */
    sendChatMessage(
        message: string,
        whisperTarget?: string,
        accountType?: "bot" | "streamer",
        replyToMessageId?: string
    ): Promise<void>;
};