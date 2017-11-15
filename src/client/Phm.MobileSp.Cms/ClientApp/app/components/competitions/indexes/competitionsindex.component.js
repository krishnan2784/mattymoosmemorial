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
var base_component_1 = require("../../base.component");
var shareservice_1 = require("../../../services/helpers/shareservice");
var tabnavmenu_component_1 = require("../../navmenu/tabnavmenu.component");
var competitionsdataservice_1 = require("../../../services/competitionsdataservice");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var CompetitionIndexComponent = (function (_super) {
    __extends(CompetitionIndexComponent, _super);
    function CompetitionIndexComponent(competitionDataService, sharedService, overlay, vcRef, confirmBox) {
        var _this = _super.call(this, sharedService, 'Competitions Management', true, '', tabnavmenu_component_1.DefaultTabNavs.competitionsTabs) || this;
        _this.competitionDataService = competitionDataService;
        _this.confirmBox = confirmBox;
        _this.selectedModel = null;
        _this.setupSubscriptions();
        overlay.defaultViewContainer = vcRef;
        return _this;
    }
    CompetitionIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.updateMarket();
        });
    };
    CompetitionIndexComponent.prototype.updateMarket = function () {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.competitions = null;
        this.getData();
    };
    CompetitionIndexComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    CompetitionIndexComponent.prototype.ngOnDestroy = function () {
        if (this.getCompetitionsItemsSub)
            this.getCompetitionsItemsSub.unsubscribe();
    };
    CompetitionIndexComponent.prototype.getData = function () {
        var _this = this;
        this.getCompetitionsItemsSub = this.competitionDataService.getCompetitions().subscribe(function (result) {
            _this.competitions = result;
            _this.sharedService.updateMarketDropdownEnabledState(true);
        });
    };
    CompetitionIndexComponent.prototype.updateCompetition = function (competition, remove) {
        if (competition === void 0) { competition = null; }
        if (remove === void 0) { remove = false; }
        if (competition != null && this.competitions != null) {
            var origCompetition = this.competitions.find(function (x) { return x.id === competition.id; });
            var index = this.competitions.indexOf(origCompetition);
            if (!remove) {
                if (index > -1) {
                    this.competitions.splice(index, 1, competition);
                }
                else {
                    this.competitions.unshift(competition);
                }
            }
            else if (index > -1) {
                this.competitions.splice(index, 1);
            }
        }
    };
    CompetitionIndexComponent.prototype.editCompetition = function (competition) {
        if (competition && competition.id > 0) {
            this.updatePageTitle("Edit Competition");
        }
        else {
            this.updatePageTitle("New Competition");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();
        this.selectedModel = competition;
    };
    CompetitionIndexComponent.prototype.competitionUpdated = function () {
        this.updatePageTitle("Competitions Management");
        this.updateMarketDropdownVisibility(true);
        this.updateTabNavItems(tabnavmenu_component_1.DefaultTabNavs.competitionsTabs);
        this.selectedModel = null;
        this.getData();
    };
    CompetitionIndexComponent.prototype.deleteCompetition = function (competition) {
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
            .body("Are you sure to delete " + competition.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch(function (err) { return console.log('ERROR: ' + err); })
            .then(function (dialog) { return dialog.result; })
            .then(function (result) {
            //this.competitionDataService.deleteFeeditem(competition.id).subscribe((result) => {
            //                if (result)
            //		this.updateCompetition(competition, true);
            //            });
        })
            .catch(function (err) { });
    };
    return CompetitionIndexComponent;
}(base_component_1.BaseComponent));
CompetitionIndexComponent = __decorate([
    core_1.Component({
        selector: 'competitionsindex',
        template: require('./competitionsindex.component.html'),
        styles: [require('./competitionsindex.component.css')]
    }),
    __metadata("design:paramtypes", [competitionsdataservice_1.CompetitionsDataService, shareservice_1.ShareService,
        angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal])
], CompetitionIndexComponent);
exports.CompetitionIndexComponent = CompetitionIndexComponent;
//# sourceMappingURL=competitionsindex.component.js.map