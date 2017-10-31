export class NavMenuOption {
	onClick: any = null;
	activeLink: boolean = false;
  routerLinkActiveOptions: { exact: boolean };
	onClickParams: any;
    constructor(public title: string, public routerLink: string, options: {} = {}) {
        this.onClick = options['onClick'];
		this.onClickParams = options['onClickParams'];
		this.activeLink = options['activeLink'];
        this.routerLinkActiveOptions = options['routerLinkActiveOptions'] || {exact: false};
    }
}
