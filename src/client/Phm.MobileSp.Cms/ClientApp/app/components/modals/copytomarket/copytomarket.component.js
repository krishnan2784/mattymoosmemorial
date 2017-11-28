"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Enums = require("../../../enums");
var CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
var copytomarketcontent_component_1 = require("./content/copytomarketcontent.component");
var CopyToMarket = (function () {
    function CopyToMarket() {
        this.updateItem = new core_1.EventEmitter();
    }
    CopyToMarket.prototype.ngOnChanges = function (changes) {
        if (this.model) {
            var inputs = {
                model: this.model,
                contentType: this.contentType,
                marketContentService: this.marketContentService
            };
            var modelData = copytomarketcontent_component_1.CopyToMarketContent;
            this.modalData = {
                modalContent: modelData,
                inputs: inputs
            };
        }
        else
            this.modalData = null;
    };
    CopyToMarket.prototype.modalClosed = function (e) {
        this.modalData = null;
        this.model = null;
        this.updateItem.emit(e);
    };
    return CopyToMarket;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CopyToMarket.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], CopyToMarket.prototype, "contentType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], CopyToMarket.prototype, "marketContentService", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CopyToMarket.prototype, "modalId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CopyToMarket.prototype, "modalHeader", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CopyToMarket.prototype, "modalDescription", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CopyToMarket.prototype, "updateItem", void 0);
CopyToMarket = __decorate([
    core_1.Component({
        selector: 'copytomarket',
        template: require('./copytomarket.component.html'),
        styles: [require('./copytomarket.component.css')]
    }),
    __metadata("design:paramtypes", [])
], CopyToMarket);
exports.CopyToMarket = CopyToMarket;
//# sourceMappingURL=copytomarket.component.js.map