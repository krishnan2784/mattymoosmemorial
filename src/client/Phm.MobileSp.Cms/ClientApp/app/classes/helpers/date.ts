import Number1 = require("./number");
import NumberEx = Number1.NumberEx;

export class DateEx {
    public static formatDate(date) {
        if (!date)
            date = new Date();
        return date.getFullYear() + "-" + NumberEx.pad((date.getMonth() + 1), 2) + "-" + NumberEx.pad(date.getDate(), 2);
    }
}