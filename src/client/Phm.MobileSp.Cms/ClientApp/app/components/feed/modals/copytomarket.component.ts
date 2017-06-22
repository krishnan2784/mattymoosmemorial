import { Component, Output, EventEmitter, Injector, Input, OnInit } from '@angular/core';
import ModalContent = require("../../../interfaces/components/IModalContent");
import IModalContent = ModalContent.IModalContent;
import Basemodalcontentcomponent = require("../../modals/basemodalcontent.component");
import BaseModalContent = Basemodalcontentcomponent.BaseModalContent;
import Datashareservice = require("../../../services/helpers/shareservice");
import ShareService = Datashareservice.ShareService;
import Marketdataservice = require("../../../services/marketdataservice");
import MarketDataService = Marketdataservice.MarketDataService;
import Userclasses = require("../../../models/userclasses");
import MarketContentService = require("../../../interfaces/services/IMarketContentService");
import IMarketContentService = MarketContentService.IMarketContentService;
import Baseclasses = require("../../../models/baseclasses");
import BaseModel = Baseclasses.BaseModel;
import Enums = require("../../../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import Userdataservice = require("../../../services/userdataservice");
import UserDataService = Userdataservice.UserDataService;
import ContentMarket = Userclasses.ContentMarket;

@Component({
    selector: 'feeditem-copytomarket',
    template: require('./copytomarket.component.html'),
    styles: [require('./copytomarket.component.css')]
})
export class FeedItemCopyToMarket extends BaseModalContent implements OnInit, IModalContent {

    title: string;
    model: BaseModel;
    contentType: CopiedElementTypeEnum;

    marketContentService: IMarketContentService;

    userMarkets: ContentMarket[] = [];
    currentMarkets: ContentMarket[] = [];

    selectedUserMarket: ContentMarket;
    selectedMarket: ContentMarket;

    unsavedChanges: boolean = false;

    constructor(private injector: Injector, private sharedService: ShareService,
        private marketService: MarketDataService, private userDataService: UserDataService) {
        super();
        if (injector) {
            this.title = injector.get('title');
            this.model = injector.get('model');
            this.contentType = injector.get('contentType');
            this.marketContentService = injector.get('marketContentService');
        }
    } 

    ngOnInit() {
        this.setupMarkets();
    }

    setupMarkets() {
        this.marketService.getMarketsByMasterId(this.contentType, this.model.masterId).subscribe((result) => {
            if (result && result.length > 0) {
                this.currentMarkets = this.filterMarkets(result.map((x) => { return new ContentMarket(x); }));
                this.markMarketsAsCopied();
            }
            this.userDataService.getUserMarkets().subscribe((result) => {
                if (result && result.length > 0) {
                    if (this.currentMarkets && this.currentMarkets.length > 0)
                        result = result.filter(x => this.currentMarkets.filter(y => y.id === x.id).length === 0);
                    this.userMarkets = this.filterMarkets(result.map((x) => { return new ContentMarket(x); }));
                }
            });
        });
    }

    filterMarkets(markets: ContentMarket[]): ContentMarket[] {
        // we will need to filter Global and Pan EU out when viewing the Pan EU market
        // and filter out Global when viewing the global market
        // we could add a market level integer to the market (e.g. 0 = global, 1 = regional, 2 = market)
        // or we could add an isGlobal flag
        if (this.sharedService.currentMarket.isMaster) {
           // markets = markets.filter(x => !x.isMaster);
        }
        markets = markets.filter(x => x.id !== this.sharedService.currentMarket.id);
        return markets;
    }

    markMarketsAsCopied() {
        for (let x of this.currentMarkets) {
            let origItem = this.currentMarkets.find(y => y.id === x.id);
            let index = this.currentMarkets.indexOf(origItem);
            this.currentMarkets[index].isCopied = true;
        }
        this.checkForChanges();
    }

    copyToMarket() {
        if (this.selectedUserMarket[0] && this.currentMarkets.filter(x => x.id === this.selectedUserMarket[0].id).length === 0) {
            this.currentMarkets.push(new ContentMarket(this.selectedUserMarket[0]));
            let origItem = this.userMarkets.find(x => x.id === this.selectedUserMarket[0].id);
            let index = this.userMarkets.indexOf(origItem);
            this.userMarkets.splice(index, 1);
            this.checkForChanges();
        }
    }

    removeFromMarket() {
        if (this.selectedMarket[0] && !this.selectedMarket[0].isCopied &&
            this.userMarkets.filter(x => x.id === this.selectedMarket[0].id).length === 0) {
            this.userMarkets.push(new ContentMarket(this.selectedMarket[0]));
            let origItem = this.currentMarkets.find(x => x.id === this.selectedMarket[0].id);
            let index = this.currentMarkets.indexOf(origItem);
            this.currentMarkets.splice(index, 1);
            this.checkForChanges();
        }
    }

    checkForChanges() {this.unsavedChanges = this.currentMarkets.filter(x => !x.isCopied).length > 0;}

    saveChanges() {
        var marketIds = this.currentMarkets.map((x) => { return x.id; });
        this.marketContentService.copyItemToMarket(this.model.id, marketIds).subscribe((result) => {
            if (result.success) {
                this.closeModal();
                this.markMarketsAsCopied();
            }
        });
    }
}
