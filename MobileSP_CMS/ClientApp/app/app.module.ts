import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { FooterComponent } from './components/navmenu/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { UserAccountManagementComponent } from './components/useraccountmanagement/useraccountmanagement.component';
import { TextFeedItemFormComponent } from './components/feed/modelforms/textfeeditem.component';
import {CreateFeedTypeSelectorComponent} from "./components/feed/createfeedtype.component";
import { FeedIndexComponent } from "./components/feed/indexes/feedindex.component";
import {LearningIndexComponent} from "./components/feed/indexes/learningindex.component";
import {FeedItemForm} from "./components/feed/modelforms/feeditemform.component";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        FooterComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        UserAccountManagementComponent,

        FeedIndexComponent,
        LearningIndexComponent,

        CreateFeedTypeSelectorComponent,

        FeedItemForm,
        TextFeedItemFormComponent
        
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2PaginationModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'useraccountmanagement', component: UserAccountManagementComponent },
            { path: 'feed', component: FeedIndexComponent },
            { path: 'learning', component: LearningIndexComponent },
            { path: 'createfeeditem', component: CreateFeedTypeSelectorComponent },
            { path: 'textfeeditem', component: TextFeedItemFormComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
