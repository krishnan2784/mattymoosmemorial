"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringEx = (function () {
    function StringEx() {
    }
    StringEx.getSearchString = function (searchString) {
        return searchString.split(' ').join('.*').toLowerCase();
    };
    StringEx.searchString = function (searchString, searchableString) {
        searchString = this.getSearchString(searchString);
        return searchableString.toLowerCase().search(searchString) < 0;
    };
    StringEx.searchArray = function (searchString, array, fields) {
        var _this = this;
        searchString = this.getSearchString(searchString);
        var _loop_1 = function (i) {
            var searchableText = fields.map(function (x) { return _this.getSearchableChildObject(array[i], x); }).join().toLowerCase();
            if (searchableText.search(searchString) < 0) {
                array.splice(i, 1);
                i--;
            }
            out_i_1 = i;
        };
        var out_i_1;
        for (var i = 0; i < array.length; i++) {
            _loop_1(i);
            i = out_i_1;
        }
        return array;
    };
    StringEx.getSearchableChildObject = function (o, s) {
        s = s.replace(/\[(\w+)\]/g, '.$1');
        s = s.replace(/^\./, '');
        var a = s.split('.');
        for (var i = 0, n = a.length; i < n; ++i) {
            var k = a[i];
            if (k in o) {
                o = o[k];
            }
            else {
                return;
            }
        }
        return o;
    };
    return StringEx;
}());
exports.StringEx = StringEx;
//# sourceMappingURL=string.js.map