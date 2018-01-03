import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { BaseComponent} from "../../base.component";
import { UserMarket } from "../../../models/userclasses";
import {FeedDataService} from "../../../shared/services/feeddataservice";
import {ShareService} from "../../../shared/services/helpers/shareservice";
import {MarketDataService} from "../../../shared/services/marketdataservice";
import {DefaultTabNavs} from "../../../components/container/tabbednavmenu/tabnavmenu.component";


declare var $: any;

@Component({
    selector: 'leaderboardcontainer',
    template: require('./leaderboardcontainer.component.html'),
    styles: [require('./leaderboardcontainer.component.css')]
})
export class LeaderboardContainer extends BaseComponent implements OnDestroy {
    public leaderBoard: any;
    public myUpdatedData: any;
    public loading = true;
    public currentMarket: UserMarket;
    refineGroups = [];
    public reportData = null;
    public selectedUser = null;
    backSub = null;

    constructor(public feedDataService: FeedDataService, sharedService: ShareService, public marketDataService: MarketDataService) {
        super(sharedService, 'Reports', true, '', DefaultTabNavs.reportsTabs);
        this.setupSubscriptions();
        this.getData();
    }

    ngOnDestroy() {
        this.removeTooltip();
    }

    setupPageVariables() {
        this.updatePageTitle('Reports');
        this.updateMarketDropdownVisibility(true);
        this.updateBackText();
        this.updateTabNavItems(DefaultTabNavs.reportsTabs);
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.removeTooltip();
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
            this.leaderBoard = result;
            this.loading = false;
        });
        this.marketDataService.getMarketUserFilters().subscribe((result) => {
            if (result && (result.regions.length > 0 || result.zones.length > 0)) {
                this.refineGroups = [];
                if (result.regions.length > 0) {
                    let regions = [];
                    result.regions.forEach((group) => {
                        regions.push({ id: group.replace(" ", ""), name: group });
                    });
                    this.refineGroups.push({
                        groupName: "Regions",
                        groupId: "regions",
                        height: "202px",
                        items: regions
                    });
                }
                if (result.areas.length > 0) {
                    let zones = [];
                    result.areas.forEach((zone) => {
                        zones.push({ id: zone.replace(" ", ""), name: zone });
                    });
                    this.refineGroups.push({
                        groupName: "Zones",
                        groupId: "zones",
                        height: "145px",
                        items: zones
                    });
                }
            }
        });
    }

    getUpdateData(curDate1=null, curDate2=null) {
        this.feedDataService.getLeaderBoard(curDate1, curDate2).subscribe(result => {
            this.myUpdatedData = result;
        });
    }

    getNewDataFromServer(event) {
        this.getUpdateData(event.date1, event.date2); 
    }

    handleReport(event) {

    }

    viewUserBreakdown(event) {
        this.updatePageTitle('');
        this.updateMarketDropdownVisibility(false);
        this.updateBackText('Learners stats');
        this.updateTabNavItems();
        this.backSub = this.sharedService.goBackEvent.subscribe(() => {
            this.handleBack();
        });
        this.selectedUser = event;
        this.removeTooltip();
        this.feedDataService.getUserPointsHistory(event.currentUser.id).subscribe(result => {  
            if (result && result.length > 0) {
                this.reportData = result;
            }
        });
    }

    handleBack(){
        this.setupPageVariables();
        this.backSub = null;
        this.selectedUser = null;
        this.reportData = null;
    }

    removeTooltip() {
        while ($('#tooltip').length > 0) {
            $('#tooltip').each((index, element) => {
                $(element).remove();
            });
        }
    }

}
