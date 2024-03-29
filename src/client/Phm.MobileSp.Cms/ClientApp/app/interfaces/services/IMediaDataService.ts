﻿import {Observable} from 'rxjs/Observable';
import Enums = require("../../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import Marketclasses = require("../../models/marketclasses");
import Market = Marketclasses.Market;
import Mediainfoclasses = require("../../models/mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;

export interface IMediaDataService {
    getMediaInfo(id): Observable<MediaInfo>;
    uploadFile(file: any, uploadUrl:string): Observable<MediaInfo>;
}