import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {BaseComponent} from "../../../base.component";
import {ShareService} from "../../../../services/helpers/shareservice";
import {DefaultTabNavs} from "../../../navmenu/tabnavmenu.component";
import {UserGroupPermissionDataService} from "../../../../services/usergrouppermissiondataservice";
import {UserDataService} from "../../../../services/userdataservice";
import {UserMarket} from "../../../../models/userclasses";
import {SecGroup} from "../../../../models/securityclasses";
import {UserGroupPermissionIndexViewModel, MarketUserGroup, SecurityGroupUsers } from "../../../../models/viewmodels/usergrouppermissionindexviewmodel";


declare var $: any;
declare var Materialize: any;

@Component({
	selector: 'usergroupindex',
	template: require('./usergroupindex.component.html'),
	styles: [require('./usergroupindex.component.css')]
})
export class UserGroupPermissionsIndexComponent extends BaseComponent implements OnInit, OnDestroy {
    selectedModel = null;
	userMarkets: UserMarket[] = [];
	marketMasterIds: string[] = [];
	marketUserGroups: MarketUserGroup[];

	constructor(private route: ActivatedRoute, private router: Router,
		public ugPermissionDataService: UserGroupPermissionDataService,
		private userDataService: UserDataService,
		sharedService: ShareService) {
		super(sharedService, '', true, '', DefaultTabNavs.accountManagementTabs);
		this.setupSubscriptions();
		this.setupMarket();
	}

    setupSubscriptions() {
		this.sharedService.marketUpdated.subscribe((market) => {
			this.setupMarket();
		});
    }

	ngOnInit() {

    }

	ngOnDestroy() {

    }

	getData() {
		this.marketMasterIds.forEach(x => {
			this.ugPermissionDataService.getUserGroupsByMarketMasterId(x).subscribe(result => {
				if (result) {
					result.forEach(z => {
						this.marketUserGroups.filter(y => y.market.masterId === x)[0].securityGroupUsers
							.push(new SecurityGroupUsers({ securityGroup: z }));
						this.ugPermissionDataService.getSecurityGroupUsers(z.id).subscribe(result => {
							if (result) {
								this.marketUserGroups.filter(y => y.market.masterId === x)[0]
									.securityGroupUsers.filter(yy => yy.securityGroup.id === z.id)[0]
									.users = result;
							}
						});
					});
				} else
					this.marketUserGroups = [];
			});
		});
	}

	setupMarket() {
		if (this.sharedService.currentMarketId === 1) {
			this.setupAllMarkets();
		} else {
			this.marketMasterIds = [];
			this.marketMasterIds.push(this.sharedService.currentMarket.masterId);
			this.marketUserGroups = [];
			this.marketUserGroups.push(new MarketUserGroup({ market : this.sharedService.currentMarket}));
			this.getData();
		}
	}

	setupAllMarkets() {
		if (!this.userMarkets) {
			this.userDataService.getUserMarkets().subscribe((result) => {
				if (result) {
					this.userMarkets = result;
					this.setupAllMarkets();
				} else
					this.userMarkets = [];
			});
			return;
		}
		this.marketMasterIds = [];
		this.userMarkets.forEach(x => {
			if (this.marketMasterIds.findIndex(y => y === x.masterId) === -1) {
				this.marketMasterIds.push(x.masterId);
				this.marketUserGroups = [];
				this.marketUserGroups.push(new MarketUserGroup({ market: x }));
			}
		});
		this.getData();
	}
}