import { AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from "axios";
export interface ExecuteScriptPayload {
    /**
     * Source code to be executed.
     * @example console.log('Hello World!')
     */
    source: string;
    /** Object with key value pairs that will be made available as properties on `globalThis` within the script context. */
    globals?: object;
    /**
     * Timeout in milliseconds after which execution is terminated and an error is returned.
     * @example 2000
     */
    timeout?: number;
    /** Additional scripts to be evaluated before the main source code runs. Can be used to customize the environment. */
    layers?: {
        name: string;
        source: string;
    }[];
    /** Credentials to be used in outbound `fetch` requests made to other domains. */
    fetchCredentials?: {
        domain: string;
        httpsOnly?: boolean;
        headerName?: string;
        headerValue?: string;
    }[];
}
export interface ExecuteScriptData {
    status?: "ok" | "failed";
    /** Value returned from the executed source code. Only present if `status` is `"ok"`. */
    value?: string;
    /** Exception thrown during execution. Only present if `status` is `"failed"`. */
    exception?: {
        message?: string;
        stack?: string[];
    };
    /** Duration (real time) of the execution (including layers) measured in milliseconds. */
    duration?: number;
    /** Log lines produced by the script or other layers via `console.log`. */
    logs?: string[];
}
export declare namespace Core {
    /**
     * No description
     * @tags core
     * @name ExecuteScript
     * @summary Execute Code Snippet
     * @request POST:/execute
     * @secure
     */
    namespace ExecuteScript {
        type RequestParams = {};
        type RequestQuery = {};
        type RequestBody = ExecuteScriptPayload;
        type RequestHeaders = {};
        type ResponseBody = ExecuteScriptData;
    }
}
export type QueryParamsType = Record<string | number, any>;
export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}
export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export class HttpClient<SecurityDataType = unknown> {
    instance: AxiosInstance;
    constructor({ securityWorker, secure, format, ...axiosConfig }?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig;
    protected stringifyFormItem(formItem: unknown): string;
    protected createFormData(input: Record<string, unknown>): FormData;
    request: <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams) => Promise<AxiosResponse<T, any>>;
}
/**
 * @title Scriptable API
 * @version 1.0.0
 * @baseUrl https://api.scriptable.run/v1
 */
export class Scriptable<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    /**
     * No description
     *
     * @tags core
     * @name ExecuteScript
     * @summary Execute Code Snippet
     * @request POST:/execute
     * @secure
     */
    executeScript: (data: ExecuteScriptPayload, params?: RequestParams) => Promise<AxiosResponse<ExecuteScriptData, any>>;
}

//# sourceMappingURL=types.d.ts.map
