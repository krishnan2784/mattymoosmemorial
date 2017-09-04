import Apiresponse = require("../../models/apiresponse");
import ApiResponse = Apiresponse.ApiResponse;

export class ResponseHelper {

    public static getResponse(response: any): ApiResponse {
        response = new ApiResponse(response.json());
        return response;
    }

    public static toCamel(o) {
        if (o === null)
            return o;
        var newO, origKey, newKey, value;
        if (o instanceof Array) {
            newO = [];
            for (origKey in o) {
                value = o[origKey];
                if (value !== null && typeof value === "object") {
                    value = this.toCamel(value);
                }
                newO.push(value);
            }
        } else {
            newO = {}
            for (origKey in o) {
                if (o.hasOwnProperty(origKey)) {
                    newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString();
                    value = o[origKey];
                    if (value !== null && (value.constructor === Object || value instanceof Array)) {
                        value = this.toCamel(value);
                    }
                    newO[newKey] = value;
                }
            }
        }
        return newO;
    }
}