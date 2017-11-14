import { Component, OnInit, OnDestroy } from '@angular/core';
import { BaseComponent} from "../../base.component";
import { ShareService } from "../../../services/helpers/shareservice";
import { DefaultTabNavs } from "../../navmenu/tabnavmenu.component";
import { Modal } from "angular2-modal/plugins/bootstrap/modal";
import { CompetitionsDataService } from "../../../services/competitionsdataservice";

@Component({
	selector: 'competitionsindex',
	template: require('./competitionsindex.component.html'),
	styles: [require('./competitionsindex.component.css')]
})
export class CompetitionIndexComponent extends BaseComponent implements OnInit, OnDestroy {
    selectedModel = null;
    public getCompetitionsItemsSub;
	public competitions;

	constructor(public competitionDataService: CompetitionsDataService, sharedService: ShareService, public confirmBox: Modal) {
		super(sharedService, 'Competitions Management', true, '', DefaultTabNavs.competitionsTabs);
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
        this.getData();
    }

	ngOnInit() {

    }

    ngOnDestroy() {
        if (this.getCompetitionsItemsSub)
            this.getCompetitionsItemsSub.unsubscribe();        
    }

    getData() {
		this.getCompetitionsItemsSub = this.competitionDataService.getCompetitions().subscribe((result) => {
			this.competitions = result;
		    this.sharedService.updateMarketDropdownEnabledState(true);
	    });
    }

    updateCompetition(competition = null, remove: boolean = false) {
		if (competition != null && this.competitions != null) {
			let origCompetition = this.competitions.find(x => x.id === competition.id);
			let index = this.competitions.indexOf(origCompetition);

            if (!remove) {
                if (index > -1) {
					this.competitions.splice(index, 1, competition);
                } else {
					this.competitions.unshift(competition);
                }
            } else if (index > -1) {
				this.competitions.splice(index, 1);
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

}