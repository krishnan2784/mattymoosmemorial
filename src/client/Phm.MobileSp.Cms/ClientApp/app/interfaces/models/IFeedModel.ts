import Enums = require("../../enums");
import Corporateappclasses = require("../../models/corporateappclasses");
import { MediaInfo } from "../../models/mediainfoclasses";
import CorporateApp = Corporateappclasses.CorporateApp;

export interface IFeedItem {
    id: number;
    title: string;
    feedType: Enums.FeedTypeEnum;
    feedCategory: Enums.FeedCategoryEnum;
    points: number;
    mainIcon: MediaInfo;
    mainIconId: number;
    enabled: boolean;
    published: boolean;
    marketId: string;
    createdAt: string;
    allowFavourite : boolean;
    corporateApp: CorporateApp;
    legalInformation: string;
    makeTitleWidgetLink: boolean;
    permissions: number;
    readingTime: number;
    startDate: string;
    endDate: string;
    publishedLiveAt: Date;
    shortDescription: string;
    webUrlLink: string;
    callToActionText: string;
	callToActionUrl: string;
	competitionId: number;
}