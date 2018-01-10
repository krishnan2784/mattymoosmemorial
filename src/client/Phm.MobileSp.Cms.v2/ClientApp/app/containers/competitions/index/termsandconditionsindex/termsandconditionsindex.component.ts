import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import {BaseComponent} from "../../../base.component";
import {TermsAndCondition} from "../../../../models/competitionclasses";
import {UserMarket} from "../../../../models/userclasses";
import {TermsAndConditionsDataService} from "../../../../shared/services/termsandconditionsdataservice";
import {ShareService} from "../../../../shared/services/helpers/shareservice";
import {DefaultTabNavs} from "../../../../components/navigation/tabbednavmenu/tabnavmenu.component";
import { MatDialog } from '@angular/material';
import {DeleteModel} from "../../../../components/modals/deletemodel/deletemodel.component";


@Component({
	selector: 'termsandconditionsindex',
	template: require('./termsandconditionsindex.component.html'),
	styles: [require('./termsandconditionsindex.component.css')]
})
export class TermsAndConditionsIndexComponent extends BaseComponent implements OnInit, OnDestroy {
	selectedModel: TermsAndCondition = null;
	public getTermsAndConditionsSub;

	public termsAndConditions: TermsAndCondition[];
	
	public currentMarket: UserMarket;

	constructor(public termsAndConditionsDataService: TermsAndConditionsDataService, sharedService: ShareService,
	  public confirmBox: MatDialog) {
		super(sharedService, 'Terms and Conditions', true, '', DefaultTabNavs.competitionsTabs);
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
		this.termsAndConditions = null;
        this.getData();
    }

	ngOnInit() {
		this.updateMarket();
	}

    ngOnDestroy() {
		if (this.getTermsAndConditionsSub)
			this.getTermsAndConditionsSub.unsubscribe();        
    }

    getData() {
		this.getTermsAndConditionsSub = this.termsAndConditionsDataService.getTermsAndConditions().subscribe((result) => {
			this.termsAndConditions = result ? result : [];
			this.sharedService.updateMarketDropdownEnabledState(true);
		});
	}
	
    updateTermsAndConditions(termsAndConditions = null, remove: boolean = false) {
		if (termsAndConditions != null && this.termsAndConditions != null) {
			let origTermsAndConditions = this.termsAndConditions.find(x => x.id === termsAndConditions.id);
			let index = this.termsAndConditions.indexOf(origTermsAndConditions);

            if (!remove) {
                if (index > -1) {
					this.termsAndConditions.splice(index, 1, termsAndConditions);
                } else {
					this.termsAndConditions.unshift(termsAndConditions);
                }
            } else if (index > -1) {
				this.termsAndConditions.splice(index, 1);
            }
        }
    }

	editTermsAndConditions(termsAndConditions = new TermsAndCondition()) {
		if (termsAndConditions && termsAndConditions.id > 0) {
            this.updatePageTitle("Edit Terms and Conditions");
        } else {
            this.updatePageTitle("New Terms and Conditions");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();

		this.selectedModel = termsAndConditions;
    }

    termsAndConditionsUpdated(updated) {
      this.updatePageTitle("Terms and Conditions");
      this.updateMarketDropdownVisibility(true);
		  this.updateTabNavItems(DefaultTabNavs.competitionsTabs);
		  this.selectedModel = null;
		  if (updated)
			  this.getData();
    }
	
    deleteTermsAndConditions(termsAndConditions) {
      let dialogRef = this.confirmBox.open(DeleteModel, {
        width: '250px',
        data:
        {
          id: termsAndConditions.id,
          name: termsAndConditions.name,
          service: this.termsAndConditionsDataService
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.updateTermsAndConditions(termsAndConditions, true);
      });
	}
	
}
