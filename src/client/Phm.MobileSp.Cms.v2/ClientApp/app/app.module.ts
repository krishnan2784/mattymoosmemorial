import { NgModule, Inject } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { HttpModule, Http } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ColorPickerModule } from 'ngx-color-picker';

import { NotFoundComponent } from './containers/not-found/not-found.component';
import { TermsAndConditionsIndexComponent } from './containers/competitions/index/termsandconditionsindex/termsandconditionsindex.component';
import {AppComponent} from "./app.component";
import {BaseComponent} from "./containers/base.component";
import {NavMenuComponent} from "./components/navigation/navmenu/navmenu.component";
import {FormNavBarComponent} from "./components/common/form/formnavbar/formnavbar.component";
import {FormButtons} from "./components/common/form/formbuttons/formbuttons.component";
import {TabNavMenuComponent} from "./components/navigation/tabbednavmenu/tabnavmenu.component";
import {FooterComponent} from "./components/footer/footer.component";
import {MarketDropdown} from "./components/marketdropdown/marketdropdown.component";
import {DatepickerComponent} from "./components/common/datepicker/datepicker.component";
import {CounterComponent} from "./containers/_templateBackup/counter/counter.component";
import {HomeComponent} from "./containers/home/home.component";
import {UserAccountManagementComponent} from "./containers/accountmanagement/index/useraccountmanagement.component";
import {FeedIndexComponent} from "./containers/feed/index/feedindex.component";
import {BrandingContainerComponent} from "./containers/branding/brandingcontainer.component";
import {BrandingContentSectionComponent} from
  "./components/branding/brandingcontentsection/brandingcontentsection.component";
import {BaseBrandingComponent} from "./components/branding/basebrandingcomponent/basebrandingcomponent.component";
import {UserGroupPermissionsIndexComponent} from "./containers/accountmanagement/acl/index/usergroupindex.component";
import {CompetitionIndexComponent} from "./containers/competitions/index/competitionsindex/competitionsindex.component";
import {RewardSchemeIndexComponent} from
  "./containers/competitions/index/rewardschemesindex/rewardschemesindex.component";
import {FeedItemForm} from "./components/feed/forms/feeditemform.component";
import {TextFeedItemFormComponent} from "./components/feed/forms/textfeed/textfeeditem.component";
import {ImageFeedItemFormComponent} from "./components/feed/forms/imagefeed/imagefeeditem.component";
import {VideoFeedItemFormComponent} from "./components/feed/forms/videofeed/videofeeditem.component";
import {QuizFeedItemFormComponent} from "./components/feed/forms/questionfeed/quizfeed/quizfeeditem.component";
import {SurveyFeedItemFormComponent} from "./components/feed/forms/questionfeed/surveyfeed/surveyfeeditem.component";
import {ObservationFeedItemFormComponent} from
  "./components/feed/forms/questionfeed/observationfeed/observationfeeditem.component";
import {QuestionFormComponent} from "./components/feed/forms/questionfeed/questionform.component";
import {PagedFeedItemFormComponent} from "./components/feed/forms/pagedfeed/pagedfeeditem/pagedfeeditem.component";
import {BodyTextPageFormComponent} from
  "./components/feed/forms/pagedfeed/pageforms/bodytextpageform/bodytextpageform.component";
import {MediaPageFormComponent} from
  "./components/feed/forms/pagedfeed/pageforms/mediapageform/mediapageform.component";
import {TabbedTextPageFormComponent} from
  "./components/feed/forms/pagedfeed/pageforms/tabbedtextpageform/tabbedtextpageform.component";
import {BaseModalComponent} from "./components/modals/basemodal/basemodal.component";
import {FeedReportIndexComponent} from "./containers/reports/index/feedreportindex.component";
import {FeedItemReportContainerComponent} from "./components/reports/basefeeditemreport/basefeeditemreport.component";
import {QuizFeedItemReport} from "./components/reports/quizfeedreport/quizfeeditemreport.component";
import {SurveyFeedItemReport} from "./components/reports/surveyfeedreport/surveyfeeditemreport.component";
import {QuizUserResultsComponent} from "./components/reports/quizuserresults/quizuserresults.component";
import {ObservationFeedItemReport} from
  "./components/reports/observationfeedreport/observationfeeditemreport.component";
import {LeaderboardContainer} from "./containers/reports/leaderboard/leaderboardcontainer.component";
import {CompetitionForm} from "./components/competitions/forms/competitionform/competitionform.component";
import {RewardSchemeForm} from "./components/competitions/forms/rewardschemeform/rewardschemeform.component";
import {TermsAndConditionForm} from
  "./components/competitions/forms/termsandconditionsform/termsandconditionsform.component";
import {EditUser} from "./components/accountmanagement/modals/edituser/edituser.component";
import {EditEntityPermissionsListComponent} from
  "./components/accountmanagement/acl/editentitypermissionslist/editentitypermissionslist.component";
import {EditUserGroupComponent} from
  "./components/accountmanagement/acl/editusergrouppermissions/editusergrouppermissions.component";
import {EditUserPermissionsComponent} from
  "./components/accountmanagement/acl/edituserpermissions/edituserpermissions.component";
import {BarChart} from "./components/charts/barchart/barchart.component";
import {GaugeChart} from "./components/charts/gaugechart/gaugechart.component";
import {DonutChart} from "./components/charts/donutchart/donutchart.component";
import {DynamicChartFormatsComponent} from "./components/reports/dynamicchartformats/dynamicchartformats.component";
import {MonobarGraphComponent} from "./components/charts/monobargraph/monobargraph.component";
import {GaugeGraphComponent} from "./components/charts/gaugegraph/gaugegraph.component";
import {CopyToMarket} from "./components/modals/copytomarket/copytomarket.component";
import {UserFilter} from "./components/common/filters/userfilter/userfilter.component";
import {RichTextEditorComponent} from "./components/common/editor/richtexteditor/richtexteditor.component";
import {TextAreaComponent} from "./components/common/editor/textarea/textarea.component";
import {TextInputComponent} from "./components/common/editor/textbox/textbox.component";
import {NumberTextInputComponent} from "./components/common/editor/numbertextbox/numbertextbox.component";
import {SelectListComponent} from "./components/common/editor/selectlist/selectlist.component";
import {DateRangeComponent} from "./components/common/editor/daterange/daterange.component";
import {CallToActionComponent} from "./components/common/editor/calltoaction/calltoaction.component";
import {TagInputComponent} from "./components/common/editor/taginputbox/taginputbox.component";
import {ColourPickerInputComponent} from "./components/common/editor/colourpicker/colourpicker.component";
import {FontPickerComponent} from "./components/common/editor/fontpicker/fontpicker.component";
import {BrandingOptionPickerComponent} from "./components/branding/brandingoptionpicker/brandingoptionpicker.component";
import {UploadMediaComponent} from "./components/media/upload.component";
import {OrderBy} from "./classes/orderBy";
import {GenericFilterComponent} from "./components/common/filters/generic/genericfilter.component";
import {TransferHttpModule} from "../modules/transfer-http/transfer-http.module";
import {LinkService} from "./shared/services/link.service";
import {FeedDataService} from "./shared/services/feeddataservice";
import {MarketDataService} from "./shared/services/marketdataservice";
import {ShareService} from "./shared/services/helpers/shareservice";
import {UserDataService} from "./shared/services/userdataservice";
import {MediaDataService} from "./shared/services/mediaservice";
import {PermissionService} from "./shared/services/helpers/permissionservice";
import {AlertService} from "./shared/services/helpers/alertservice";
import {FeedItemCopyToMarket} from "./components/feed/modals/copytomarket/copytomarket.component";
import {FeedItemDelete} from "./components/feed/modals/deletefeeditem/deletefeeditem.component";
import {FeedItemPublish} from "./components/feed/modals/publishfeeditem/publishfeeditem.component";
import {UserDelete} from "./components/accountmanagement/modals/deleteuser/deleteuser.component";
import { MatRadioModule, MatButtonModule, MatDialogModule, MatInputModule, MatSnackBarModule,
  MatCheckboxModule, MatSlideToggleModule, MatMenuModule, MatSelectModule,
  MatAutocompleteModule, MatTableModule, } from '@angular/material';
import {LearnerStatComponent} from "./components/reports/leaderboards/learnerstat/learnerstat.component";
import {LeaderboardComponent} from "./components/reports/leaderboards/leaderboard/leaderboard.component";
import {LbExecutivesTableComponent} from
  "./components/reports/leaderboards/lbexecutivestable/lbexecutivestable.component";
import {LbrefineComponent} from "./components/reports/leaderboards/lbrefine/lbrefine.component";
import {PartitionComponent} from "./components/reports/leaderboards/partition/partition.component";
import {DeleteModel} from "./components/modals/deletemodel/deletemodel.component";
import {CompetitionPublish} from "./components/competitions/modals/publishcompetition/publishcompetition.component";
import {BrandingService} from "./shared/services/brandingservice";
import {EntityPermissionDataService} from "./shared/services/entitypermissiondataservice";
import {SecurityFeatureDataService} from "./shared/services/securityfeaturedataservice";
import {UserGroupPermissionDataService} from "./shared/services/usergrouppermissiondataservice";
import {CompetitionsDataService} from "./shared/services/competitionsdataservice";
import {TermsAndConditionsDataService} from "./shared/services/termsandconditionsdataservice";
import {RewardSchemesDataService} from "./shared/services/rewardschemedataservice";
import {CompetitionSubsetsDataService} from "./shared/services/competitionsubsetdataservice";
import {UserFeaturePermissionsDataService} from "./shared/services/userfeaturepermissionsdataservice";

// i18n support
//import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';


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
    FormNavBarComponent,
    FormButtons,
    TabNavMenuComponent,
    FooterComponent,
    MarketDropdown,
    DatepickerComponent,
    NotFoundComponent,

    // main naviation items
    CounterComponent,
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
    CopyToMarket,
    FeedItemDelete,
    FeedItemPublish,
    UserDelete,
    DeleteModel,
    CompetitionPublish,

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
      CommonModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      TransferHttpModule,
      // Our Http TransferData method
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
      ColorPickerModule,

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
          { path: 'home', component: HomeComponent },
          { path: 'counter', component: CounterComponent },
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
          }],
          {
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
        PermissionService,
      AlertService,
      BrandingService,
      EntityPermissionDataService, SecurityFeatureDataService,
      UserGroupPermissionDataService, CompetitionsDataService, TermsAndConditionsDataService,
      RewardSchemesDataService, CompetitionSubsetsDataService, UserFeaturePermissionsDataService
    ],
    entryComponents: [
      CopyToMarket,
      FeedItemDelete,
      FeedItemPublish,
      UserDelete,
      EditUser,
      DeleteModel,
      CompetitionPublish
    ]
})
export class AppModuleShared {
}
