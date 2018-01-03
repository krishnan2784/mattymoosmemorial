import {Observable} from 'rxjs/Observable';
import {MediaInfo} from "../../models/mediainfoclasses";

export interface IMediaDataService {
    getMediaInfo(id): Observable<MediaInfo>;
    uploadFile(file: any, uploadUrl:string): Observable<MediaInfo>;
}
