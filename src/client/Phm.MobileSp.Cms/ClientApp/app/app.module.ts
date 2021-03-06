import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { ColorPickerModule } from 'ngx-color-picker';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { AppComponent } from './components/app/app.component'
import { BaseComponent } from './components/base.component'
import { MarketDropdown } from './components/app/marketdropdown.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { FooterComponent } from './components/navmenu/footer.component';

import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { UserAccountManagementComponent } from './components/accountmanagement/useraccountmanagement.component';
import { TextFeedItemFormComponent } from './components/feed/modelforms/textfeeditem.component';
import { FeedIndexComponent } from "./components/feed/indexes/feedindex.component";
import { FeedItemForm } from "./components/feed/modelforms/feeditemform.component";

import { QuizFeedItemFormComponent } from "./components/feed/modelforms/quizfeeditem.component";
import { SurveyFeedItemFormComponent } from "./components/feed/modelforms/surveyfeeditem.component";
import { ObservationFeedItemFormComponent } from "./components/feed/modelforms/observationfeeditem.component";
import { QuestionFormComponent } from "./components/feed/modelforms/questionform.component";
import Basemodalcomponent = require("./components/modals/basemodal.component");
import BaseModalComponent = Basemodalcomponent.BaseModalComponent;
import { FeedReportIndexComponent } from "./components/reports/indexes/feedreportindex.component";
import { QuizFeedItemReport } from "./components/reports/quizfeeditemreport.component";
import Barchartcomponent = require("./components/charts/barchart.component");
import BarChart = Barchartcomponent.BarChart;
import Basefeeditemreportcomponent = require("./components/reports/basefeeditemreport.component");
import FeedItemReportContainerComponent = Basefeeditemreportcomponent.FeedItemReportContainerComponent;
import Gaugechartcomponent = require("./components/charts/gaugechart.component");
import GaugeChart = Gaugechartcomponent.GaugeChart;
import Donutchartcomponent = require("./components/charts/donutchart.component");
import DonutChart = Donutchartcomponent.DonutChart;
import Editusercomponent = require("./components/accountmanagement/modals/edituser.component");
import EditUser = Editusercomponent.EditUser;
import Userfiltercomponent = require("./components/common/filters/userfilter.component");
import UserFilter = Userfiltercomponent.UserFilter;
import Uploadcomponent = require("./components/media/upload.component");
import UploadMediaComponent = Uploadcomponent.UploadMediaComponent;
import { LeaderboardContainer } from "./components/reports/leaderboards/leaderboardcontainer.component";
import { PartitionComponent } from "./components/reports/leaderboards/partition/partition.component";
import { LbExecutivesTableComponent } from "./components/reports/leaderboards/lbexecutivestable/lbexecutivestable.component";
import { LbrefineComponent } from "./components/reports/leaderboards/lbrefine/lbrefine.component";
import { LeaderboardComponent } from "./components/reports/leaderboards/leaderboard/leaderboard.component";
import { TabNavMenuComponent } from "./components/navmenu/tabnavmenu.component";
import { DynamicChartFormatsComponent } from "./components/reports/dynamicchartformats/dynamicchartformats.component";
import { SurveyFeedItemReport } from "./components/reports/surveyfeeditemreport.component";

import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { QuizUserResultsComponent } from "./components/reports/quizuserresults/quizuserresults.component";
import { LearnerStatComponent } from "./components/reports/leaderboards/learnerstat/learnerstat.component";
import { ImageFeedItemFormComponent } from "./components/feed/modelforms/imagefeeditem.component";
import { VideoFeedItemFormComponent } from "./components/feed/modelforms/videofeeditem.component";
import { RichTextEditorComponent } from "./components/common/editor/richtexteditor.component";
import { ObservationFeedItemReport } from "./components/reports/observationfeeditemreport.component";
import { GaugeGraphComponent } from "./components/charts/gaugegraph/gaugegraph.component";
import { MonobarGraphComponent } from "./components/charts/monobargraph/monobargraph.component";
import { DatepickerComponent } from "./components/common/datepicker/datepicker.component";
import { TextInputComponent } from "./components/common/editor/textbox.component";
import { NumberTextInputComponent } from "./components/common/editor/numbertextbox.component";
import { TagInputComponent } from "./components/common/editor/taginputbox.component";
import Pagedfeeditemcomponent = require("./components/feed/modelforms/pagedfeed/pagedfeeditem.component");
import PagedFeedItemFormComponent = Pagedfeeditemcomponent.PagedFeedItemFormComponent;
import Bodytextpageformcomponent = require("./components/feed/modelforms/pagedfeed/bodytextpageform.component");
import BodyTextPageFormComponent = Bodytextpageformcomponent.BodyTextPageFormComponent;
import Mediapageformcomponent = require("./components/feed/modelforms/pagedfeed/mediapageform.component");
import MediaPageFormComponent = Mediapageformcomponent.MediaPageFormComponent;
import Tabbedtextpageformcomponent = require("./components/feed/modelforms/pagedfeed/tabbedtextpageform.component");
import TabbedTextPageFormComponent = Tabbedtextpageformcomponent.TabbedTextPageFormComponent;
import Textareacomponent = require("./components/common/editor/textarea.component");
import TextAreaComponent = Textareacomponent.TextAreaComponent;
import {ColourPickerInputComponent} from "./components/common/editor/colourpicker.component";
import {BrandingContentSectionComponent} from
  "./components/branding/brandingcontentsection/brandingcontentsection.component";
import {BrandingContainerComponent} from "./components/branding/brandingnavmenu/brandingcontainer.component";
import {BaseBrandingComponent} from
  "./components/branding/components/basebrandingcomponent/basebrandingcomponent.component";
import {FontPickerComponent} from "./components/common/editor/fontpicker.component";
import {BrandingOptionPickerComponent} from
	"./components/branding/components/brandingoptionpicker/brandingoptionpicker.component";
import {EditEntityPermissionsListComponent} from
	"./components/accountmanagement/acl/editentitypermissionslist/editentitypermissionslist.component";
import { UserGroupPermissionsIndexComponent } from "./components/accountmanagement/acl/indexes/usergroupindex.component";
import {EditUserGroupComponent} from
	"./components/accountmanagement/acl/editusergrouppermissions/editusergrouppermissions.component";
import {OrderBy} from "./classes/orderBy";
import { GenericFilterComponent } from "./components/common/filters/generic/genericfilter.component";
import {CompetitionForm} from "./components/competitions/forms/competitionform/competitionform.component";
import {FormButtons} from "./components/common/form/formbuttons/formbuttons.component";
import {FormNavBarComponent} from "./components/common/form/formnavbar/formnavbar.component";
import {CallToActionComponent} from "./components/common/editor/calltoaction.component";
import {SelectListComponent} from "./components/common/editor/selectlist.component";
import {DateRangeComponent} from "./components/common/editor/daterange.component";
import {CompetitionIndexComponent} from
	"./components/competitions/indexes/competitionsindex/competitionsindex.component";
import {RewardSchemeIndexComponent} from
	"./components/competitions/indexes/rewardschemesindex/rewardschemesindex.component";
import {RewardSchemeForm} from "./components/competitions/forms/rewardschemeform/rewardschemeform.component";
import {TermsAndConditionsIndexComponent} from
	"./components/competitions/indexes/termsandconditionsindex/termsandconditionsindex.component";
import {TermsAndConditionForm} from
	"./components/competitions/forms/termsandconditionsform/termsandconditionsform.component";
import {EditUserPermissionsComponent} from
	"./components/accountmanagement/acl/edituserpermissions/edituserpermissions.component";
import {CopyToMarket} from "./components/modals/copytomarket/copytomarket.component";
import {CopyToMarketContent} from "./components/modals/copytomarket/content/copytomarketcontent.component";


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        BaseComponent,
        NavMenuComponent,
	    FormNavBarComponent,
	    FormButtons,
        TabNavMenuComponent,
        FooterComponent,
        MarketDropdown,
        DatepickerComponent,

        // main naviation items
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        UserAccountManagementComponent,
        FeedIndexComponent,
        BrandingContainerComponent,
        BrandingContentSectionComponent,
		BaseBrandingComponent,
	    UserGroupPermissionsIndexComponent,
	    CompetitionIndexComponent,
	    RewardSchemeIndexComponent,
	    TermsAndConditionsIndexComponent,

        // feed item forms
        FeedItemForm,
        TextFeedItemFormComponent,
        ImageFeedItemFormComponent,
        VideoFeedItemFormComponent,
        QuizFeedItemFormComponent,
        SurveyFeedItemFormComponent,
        ObservationFeedItemFormComponent,
        QuestionFormComponent,
        PagedFeedItemFormComponent,
        BodyTextPageFormComponent,
        MediaPageFormComponent,
        TabbedTextPageFormComponent,
        BaseModalComponent,

        // reporting
        FeedReportIndexComponent,
        FeedItemReportContainerComponent,
        QuizFeedItemReport,
        SurveyFeedItemReport,
        QuizUserResultsComponent,
        ObservationFeedItemReport,
        LearnerStatComponent,

        //leaderbaord
        LeaderboardContainer,
        LeaderboardComponent,
        LbExecutivesTableComponent,
        LbrefineComponent,
		PartitionComponent,

		// competitions
	    CompetitionForm,
		RewardSchemeForm,
		TermsAndConditionForm,

        // user management
		EditUser,
	    EditEntityPermissionsListComponent,
		EditUserGroupComponent,
		EditUserPermissionsComponent,

        // charts
        BarChart,
        GaugeChart,
        DonutChart,
        DynamicChartFormatsComponent,
        MonobarGraphComponent,
        GaugeGraphComponent,

        //modals
	    CopyToMarketContent,
		CopyToMarket,

        //shared
        UserFilter,
        RichTextEditorComponent,
        TextAreaComponent,
        TextInputComponent,
		NumberTextInputComponent, 
		SelectListComponent,
	    DateRangeComponent,
	    CallToActionComponent,
        TagInputComponent,
		ColourPickerInputComponent,
		FontPickerComponent,
	    BrandingOptionPickerComponent,
		UploadMediaComponent,
		OrderBy,
	    GenericFilterComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2PaginationModule,
        FormsModule,
        NouisliderModule,
        ReactiveFormsModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        ColorPickerModule,
        BootstrapModalModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'useraccountmanagement', component: UserAccountManagementComponent },
			{ path: 'useraccountmanagement/userpermissionmanagement', component: UserGroupPermissionsIndexComponent },
            { path: 'feed/:feedCat', component: FeedIndexComponent },
            { path: 'feed', component: FeedIndexComponent },
            { path: 'feeditem', component: FeedItemForm },
            { path: 'feeditem/:id', component: FeedItemForm },
            { path: 'feeditem/:feedCat', component: FeedItemForm },
            { path: 'reports/leaderboard', component: LeaderboardContainer },
            { path: 'reports', component: FeedReportIndexComponent },
            { path: 'reports/:feedType', component: FeedReportIndexComponent },
            { path: 'branding', component: BrandingContainerComponent },
			{ path: 'competitions', component: CompetitionIndexComponent },
			{ path: 'competitions/rewardschemes', component: RewardSchemeIndexComponent },
			{ path: 'competitions/termsandconditions', component: TermsAndConditionsIndexComponent },
            { path: '**', redirectTo: 'home' }
        ])
	]
})
export class AppModule {
}
