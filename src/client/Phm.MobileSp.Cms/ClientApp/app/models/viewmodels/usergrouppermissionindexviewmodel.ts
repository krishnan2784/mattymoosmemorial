import {UserMarket, User } from "../userclasses";
import {SecGroup} from "../securityclasses";

export class UserGroupPermissionIndexViewModel {
	public marketUserGroups: MarketUserGroup[];

	constructor(options: {} = {}) {
		this.marketUserGroups = options['marketUserGroups'] || [];
	}
}

export class MarketUserGroup {
	public market: UserMarket;
	public securityGroupUsers: SecurityGroupUsers[];

	constructor(options: {} = {}) {
		this.market = options['market'] || new UserMarket();
		this.securityGroupUsers = options['securityGroups'] || [];
	}
}

export class SecurityGroupUsers {
	public securityGroup: SecGroup;
	public users: User[];

	constructor(options: {} = {}) {
		this.securityGroup = options['securityGroup'] || new SecGroup();
		this.users = options['users'] || [];
	}
}
