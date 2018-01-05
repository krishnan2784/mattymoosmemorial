import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';


import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {BaseComponent} from "../../../base.component";
import {UserMarket} from "../../../../models/userclasses";
import {ShareService} from "../../../../services/helpers/shareservice";
import {DefaultTabNavs} from "../../../navmenu/tabnavmenu.component";
import { TermsAndCondition } from "../../../../models/competitionclasses";
import {TermsAndConditionsDataService} from "../../../../services/termsandconditionsdataservice";

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
		overlay: Overlay, vcRef: ViewContainerRef, public confirmBox: Modal) {
		super(sharedService, 'Terms and Conditions', true, '', DefaultTabNavs.competitionsTabs);
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
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
			.body("Are you sure to delete " + termsAndConditions.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => {
				this.termsAndConditionsDataService.deleteTermsAndCondition(termsAndConditions.id).subscribe((result) => {
                    if (result)
						this.updateTermsAndConditions(termsAndConditions, true);
                });
            })
            .catch((err: any) => { });
	}
	
}