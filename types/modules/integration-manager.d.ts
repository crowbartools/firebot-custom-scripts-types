import {
    FirebotParameterCategories,
    FirebotParams,
} from "./firebot-parameters";

export type Integration<Params extends FirebotParams = FirebotParams> = {
    definition: IntegrationDefinition<Params>;
    integration: IntegrationController<Params>;
};

export type IntegrationDefinition<
    Params extends FirebotParams = FirebotParams
> = {
    id: string;
    name: string;
    description: string;
    connectionToggle?: boolean;
    configurable?: boolean;
    settingCategories: FirebotParameterCategories<Params>;
} & (
    | {
          linkType: "id";
          idDetails: {
              steps: string;
          };
      }
    | {
          linkType: "auth";
          authProviderDetails: {
              id: string;
              name: string;
              redirectUriHost?: string;
              client: {
                  id: string;
                  secret: string;
              };
              auth: {
                  tokenHost: string;
                  tokenPath: string;
                  authorizePath: string;
              };
              autoRefreshToken?: boolean;
              scopes: string;
          };
      }
    | { linkType: "other" | "none" }
);

export interface IntegrationEvents {
    connected: (id: string) => void;
    disconnected: (id: string) => void;
    "settings-update": (id: string, settings: Record<string, any>) => void;
}

// export class IntegrationEventEmitter extends TypedEmitter<IntegrationEvents> {}

type LinkData =
    | {
          accountId: string;
      }
    | {
          auth: Record<string, unknown>;
      }
    | null;

export type IntegrationData<Params extends FirebotParams = FirebotParams> = {
    settings: any;
    userSettings?: Params;
    oauth?: any;
    accountId?: string;
};

export interface IntegrationController<
    Params extends FirebotParams = FirebotParams
> {
    connected: boolean;
    init(
        linked: boolean,
        integrationData: IntegrationData<Params>
    ): void | PromiseLike<void>;
    link?(linkData: LinkData): void | PromiseLike<void>;
    connect?(
        integrationData: IntegrationData<Params>
    ): void | PromiseLike<void>;
    disconnect?(): void | PromiseLike<void>;
    onUserSettingsUpdate?(
        integrationData: IntegrationData<Params>
    ): void | PromiseLike<void>;
}

type ObjectOfUnknowns = {
    [key: string]: any;
};

type IntegrationWithUnknowns = {
    definition: IntegrationDefinition & ObjectOfUnknowns;
    integration: IntegrationController & ObjectOfUnknowns;
};

export type IntegrationManager = {
    registerIntegration(integration: Integration): void;
    getIntegrationById(integrationId: string): IntegrationWithUnknowns;
    getIntegrationDefinitionById(
        integrationId: string
    ): (IntegrationDefinition & ObjectOfUnknowns) | null;
    integrationIsConnectable(integrationId: string): boolean;
    getAllIntegrationDefinitions(): IntegrationDefinition[];
};
