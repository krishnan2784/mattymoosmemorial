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
var competitionsdataservice_1 = require("../../../../services/competitionsdataservice");
var base_component_1 = require("../../../base.component");
var genericfilter_component_1 = require("../../../common/filters/generic/genericfilter.component");
var shareservice_1 = require("../../../../services/helpers/shareservice");
var tabnavmenu_component_1 = require("../../../navmenu/tabnavmenu.component");
var string_1 = require("../../../../classes/helpers/string");
var competitionclasses_1 = require("../../../../models/competitionclasses");
var enums_1 = require("../../../../enums");
var CompetitionIndexComponent = (function (_super) {
    __extends(CompetitionIndexComponent, _super);
    function CompetitionIndexComponent(competitionDataService, sharedService, overlay, vcRef, confirmBox) {
        var _this = _super.call(this, sharedService, 'Competitions Management', true, '', tabnavmenu_component_1.DefaultTabNavs.competitionsTabs) || this;
        _this.competitionDataService = competitionDataService;
        _this.confirmBox = confirmBox;
        _this.selectedModel = null;
        _this.selectedCopyToMarketModel = null;
        _this.competitionFilters = genericfilter_component_1.DefaultFilterSets.competitionFilters;
        _this.contentTypeEnum = enums_1.CopiedElementTypeEnum;
        overlay.defaultViewContainer = vcRef;
        return _this;
    }
    CompetitionIndexComponent.prototype.ngOnInit = function () {
        this.setupSubscriptions();
        this.updateMarket();
    };
    CompetitionIndexComponent.prototype.ngOnDestroy = function () {
        this.removeSubscriptions();
    };
    CompetitionIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.marketSub = this.sharedService.marketUpdated.subscribe(function (market) {
            _this.updateMarket();
        });
    };
    CompetitionIndexComponent.prototype.removeSubscriptions = function () {
        if (this.getCompetitionsItemsSub)
            this.getCompetitionsItemsSub.unsubscribe();
        if (this.marketSub)
            this.marketSub.unsubscribe();
    };
    CompetitionIndexComponent.prototype.updateMarket = function () {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.filteredCompetitions = null;
        this.allCompetitions = null;
        this.getData();
    };
    CompetitionIndexComponent.prototype.getData = function () {
        var _this = this;
        this.getCompetitionsItemsSub = this.competitionDataService.getCompetitions().subscribe(function (result) {
            var comps = result && Array.isArray(result) ? result : [];
            _this.allCompetitions = comps;
            _this.filteredCompetitions = comps;
            _this.sharedService.updateMarketDropdownEnabledState(true);
            _this.updateFilters();
        });
    };
    CompetitionIndexComponent.prototype.updateFilters = function () {
        var maxValue = this.allCompetitions ? Math.max.apply(Math, this.allCompetitions.map(function (x) { return x.participants; })) : 0;
        this.competitionFilters.filterGroups[1].filters.filter(function (x) { return x.filterName === 'Number of Participants'; })[0]['maxValue'] = maxValue;
    };
    CompetitionIndexComponent.prototype.updateCompetition = function (competition, remove) {
        if (competition === void 0) { competition = null; }
        if (remove === void 0) { remove = false; }
        if (competition != null && this.filteredCompetitions != null) {
            var origCompetition = this.filteredCompetitions.find(function (x) { return x.id === competition.id; });
            var index = this.filteredCompetitions.indexOf(origCompetition);
            if (!remove) {
                if (index > -1) {
                    this.filteredCompetitions.splice(index, 1, competition);
                }
                else {
                    this.filteredCompetitions.unshift(competition);
                }
            }
            else if (index > -1) {
                this.filteredCompetitions.splice(index, 1);
            }
        }
    };
    CompetitionIndexComponent.prototype.editCompetition = function (competition) {
        if (competition === void 0) { competition = new competitionclasses_1.Competition(); }
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
    CompetitionIndexComponent.prototype.competitionUpdated = function (updated) {
        this.updatePageTitle("Competitions Management");
        this.updateMarketDropdownVisibility(true);
        this.updateTabNavItems(tabnavmenu_component_1.DefaultTabNavs.competitionsTabs);
        this.selectedModel = null;
        if (updated)
            this.getData();
    };
    CompetitionIndexComponent.prototype.copyCompetitionToMarket = function (comp) {
        this.selectedCopyToMarketModel = comp;
    };
    CompetitionIndexComponent.prototype.publishCompetitionTolive = function (competition) {
        var _this = this;
        var confirmText;
        if (competition.published) {
            confirmText = competition.title + " has already been published. Are you sure to overwrite it?";
        }
        else {
            confirmText = "Are you sure to publish " + competition.title + "?";
        }
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Publish')
            .body(confirmText)
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch(function (err) { return console.log('ERROR: ' + err); })
            .then(function (dialog) { return dialog.result; })
            .then(function (result) {
            _this.competitionDataService.publishContentToLive(competition.id).subscribe(function (result) {
                if (result) {
                }
            });
        })
            .catch(function (err) { });
    };
    CompetitionIndexComponent.prototype.deleteCompetition = function (competition) {
        var _this = this;
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
            _this.competitionDataService.deleteCompetition(competition.id).subscribe(function (result) {
                if (result)
                    _this.updateCompetition(competition, true);
            });
        })
            .catch(function (err) { });
    };
    CompetitionIndexComponent.prototype.filterList = function (filters) {
        if (filters.length === 0)
            this.filteredCompetitions = this.allCompetitions.slice(0);
        var a = this.allCompetitions.slice(0);
        var sFilter = filters.filter(function (x) { return x.filterName === 'search'; })[0];
        if (sFilter) {
            a = string_1.StringEx.searchArray(sFilter.value.toLowerCase(), a, ['title']);
        }
        var dFilter = filters.filter(function (x) { return x.filterName === 'Date'; })[0];
        if (dFilter) {
            var fd1 = new Date(dFilter.date1);
            var fd2 = new Date(dFilter.date2);
            fd2.setHours(23, 59, 59);
            if (dFilter.date1)
                a = a.filter(function (x) { return (x.startDate && new Date(x.startDate) >= fd1) || (x.endDate && new Date(x.endDate) >= fd1); }); // competitions which ended after the start date
            if (dFilter.date2)
                a = a.filter(function (x) { return (x.startDate && new Date(x.startDate) <= fd2) || (x.endDate && new Date(x.endDate) <= fd2); }); // competitions which started before the end date
        }
        var pFilter = filters.filter(function (x) { return x.filterName === 'Number of Participants'; })[0];
        if (pFilter) {
            a = a.filter(function (x) { return x.participants >= pFilter.bottomValue && x.participants <= pFilter.topValue; });
        }
        this.filteredCompetitions = a.slice(0);
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