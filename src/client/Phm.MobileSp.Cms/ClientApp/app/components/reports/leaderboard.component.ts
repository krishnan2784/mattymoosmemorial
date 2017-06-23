import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import Basecomponent = require("../base.component");
import BaseComponent = Basecomponent.BaseComponent;
import Feeddataservice = require("../../services/feeddataservice");
import FeedDataService = Feeddataservice.FeedDataService;
import Shareservice = require("../../services/helpers/shareservice");
import ShareService = Shareservice.ShareService;
declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'leaderboard',
    template: require('./leaderboard.component.html'),
    styles: [require('./leaderboard.component.css')]
})
export class LeaderboardComponent extends BaseComponent implements OnInit, OnDestroy {


    constructor(private route: ActivatedRoute,
        private router: Router,
        public feedDataService: FeedDataService,
        sharedService: ShareService) {
        super(sharedService, 'Leaderboard', true);

    }
    
    ngOnInit() {

    }

    ngOnDestroy() {

    }
    
    getData() {

    }
}
