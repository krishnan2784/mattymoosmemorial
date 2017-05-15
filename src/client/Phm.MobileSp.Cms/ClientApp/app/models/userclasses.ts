import Account = require("../interfaces/models/IUserAccount");

export class UserAccount implements Account.IUserAccount {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    dealer: string;
    market: string;
    createdDate: Date;

    constructor(options: {
        id?: number,
        firstName?: string,
        lastName?: string,
        userName?: string,
        role?: string,
        dealer?: string,
        market?: string,
        createdDate?: Date
    } = {}) {

        this.id = options.id;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.userName = options.userName;
        this.role = options.role;
        this.dealer = options.dealer;
        this.market = options.market;
        this.createdDate = options.createdDate;
    }
}

export class UserMarket  {
    id: number;
    name: string;
    isDefault: boolean;
    isMaster: boolean;
    constructor(options: {
        id?: number,
        name?: string,
        isDefault?: boolean,
        isMaster?: boolean} = {}) {

        this.id = options.id || 0;
        this.name = options.name || '';
        this.isDefault = options.isDefault || false;
        this.isMaster = options.isMaster || false;
    }
}

