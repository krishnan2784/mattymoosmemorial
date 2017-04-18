"use strict";
var BaseModel = (function () {
    function BaseModel(options) {
        if (options === void 0) { options = {}; }
        this.id = options.id;
        this.enabled = options.enabled;
        this.published = options.published;
        this.masterId = options.masterId;
        this.createdAt = options.createdAt;
        this.deletedAt = options.deletedAt;
        this.updatedAt = options.updatedAt;
    }
    return BaseModel;
}());
exports.BaseModel = BaseModel;
//# sourceMappingURL=baseclasses.js.map