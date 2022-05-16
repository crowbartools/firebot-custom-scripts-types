import EventEmitter from "events";
import { Express } from "express";
import { Server } from "http";

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD" | "CONNECT" | "OPTIONS" | "TRACE"

export type HttpServerManager = {
    sendToOverlay(eventName: string, meta?: Record<string, unknown>, overlayInstance?: any): void;
    registerCustomRoute(prefix: string, route: string, method: HttpMethod, callback: Function): boolean;
    unregisterCustomRoute(prefix: string, route: string, method: HttpMethod): boolean;
    startHttpServer(name: string, port: number, instance: Express): Server;
    stopHttpServer(name: string): boolean;
};