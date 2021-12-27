import EventEmitter from 'events';

export type IntegrationType = {
    definition: IntegrationDefinition,
    integration: Integration
};

export type IntegrationDefinition = {
    id: string,
    name: string,
    description: string,
    linkType: "none" | "auth" | "id" | "other",
    connectionToggle: boolean,
    configurable: boolean,
    settingCategories: {},
    linked: boolean,
    settings: {},
    //integration settings
    userSettings?: {},
    auth?: any,
    accountId?: string,
    oauth?: any
    idDetails?: {
        label: string,
        steps: string
    }
};

export type Integration = EventEmitter & {
    connected: boolean,
    _socket: {
        on(event: string, callback: (data: {}) => void): void
    }
};

export type IntegrationManager = {
    getIntegrationById(integrationId: string): IntegrationType,
    getIntegrationDefinitionById(integrationId: string): IntegrationDefinition | null,
    integrationIsConnectable(integrationId: string): boolean,
    getAllIntegrationDefinitions(): Array<IntegrationDefinition>
};