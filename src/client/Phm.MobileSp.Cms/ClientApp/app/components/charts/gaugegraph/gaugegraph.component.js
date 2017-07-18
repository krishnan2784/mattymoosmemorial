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
var GaugeGraphComponent = (function () {
    function GaugeGraphComponent() {
        this.percText = this.percent;
    }
    GaugeGraphComponent.prototype.ngOnInit = function () {
        if (typeof this.percent === "string")
            this.percent = parseFloat(this.percent).toFixed(2);
        if (typeof this.percent === "number")
            this.percent = this.percent.toFixed(2);
        this.percText = this.percent;
        this.deg = "rotate(" + this.percToRotate(this.percent) + "deg)";
        this.deg2 = "rotate(" + (-90 + (this.percToRotate(this.percent))) + "deg)";
    };
    GaugeGraphComponent.prototype.ngOnChanges = function (changes) {
        if (changes['percent'] === undefined) {
            return;
        }
        this.percText = this.percent;
        this.deg = "rotate(" + this.percToRotate(this.percent) + "deg)";
        this.deg2 = "rotate(" + (-90 + (this.percToRotate(this.percent))) + "deg)";
    };
    GaugeGraphComponent.prototype.percToRotate = function (perc) {
        return 180 * (perc / 100);
    };
    return GaugeGraphComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], GaugeGraphComponent.prototype, "percent", void 0);
GaugeGraphComponent = __decorate([
    core_1.Component({
        selector: 'gaugegraph',
        template: require('./gaugegraph.html'),
        styles: [require('./gaugegraph.css')]
    })
], GaugeGraphComponent);
exports.GaugeGraphComponent = GaugeGraphComponent;
//# sourceMappingURL=gaugegraph.component.js.map