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
var LeaderboardComponent = (function () {
    function LeaderboardComponent() {
        this.optionSelected = new core_1.EventEmitter();
        this.datesChanged = new core_1.EventEmitter();
        this.report = new core_1.EventEmitter();
        this.pagCap = 14;
        this.curPage = 0;
        this.totPages = 2;
        this.searchString = '';
        this.filter = {
            regions: [],
            zones: []
        };
        this.top10 = [];
        this.allUsers = [];
        this.graphLevel = 'region';
        this.graphData = {
            name: "Bilevel Partition",
            description: "Bilevel Partition",
            children: []
        };
        this.pageStep = 0;
        this.useUpdatedData = false;
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
        this.data = [];
        this.formatDataset();
    };
    LeaderboardComponent.prototype.ngOnChanges = function (changes) {
        if (changes['updatedData'] === undefined && changes['data'] === undefined) {
            return;
        }
        if (changes['updatedData'].currentValue != changes['updatedData'].PreviousValue) {
            this.formatUpdatedData();
            this.useUpdatedData = true;
        }
        if (changes['data']) {
            if (changes['data'].currentValue != changes['data'].PreviousValue) {
                this.formatDataset();
                this.updatedData = undefined;
                this.searchString = "";
                this.curPage = 0;
            }
        }
    };
    LeaderboardComponent.prototype.formatUpdatedData = function () {
        var _this = this;
        this.salesExecList = [];
        this.updatedData.forEach(function (e) {
            var ins = {
                firstName: e.currentUser.firstName,
                lastName: e.currentUser.lastName,
                points: e.totalMLearningPoints,
                region: e.regionName,
                zone: e.zoneName,
                dealership: e.dealershipCode
            };
            _this.salesExecList.push(ins);
        });
        this.commitList(this.salesExecList, false, true);
        this.curPage = 0;
        this.totPages = Math.ceil(this.salesExecList.length / this.pagCap);
    };
    LeaderboardComponent.prototype.formatDataset = function () {
        var out = {
            regions: []
        };
        for (var i = 0; i < this.data.length; i++) {
            if (!this.regionAdded(this.data[i].regionName, out)) {
                out.regions.push({
                    name: this.data[i].regionName,
                    zones: []
                });
                this.graphData.children.push({
                    name: this.data[i].regionName,
                    description: this.data[i].regionName,
                    size: 0,
                    displayLevel: 'zone',
                    selectionType: 'region',
                    children: []
                });
            }
            var regionsCountM1 = out.regions.length - 1;
            this.graphData.children[regionsCountM1].size += this.data[i].totalMLearningPoints;
            if (!this.zoneAdded(this.data[i].regionName, this.data[i].zoneName, out)) {
                out.regions[regionsCountM1].zones.push({
                    name: this.data[i].zoneName,
                    dealerships: []
                });
                this.graphData.children[regionsCountM1].children.push({
                    name: this.data[i].zoneName,
                    description: this.data[i].zoneName,
                    displayLevel: 'dealership',
                    selectionType: 'zone',
                    size: 0,
                    children: []
                });
            }
            var zonesCountM1 = out.regions[regionsCountM1].zones.length - 1;
            this.graphData.children[regionsCountM1].children[zonesCountM1].size += this.data[i].totalMLearningPoints;
            if (!this.dealershipAdded(this.data[i].regionName, this.data[i].zoneName, this.data[i].dealershipCode, out)) {
                out.regions[regionsCountM1].zones[zonesCountM1].dealerships.push({
                    code: this.data[i].dealershipCode,
                    users: []
                });
                this.graphData.children[regionsCountM1].children[zonesCountM1].children.push({
                    name: this.data[i].dealershipCode,
                    description: this.data[i].dealershipCode,
                    size: 0
                });
            }
            var dealersM1 = out.regions[regionsCountM1].zones[zonesCountM1].dealerships.length - 1;
            this.graphData.children[regionsCountM1].children[zonesCountM1].children[dealersM1].size += this.data[i].totalMLearningPoints;
            out = this.insertUser(this.data[i].regionName, this.data[i].zoneName, this.data[i].dealershipCode, this.data[i].currentUser.firstName, this.data[i].currentUser.lastName, this.data[i].totalMLearningPoints, out);
        }
        this.formatedData = out;
        this.commitList(this.top10, true, false);
        this.commitList(this.allUsers, false, false);
        this.salesExecList = this.cloneObject(this.allUsers);
        this.curPage = 0;
        this.totPages = Math.ceil(this.allUsers.length / this.pagCap);
    };
    LeaderboardComponent.prototype.cloneObject = function (source) {
        return JSON.parse(JSON.stringify(source));
    };
    LeaderboardComponent.prototype.insertUser = function (region, zone, dealership, firstName, lastName, points, newDS) {
        for (var i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                for (var j = 0; j < newDS.regions[i].zones.length; j++) {
                    if (zone === newDS.regions[i].zones[j].name) {
                        for (var k = 0; k < newDS.regions[i].zones[j].dealerships.length; k++) {
                            if (dealership === newDS.regions[i].zones[j].dealerships[k].code) {
                                newDS.regions[i].zones[j].dealerships[k].users.push({
                                    firstName: firstName,
                                    lastName: lastName,
                                    points: points
                                });
                                var ins = {
                                    firstName: firstName,
                                    lastName: lastName,
                                    points: points,
                                    region: region,
                                    zone: zone,
                                    dealership: dealership
                                };
                                this.allUsers.push(ins);
                                this.top10.push(ins);
                            }
                        }
                    }
                }
            }
        }
        return newDS;
    };
    LeaderboardComponent.prototype.regionAdded = function (region, newDS) {
        for (var i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                return true;
            }
        }
        return false;
    };
    LeaderboardComponent.prototype.zoneAdded = function (region, zone, newDS) {
        for (var i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                for (var j = 0; j < newDS.regions[i].zones.length; j++) {
                    if (zone === newDS.regions[i].zones[j].name) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    LeaderboardComponent.prototype.dealershipAdded = function (region, zone, dealership, newDS) {
        for (var i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                for (var j = 0; j < newDS.regions[i].zones.length; j++) {
                    if (zone === newDS.regions[i].zones[j].name) {
                        for (var k = 0; k < newDS.regions[i].zones[j].dealerships.length; k++) {
                            if (dealership === newDS.regions[i].zones[j].dealerships[k].code) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    LeaderboardComponent.prototype.raiseEvent = function (id, index) {
        for (var i = 0; i < this.data.length; i++) {
            this.data[i].selected = false;
        }
        this.data[index].selected = true;
        this.optionSelected.emit(id);
    };
    LeaderboardComponent.prototype.commitList = function (list, isTop10, applyFilter) {
        list.sort(function (a, b) {
            var keyA = a.points, keyB = b.points;
            if (keyA < keyB)
                return -1;
            if (keyA > keyB)
                return 1;
            return 0;
        });
        list.reverse();
        var a = 0;
        list.forEach(function (e) {
            a++;
            e.rank = a;
        });
        if (applyFilter) {
            for (var i = 0; i < list.length; i++) {
                if (!this.isInfilteredRegion(list[i].region)) {
                    list.splice(i, 1);
                    i--;
                }
            }
            for (var i = 0; i < list.length; i++) {
                if (!this.isInfilteredZone(list[i].zone)) {
                    list.splice(i, 1);
                    i--;
                }
            }
            if (this.searchString != "") {
                for (var i = 0; i < list.length; i++) {
                    var a_1 = list[i].firstName.toLowerCase();
                    var b = list[i].lastName.toLowerCase();
                    var c = this.searchString.toLowerCase();
                    if (a_1.indexOf(c) === -1 && b.indexOf(c) === -1) {
                        list.splice(i, 1);
                        i--;
                    }
                }
            }
        }
        if (list.length > 10 && isTop10) {
            list.length = 10;
        }
    };
    LeaderboardComponent.prototype.isInfilteredRegion = function (r) {
        if (this.filter.regions.length === 0) {
            return true;
        }
        var ret = false;
        for (var i = 0; i < this.filter.regions.length; i++) {
            if (this.filter.regions[i] === r) {
                return true;
            }
        }
        return ret;
    };
    LeaderboardComponent.prototype.isInfilteredZone = function (z) {
        if (this.filter.zones.length === 0) {
            return true;
        }
        var ret = false;
        for (var i = 0; i < this.filter.zones.length; i++) {
            if (this.filter.zones[i] === z) {
                return true;
            }
        }
        return ret;
    };
    LeaderboardComponent.prototype.handleLevelChanged = function (l) {
        var _this = this;
        this.graphLevel = l.displayLevel;
        this.top10 = [];
        this.allUsers.forEach(function (item) {
            if (l.selection == null ||
                l.selectionType === 'region' && item.region === l.selection ||
                l.selectionType === 'zone' && item.zone === l.selection) {
                _this.top10.push(item);
            }
        });
        this.commitList(this.top10, true, false);
    };
    LeaderboardComponent.prototype.handleRefine = function (e) {
        if (e.selectedDate1 != this.curDate1 || e.selectedDate2 != this.curDate2) {
            this.datesChanged.emit({
                date1: e.selectedDate1,
                date2: e.selectedDate2
            });
            this.curDate1 = e.selectedDate1;
            this.curDate2 = e.selectedDate2;
        }
        this.filter = {
            zones: e.selections.zones,
            regions: e.selections.regions
        };
        if (!this.updatedData) {
            this.salesExecList = this.cloneObject(this.allUsers);
            this.commitList(this.salesExecList, false, true);
            this.curPage = 0;
            this.totPages = Math.ceil(this.salesExecList.length / this.pagCap);
            this.pageStep = 0;
        }
        else {
            this.formatUpdatedData();
        }
    };
    LeaderboardComponent.prototype.handleSearchText = function () {
        if (!this.useUpdatedData) {
            this.salesExecList = this.cloneObject(this.allUsers);
        }
        else {
            this.formatUpdatedData();
        }
        this.commitList(this.salesExecList, false, true);
        this.curPage = 0;
        this.totPages = Math.ceil(this.salesExecList.length / this.pagCap);
        this.pageStep = 0;
    };
    LeaderboardComponent.prototype.nextPage = function () {
        if (this.curPage === (this.totPages - 1)) {
            return;
        }
        this.curPage++;
    };
    LeaderboardComponent.prototype.prevPage = function () {
        if (this.curPage === 0) {
            return;
        }
        this.curPage--;
    };
    LeaderboardComponent.prototype.handlePagination = function (p) {
        if (p.action === 'prevPage') {
            if (this.curPage === 0) {
                return;
            }
            this.curPage--;
            if (this.curPage < this.pageStep) {
                this.pageStep = this.pageStep - 4;
            }
        }
        if (p.action === 'nextPage') {
            if (this.curPage === (this.totPages - 1)) {
                return;
            }
            this.curPage++;
            if (this.curPage >= this.pageStep + 4) {
                this.pageStep = this.pageStep + 4;
            }
        }
        if (p.action === 'goTo') {
            this.curPage = p.page;
        }
        if (p.action === 'nextBlock') {
            this.pageStep = this.pageStep + 4;
            this.curPage = this.pageStep;
        }
        if (p.action === 'prevBlock') {
            this.pageStep = this.pageStep - 4;
            this.curPage = this.pageStep;
        }
    };
    LeaderboardComponent.prototype.pageArray = function () {
        var r = [];
        var c = 0;
        var hasMore = false;
        if (this.pageStep > 0) {
            r.push({
                display: '...',
                action: 'prevBlock'
            });
        }
        for (var i = this.pageStep; i < this.totPages; i++) {
            if (c < 4) {
                r.push({
                    display: i + 1,
                    action: 'goTo',
                    page: i
                });
                c++;
            }
            else {
                hasMore = true;
            }
        }
        if (hasMore) {
            r.push({
                display: '...',
                action: 'nextBlock'
            });
        }
        return r;
    };
    LeaderboardComponent.prototype.handleReport = function () {
        var rep = {
            filter: this.filter,
            originalDataset: this.data,
            top10: this.top10,
            transformedDataset: this.allUsers,
            updatedDataFromServer: this.updatedData,
            searchString: this.searchString,
            refineGroups: this.refineGroups,
            salesExecList: this.salesExecList
        };
        this.report.emit(rep);
    };
    return LeaderboardComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LeaderboardComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LeaderboardComponent.prototype, "updatedData", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LeaderboardComponent.prototype, "refineGroups", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LeaderboardComponent.prototype, "optionSelected", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LeaderboardComponent.prototype, "datesChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LeaderboardComponent.prototype, "report", void 0);
LeaderboardComponent = __decorate([
    core_1.Component({
        selector: 'leaderboard',
        template: require('./leaderboard.html'),
        styles: [require('./leaderboard.css')]
    })
], LeaderboardComponent);
exports.LeaderboardComponent = LeaderboardComponent;
//# sourceMappingURL=leaderboard.component.js.map