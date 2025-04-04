import { Express, Request, Response } from "express";
import http from "http";
import { TypedEmitter } from "tiny-typed-emitter";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
type HttpMethod =
    | "GET"
    | "POST"
    | "PUT"
    | "PATCH"
    | "DELETE"
    | "HEAD"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE";

export interface InvokePluginWebsocketMessage<TData = unknown> {
    type: "invoke";
    name: "plugin";
    pluginName: string;
    id: string | number;
    data?: TData;
};

interface ServerManagerEvents {
    "overlay-connected"(instanceName?: string): void;
    "overlay-event"<TEvent = unknown>(event: TEvent): void;
}

export type HttpServerManager = TypedEmitter<ServerManagerEvents> & {
    /** Send an event to the overlay.
     * @template TData The type of the data to send with the event. *Should* extend from
     * `Record<string, unknown>`, but doesn't *need* to.
     * @param eventName The name of the event.
     * @param meta (optional) Data pertinent for the event.
     * @param overlayInstance (optional) The particular overlay instance to send the event to.
     */
    sendToOverlay<TData = unknown>(
        eventName: string,
        meta?: TData,
        overlayInstance?: string
    ): void;

    /** Register a custom route with the HTTP server manager. The full URL to invoke the callback
     * would be similar to: `http://localhost:7472/integrations/${prefix}/${route}`
     * @param prefix The initial portion of the URL, which should generally be unique for a given
     * custom plugin.
     * @param route The specific route to respond to.
     * @param method The HTTP method to respond to.
     * @param callback A callback to invoke when a request is made to the custom route. 
     * @returns `true` if the custom route was successfully registered; otherwise, `false`.
     * @see HttpServerManager.unregisterCustomRoute
     */
    registerCustomRoute(
        prefix: string,
        route: string,
        method: HttpMethod,
        callback: (req: Request, res: Response) => Promise<void> | void
    ): boolean;

    /** Unregister a custom route from the HTTP server manager. The full URL to invoke the callback
     * would be similar to: `http://localhost:7472/integrations/${prefix}/${route}`
     * @param prefix The initial portion of the URL, which should generally be unique for a given
     * custom plugin.
     * @param route The specific route to unregister.
     * @param method The HTTP method to unregister.
     * @returns `true` if the custom route was successfully unregistered; otherwise, `false`.
     * @see HttpServerManager.registerCustomRoute
     */
    unregisterCustomRoute(
        prefix: string,
        route: string,
        method: HttpMethod
    ): boolean;

    startHttpServer(name: string, port: number, instance: Express): http.Server;
    stopHttpServer(name: string): boolean;

    /** Register a custom plugin message with the WebSocket server. WebSocket messages should
     * match the `InvokePluginWebsocketMessage` type in order to get routed to the callback.
     * @template TData The type of data passed to the callback function.
     * @param pluginName The name of the plugin to register.
     * @param callback The callback to be invoked when a web socket "plugin" message is received.
     * @returns `true` if the listener was successfully registered; otherwise, `false`, such as if
     * a listener for that `pluginName` had previously been registered.
     * @see InvokePluginWebsocketMessage
     * @see HttpServerManager.unregisterCustomWebSocketListener
     */
    registerCustomWebSocketListener<TData = unknown>(
        pluginName: string,
        callback: (data: TData) => Promise<void> | void
    ): boolean;

    /** Trigger a custom event in the WebSocket server manager.
     * @template TEvent The type of event data to send with the event.
     * @param eventType The name of the custom-event to trigger.
     * @param payload The associated data for the event.
     */
    triggerCustomWebSocketEvent<TEvent extends object = object>(
        eventType: string,
        payload?: TEvent
    ): void;

    /** Unregister a custom message listener from the WebSocket server.
     * @param pluginName The same `pluginName` that was used to register the listener.
     * @returns `true` if the listener was successfully unregistered; otherwise, `false`, such as
     * if no listeners were registered for the `pluginName`.
     * @see HttpServerManager.registerCustomWebSocketListener
     */
    unregisterCustomWebSocketListener(
        pluginName: string
    ): boolean;
};
