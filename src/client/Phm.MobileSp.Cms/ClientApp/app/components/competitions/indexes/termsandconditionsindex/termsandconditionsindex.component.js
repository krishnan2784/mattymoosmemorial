"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var base_component_1 = require("../../../base.component");
var shareservice_1 = require("../../../../services/helpers/shareservice");
var tabnavmenu_component_1 = require("../../../navmenu/tabnavmenu.component");
var competitionclasses_1 = require("../../../../models/competitionclasses");
var termsandconditionsdataservice_1 = require("../../../../services/termsandconditionsdataservice");
var TermsAndConditionsIndexComponent = (function (_super) {
    __extends(TermsAndConditionsIndexComponent, _super);
    function TermsAndConditionsIndexComponent(termsAndConditionsDataService, sharedService, overlay, vcRef, confirmBox) {
        var _this = _super.call(this, sharedService, 'Terms and Conditions', true, '', tabnavmenu_component_1.DefaultTabNavs.competitionsTabs) || this;
        _this.termsAndConditionsDataService = termsAndConditionsDataService;
        _this.confirmBox = confirmBox;
        _this.selectedModel = null;
        overlay.defaultViewContainer = vcRef;
        _this.setupSubscriptions();
        return _this;
    }
    TermsAndConditionsIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.updateMarket();
        });
    };
    TermsAndConditionsIndexComponent.prototype.updateMarket = function () {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.termsAndConditions = null;
        this.getData();
    };
    TermsAndConditionsIndexComponent.prototype.ngOnInit = function () {
        this.updateMarket();
    };
    TermsAndConditionsIndexComponent.prototype.ngOnDestroy = function () {
        if (this.getTermsAndConditionsSub)
            this.getTermsAndConditionsSub.unsubscribe();
    };
    TermsAndConditionsIndexComponent.prototype.getData = function () {
        var _this = this;
        this.getTermsAndConditionsSub = this.termsAndConditionsDataService.getTermsAndConditions().subscribe(function (result) {
            _this.termsAndConditions = result;
            _this.sharedService.updateMarketDropdownEnabledState(true);
        });
    };
    TermsAndConditionsIndexComponent.prototype.updateTermsAndConditions = function (termsAndConditions, remove) {
        if (termsAndConditions === void 0) { termsAndConditions = null; }
        if (remove === void 0) { remove = false; }
        if (termsAndConditions != null && this.termsAndConditions != null) {
            var origTermsAndConditions = this.termsAndConditions.find(function (x) { return x.id === termsAndConditions.id; });
            var index = this.termsAndConditions.indexOf(origTermsAndConditions);
            if (!remove) {
                if (index > -1) {
                    this.termsAndConditions.splice(index, 1, termsAndConditions);
                }
                else {
                    this.termsAndConditions.unshift(termsAndConditions);
                }
            }
            else if (index > -1) {
                this.termsAndConditions.splice(index, 1);
            }
        }
    };
    TermsAndConditionsIndexComponent.prototype.editTermsAndConditions = function (termsAndConditions) {
        if (termsAndConditions === void 0) { termsAndConditions = new competitionclasses_1.TermsAndCondition(); }
        if (termsAndConditions && termsAndConditions.id > 0) {
            this.updatePageTitle("Edit Terms and Conditions");
        }
        else {
            this.updatePageTitle("New Terms and Conditions");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();
        this.selectedModel = termsAndConditions;
    };
    TermsAndConditionsIndexComponent.prototype.termsAndConditionsUpdated = function (termsAndConditions) {
        this.updatePageTitle("Terms and Conditions");
        this.updateMarketDropdownVisibility(true);
        this.updateTabNavItems(tabnavmenu_component_1.DefaultTabNavs.competitionsTabs);
        this.selectedModel = null;
        if (termsAndConditions)
            this.getData();
    };
    TermsAndConditionsIndexComponent.prototype.deleteTermsAndConditions = function (termsAndConditions) {
        var _this = this;
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
            .body("Are you sure to delete " + termsAndConditions.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch(function (err) { return console.log('ERROR: ' + err); })
            .then(function (dialog) { return dialog.result; })
            .then(function (result) {
            _this.termsAndConditionsDataService.deleteTermsAndCondition(termsAndConditions.id).subscribe(function (result) {
                if (result)
                    _this.updateTermsAndConditions(termsAndConditions, true);
            });
        })
            .catch(function (err) { });
    };
    return TermsAndConditionsIndexComponent;
}(base_component_1.BaseComponent));
TermsAndConditionsIndexComponent = __decorate([
    core_1.Component({
        selector: 'termsandconditionsindex',
        template: require('./termsandconditionsindex.component.html'),
        styles: [require('./termsandconditionsindex.component.css')]
    }),
    __metadata("design:paramtypes", [termsandconditionsdataservice_1.TermsAndConditionsDataService, shareservice_1.ShareService,
        angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal])
], TermsAndConditionsIndexComponent);
exports.TermsAndConditionsIndexComponent = TermsAndConditionsIndexComponent;
//# sourceMappingURL=termsandconditionsindex.component.js.map