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
var LbExecutivesTableComponent = (function () {
    function LbExecutivesTableComponent() {
        this.userSelected = new core_1.EventEmitter();
        this.basePageIndex = 1;
    }
    LbExecutivesTableComponent.prototype.ngOnChanges = function (changes) {
        if (changes['page'] === undefined && changes['data'] === undefined) {
            return;
        }
        this.pagedData = [];
        var init = (this.pageSize * this.page);
        this.basePageIndex = init + 1;
        for (var i = init; i < init + this.pageSize; i++) {
            if (i < this.data.length) {
                this.pagedData.push(this.data[i]);
            }
        }
    };
    LbExecutivesTableComponent.prototype.viewUserBreakdown = function (e) {
        this.userSelected.emit(e);
    };
    return LbExecutivesTableComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LbExecutivesTableComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], LbExecutivesTableComponent.prototype, "page", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], LbExecutivesTableComponent.prototype, "pageSize", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LbExecutivesTableComponent.prototype, "busy", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LbExecutivesTableComponent.prototype, "userSelected", void 0);
LbExecutivesTableComponent = __decorate([
    core_1.Component({
        selector: 'lbexecutivestable',
        template: require('./lbexecutivestable.html'),
        styles: [require('./lbexecutivestable.css')]
    })
], LbExecutivesTableComponent);
exports.LbExecutivesTableComponent = LbExecutivesTableComponent;
//# sourceMappingURL=lbexecutivestable.component.js.map