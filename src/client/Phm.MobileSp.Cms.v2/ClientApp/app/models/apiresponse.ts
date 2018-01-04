import {ResponseHelper} from "../shared/services/helpers/responsehelper";

export class ApiResponse {
    success: boolean;
    message: string;
    content: any;
    constructor(options: {} = {}) {
        this.success = options['success'];
        this.message = options['message'] || '';
        this.content = options['content'] || null;
        if (this.content !== null && typeof this.content === "object")
            this.content = ResponseHelper.toCamel(this.content);
    }
}
