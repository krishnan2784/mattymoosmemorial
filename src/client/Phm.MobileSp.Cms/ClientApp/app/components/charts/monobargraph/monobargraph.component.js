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
var MonobarGraphComponent = (function () {
    function MonobarGraphComponent() {
        this.ani = 1;
        this.heightRatio = 1;
    }
    MonobarGraphComponent.prototype.ngOnInit = function () {
        this.bar7H = 100 / this.data.data.length;
        var values = this.data.data.map(function (o) { return o.percent; });
        var maxHeight = Math.max.apply(Math, values);
        var minHeight = Math.min.apply(Math, values);
        if (maxHeight > 0) {
            if (minHeight < 0)
                maxHeight = maxHeight + Math.abs(minHeight);
        }
        else if (maxHeight < 0)
            maxHeight = Math.abs(minHeight);
        if (maxHeight > 0)
            this.heightRatio = 100 / maxHeight;
    };
    return MonobarGraphComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonobarGraphComponent.prototype, "data", void 0);
MonobarGraphComponent = __decorate([
    core_1.Component({
        selector: 'monobargraph',
        template: require('./monobargraph.html'),
        styles: [require('./monobargraph.css')]
    })
], MonobarGraphComponent);
exports.MonobarGraphComponent = MonobarGraphComponent;
//# sourceMappingURL=monobargraph.component.js.map