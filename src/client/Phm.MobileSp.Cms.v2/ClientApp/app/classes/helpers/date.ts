import { NumberEx } from "./number";

export class DateEx {
    public static formatDate(date, format="yyyy-MM-dd") {
        if (!date)
            date = new Date();
        let dateString = '';
        for (var i = 0; i < format.length; i++) {
            let firstchar = format.charAt(i);
            if (firstchar === '/' || firstchar === ':' || firstchar === '-' || firstchar === ' ') {
                dateString = dateString + firstchar;
            } else if (format.length >= i + 1) {
                if (firstchar === format.charAt(i+1)) {
                    let firstTwoChars = firstchar + format.charAt(i + 1);

                    if (format.length < i + 4 || firstchar !== format.charAt(i + 3) || firstchar !== format.charAt(i + 2)) {
                        switch (firstTwoChars) {
                            case 'MM':
                                dateString = dateString + NumberEx.pad((date.getMonth() + 1), 2);
                                break;
                            case 'dd':
                                dateString = dateString + NumberEx.pad(date.getDate(), 2);
                                break;
                            case 'yy':
                                dateString = dateString + (date.getYear() + 1900);
                                break;
                        }
                        i = i + 1;
                        continue;
                    } else {
                        let firstFourChars = firstTwoChars + firstTwoChars;

                        switch (firstFourChars) {
                            case 'yyyy' || 'YYYY':
                                dateString = dateString + date.getFullYear();
                            break;
                        }
                        i = i + 3;
                        continue;
                    }
                } 
            }
        }
        return dateString;
    }
}