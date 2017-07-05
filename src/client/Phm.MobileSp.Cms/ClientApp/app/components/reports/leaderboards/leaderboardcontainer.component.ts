import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedDataService } from "../../../services/feeddataservice";
import { Observable } from 'rxjs/Observable';
import { BaseComponent} from "../../base.component";
import { ShareService } from "../../../services/helpers/shareservice";
import { UserMarket } from "../../../models/userclasses";

@Component({
    selector: 'leaderboardcontainer',
    template: require('./leaderboardcontainer.component.html'),
    styles: [require('./leaderboardcontainer.component.css')]
})
export class LeaderboardContainer extends BaseComponent {
    public leaderBoard: any;
    public myUpdatedData: any;
    public loading = true;
    public currentMarket: UserMarket;
    refineGroups = [
        {
            groupName: "Regions",
            groupId: "regions",
            height: "202px",
            items: [
                {
                    id: 'region1',
                    name: "Region 1"
                },
                {
                    id: 'r2',
                    name: "Region 2"
                }
            ]
        },
        {
            groupName: "Zones",
            groupId: "zones",
            height: "145px",
            items: [
                {
                    id: 'zone1',
                    name: "Zone 1"
                },
                {
                    id: 'z2',
                    name: "Zone 2"
                }
            ]
        }
    ];

    constructor(public feedDataService: FeedDataService,sharedService: ShareService) {
        super(sharedService, 'Leaderboard', true);
        this.setupSubscriptions();
        this.getData();
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            if (this.loading)
                return;
            this.updateMarket();
        });
    }

    updateMarket() {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.myUpdatedData = undefined;
        this.leaderBoard = undefined;
        this.getData();
    }

    getData() {
        this.feedDataService.getLeaderBoard().subscribe(result => {
            if (!result || result.length < 2) {
                this.leaderBoard = [{
                    "currentUser": { firstName: 'Bob', lastName: 'Hoskins' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer1",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 1000
                }, {
                    "currentUser": { firstName: 'Barry', lastName: 'White' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer1",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 100
                }, {
                    "currentUser": { firstName: 'Harry', lastName: 'Truman' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer1",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 300
                }, {
                    "currentUser": { firstName: 'Bart', lastName: 'Hoskins' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer2",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 40
                }, {
                    "currentUser": { firstName: 'Jack', lastName: 'Jones' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer2",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 350
                }, {
                    "currentUser": { firstName: 'Sandra', lastName: 'Goldskin' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer3",
                    "zoneName": 'zone2',
                    "regionName": 'region1',
                    "totalMLearningPoints": 1000
                }, {
                    "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer3",
                    "zoneName": 'zone2',
                    "regionName": 'region1',
                    "totalMLearningPoints": 230
                }, {
                    "currentUser": { firstName: 'Billy', lastName: 'Bluehat' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer4",
                    "zoneName": 'zone2',
                    "regionName": 'region1',
                    "totalMLearningPoints": 500
                }, {
                    "currentUser": { firstName: 'Gary', lastName: 'Greenhat' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer4",
                    "zoneName": 'zone2',
                    "regionName": 'region1',
                    "totalMLearningPoints": 1230
                }, {
                    "currentUser": { firstName: 'Harry', lastName: 'Hogsworth' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer5",
                    "zoneName": 'zone3',
                    "regionName": 'region2',
                    "totalMLearningPoints": 20
                }, {
                    "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer5",
                    "zoneName": 'zone3',
                    "regionName": 'region2',
                    "totalMLearningPoints": 230
                }, {
                    "currentUser": { firstName: 'Bernie', lastName: 'Hogsworth' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer5",
                    "zoneName": 'zone3',
                    "regionName": 'region2',
                    "totalMLearningPoints": 200
                }, {
                    "currentUser": { firstName: 'Rebecca', lastName: 'Redhat' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer5",
                    "zoneName": 'zone3',
                    "regionName": 'region2',
                    "totalMLearningPoints": 650
                }, {
                    "currentUser": { firstName: 'Claire', lastName: 'Redfield' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer5",
                    "zoneName": 'zone3',
                    "regionName": 'region2',
                    "totalMLearningPoints": 20
                }, {
                    "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer5",
                    "zoneName": 'zone3',
                    "regionName": 'region2',
                    "totalMLearningPoints": 230
                }, {
                    "currentUser": { firstName: 'Harry', lastName: 'Hogsworth' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer6",
                    "zoneName": 'zone6',
                    "regionName": 'region2',
                    "totalMLearningPoints": 200
                }, {
                    "currentUser": { firstName: 'Roger', lastName: 'Redhat' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer6",
                    "zoneName": 'zone4',
                    "regionName": 'region2',
                    "totalMLearningPoints": 280
                }];
            } else
                this.leaderBoard = result;
            this.loading = false;
        });
    }

    getUpdateData(curDate1=null, curDate2=null) {
        this.feedDataService.getLeaderBoard(curDate1, curDate2).subscribe(result => {
            if (!result || result.length < 2) {
                this.myUpdatedData = [{
                    "currentUser": { firstName: 'Bob', lastName: 'Hoskins' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer1",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 1000
                }, {
                    "currentUser": { firstName: 'Barry', lastName: 'White' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer1",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 100
                }, {
                    "currentUser": { firstName: 'Harry', lastName: 'Truman' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer1",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 300
                }, {
                    "currentUser": { firstName: 'Bart', lastName: 'Hoskins' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer2",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 40
                }, {
                    "currentUser": { firstName: 'Jack', lastName: 'Jones' },
                    "roleName": 'Sales Exec',
                    "dealershipCode": "dealer2",
                    "zoneName": 'zone1',
                    "regionName": 'region1',
                    "totalMLearningPoints": 350
                }, {
                    "currentUser": { firstName: 'Sandra', lastName: 'Goldskin' },
                    "roleName": 'Sales Manager',
                    "dealershipCode": "dealer3",
                    "zoneName": 'zone2',
                    "regionName": 'region1',
                    "totalMLearningPoints": 1000
                }];
            } else
                this.myUpdatedData = result;
        });
    }

    getNewDataFromServer(event) {
        console.log(event);
        this.getUpdateData(event.date1, event.date2); 
    }

    handleReport(event) {

    }
}
