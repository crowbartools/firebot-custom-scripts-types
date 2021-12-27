import EventEmitter from "events";

export type HTTPServer = {
    events: EventEmitter;
    start(): void;
    sendToOverlay(eventName: string, meta?: Record<string, unknown>, overlayInstance?: any): void;
};