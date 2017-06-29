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
//import { CalendarModule } from 'primeng/primeng';
//import { DateValueAccessor } from './classes/datevalueaccessor';
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
var feeditemreport_component_1 = require("./components/reports/feeditemreport.component");
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
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        bootstrap: [app_component_1.AppComponent],
        declarations: [
            app_component_1.AppComponent,
            base_component_1.BaseComponent,
            navmenu_component_1.NavMenuComponent,
            navbar_component_1.NavBarComponent,
            footer_component_1.FooterComponent,
            marketdropdown_component_1.MarketDropdown,
            //DateValueAccessor,
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
            quizfeeditem_component_1.QuizFeedItemFormComponent,
            surveyfeeditem_component_1.SurveyFeedItemFormComponent,
            observationfeeditem_component_1.ObservationFeedItemFormComponent,
            questionform_component_1.QuestionFormComponent,
            BaseModalComponent,
            // reporting
            feedreportindex_component_1.FeedReportIndexComponent,
            FeedItemReportContainerComponent,
            feeditemreport_component_1.FeedItemReport,
            // user management
            EditUser,
            // charts
            BarChart,
            GaugeChart,
            DonutChart,
            //modals
            FeedItemCopyToMarket
        ],
        imports: [
            angular2_universal_1.UniversalModule,
            ng2_pagination_1.Ng2PaginationModule,
            forms_1.FormsModule,
            ng2_nouislider_1.NouisliderModule,
            forms_1.ReactiveFormsModule,
            ng2_table_1.Ng2TableModule,
            ngx_bootstrap_1.PaginationModule.forRoot(),
            //CalendarModule,
            router_1.RouterModule.forRoot([
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: home_component_1.HomeComponent },
                { path: 'counter', component: counter_component_1.CounterComponent },
                { path: 'fetch-data', component: fetchdata_component_1.FetchDataComponent },
                { path: 'useraccountmanagement', component: useraccountmanagement_component_1.UserAccountManagementComponent },
                { path: ':feedCat/feed', component: feedindex_component_1.FeedIndexComponent },
                { path: 'feed', component: feedindex_component_1.FeedIndexComponent },
                { path: 'feeditem', component: feeditemform_component_1.FeedItemForm },
                { path: 'feeditem/:id', component: feeditemform_component_1.FeedItemForm },
                { path: ':feedCat/feeditem', component: feeditemform_component_1.FeedItemForm },
                { path: 'reports/:feedType', component: feedreportindex_component_1.FeedReportIndexComponent },
                { path: '**', redirectTo: 'home' }
            ])
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map