export class NavMenuOption {
  onClick: any = null;
  routerLinkActiveOptions: { exact: boolean };
	onClickParams: any;
    constructor(public title: string, public routerLink: string, options: {} = {}) {
        this.onClick = options['onClick'];
		this.onClickParams = options['onClickParams'];
        this.routerLinkActiveOptions = options['routerLinkActiveOptions'] || {exact: false};
    }
}
