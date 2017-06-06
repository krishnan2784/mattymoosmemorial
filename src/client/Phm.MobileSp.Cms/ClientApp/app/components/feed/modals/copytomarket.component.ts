import { Component, Output, EventEmitter, Injector, Input, OnInit } from '@angular/core';
import { FeedDataService } from "../../../dataservices/FeedDataService";
import ModalContent = require("../../../interfaces/components/IModalContent");
import IModalContent = ModalContent.IModalContent;
import Basemodalcontentcomponent = require("../../modals/basemodalcontent.component");
import BaseModalContent = Basemodalcontentcomponent.BaseModalContent;
import Datashareservice = require("../../../dataservices/datashareservice");
import ShareService = Datashareservice.ShareService;
import Marketdataservice = require("../../../dataservices/marketdataservice");
import MarketDataService = Marketdataservice.MarketDataService;
import Marketclasses = require("../../../models/marketclasses");
import Market = Marketclasses.Market;
import Userclasses = require("../../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import CopyToMarketService = require("../../../interfaces/dataservices/ICopyToMarketService");
import ICopyToMarketService = CopyToMarketService.ICopyToMarketService;
import Baseclasses = require("../../../models/baseclasses");
import BaseModel = Baseclasses.BaseModel;
import Enums = require("../../../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import Userdataservice = require("../../../dataservices/userdataservice");
import UserDataService = Userdataservice.UserDataService;
declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'feeditem-copytomarket',
    template: require('./copytomarket.component.html'),
    styles: [require('./copytomarket.component.css')]
})
export class FeedItemCopyToMarket extends BaseModalContent implements OnInit, IModalContent {

    title: string;
    model: BaseModel;
    contentType: CopiedElementTypeEnum;

    copyToMarketService: ICopyToMarketService;

    userMarkets: UserMarket[];
    currentMarkets: Market[];

    constructor(private injector: Injector, private sharedService: ShareService,
        private marketService: MarketDataService, private userDataService: UserDataService) {
        super();
        if (injector) {
            this.title = injector.get('title');
            this.model = injector.get('model');
            this.contentType = injector.get('contentType');
            this.copyToMarketService = injector.get('copyToMarketService');
        }
    } 

    ngOnInit() {
        this.setupMarkets();
    }

    setupMarkets() {
        this.marketService.getMarketsByMasterId(this.contentType, this.model.masterId).subscribe((result) => {
            this.currentMarkets = result;
            this.userDataService.getUserMarkets().subscribe((result) => {
                if (this.currentMarkets && this.currentMarkets.length > 0)
                    result = result.filter(x => this.currentMarkets.filter(y => y.id === x.id).length === 0);
                this.userMarkets = result;
            });
        });
    }

    saveChanges() {
        //this.sharedService.updateFeedItem(this.model);
    }
}
