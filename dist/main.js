var $8zHUo$axios = require("axios");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "ContentType", () => $882b6d93070905b3$export$e2e108cbe2e4f865);
$parcel$export(module.exports, "HttpClient", () => $882b6d93070905b3$export$8c6ee871e681f0f4);
$parcel$export(module.exports, "Scriptable", () => $882b6d93070905b3$export$29e4587dc13974c9);

let $882b6d93070905b3$export$e2e108cbe2e4f865;
(function(ContentType) {
    ContentType["Json"] = "application/json";
    ContentType["FormData"] = "multipart/form-data";
    ContentType["UrlEncoded"] = "application/x-www-form-urlencoded";
})($882b6d93070905b3$export$e2e108cbe2e4f865 || ($882b6d93070905b3$export$e2e108cbe2e4f865 = {}));
class $882b6d93070905b3$export$8c6ee871e681f0f4 {
    securityData = null;
    constructor({ securityWorker: securityWorker , secure: secure , format: format , ...axiosConfig } = {}){
        this.instance = (0, ($parcel$interopDefault($8zHUo$axios))).create({
            ...axiosConfig,
            baseURL: axiosConfig.baseURL || "https://api.scriptable.run/v1"
        });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }
    setSecurityData = (data)=>{
        this.securityData = data;
    };
    mergeRequestParams(params1, params2) {
        const method = params1.method || params2 && params2.method;
        console.log("this.instance.defaults: ", this.instance.defaults);
        console.log("((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}): ", method && this.instance.defaults.headers[method.toLowerCase()] || {});
        return {
            ...this.instance.defaults,
            ...params1,
            ...params2 || {},
            headers: {
                ...method && this.instance.defaults.headers[method.toLowerCase()] || {},
                ...params1.headers || {},
                ...params2 && params2.headers || {}
            }
        };
    }
    stringifyFormItem(formItem) {
        if (typeof formItem === "object" && formItem !== null) return JSON.stringify(formItem);
        else return `${formItem}`;
    }
    createFormData(input) {
        var formData, key;
        return Object.keys(input || {}).reduce((formData, key)=>{
            const property = input[key];
            const propertyContent = property instanceof Array ? property : [
                property
            ];
            for (const formItem of propertyContent){
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }
            return formData;
        }, new FormData());
    }
    request = async ({ secure: secure , path: path , type: type , query: query , format: format , body: body , ...params })=>{
        const secureParams = (typeof secure === "boolean" ? secure : this.secure) && this.securityWorker && await this.securityWorker(this.securityData) || {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;
        if (type === $882b6d93070905b3$export$e2e108cbe2e4f865.FormData && body && body !== null && typeof body === "object") body = this.createFormData(body);
        let headers = {
            ...requestParams.headers || {},
            ...type && type !== $882b6d93070905b3$export$e2e108cbe2e4f865.FormData ? {
                "Content-Type": type
            } : {}
        };
        console.log("(requestParams.headers || {}):", requestParams.headers || {});
        console.log("Final Headers: ", headers);
        return this.instance.request({
            ...requestParams,
            headers: headers,
            params: query,
            responseType: responseFormat,
            data: body,
            url: path
        });
    };
}
class $882b6d93070905b3$export$29e4587dc13974c9 extends $882b6d93070905b3$export$8c6ee871e681f0f4 {
    /**
   * No description
   *
   * @tags core
   * @name ExecuteScript
   * @summary Execute Code Snippet
   * @request POST:/execute
   * @secure
   */ executeScript = (data, params = {})=>this.request({
            path: `/execute`,
            method: "POST",
            body: data,
            secure: true,
            type: $882b6d93070905b3$export$e2e108cbe2e4f865.Json,
            ...params
        });
}


//# sourceMappingURL=main.js.map
