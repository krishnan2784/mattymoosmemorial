import Enums = require("../../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;

export interface IMarketContentService {
    copyItemToMarket(id: number, marketIds: number[]);
    publishContentToLive(contentId: number);
}