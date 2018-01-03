import { NgModule, Inject } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

// i18n support
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {AppComponent} from "./app.component";
import {BaseComponent} from "./containers/base.component";
import {NavBarComponent} from "./components/navbar/navbar.component";
import {TabNavMenuComponent} from "./components/container/tabbednavmenu/tabnavmenu.component";
import {FooterComponent} from "./components/container/footer/footer.component";
import {MarketDropdown} from "./components/marketdropdown/marketdropdown.component";
import {DatepickerComponent} from "./components/formcontrols/datepicker/datepicker.component";
import {HomeComponent} from "./containers/home/home.component";
import {UserAccountManagementComponent} from "./containers/accountmanagement/index/useraccountmanagement.component";
import {FeedIndexComponent} from "./containers/feed/index/feedindex.component";
import {FeedItemForm} from "./components/feed/forms/feeditemform.component";
import {TextFeedItemFormComponent} from "./components/feed/forms/textfeed/textfeeditem.component";
import {ImageFeedItemFormComponent} from "./components/feed/forms/imagefeed/imagefeeditem.component";
import {VideoFeedItemFormComponent} from "./components/feed/forms/videofeed/videofeeditem.component";
import {QuizFeedItemFormComponent} from "./components/feed/forms/questionfeed/quizfeed/quizfeeditem.component";
import {SurveyFeedItemFormComponent} from "./components/feed/forms/questionfeed/surveyfeed/surveyfeeditem.component";
import {ObservationFeedItemFormComponent} from
  "./components/feed/forms/questionfeed/observationfeed/observationfeeditem.component";
import {QuestionFormComponent} from "./components/feed/forms/questionfeed/questionform.component";
import {PagedFeedItemFormComponent} from "./components/feed/forms/pagedfeed/pagedfeeditem.component";
import {BodyTextPageFormComponent} from "./components/feed/forms/pagedfeed/bodytextpageform.component";
import {MediaPageFormComponent} from "./components/feed/forms/pagedfeed/mediapageform.component";
import {TabbedTextPageFormComponent} from "./components/feed/forms/pagedfeed/tabbedtextpageform.component";
import {FeedReportIndexComponent} from "./containers/reports/index/feedreportindex.component";
import {FeedItemReportContainerComponent} from "./components/reports/basefeeditemreport/basefeeditemreport.component";
import {QuizFeedItemReport} from "./components/reports/quizfeedreport/quizfeeditemreport.component";
import {SurveyFeedItemReport} from "./components/reports/surveyfeedreport/surveyfeeditemreport.component";
import {QuizUserResultsComponent} from "./components/reports/quizuserresults/quizuserresults.component";
import {ObservationFeedItemReport} from
  "./components/reports/observationfeedreport/observationfeeditemreport.component";
import {LearnerStatComponent} from "./components/leaderboard/learnerstat/learnerstat.component";
import {LeaderboardContainer} from "./containers/reports/leaderboard/leaderboardcontainer.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard/leaderboard.component";
import {LbExecutivesTableComponent} from "./components/leaderboard/lbexecutivestable/lbexecutivestable.component";
import {LbrefineComponent} from "./components/leaderboard/lbrefine/lbrefine.component";
import {PartitionComponent} from "./components/leaderboard/partition/partition.component";
import {EditUser} from "./components/accountmanagement/modals/edituser/edituser.component";
import {BarChart} from "./components/charts/barchart/barchart.component";
import {GaugeChart} from "./components/charts/gaugechart/gaugechart.component";
import {DonutChart} from "./components/charts/donutchart/donutchart.component";
import {DynamicChartFormatsComponent} from "./components/reports/dynamicchartformats/dynamicchartformats.component";
import {MonobarGraphComponent} from "./components/charts/monobargraph/monobargraph.component";
import {GaugeGraphComponent} from "./components/charts/gaugegraph/gaugegraph.component";
import {FeedItemCopyToMarket} from "./components/feed/modals/copytomarket/copytomarket.component";
import {UserFilter} from "./components/filters/userfilter.component";
import {RichTextEditorComponent} from "./components/formcontrols/editor/richtexteditor.component";
import {TextAreaComponent} from "./components/formcontrols/editor/textarea.component";
import {TextInputComponent} from "./components/formcontrols/editor/textbox.component";
import {NumberTextInputComponent} from "./components/formcontrols/editor/numbertextbox.component";
import {TagInputComponent} from "./components/formcontrols/editor/taginputbox.component";
import {UploadMediaComponent} from "./components/media/upload.component";
import {TransferHttpModule} from "../modules/transfer-http/transfer-http.module";
import {NotFoundComponent} from "./containers/_templateBackup/not-found/not-found.component";
import {LinkService} from "./shared/services/link.service";
import {FeedDataService} from "./shared/services/feeddataservice";
import {MarketDataService} from "./shared/services/marketdataservice";
import {ShareService} from "./shared/services/helpers/shareservice";
import {UserDataService} from "./shared/services/userdataservice";
import {MediaDataService} from "./shared/services/mediaservice";
import {NavMenuComponent} from "./components/container/navmenu/navmenu.component";
import {ORIGIN_URL} from "./shared/constants/baseurl.constants";
import { MatDialogModule, MatInputModule, MatCheckboxModule, MatSlideToggleModule, MatRadioModule, MatButtonModule, MatSnackBarModule, MatMenuModule, MatSelectModule, MatAutocompleteModule, MatTableModule } from '@angular/material';
import {FeedItemDelete} from "./components/feed/modals/deletefeeditem/deletefeeditem.component";
import {FeedItemPublish} from "./components/feed/modals/publishfeeditem/publishfeeditem.component";
import {UserDelete} from "./components/accountmanagement/modals/deleteuser/deleteuser.component";
import {AlertService} from "./shared/services/helpers/alertservice";
import { BaseModalComponent } from './components/modals/basemodal/basemodal.component';

//export function createTranslateLoader(http: Http, baseHref) {
//    // Temporary Azure hack
//    if (baseHref === null && typeof window !== 'undefined') {
//        baseHref = window.location.origin;
//    }
//    // i18n files are in `wwwroot/assets/`
//    return new TranslateHttpLoader(http, `${baseHref}/assets/i18n/`, '.json');
//}

@NgModule({
    declarations: [
        AppComponent,
      BaseComponent,
      NavMenuComponent,
      NavBarComponent,
      TabNavMenuComponent,
      FooterComponent,
      MarketDropdown,
      DatepickerComponent,
      NotFoundComponent,

      // main naviation items
      HomeComponent,
      UserAccountManagementComponent,
      FeedIndexComponent,

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
      
      // charts
      BarChart,
      GaugeChart,
      DonutChart,
      DynamicChartFormatsComponent,
      MonobarGraphComponent,
      GaugeGraphComponent,

      //modals
      FeedItemCopyToMarket,
      FeedItemDelete,
      FeedItemPublish,
      UserDelete,
      EditUser,

      //shared
      UserFilter,
      RichTextEditorComponent,
      TextAreaComponent,
      TextInputComponent,
      NumberTextInputComponent,
      TagInputComponent,
      BaseModalComponent,
      UploadMediaComponent
    ],
    imports: [
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      TransferHttpModule, // Our Http TransferData method
        // i18n support
      //  TranslateModule.forRoot({
      //      loader: {
      //          provide: TranslateLoader,
      //          useFactory: (createTranslateLoader),
      //          deps: [Http, [ORIGIN_URL]]
      //      }
      //}),

      //Ng2PaginationModule,
      //NouisliderModule,
      //Ng2TableModule,
      //PaginationModule.forRoot(),

      NgxPaginationModule,

      // material
      MatButtonModule,
      MatDialogModule,
      MatInputModule,
      MatSnackBarModule,
      MatCheckboxModule,
      MatRadioModule,
      MatSlideToggleModule,
      MatMenuModule,
      MatSelectModule,
      MatAutocompleteModule,
      MatTableModule,

        // App Routing
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
              path: 'home', component: HomeComponent,
              // *** SEO Magic ***
              // We're using "data" in our Routes to pass in our <title> <meta> <link> tag information
              // Note: This is only happening for ROOT level Routes, you'd have to add some additional logic if you wanted this for Child level routing
              // When you change Routes it will automatically append these to your document for you on the Server-side
              //  - check out app.component.ts to see how it's doing this
              data: {
                title: 'Homepage',
                meta: [{ name: 'description', content: 'This is an example Description Meta tag!' }],
                links: [
                  { rel: 'canonical', href: 'http://blogs.example.com/blah/nice' },
                  { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/' }
                ]
              }
            },
            { path: 'useraccountmanagement', component: UserAccountManagementComponent },
            { path: 'feed/:feedCat', component: FeedIndexComponent },
            { path: 'feed', component: FeedIndexComponent },
            { path: 'feeditem', component: FeedItemForm },
            { path: 'feeditem/:id', component: FeedItemForm },
            { path: 'feeditem/:feedCat', component: FeedItemForm },
            { path: 'reports/leaderboard', component: LeaderboardContainer },
            { path: 'reports', component: FeedReportIndexComponent },
            { path: 'reports/:feedType', component: FeedReportIndexComponent },
            {
              path: '**', component: NotFoundComponent,
              data: {
                title: '404 - Not found',
                meta: [{ name: 'description', content: '404 - Error' }],
                links: [
                  { rel: 'canonical', href: 'http://blogs.example.com/bootstrap/something' },
                  { rel: 'alternate', hreflang: 'es', href: 'http://es.example.com/bootstrap-demo' }
                ]
              }
            }], {
          // Router options
          useHash: false,
          preloadingStrategy: PreloadAllModules,
          initialNavigation: 'enabled'
        })
    ],
    exports: [
      ReactiveFormsModule
    ],
    providers: [
        LinkService,
        //TranslateModule,
        FeedDataService,
        MarketDataService,
        ShareService,
        UserDataService,
        MediaDataService,
        AlertService
    ],
    entryComponents: [
      FeedItemCopyToMarket,
      FeedItemDelete,
      FeedItemPublish,
      UserDelete,
      EditUser
    ]
})
export class AppModuleShared {
}
