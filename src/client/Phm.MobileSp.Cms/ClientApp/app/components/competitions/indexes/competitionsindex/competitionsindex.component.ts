import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { CompetitionsDataService } from "../../../../services/competitionsdataservice";
import { BaseComponent } from "../../../base.component";
import { GenericFilterSet, DefaultFilterSets, DateRangeFilter, RangeFilter, GenericFilter, StringFilter } from "../../../common/filters/generic/genericfilter.component";
import { UserMarket } from "../../../../models/userclasses";
import { RewardSchemesDataService } from "../../../../services/rewardschemedataservice";
import { ShareService } from "../../../../services/helpers/shareservice";
import { DefaultTabNavs } from "../../../navmenu/tabnavmenu.component";
import { StringEx } from "../../../../classes/helpers/string";
import { Competition } from "../../../../models/competitionclasses";
import {CopiedElementTypeEnum} from "../../../../enums";

@Component({
	selector: 'competitionsindex',
	template: require('./competitionsindex.component.html'),
	styles: [require('./competitionsindex.component.css')]
})
export class CompetitionIndexComponent extends BaseComponent implements OnInit, OnDestroy {
	selectedModel: Competition = null;
	selectedCopyToMarketModel: Competition = null;
	public getCompetitionsItemsSub;

	public allCompetitions: Competition[];
	public filteredCompetitions: Competition[];

	competitionFilters: GenericFilterSet = DefaultFilterSets.competitionFilters;

	public currentMarket: UserMarket;
	contentTypeEnum: typeof CopiedElementTypeEnum = CopiedElementTypeEnum;

	constructor(public competitionDataService: CompetitionsDataService, sharedService: ShareService,
		overlay: Overlay, vcRef: ViewContainerRef, public confirmBox: Modal) {
		super(sharedService, 'Competitions Management', true, '', DefaultTabNavs.competitionsTabs);
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
		this.filteredCompetitions = null;
	    this.allCompetitions = null;
        this.getData();
    }

	ngOnInit() {
		this.updateMarket();
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
			this.updateFilters();
		});
	}

	updateFilters() {
		this.competitionFilters.filterGroups[1].filters.filter(x => x.filterName === 'Number of Participants')[0]['maxValue'] = Math.max.apply(Math, this.allCompetitions.map(x=> x.participants));
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

	editCompetition(competition = new Competition()) {
		if (competition && competition.id > 0) {
            this.updatePageTitle("Edit Competition");
        } else {
            this.updatePageTitle("New Competition");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();

		this.selectedModel = competition;
    }

	competitionUpdated(comp) {
		this.updatePageTitle("Competitions Management");
        this.updateMarketDropdownVisibility(true);
		this.updateTabNavItems(DefaultTabNavs.competitionsTabs);
		this.selectedModel = null;
		if (comp)
			this.getData();
	}

	copyCompetitionToMarket(comp: Competition) {
		this.selectedCopyToMarketModel = comp;
	}

	publishCompetitionTolive(competition: Competition) {
		var confirmText;
		if (competition.published) {
			confirmText = competition.title + " has already been published. Are you sure to overwrite it?";
		} else {
			confirmText = "Are you sure to publish " + competition.title + "?";
		}
		this.confirmBox.confirm()
			.size('sm')
			.showClose(false)
			.title('Publish')
			.body(confirmText)
			.okBtn('Confirm')
			.cancelBtn('Cancel')
			.open()
			.catch((err: any) => console.log('ERROR: ' + err))
			.then((dialog: any) => { return dialog.result })
			.then((result: any) => {
				this.competitionDataService.publishContentToLive(competition.id).subscribe((result) => {
					if (result) {
					}
				});
			})
			.catch((err: any) => { });
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
				this.competitionDataService.deleteCompetition(competition.id).subscribe((result) => {
                    if (result)
						this.updateCompetition(competition, true);
                });
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
		if (dFilter) {
			var fd1 = new Date(dFilter.date1);
			var fd2 = new Date(dFilter.date2);
			fd2.setHours(23, 59, 59);

			if (dFilter.date1) 
				a = a.filter((x) => (x.startDate && new Date(x.startDate) >= fd1) || (x.endDate && new Date(x.endDate) >= fd1)); // competitions which ended after the start date
			if (dFilter.date2)
				a = a.filter((x) => (x.startDate && new Date(x.startDate) <= fd2) || (x.endDate && new Date(x.endDate) <= fd2)); // competitions which started before the end date
		}

		var pFilter = filters.filter(x => x.filterName === 'Number of Participants')[0] as RangeFilter;
		if (pFilter) {
			a = a.filter(x => x.participants >= pFilter.bottomValue && x.participants <= pFilter.topValue);
		}

		this.filteredCompetitions = a.slice(0);
	}
}