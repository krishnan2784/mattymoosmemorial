import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { D3Service } from 'd3-ng2-service';
import { NouisliderModule } from 'ng2-nouislider';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ngx-bootstrap';
import { MaterializeModule } from 'angular2-materialize';
//import { CalendarModule } from 'primeng/primeng';
//import { DateValueAccessor } from './classes/datevalueaccessor';

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
import { FeedItemContainerComponent } from "./components/feed/modelforms/feeditemcontainer.component";

import { QuizFeedItemFormComponent } from "./components/feed/modelforms/quizfeeditem.component";
import { SurveyFeedItemFormComponent } from "./components/feed/modelforms/surveyfeeditem.component";
import { ObservationFeedItemFormComponent } from "./components/feed/modelforms/observationfeeditem.component";
import { QuestionFormComponent } from "./components/feed/modelforms/questionform.component";
import Basemodalcomponent = require("./components/modals/basemodal.component");
import BaseModalComponent = Basemodalcomponent.BaseModalComponent;
import Copytomarketcomponent = require("./components/feed/modals/copytomarket.component");
import FeedItemCopyToMarket = Copytomarketcomponent.FeedItemCopyToMarket;
import { FeedReportIndexComponent } from "./components/reports/indexes/feedreportindex.component";
import { FeedItemReport } from "./components/reports/feeditemreport.component";
import Barchartcomponent = require("./components/charts/barchart.component");
import BarChart = Barchartcomponent.BarChart;
import Basefeeditemreportcomponent = require("./components/reports/basefeeditemreport.component");
import FeedItemReportContainerComponent = Basefeeditemreportcomponent.FeedItemReportContainerComponent;
import Gaugechartcomponent = require("./components/charts/gaugechart.component");
import GaugeChart = Gaugechartcomponent.GaugeChart;
import Donutchartcomponent = require("./components/charts/donutchart.component");
import { NavBarComponent } from "./components/navbar/navbar.component";
import DonutChart = Donutchartcomponent.DonutChart;
import Editusercomponent = require("./components/accountmanagement/modals/edituser.component");
import EditUser = Editusercomponent.EditUser;

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        BaseComponent,
        NavMenuComponent,
        NavBarComponent,
        FooterComponent,
        MarketDropdown,
        //DateValueAccessor,

        // main naviation items
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        UserAccountManagementComponent,
        FeedIndexComponent,

        // feed item forms
        FeedItemContainerComponent,
        FeedItemForm,
        TextFeedItemFormComponent,
        QuizFeedItemFormComponent,
        SurveyFeedItemFormComponent,
        ObservationFeedItemFormComponent,
        QuestionFormComponent,
        BaseModalComponent,

        // reporting
        FeedReportIndexComponent,
        FeedItemReportContainerComponent,
        FeedItemReport,

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
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2PaginationModule,
        FormsModule,
        NouisliderModule,
        ReactiveFormsModule,
        Ng2TableModule,
        PaginationModule.forRoot(),
        //CalendarModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'useraccountmanagement', component: UserAccountManagementComponent },
            { path: ':feedCat/feed', component: FeedIndexComponent },
            { path: 'feed', component: FeedIndexComponent },
            { path: 'feeditem', component: FeedItemForm },
            { path: 'feeditem/:id', component: FeedItemForm },
            { path: ':feedCat/feeditem', component: FeedItemForm },
            { path: 'reports/:feedType', component: FeedReportIndexComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
