import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DateEx } from "../../../../classes/helpers/date";
import { StringEx } from "../../../../classes/helpers/string";
@Component({
    selector: 'leaderboard',
    template: require('./leaderboard.html'),
    styles: [require('./leaderboard.css')]
})
export class LeaderboardComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() updatedData: any;
    @Input() refineGroups: any;
    @Output() optionSelected: EventEmitter<any> = new EventEmitter();
    @Output() datesChanged: EventEmitter<any> = new EventEmitter();
    @Output() report: EventEmitter<any> = new EventEmitter();
    @Output() userSelected: EventEmitter<any> = new EventEmitter();
    pagCap = 14;
    curPage = 0;
    totPages = 2;
    formatedData;
    searchString = '';
    filter = {
        regions: [],
        zones: []
    };
    top10 = [];
    allUsers = [];
    graphLevel = 'region';
    graphData = {
        name: "Bilevel Partition",
        description: "Bilevel Partition",
        children: []
    };
    curDate1;
    curDate2;
    salesExecList;
    pageStep = 0;
    useUpdatedData = false;
    ngOnInit() {
        this.data = [];
        this.formatDataset();
    }
    ngOnChanges(changes) {
        if (changes['updatedData'] === undefined && changes['data'] === undefined) { return; }
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
    }
    formatUpdatedData() {
        this.salesExecList = [];
        this.updatedData.forEach((e) => {
            let ins = {
                user: e,
                firstName: e.currentUser.firstName,
                lastName: e.currentUser.lastName,
                points: e.totalMLearningPoints,
                region: e.regionName,
                zone: e.zoneName,
                dealership: e.dealershipCode,
                dealershipName: e.dealershipName,
            };
            this.salesExecList.push(ins);
        });
        this.commitList(this.salesExecList, false, true);
        this.curPage = 0;
        this.totPages = Math.ceil(this.salesExecList.length / this.pagCap);
    }
    formatDataset() {
        let out = {
            regions: []
        };
        for (let i = 0; i < this.data.length; i++) {
            if (!this.regionAdded(this.data[i].regionName, out)) {
                out.regions.push(
                    {
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
            let regionsCountM1 = out.regions.length - 1;
            this.graphData.children[regionsCountM1].size += this.data[i].totalMLearningPoints;
            if (!this.zoneAdded(this.data[i].regionName, this.data[i].zoneName, out)) {
                out.regions[regionsCountM1].zones.push(
                    {
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
            let zonesCountM1 = out.regions[regionsCountM1].zones.length - 1;
            this.graphData.children[regionsCountM1].children[zonesCountM1].size += this.data[i].totalMLearningPoints;
            if (!this.dealershipAdded(this.data[i].regionName, this.data[i].zoneName, this.data[i].dealershipCode, out)) {
                out.regions[regionsCountM1].zones[zonesCountM1].dealerships.push(
                    {
                        code: this.data[i].dealershipCode,
                        users: []
                    }
                );
                this.graphData.children[regionsCountM1].children[zonesCountM1].children.push({
                    name: this.data[i].dealershipCode,
                    description: this.data[i].dealershipCode,
                    size: 0
                });
            }
            let dealersM1 = out.regions[regionsCountM1].zones[zonesCountM1].dealerships.length - 1;
            this.graphData.children[regionsCountM1].children[zonesCountM1].children[dealersM1].size += this.data[i].totalMLearningPoints;
            out = this.insertUser(this.data[i],
                this.data[i].regionName,
                this.data[i].zoneName,
                this.data[i].dealershipCode,
                this.data[i].dealershipName,
                this.data[i].currentUser.firstName,
                this.data[i].currentUser.lastName,
                this.data[i].totalMLearningPoints, out);
        }
        this.formatedData = out;
        this.commitList(this.top10, true, false);
        this.commitList(this.allUsers, false, false);
        this.salesExecList = this.cloneObject(this.allUsers);
        this.curPage = 0;
        this.totPages = Math.ceil(this.allUsers.length / this.pagCap);
    }
    cloneObject(source) {
        return JSON.parse(JSON.stringify(source));
    }
    insertUser(user, region, zone, dealership, dealershipName, firstName, lastName, points, newDS) {
        for (let i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                for (let j = 0; j < newDS.regions[i].zones.length; j++) {
                    if (zone === newDS.regions[i].zones[j].name) {
                        for (let k = 0; k < newDS.regions[i].zones[j].dealerships.length; k++) {
                            if (dealership === newDS.regions[i].zones[j].dealerships[k].code) {
                                newDS.regions[i].zones[j].dealerships[k].users.push(
                                    {
                                        firstName: firstName,
                                        lastName: lastName,
                                        points: points
                                    }
                                );
                                let ins = {
                                    user: user,
                                    firstName: firstName,
                                    lastName: lastName,
                                    points: points,
                                    region: region,
                                    zone: zone,
                                    dealership: dealership,
                                    dealershipName: dealershipName
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
    }
    regionAdded(region, newDS) {
        for (let i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                return true;
            }
        }
        return false;
    }
    zoneAdded(region, zone, newDS) {
        for (let i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                for (let j = 0; j < newDS.regions[i].zones.length; j++) {
                    if (zone === newDS.regions[i].zones[j].name) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    dealershipAdded(region, zone, dealership, newDS) {
        for (let i = 0; i < newDS.regions.length; i++) {
            if (region === newDS.regions[i].name) {
                for (let j = 0; j < newDS.regions[i].zones.length; j++) {
                    if (zone === newDS.regions[i].zones[j].name) {
                        for (let k = 0; k < newDS.regions[i].zones[j].dealerships.length; k++) {
                            if (dealership === newDS.regions[i].zones[j].dealerships[k].code) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    raiseEvent(id, index) {
        for (let i = 0; i < this.data.length; i++) {
            this.data[i].selected = false;
        }
        this.data[index].selected = true;
        this.optionSelected.emit(id);
    }
    commitList(list, isTop10, applyFilter) {
        list.sort(function (a, b) {
            let keyA = a.points,
                keyB = b.points
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        list.reverse();
        let a = 0;
        list.forEach((e) => {
            a++;
            e.rank = a;
        });
        if (applyFilter) {
            for (let i = 0; i < list.length; i++) {
                if (!this.isInfilteredRegion(list[i].region)) {
                    list.splice(i, 1);
                    i--;
                }
            }

            for (let i = 0; i < list.length; i++) {
                if (!this.isInfilteredZone(list[i].zone)) {
                    list.splice(i, 1);
                    i--;
                }
            }
            if (this.searchString != "") {
                list = StringEx.searchArray(this.searchString, list, ['firstName', 'lastName']);
            }
        }
        if (list.length > 10 && isTop10) {
            list.length = 10;
        }
    }
    isInfilteredRegion(r) {
        if (this.filter.regions.length === 0) { return true; }
        let ret = false;
        for (let i = 0; i < this.filter.regions.length; i++) {
            if (this.filter.regions[i] === r) { return true }
        }
        return ret;
    }
    isInfilteredZone(z) {
        if (this.filter.zones.length === 0) { return true; }
        let ret = false;
        for (let i = 0; i < this.filter.zones.length; i++) {
            if (this.filter.zones[i] === z) { return true }
        }
        return ret;
    }
    handleLevelChanged(l) {
        this.graphLevel = l.displayLevel;
        this.top10 = [];
        this.allUsers.forEach((item) => {
            if (
                l.selection == null ||
                l.selectionType === 'region' && item.region === l.selection ||
                l.selectionType === 'zone' && item.zone === l.selection
            ) {
                this.top10.push(item)
            }
        });
        this.commitList(this.top10, true, false);
    }
    handleRefine(e) {
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
        }
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
    }
    handleSearchText() {
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
    }
    nextPage() {
        if (this.curPage === (this.totPages - 1)) { return; }
        this.curPage++;
    }
    prevPage() {
        if (this.curPage === 0) { return; }
        this.curPage--;
    }
    handlePagination(p) {
        if (p.action === 'prevPage') {
            if (this.curPage === 0) { return; }
            this.curPage--;
            if (this.curPage < this.pageStep) {
                this.pageStep = this.pageStep - 4;
            }
        }
        if (p.action === 'nextPage') {
            if (this.curPage === (this.totPages - 1)) { return; }
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
    }
    pageArray() {
        let r = [];
        let c = 0;
        let hasMore = false;
        if (this.pageStep > 0) {
            r.push({
                display: '...',
                action: 'prevBlock'
            });
        }
        for (let i = this.pageStep; i < this.totPages; i++) {
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
    }
    handleReport() {
        let report = this.salesExecList.map((s, index, array) => {
            return {
                firstName: s.firstName,
                lastName: s.lastName,
                points: s.points,
                region: s.region,
                zone: s.zone,
                dealership: s.dealership,
                rank: index + 1
            };
        });
        report.unshift({
            firstName: 'First Name',
            lastName: 'Last Name',
            points: 'Points Earned',
            region: 'Region',
            zone: 'Zone',
            dealership: 'Dealership Code',
            rank: 'Rank'
        });        
        new Angular2Csv(report, 'Leaderboard_' + DateEx.formatDate(new Date()));
        //let rep = {
        //    filter: this.filter,
        //    originalDataset: this.data,
        //    top10: this.top10,
        //    transformedDataset: this.allUsers,
        //    updatedDataFromServer: this.updatedData,
        //    searchString: this.searchString,
        //    refineGroups: this.refineGroups,
        //    salesExecList: this.salesExecList
        //}
        //this.report.emit(rep);
    }
    public viewUserBreakdown(e) {
        this.userSelected.emit(e);
    }
}