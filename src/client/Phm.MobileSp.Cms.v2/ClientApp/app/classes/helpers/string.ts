export class StringEx {
    public static getSearchString(searchString : string) : string {
        return searchString.split(' ').join('.*').toLowerCase();
    }

    public static searchString(searchString: string, searchableString: string) : boolean {
        searchString = this.getSearchString(searchString);
        return searchableString.toLowerCase().search(searchString) < 0
    }

    public static searchArray(searchString : string, array: any[], fields: string[]) : any[] {
        searchString = this.getSearchString(searchString);
        for (let i = 0; i < array.length; i++) {
            let searchableText = fields.map(x => this.getSearchableChildObject(array[i], x)).join().toLowerCase();
            if (searchableText.search(searchString) < 0) {
                array.splice(i, 1);
                i--;
            }
        }
        return array;
    }

    public static getSearchableChildObject(o, s): object {
        s = s.replace(/\[(\w+)\]/g, '.$1'); 
        s = s.replace(/^\./, '');   
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            } else {
                return;
            }
        }
        return o;
    }
}