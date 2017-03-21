import * as Enums from "../../enums";

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
}