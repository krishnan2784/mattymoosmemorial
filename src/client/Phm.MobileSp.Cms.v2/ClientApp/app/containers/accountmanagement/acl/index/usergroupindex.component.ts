import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {StringEx} from "../../../../classes/helpers/string";
import {BaseComponent} from "../../../base.component";
import {UserMarket} from "../../../../models/userclasses";
import {MarketUserGroup, SecurityGroupUsers } from "../../../../models/viewmodels/usergrouppermissionindexviewmodel";
import {SecFeature} from "../../../../models/securityclasses";
import {UserGroupPermissionDataService} from "../../../../shared/services/usergrouppermissiondataservice";
import {UserDataService} from "../../../../shared/services/userdataservice";
import {SecurityFeatureDataService} from "../../../../shared/services/securityfeaturedataservice";
import {ShareService} from "../../../../shared/services/helpers/shareservice";
import {DefaultTabNavs} from "../../../../components/navigation/tabbednavmenu/tabnavmenu.component";


@Component({
	selector: 'usergroupindex',
	template: require('./usergroupindex.component.html'),
	styles: [require('./usergroupindex.component.css')]
})
export class UserGroupPermissionsIndexComponent extends BaseComponent implements OnInit, OnDestroy {
	selectedSecEntityId = null;
	userMarkets: UserMarket[] = [];
	marketMasterIds: string[] = [];
	marketUserGroups: MarketUserGroup[];
	currentStep = '';
	allSecurityFeatures: SecFeature[];
	loading: boolean = true;

	constructor(private route: ActivatedRoute, private router: Router,
		public ugPermissionDataService: UserGroupPermissionDataService,
		private userDataService: UserDataService,
		private secFeatureDataService: SecurityFeatureDataService,
		sharedService: ShareService) {
		super(sharedService, 'Accounts', true, '', DefaultTabNavs.accountManagementTabs);
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
						var marketGroup = this.marketUserGroups.filter(y => y.market.masterId === x)[0];
						if (marketGroup)
							marketGroup.securityGroupUsers
							.push(new SecurityGroupUsers({ securityGroup: z }));
						//this.ugPermissionDataService.getSecurityGroupUsers(z.id).subscribe(result => {
						//	if (result) {
						//		this.marketUserGroups.filter(y => y.market.masterId === x)[0]
						//			.securityGroupUsers.filter(yy => yy.securityGroup.id === z.id)[0]
						//			.users = result;
						//	}
						//});
					});
				} else
					this.marketUserGroups = [];
				this.loading = false;
			});
		});
		this.secFeatureDataService.getSecurityFeatures().subscribe(x => {
			this.allSecurityFeatures = (!x || x.length === 0 ? [] : StringEx.sortArray(x, ['secFeatureType', 'uri', 'httpVerb']).reverse());
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

	editUserGroup(securityGroup, editUsers) {
		this.currentStep = editUsers ? 'users' : 'group';
		this.selectedSecEntityId = securityGroup.secEntityId;
		this.updatePageTitle(securityGroup.name);
        this.updateTabNavItems();
		this.updateMarketDropdownVisibility(false);
	}

	permissionsUpdated() {
		this.selectedSecEntityId = null;
		this.updateTabNavItems(DefaultTabNavs.accountManagementTabs);
		this.updateMarketDropdownVisibility(true);
		this.currentStep = '';
		this.updatePageTitle('Accounts');
	}
}
