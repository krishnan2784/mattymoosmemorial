export interface IMarketContentService {
	  getMarketsByContentId(contentId);
    copyContentToMarket(id: number, marketIds: number[]);
    publishContentToLive(contentId: number);
}
