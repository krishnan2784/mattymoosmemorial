import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { BaseComponent } from "../../../base.component";
import { UserMarket } from "../../../../models/userclasses";
import { StringEx } from "../../../../classes/helpers/string";
import { Competition } from "../../../../models/competitionclasses";
import {GenericFilterSet, DefaultFilterSets, GenericFilter, StringFilter, DateRangeFilter, RangeFilter } from "../../../../components/common/filters/generic/genericfilter.component";
import {CopiedElementTypeEnum} from "../../../../../enums";
import {CompetitionsDataService} from "../../../../shared/services/competitionsdataservice";
import {ShareService} from "../../../../shared/services/helpers/shareservice";
import {DefaultTabNavs} from "../../../../components/navigation/tabbednavmenu/tabnavmenu.component";
import {MatDialog} from "@angular/material";
import {CompetitionPublish} from
  "../../../../components/competitions/modals/publishcompetition/publishcompetition.component";
import {DeleteModel} from "../../../../components/modals/deletemodel/deletemodel.component";

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

	marketSub;

	public currentMarket: UserMarket;
	contentTypeEnum: typeof CopiedElementTypeEnum = CopiedElementTypeEnum;

  constructor(public competitionDataService: CompetitionsDataService, sharedService: ShareService,
    public confirmBox: MatDialog) {
    super(sharedService, 'Competitions Management', true, '', DefaultTabNavs.competitionsTabs);

	}

	ngOnInit() {
		this.setupSubscriptions();
		this.updateMarket();
	}

	ngOnDestroy() {
		this.removeSubscriptions();
	}

	setupSubscriptions() {
		this.marketSub = this.sharedService.marketUpdated.subscribe((market) => {
			this.updateMarket();
		});
	}

	removeSubscriptions() {
		if (this.getCompetitionsItemsSub)
			this.getCompetitionsItemsSub.unsubscribe();
		if (this.marketSub)
			this.marketSub.unsubscribe();        
	}

	updateMarket() {
		if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
			return;
		this.currentMarket = this.sharedService.currentMarket;
		this.filteredCompetitions = null;
		this.allCompetitions = null;
		this.getData();
	}

    getData() {
		this.getCompetitionsItemsSub = this.competitionDataService.getCompetitions().subscribe((result) => {
			let comps = result && Array.isArray(result) ? result : [];
			this.allCompetitions = comps;
			this.filteredCompetitions = comps;
			this.sharedService.updateMarketDropdownEnabledState(true);
			this.updateFilters();
		});
	}

	updateFilters() {
		let maxValue = this.allCompetitions ? Math.max.apply(Math, this.allCompetitions.map(x => x.participants)) : 0;
		this.competitionFilters.filterGroups[1].filters.filter(x => x.filterName === 'Number of Participants')[0]['maxValue'] = maxValue;
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

	competitionUpdated(updated) {
		this.updatePageTitle("Competitions Management");
        this.updateMarketDropdownVisibility(true);
		this.updateTabNavItems(DefaultTabNavs.competitionsTabs);
		this.selectedModel = null;
		if (updated)
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
    let dialogRef = this.confirmBox.open(CompetitionPublish, {
	    width: '250px',
	    data: {
	      model: competition,
	      bodyText: confirmText
	    }
	  });
	}
	
  deleteCompetition(competition) {
    let dialogRef = this.confirmBox.open(DeleteModel, {
        width: '250px',
        data:
        {
          id: competition.id,
          name: competition.name,
          service: this.competitionDataService
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.updateCompetition(competition, true);
      });
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
