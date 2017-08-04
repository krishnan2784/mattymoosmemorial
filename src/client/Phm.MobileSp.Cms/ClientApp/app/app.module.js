"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular2_universal_1 = require("angular2-universal");
var ng2_pagination_1 = require("ng2-pagination");
var forms_1 = require("@angular/forms");
var ng2_nouislider_1 = require("ng2-nouislider");
var ng2_table_1 = require("ng2-table/ng2-table");
var ngx_bootstrap_1 = require("ngx-bootstrap");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/debounceTime");
require("rxjs/add/operator/distinctUntilChanged");
require("rxjs/add/operator/map");
require("rxjs/add/operator/switchMap");
require("rxjs/add/operator/toPromise");
var app_component_1 = require("./components/app/app.component");
var base_component_1 = require("./components/base.component");
var marketdropdown_component_1 = require("./components/app/marketdropdown.component");
var navmenu_component_1 = require("./components/navmenu/navmenu.component");
var footer_component_1 = require("./components/navmenu/footer.component");
var home_component_1 = require("./components/home/home.component");
var fetchdata_component_1 = require("./components/fetchdata/fetchdata.component");
var counter_component_1 = require("./components/counter/counter.component");
var useraccountmanagement_component_1 = require("./components/accountmanagement/useraccountmanagement.component");
var textfeeditem_component_1 = require("./components/feed/modelforms/textfeeditem.component");
var feedindex_component_1 = require("./components/feed/indexes/feedindex.component");
var feeditemform_component_1 = require("./components/feed/modelforms/feeditemform.component");
var feeditemcontainer_component_1 = require("./components/feed/modelforms/feeditemcontainer.component");
var quizfeeditem_component_1 = require("./components/feed/modelforms/quizfeeditem.component");
var surveyfeeditem_component_1 = require("./components/feed/modelforms/surveyfeeditem.component");
var observationfeeditem_component_1 = require("./components/feed/modelforms/observationfeeditem.component");
var questionform_component_1 = require("./components/feed/modelforms/questionform.component");
var Basemodalcomponent = require("./components/modals/basemodal.component");
var BaseModalComponent = Basemodalcomponent.BaseModalComponent;
var Copytomarketcomponent = require("./components/feed/modals/copytomarket.component");
var FeedItemCopyToMarket = Copytomarketcomponent.FeedItemCopyToMarket;
var feedreportindex_component_1 = require("./components/reports/indexes/feedreportindex.component");
var quizfeeditemreport_component_1 = require("./components/reports/quizfeeditemreport.component");
var Barchartcomponent = require("./components/charts/barchart.component");
var BarChart = Barchartcomponent.BarChart;
var Basefeeditemreportcomponent = require("./components/reports/basefeeditemreport.component");
var FeedItemReportContainerComponent = Basefeeditemreportcomponent.FeedItemReportContainerComponent;
var Gaugechartcomponent = require("./components/charts/gaugechart.component");
var GaugeChart = Gaugechartcomponent.GaugeChart;
var Donutchartcomponent = require("./components/charts/donutchart.component");
var navbar_component_1 = require("./components/navbar/navbar.component");
var DonutChart = Donutchartcomponent.DonutChart;
var Editusercomponent = require("./components/accountmanagement/modals/edituser.component");
var EditUser = Editusercomponent.EditUser;
var Userfiltercomponent = require("./components/common/filters/userfilter.component");
var UserFilter = Userfiltercomponent.UserFilter;
var Uploadcomponent = require("./components/media/upload.component");
var UploadMediaComponent = Uploadcomponent.UploadMediaComponent;
var leaderboardcontainer_component_1 = require("./components/reports/leaderboards/leaderboardcontainer.component");
var partition_component_1 = require("./components/reports/leaderboards/partition/partition.component");
var lbexecutivestable_component_1 = require("./components/reports/leaderboards/lbexecutivestable/lbexecutivestable.component");
var lbrefine_component_1 = require("./components/reports/leaderboards/lbrefine/lbrefine.component");
var leaderboard_component_1 = require("./components/reports/leaderboards/leaderboard/leaderboard.component");
var tabnavmenu_component_1 = require("./components/navmenu/tabnavmenu.component");
var dynamicchartformats_component_1 = require("./components/reports/dynamicchartformats/dynamicchartformats.component");
var surveyfeeditemreport_component_1 = require("./components/reports/surveyfeeditemreport.component");
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var quizuserresults_component_1 = require("./components/reports/quizuserresults/quizuserresults.component");
var learnerstat_component_1 = require("./components/reports/leaderboards/learnerstat/learnerstat.component");
var imagefeeditem_component_1 = require("./components/feed/modelforms/imagefeeditem.component");
var videofeeditem_component_1 = require("./components/feed/modelforms/videofeeditem.component");
var editor_component_1 = require("./components/common/editor/editor.component");
var observationfeeditemreport_component_1 = require("./components/reports/observationfeeditemreport.component");
var gaugegraph_component_1 = require("./components/charts/gaugegraph/gaugegraph.component");
var monobargraph_component_1 = require("./components/charts/monobargraph/monobargraph.component");
var datepicker_component_1 = require("./components/common/datepicker/datepicker.component");
var textbox_component_1 = require("./components/common/editor/textbox.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [forms_1.FormsModule, app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            base_component_1.BaseComponent,
            navmenu_component_1.NavMenuComponent,
            navbar_component_1.NavBarComponent,
            tabnavmenu_component_1.TabNavMenuComponent,
            footer_component_1.FooterComponent,
            marketdropdown_component_1.MarketDropdown,
            datepicker_component_1.DatepickerComponent,
            // main naviation items
            counter_component_1.CounterComponent,
            fetchdata_component_1.FetchDataComponent,
            home_component_1.HomeComponent,
            useraccountmanagement_component_1.UserAccountManagementComponent,
            feedindex_component_1.FeedIndexComponent,
            // feed item forms
            feeditemcontainer_component_1.FeedItemContainerComponent,
            feeditemform_component_1.FeedItemForm,
            textfeeditem_component_1.TextFeedItemFormComponent,
            imagefeeditem_component_1.ImageFeedItemFormComponent,
            videofeeditem_component_1.VideoFeedItemFormComponent,
            quizfeeditem_component_1.QuizFeedItemFormComponent,
            surveyfeeditem_component_1.SurveyFeedItemFormComponent,
            observationfeeditem_component_1.ObservationFeedItemFormComponent,
            questionform_component_1.QuestionFormComponent,
            BaseModalComponent,
            // reporting
            feedreportindex_component_1.FeedReportIndexComponent,
            FeedItemReportContainerComponent,
            quizfeeditemreport_component_1.QuizFeedItemReport,
            surveyfeeditemreport_component_1.SurveyFeedItemReport,
            quizuserresults_component_1.QuizUserResultsComponent,
            observationfeeditemreport_component_1.ObservationFeedItemReport,
            learnerstat_component_1.LearnerStatComponent,
            //leaderbaord
            leaderboardcontainer_component_1.LeaderboardContainer,
            leaderboard_component_1.LeaderboardComponent,
            lbexecutivestable_component_1.LbExecutivesTableComponent,
            lbrefine_component_1.LbrefineComponent,
            partition_component_1.PartitionComponent,
            // user management
            EditUser,
            // charts
            BarChart,
            GaugeChart,
            DonutChart,
            dynamicchartformats_component_1.DynamicChartFormatsComponent,
            monobargraph_component_1.MonobarGraphComponent,
            gaugegraph_component_1.GaugeGraphComponent,
            //modals
            FeedItemCopyToMarket,
            //shared
            UserFilter,
            editor_component_1.RichTextEditorComponent,
            textbox_component_1.TextInputComponent,
            UploadMediaComponent
        ],
        imports: [
            angular2_universal_1.UniversalModule,
            ng2_pagination_1.Ng2PaginationModule,
            forms_1.FormsModule,
            ng2_nouislider_1.NouisliderModule,
            forms_1.ReactiveFormsModule,
            ng2_table_1.Ng2TableModule,
            ngx_bootstrap_1.PaginationModule.forRoot(),
            angular2_modal_1.ModalModule.forRoot(),
            bootstrap_1.BootstrapModalModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'counter', component: counter_component_1.CounterComponent },
                { path: 'fetch-data', component: fetchdata_component_1.FetchDataComponent },
                { path: 'useraccountmanagement', component: useraccountmanagement_component_1.UserAccountManagementComponent },
                { path: 'feed/:feedCat', component: feedindex_component_1.FeedIndexComponent },
                { path: 'feed', component: feedindex_component_1.FeedIndexComponent },
                { path: 'feeditem', component: feeditemform_component_1.FeedItemForm },
                { path: 'feeditem/:id', component: feeditemform_component_1.FeedItemForm },
                { path: 'feeditem/:feedCat', component: feeditemform_component_1.FeedItemForm },
                { path: 'reports/leaderboard', component: leaderboardcontainer_component_1.LeaderboardContainer },
                { path: 'reports', component: feedreportindex_component_1.FeedReportIndexComponent },
                { path: 'reports/:feedType', component: feedreportindex_component_1.FeedReportIndexComponent },
                { path: '**', redirectTo: 'home' }
            ])
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map