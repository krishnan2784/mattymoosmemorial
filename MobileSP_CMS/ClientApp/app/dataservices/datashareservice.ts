import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShareService {
    private pageTitleUpdate = new Subject<string>();
    pageTitleUpdated = this.pageTitleUpdate.asObservable();

    public updatePageTitle(pageTitle: string) {
        this.pageTitleUpdate.next(pageTitle);
    }

    private marketDropdownVisibilitypeUpdate = new Subject<boolean>();
    marketDropdownVisibilitypeUpdated = this.marketDropdownVisibilitypeUpdate.asObservable();

    public updateMarketDropdownVisibility(isMarketDropdownVisible: boolean) {
        this.marketDropdownVisibilitypeUpdate.next(isMarketDropdownVisible);
    }

    private marketIdUpdate = new Subject<number>();
    marketIdUpdated = this.marketIdUpdate.asObservable();

    public updateMarketId(marketId: number) {
        this.marketIdUpdate.next(marketId);
    }
}