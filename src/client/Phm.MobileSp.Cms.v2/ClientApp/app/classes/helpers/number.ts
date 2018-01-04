export class NumberEx {
    public static pad(num, size: number, character: string = "0", padLeft = true) {
        var s = num + "";
        if (padLeft)
            while (s.length < size)
                s = character + s;
        else 
            while (s.length < size)
                s = s + character;
        return s;
	}
}