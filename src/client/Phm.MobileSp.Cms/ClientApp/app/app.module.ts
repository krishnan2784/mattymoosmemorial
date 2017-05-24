import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { CalendarModule } from 'primeng/primeng';
//import { DateValueAccessor } from './classes/datevalueaccessor';

import { Observable } from 'rxjs/Observable';
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
import { UserAccountManagementComponent } from './components/useraccountmanagement/useraccountmanagement.component';
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

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        BaseComponent,
        NavMenuComponent,
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

        //modals
        FeedItemCopyToMarket
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2PaginationModule,
        FormsModule,
        ReactiveFormsModule,
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
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
