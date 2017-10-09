export class NavMenuOption {
  onClick: any = null;
  routerLinkActiveOptions: { exact: boolean };
    constructor(public title: string, public routerLink: string, options: {} = {}) {
        this.onClick = options['onClick'];
        this.routerLinkActiveOptions = options['routerLinkActiveOptions'] || {exact: true};
    }
}
