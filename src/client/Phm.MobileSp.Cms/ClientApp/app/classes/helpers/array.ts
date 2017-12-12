export class ArrayEx {
	public static sumArrayValues(items: any[], prop:string) {
		if (items == null) {
			return 0;
		}
		return items.reduce((a, b) => {
			return b[prop] == null ? a : a + b[prop];
		}, 0);
	};
}