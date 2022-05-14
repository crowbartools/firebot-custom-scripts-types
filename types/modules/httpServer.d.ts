import EventEmitter from "events";

export type HTTPServer = {
    sendToOverlay(eventName: string, meta?: Record<string, unknown>, overlayInstance?: any): void;
};