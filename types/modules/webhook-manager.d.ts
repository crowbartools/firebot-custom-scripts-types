import { EventEmitter } from "events";

type WebhookConfig = {
    id: string;
    name: string;
    scriptId: string;
};

/**
 * Manages plugin webhooks serviced via the Crowbar API service
 */
export class WebhookManager extends EventEmitter {
    scriptName: string;

    /**
     * Creates a new webhook with the specified name
     * @param name Name for the new webhook
     */
    saveWebhook(name: string): WebhookConfig | null;

    /**
     * Gets an existing plugin webhook, or null if it doesn't exist
     * @param name Name of the webhook
     */
    getWebhook(name: string): WebhookConfig | null;

    /**
     * Deletes a plugin webhook
     * @param name Name of the webhook
     */
    deleteWebhook(name: string): boolean;

    /**
     * Gets all webhooks for this plugin
     */
    getWebhooks(): WebhookConfig[];

    /**
     * Gets the public URL for the specified plugin webhook
     * @param name Name of the webhook
     */
    getWebhookUrl(name: string): string | null;
}
