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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
exports.DATE_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DateValueAccessor; }),
    multi: true
};
/**
 * The accessor for writing a value and listening to changes on a date input element
 *
 *  ### Example
 *  `<input type="date" name="myBirthday" ngModel useValueAsDate>`
 */
var DateValueAccessor = (function () {
    function DateValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    DateValueAccessor.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'valueAsDate', value);
    };
    DateValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DateValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    DateValueAccessor.prototype.setDisabledState = function (isDisabled) {
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
    };
    return DateValueAccessor;
}());
__decorate([
    core_1.HostListener('input', ['$event.target.valueAsDate']),
    __metadata("design:type", Object)
], DateValueAccessor.prototype, "onChange", void 0);
__decorate([
    core_1.HostListener('blur', []),
    __metadata("design:type", Object)
], DateValueAccessor.prototype, "onTouched", void 0);
DateValueAccessor = __decorate([
    core_1.Directive({
        selector: 'input[type=date][formControlName],input[type=date][formControl],input[type=date][ngModel]',
        providers: [exports.DATE_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], DateValueAccessor);
exports.DateValueAccessor = DateValueAccessor;
//# sourceMappingURL=datevalueaccessor.js.map