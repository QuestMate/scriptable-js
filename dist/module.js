let $149c1bd638913645$export$e2e108cbe2e4f865;
(function(ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})($149c1bd638913645$export$e2e108cbe2e4f865 || ($149c1bd638913645$export$e2e108cbe2e4f865 = {}));
class $149c1bd638913645$export$8c6ee871e681f0f4 {
    baseUrl = "https://api.scriptable.run/v1";
    securityData = null;
    abortControllers = new Map();
    customFetch = (...fetchParams)=>fetch(...fetchParams);
    baseApiParams = {
        credentials: "same-origin",
        headers: {},
        redirect: "follow",
        referrerPolicy: "no-referrer"
    };
    constructor(apiConfig = {}){
        Object.assign(this, apiConfig);
    }
    setSecurityData = (data)=>{
        this.securityData = data;
    };
    encodeQueryParam(key, value) {
        const encodedKey = encodeURIComponent(key);
        return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
    }
    addQueryParam(query, key) {
        return this.encodeQueryParam(key, query[key]);
    }
    addArrayQueryParam(query, key) {
        const value = query[key];
        return value.map((v)=>this.encodeQueryParam(key, v)).join("&");
    }
    toQueryString(rawQuery) {
        const query = rawQuery || {};
        const keys = Object.keys(query).filter((key)=>"undefined" !== typeof query[key]);
        return keys.map((key)=>Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)).join("&");
    }
    addQueryParams(rawQuery) {
        const queryString = this.toQueryString(rawQuery);
        return queryString ? `?${queryString}` : "";
    }
    contentFormatters = {
        [$149c1bd638913645$export$e2e108cbe2e4f865.Json]: (input)=>input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
        [$149c1bd638913645$export$e2e108cbe2e4f865.FormData]: (input)=>Object.keys(input || {}).reduce((formData, key)=>{
                const property = input[key];
                formData.append(key, property instanceof Blob ? property : typeof property === "object" && property !== null ? JSON.stringify(property) : `${property}`);
                return formData;
            }, new FormData()),
        [$149c1bd638913645$export$e2e108cbe2e4f865.UrlEncoded]: (input)=>this.toQueryString(input)
    };
    mergeRequestParams(params1, params2) {
        return {
            ...this.baseApiParams,
            ...params1,
            ...params2 || {},
            headers: {
                ...this.baseApiParams.headers || {},
                ...params1.headers || {},
                ...params2 && params2.headers || {}
            }
        };
    }
    createAbortSignal = (cancelToken)=>{
        if (this.abortControllers.has(cancelToken)) {
            const abortController = this.abortControllers.get(cancelToken);
            if (abortController) return abortController.signal;
            return void 0;
        }
        const abortController1 = new AbortController();
        this.abortControllers.set(cancelToken, abortController1);
        return abortController1.signal;
    };
    abortRequest = (cancelToken)=>{
        const abortController = this.abortControllers.get(cancelToken);
        if (abortController) {
            abortController.abort();
            this.abortControllers.delete(cancelToken);
        }
    };
    request = async ({ body: body , secure: secure , path: path , type: type , query: query , format: format , baseUrl: baseUrl , cancelToken: cancelToken , ...params })=>{
        const secureParams = (typeof secure === "boolean" ? secure : this.baseApiParams.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const queryString = query && this.toQueryString(query);
        const payloadFormatter = this.contentFormatters[type || $149c1bd638913645$export$e2e108cbe2e4f865.Json];
        const responseFormat = format || requestParams.format;
        return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
            ...requestParams,
            headers: {
                ...type && type !== $149c1bd638913645$export$e2e108cbe2e4f865.FormData ? {
                    "Content-Type": type
                } : {},
                ...requestParams.headers || {}
            },
            signal: cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal,
            body: typeof body === "undefined" || body === null ? null : payloadFormatter(body)
        }).then(async (response)=>{
            const r = response;
            r.data = null;
            r.error = null;
            const data = !responseFormat ? r : await response[responseFormat]().then((data)=>{
                if (r.ok) r.data = data;
                else r.error = data;
                return r;
            }).catch((e)=>{
                r.error = e;
                return r;
            });
            if (cancelToken) this.abortControllers.delete(cancelToken);
            if (!response.ok) throw data;
            return data;
        });
    };
}
class $149c1bd638913645$export$29e4587dc13974c9 extends $149c1bd638913645$export$8c6ee871e681f0f4 {
    execute = {
        /**
     * No description
     *
     * @tags core
     * @name Execute
     * @summary Execute Code Snippet
     * @request POST:/execute
     */ execute: (data, params = {})=>this.request({
                path: `/execute`,
                method: "POST",
                body: data,
                type: $149c1bd638913645$export$e2e108cbe2e4f865.Json,
                format: "json",
                ...params
            })
    };
}


export {$149c1bd638913645$export$e2e108cbe2e4f865 as ContentType, $149c1bd638913645$export$8c6ee871e681f0f4 as HttpClient, $149c1bd638913645$export$29e4587dc13974c9 as Scriptable};
//# sourceMappingURL=module.js.map
