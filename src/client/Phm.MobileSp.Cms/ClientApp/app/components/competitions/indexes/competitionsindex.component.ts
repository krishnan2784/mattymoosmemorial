import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { BaseComponent} from "../../base.component";
import { ShareService } from "../../../services/helpers/shareservice";
import { DefaultTabNavs } from "../../navmenu/tabnavmenu.component";
import { CompetitionsDataService } from "../../../services/competitionsdataservice";

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {GenericFilterSet, DefaultFilterSets, GenericFilter, StringFilter, DateRangeFilter, RangeFilter } from "../../common/filters/generic/genericfilter.component";
import {StringEx} from "../../../classes/helpers/string";

@Component({
	selector: 'competitionsindex',
	template: require('./competitionsindex.component.html'),
	styles: [require('./competitionsindex.component.css')]
})
export class CompetitionIndexComponent extends BaseComponent implements OnInit, OnDestroy {
    selectedModel = null;
    public getCompetitionsItemsSub;
	public allCompetitions;
	public filteredCompetitions;
	competitionFilters: GenericFilterSet = DefaultFilterSets.competitionFilters;

	constructor(public competitionDataService: CompetitionsDataService, sharedService: ShareService,
		overlay: Overlay, vcRef: ViewContainerRef, public confirmBox: Modal) {
		super(sharedService, 'Competitions Management', true, '', DefaultTabNavs.competitionsTabs);
		this.setupSubscriptions();
		overlay.defaultViewContainer = vcRef;

    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.updateMarket();
        });
    }

    updateMarket() {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
			return;
		this.filteredCompetitions = null;
	    this.allCompetitions = null;
        this.getData();
    }

	ngOnInit() {
		this.getData();
	}

    ngOnDestroy() {
        if (this.getCompetitionsItemsSub)
            this.getCompetitionsItemsSub.unsubscribe();        
    }

    getData() {
		this.getCompetitionsItemsSub = this.competitionDataService.getCompetitions().subscribe((result) => {
			this.allCompetitions = result;
			this.filteredCompetitions = result;
		    this.sharedService.updateMarketDropdownEnabledState(true);
	    });
    }

    updateCompetition(competition = null, remove: boolean = false) {
		if (competition != null && this.filteredCompetitions != null) {
			let origCompetition = this.filteredCompetitions.find(x => x.id === competition.id);
			let index = this.filteredCompetitions.indexOf(origCompetition);

            if (!remove) {
                if (index > -1) {
					this.filteredCompetitions.splice(index, 1, competition);
                } else {
					this.filteredCompetitions.unshift(competition);
                }
            } else if (index > -1) {
				this.filteredCompetitions.splice(index, 1);
            }
        }
    }

	editCompetition(competition) {
		if (competition && competition.id > 0) {
            this.updatePageTitle("Edit Competition");
        } else {
            this.updatePageTitle("New Competition");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();

		this.selectedModel = competition;
    }

    competitionUpdated() {
		this.updatePageTitle("Competitions Management");
        this.updateMarketDropdownVisibility(true);
		this.updateTabNavItems(DefaultTabNavs.competitionsTabs);
        this.selectedModel = null;
        this.getData();
    }
	
    deleteCompetition(competition) {
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
			.body("Are you sure to delete " + competition.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => {
				//this.competitionDataService.deleteFeeditem(competition.id).subscribe((result) => {
    //                if (result)
				//		this.updateCompetition(competition, true);
    //            });
            })
            .catch((err: any) => { });
	}

	filterList(filters: GenericFilter[]) {
		if (filters.length === 0)
			this.filteredCompetitions = this.allCompetitions.slice(0);

		var a = this.allCompetitions.slice(0);
		var sFilter = filters.filter(x => x.filterName === 'search')[0] as StringFilter;
		if (sFilter) {
			a = StringEx.searchArray(sFilter.value.toLowerCase(), a, ['title']);
		}

		var dFilter = filters.filter(x => x.filterName === 'Date')[0] as DateRangeFilter;
		var pFilter = filters.filter(x => x.filterName === 'Number of Participants')[0] as RangeFilter;
		this.filteredCompetitions = a.slice(0);

	}
}