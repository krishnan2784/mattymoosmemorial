"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var angular2_universal_1 = require("angular2-universal");
var ng2_pagination_1 = require("ng2-pagination");
var forms_1 = require("@angular/forms");
//import { CalendarModule } from 'primeng/primeng';
var datevalueaccessor_1 = require("./classes/datevalueaccessor");
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
var useraccountmanagement_component_1 = require("./components/useraccountmanagement/useraccountmanagement.component");
var textfeeditem_component_1 = require("./components/feed/modelforms/textfeeditem.component");
var feedindex_component_1 = require("./components/feed/indexes/feedindex.component");
var feeditemform_component_1 = require("./components/feed/modelforms/feeditemform.component");
var feeditemcontainer_component_1 = require("./components/feed/modelforms/feeditemcontainer.component");
var quizfeeditem_component_1 = require("./components/feed/modelforms/quizfeeditem.component");
var surveyfeeditem_component_1 = require("./components/feed/modelforms/surveyfeeditem.component");
var questionform_component_1 = require("./components/feed/modelforms/questionform.component");
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
            footer_component_1.FooterComponent,
            marketdropdown_component_1.MarketDropdown,
            datevalueaccessor_1.DateValueAccessor,
            counter_component_1.CounterComponent,
            fetchdata_component_1.FetchDataComponent,
            home_component_1.HomeComponent,
            useraccountmanagement_component_1.UserAccountManagementComponent,
            feedindex_component_1.FeedIndexComponent,
            feeditemcontainer_component_1.FeedItemContainerComponent,
            feeditemform_component_1.FeedItemForm,
            textfeeditem_component_1.TextFeedItemFormComponent,
            quizfeeditem_component_1.QuizFeedItemFormComponent,
            surveyfeeditem_component_1.SurveyFeedItemFormComponent,
            questionform_component_1.QuestionFormComponent
        ],
        imports: [
            angular2_universal_1.UniversalModule,
            ng2_pagination_1.Ng2PaginationModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
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
                { path: '**', redirectTo: 'home' }
            ])
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map