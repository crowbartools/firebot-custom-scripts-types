export enum NotificationSource {
    EXTERNAL = "external",
    INTERNAL = "internal",
    SCRIPT = "script",
}

export enum NotificationType {
    INFO = "info",
    TIP = "tip",
    UPDATE = "update",
    ALERT = "alert",
}

type NotificationBase = {
    title: string;
    /**
     * The message to display in the notification
     * Supports markdown
     */
    message: string;
    type: NotificationType;
    metadata?: Record<string, unknown>;
};

export type Notification = NotificationBase & {
    id: string;
    timestamp: Date;
    saved: boolean;
    read: boolean;
    source?: NotificationSource;
    scriptName?: string;
    externalId?: string;
};

export type NotificationManager = {
    addNotification: (
        notification: NotificationBase,
        permanentlySave?: boolean
    ) => Notification;
    getNotifications: () => Notification[];
    getNotification: (id: string) => Notification | null;
    deleteNotification: (id: string) => void;
    /**
     * Only clears notifications that the script has created
     */
    clearAllNotifications: () => void;
};
