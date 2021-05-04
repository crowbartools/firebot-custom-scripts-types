export type FrontendCommunicator = {
  send(eventName: string, data: unknown): void;
  on<ExpectedArgs extends Array<any> = [], ReturnPayload = void>(
    eventName: string,
    callback: (...args: ExpectedArgs[]) => ReturnPayload
  ): void;
  onAsync<ExpectedArgs extends Array<any> = [], ReturnPayload = void>(
    eventName: string,
    callback: (...args: ExpectedArgs[]) => Promise<ReturnPayload>
  ): void;
  fireEventAsync<ReturnPayload = void>(
    eventName: string,
    data: unknown
  ): Promise<ReturnPayload>;
};
