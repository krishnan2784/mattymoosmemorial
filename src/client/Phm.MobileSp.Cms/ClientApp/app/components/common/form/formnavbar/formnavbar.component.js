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
var FormNavBarComponent = (function () {
    function FormNavBarComponent() {
        this.optionSelected = new core_1.EventEmitter();
    }
    FormNavBarComponent.prototype.ngOnInit = function () {
        if (this.data && this.data.length > 0 && this.data.filter(function (x) { return x.select; }).length === 0) {
            this.data[0].selected = true;
        }
    };
    FormNavBarComponent.prototype.raiseEvent = function (id, index) {
        this.data.forEach(function (x) {
            x.selected = false;
        });
        this.data[index].selected = true;
        this.optionSelected.emit(id);
    };
    return FormNavBarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], FormNavBarComponent.prototype, "data", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], FormNavBarComponent.prototype, "optionSelected", void 0);
FormNavBarComponent = __decorate([
    core_1.Component({
        selector: 'formnavbar',
        styles: [require('./formnavbar.component.css')],
        template: require('./formnavbar.component.html')
    })
], FormNavBarComponent);
exports.FormNavBarComponent = FormNavBarComponent;
//# sourceMappingURL=formnavbar.component.js.map