import Apiresponse = require("../../models/apiresponse");
import ApiResponse = Apiresponse.ApiResponse;

export class ResponseHelper {

    public static getResponse(response: any): ApiResponse {
        response = new ApiResponse(response.json());
        return response;
    }

}