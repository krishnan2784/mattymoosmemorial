import { Observable } from 'rxjs/Observable';

    getMediaInfo(id): Observable<MediaInfo>;
    uploadFile(file: any, uploadUrl:string): Observable<MediaInfo>;
}