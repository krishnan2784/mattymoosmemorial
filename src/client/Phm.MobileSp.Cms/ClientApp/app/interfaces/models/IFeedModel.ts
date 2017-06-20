import Enums = require("../../enums");
import Corporateappclasses = require("../../models/corporateappclasses");
import CorporateApp = Corporateappclasses.CorporateApp;

export interface IFeedItem {
    id: number;
    title: string;
    feedType: Enums.FeedTypeEnum;
    feedCategory: Enums.FeedCategoryEnum;
    points: number;
    enabled: boolean;
    published: boolean;
    marketId: string;
    createdAt: Date;
    allowFavourite : boolean;
    corporateApp: CorporateApp;
    legalInformation: string;
    makeTitleWidgetLink: boolean;
    permissions: number;
    readingTime: number;
    startDate: Date;
    endDate: Date;
    publishedLiveAt: Date;
    shortDescription: string;
}