export declare namespace Execute {
    /**
     * No description
     * @tags core
     * @name Execute
     * @summary Execute Code Snippet
     * @request POST:/execute
     */
    namespace Execute {
        type RequestParams = {};
        type RequestQuery = {};
        type RequestBody = {
            source: string;
            globals?: object;
            timeout?: number;
            layers?: {
                name: string;
                source: string;
            }[];
            fetchCredentials?: {
                domain: string;
                httpsOnly?: boolean;
                headerName?: string;
                headerValue?: string;
            }[];
        };
        type RequestHeaders = {};
        type ResponseBody = {
            status?: "ok" | "failed";
            value?: string;
            exception?: {
                message?: string;
                stack?: string[];
            };
            duration?: number;
            logs?: string[];
        };
    }
}
export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;
export interface FullRequestParams extends Omit<RequestInit, "body"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseFormat;
    /** request body */
    body?: unknown;
    /** base url */
    baseUrl?: string;
    /** request cancellation token */
    cancelToken?: CancelToken;
}
export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;
export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    customFetch?: typeof fetch;
}
export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}
type CancelToken = Symbol | string | number;
export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded"
}
export class HttpClient<SecurityDataType = unknown> {
    baseUrl: string;
    constructor(apiConfig?: ApiConfig<SecurityDataType>);
    setSecurityData: (data: SecurityDataType | null) => void;
    protected encodeQueryParam(key: string, value: any): string;
    protected addQueryParam(query: QueryParamsType, key: string): string;
    protected addArrayQueryParam(query: QueryParamsType, key: string): any;
    protected toQueryString(rawQuery?: QueryParamsType): string;
    protected addQueryParams(rawQuery?: QueryParamsType): string;
    protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams;
    protected createAbortSignal: (cancelToken: CancelToken) => AbortSignal | undefined;
    abortRequest: (cancelToken: CancelToken) => void;
    request: <T = any, E = any>({ body, secure, path, type, query, format, baseUrl, cancelToken, ...params }: FullRequestParams) => Promise<HttpResponse<T, E>>;
}
/**
 * @title Scriptable API
 * @version 1.0.0
 * @baseUrl https://api.scriptable.run/v1
 */
export class Scriptable<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    execute: {
        /**
         * No description
         *
         * @tags core
         * @name Execute
         * @summary Execute Code Snippet
         * @request POST:/execute
         */
        execute: (data: {
            source: string;
            globals?: object;
            timeout?: number;
            layers?: {
                name: string;
                source: string;
            }[];
            fetchCredentials?: {
                domain: string;
                httpsOnly?: boolean;
                headerName?: string;
                headerValue?: string;
            }[];
        }, params?: RequestParams) => Promise<HttpResponse<{
            status?: "ok" | "failed";
            value?: string;
            exception?: {
                message?: string;
                stack?: string[];
            };
            duration?: number;
            logs?: string[];
        }, any>>;
    };
}

//# sourceMappingURL=types.d.ts.map
