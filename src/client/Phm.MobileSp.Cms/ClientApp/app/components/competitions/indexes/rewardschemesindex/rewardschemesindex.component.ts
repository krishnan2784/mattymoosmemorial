import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';


import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {BaseComponent} from "../../../base.component";
import {UserMarket} from "../../../../models/userclasses";
import {RewardSchemesDataService} from "../../../../services/rewardschemedataservice";
import {ShareService} from "../../../../services/helpers/shareservice";
import {DefaultTabNavs} from "../../../navmenu/tabnavmenu.component";
import {StringEx} from "../../../../classes/helpers/string";
import {BaseRewardScheme} from "../../../../models/competitionclasses";

@Component({
	selector: 'rewardschemesindex',
	template: require('./rewardschemesindex.component.html'),
	styles: [require('./rewardschemesindex.component.css')]
})
export class RewardSchemeIndexComponent extends BaseComponent implements OnInit, OnDestroy {
	selectedModel: BaseRewardScheme = null;
	public getRewardScehemesSub;

	public rewardSchemes: BaseRewardScheme[];
	
	public currentMarket: UserMarket;

	constructor(public rewardSchemesDataService: RewardSchemesDataService, sharedService: ShareService,
		overlay: Overlay, vcRef: ViewContainerRef, public confirmBox: Modal) {
		super(sharedService, 'Reward Schemes', true, '', DefaultTabNavs.competitionsTabs);
		overlay.defaultViewContainer = vcRef;
		this.setupSubscriptions();
	}

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.updateMarket();
        });
    }

    updateMarket() {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
			return;
	    this.currentMarket = this.sharedService.currentMarket;
		this.rewardSchemes = null;
        this.getData();
    }

	ngOnInit() {
		this.updateMarket();
	}

    ngOnDestroy() {
		if (this.getRewardScehemesSub)
			this.getRewardScehemesSub.unsubscribe();        
    }

    getData() {
		this.getRewardScehemesSub = this.rewardSchemesDataService.getRewardScheme().subscribe((result) => {
			this.rewardSchemes = result;
			this.sharedService.updateMarketDropdownEnabledState(true);
		});
	}
	
    updateRewardScheme(rewardScheme = null, remove: boolean = false) {
		if (rewardScheme != null && this.rewardSchemes != null) {
			let origRewardScheme = this.rewardSchemes.find(x => x.id === rewardScheme.id);
			let index = this.rewardSchemes.indexOf(origRewardScheme);

            if (!remove) {
                if (index > -1) {
					this.rewardSchemes.splice(index, 1, rewardScheme);
                } else {
					this.rewardSchemes.unshift(rewardScheme);
                }
            } else if (index > -1) {
				this.rewardSchemes.splice(index, 1);
            }
        }
    }

	editRewardScheme(rewardScheme = new BaseRewardScheme()) {
		if (rewardScheme && rewardScheme.id > 0) {
            this.updatePageTitle("Edit Reward Scheme");
        } else {
            this.updatePageTitle("New Reward Scheme");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();

		this.selectedModel = rewardScheme;
    }

    rewardSchemeUpdated(comp) {
		this.updatePageTitle("Reward Schemes");
        this.updateMarketDropdownVisibility(true);
		this.updateTabNavItems(DefaultTabNavs.competitionsTabs);
		this.selectedModel = null;
		if (comp)
			this.getData();
    }
	
    deleteRewardScheme(rewardScheme) {
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
			.body("Are you sure to delete " + rewardScheme.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => {
				this.rewardSchemesDataService.deleteRewardScheme(rewardScheme.id).subscribe((result) => {
                    if (result)
						this.updateRewardScheme(rewardScheme, true);
                });
            })
            .catch((err: any) => { });
	}
	
}