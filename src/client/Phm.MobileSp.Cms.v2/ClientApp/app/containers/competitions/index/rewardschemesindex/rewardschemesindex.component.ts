import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import {BaseComponent} from "../../../base.component";
import {UserMarket} from "../../../../models/userclasses";
import {BaseRewardScheme} from "../../../../models/competitionclasses";
import {RewardSchemesDataService} from "../../../../shared/services/rewardschemedataservice";
import {ShareService} from "../../../../shared/services/helpers/shareservice";
import {DefaultTabNavs} from "../../../../components/navigation/tabbednavmenu/tabnavmenu.component";
import { MatDialog } from '@angular/material';
import {DeleteModel} from "../../../../components/modals/deletemodel/deletemodel.component";

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
	  public confirmBox: MatDialog) {
		super(sharedService, 'Reward Schemes', true, '', DefaultTabNavs.competitionsTabs);
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
			this.rewardSchemes = result ? result : [];
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

	rewardSchemeUpdated(updated) {
		this.updatePageTitle("Reward Schemes");
        this.updateMarketDropdownVisibility(true);
		this.updateTabNavItems(DefaultTabNavs.competitionsTabs);
		this.selectedModel = null;
		if (updated)
			this.getData();
    }
	
  deleteRewardScheme(rewardScheme) {
    let dialogRef = this.confirmBox.open(DeleteModel, {
      width: '250px',
      data:
      {
        id: rewardScheme.id,
        name: rewardScheme.name,
        service: this.rewardSchemesDataService
      }
    });

      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.updateRewardScheme(rewardScheme, true);
      });
	}
	
}
