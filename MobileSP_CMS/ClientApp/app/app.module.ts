import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { Ng2PaginationModule } from 'ng2-pagination';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { FooterComponent } from './components/navmenu/footer.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { TestComponent } from './components/test/test.component';
import { UserAccountManagementComponent } from './components/useraccountmanagement/useraccountmanagement.component';
import { FeedIndexComponent } from './components/feed/feedindex.component';
import { LearningIndexComponent } from './components/feed/learning/learningindex.component';
import { CreateLearningItemFormComponent } from './components/feed/learning/createlearningfeeditem.component';

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        FooterComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        TestComponent,
        UserAccountManagementComponent,
        FeedIndexComponent,
        LearningIndexComponent,
        CreateLearningItemFormComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        Ng2PaginationModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'test', component: TestComponent },
            { path: 'useraccountmanagement', component: UserAccountManagementComponent },
            { path: 'feed', component: FeedIndexComponent },
            { path: 'learning', component: LearningIndexComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModule {
}
