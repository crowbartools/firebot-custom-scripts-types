import { Firebot } from "..";

type BaseParameter = {
    title: string;
    description?: string;
    tip?: string;
    showBottomHr?: boolean;
    validation?: {
        required?: boolean;
    };
};

type StringParameter = BaseParameter & {
    type: "string";
    useTextArea?: boolean;
    default: string;
};

type PasswordParameter = BaseParameter & {
    type: "password";
    default: string;
};

type BooleanParameter = BaseParameter & {
    type: "boolean";
    default: boolean;
};

type NumberParameter = BaseParameter & {
    type: "number";
    placeholder?: string;
    default: number;
    validation?: {
        min?: number;
        max?: number;
    };
};

type EnumParameter = BaseParameter & {
    type: "enum";
    options: Array<string | number>;
    default: string | number;
};

type FilepathParameter = BaseParameter & {
    type: "filepath";
    fileOptions?: {
        directoryOnly: boolean;
        filters: Array<{
            name: string;
            extensions: string[];
        }>;
        title: string;
        buttonLabel: string;
    };
};

type EffectListParameter = BaseParameter & {
    type: "effectlist";
};

type DiscordChannelWebhookParameter = BaseParameter & {
    type: "discord-channel-webhooks";
};

type CurrencySelectParameter = BaseParameter & {
    type: "currency-select";
    default?: string;
};

type ChatterSelectParameter = BaseParameter & {
    type: "chatter-select";
    default?: "Bot" | "Streamer";
};

type EditableListParameter = BaseParameter & {
    type: "editable-list";
    default?: string[];
    settings: {
        useTextArea: boolean;
        sortable: boolean;
        addLabel: string;
        editLabel: string;
        noneAddedText: string;
    };
};

type MultiselectParameter = BaseParameter & {
    type: "multiselect";
    default?: string[] | number[];
    settings: {
        options: Array<{
            id: string | number;
            name: string;
        }>;
    };
};

export type RolePercentageParameterValue = {
    basePercent: number;
    roles: Array<{
        roleId: string;
        percent: number;
    }>;
};

type RolePercentagesParameter = BaseParameter & {
    type: "role-percentages";
    default?: RolePercentageParameterValue;
};

export type RoleNumberParameterValue = {
    base: number;
    roles: Array<{
        roleId: string;
        value: number;
    }>;
};

type RoleNumberParameter = BaseParameter & {
    type: "role-numbers";
    default?: RoleNumberParameterValue;
    settings: {
        defaultBase: number;
        defaultOther: number;
        min?: number;
        max?: number;
    };
};

type FirebotParameter =
    | StringParameter
    | PasswordParameter
    | BooleanParameter
    | NumberParameter
    | EnumParameter
    | EffectListParameter
    | DiscordChannelWebhookParameter
    | CurrencySelectParameter
    | ChatterSelectParameter
    | EditableListParameter
    | MultiselectParameter
    | RolePercentagesParameter
    | RoleNumberParameter;

type DefaultParametersConfig<P> = {
    [K in keyof P]: P[K] extends string
        ?
              | StringParameter
              | PasswordParameter
              | FilepathParameter
              | ChatterSelectParameter
              | CurrencySelectParameter
        : P[K] extends number
        ? NumberParameter
        : P[K] extends boolean
        ? BooleanParameter
        : P[K] extends Array<string> | Array<number>
        ? EnumParameter | MultiselectParameter | EditableListParameter
        : P[K] extends RolePercentageParameterValue
        ? RolePercentagesParameter
        : P[K] extends RoleNumberParameterValue
        ? RoleNumberParameter
        : P[K] extends Firebot.EffectList
        ? EffectListParameter
        : FirebotParameter;
};

type FirebotParamCategory<ParamConfig extends Record<string, unknown>> = {
    title: string;
    sortRank?: number;
    settings: DefaultParametersConfig<ParamConfig>;
};

export type FirebotParams = Record<string, Record<string, unknown>>;

export type FirebotParameterCategories<Config extends FirebotParams> = {
    [Category in keyof Config]: FirebotParamCategory<Config[Category]>;
};
