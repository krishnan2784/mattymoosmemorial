export class StringEx {
    public static getSearchString(searchString : string) : string {
        return searchString.split(' ').join('.*').toLowerCase();
    }

    public static searchString(searchString: string, searchableString: string) : boolean {
        searchString = this.getSearchString(searchString);
      return searchableString.toLowerCase().search(searchString) < 0;
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

    public static sortArray(array: any[], fields: string[]): any[] {
      array.sort(function (a, b) {
        for (let i = 0; i < fields.length; i++) {
          if (a[fields[i]] == b[fields[i]])
            continue;
          if (Number.isInteger(a[fields[i]])) {
            if (a[fields[i]] < b[fields[i]]) return -1;
            if (a[fields[i]] > b[fields[i]]) return 1;
          } else {
            var aLower = a[fields[i]].toLowerCase(),
              bLower = b[fields[i]].toLowerCase();
            if (aLower > bLower) return -1;
            if (aLower < bLower) return 1;
          }
        }
        return 0;
      });
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