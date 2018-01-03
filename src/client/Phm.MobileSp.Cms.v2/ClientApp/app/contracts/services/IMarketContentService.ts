export interface IMarketContentService {
    copyItemToMarket(id: number, marketIds: number[]);
    publishContentToLive(contentId: number);
}
