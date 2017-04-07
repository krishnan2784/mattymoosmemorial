﻿export class ApiResponse {
    success: boolean;
    message: string;
    content: any;
    constructor(options: {} = {}) {
        this.success = options['success'];
        this.message = options['message'] || '';
        this.content = options['content'] || null;
    }
}
