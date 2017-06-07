import Account = require("../interfaces/models/IUserAccount");
import Baseclasses = require("./baseclasses");
import BaseModel = Baseclasses.BaseModel;

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

export class UserMarket {
    id: number;
    name: string;
    isDefault: boolean;
    isMaster: boolean;
    constructor(options: {
        id?: number,
        name?: string,
        isDefault?: boolean,
        isMaster?: boolean
    } = {}) {

        this.id = options.id || 0;
        this.name = options.name || '';
        this.isDefault = options.isDefault || false;
        this.isMaster = options.isMaster || false;
    }
}

export class ContentMarket extends UserMarket {
    isCopied: boolean;
    constructor(options: {
    } = {}) {
        super(options);
        this.isCopied = options['isCopied'] || false;
    }
}


export class User extends BaseModel {
    dealershipCode: string;
    dealershipName: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    secEntityId: number;
    sessionExpireMinutes: number;
    isBuiltIn: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.dealershipCode = options['dealershipCode'] || '';
        this.dealershipName = options['dealershipName'] || '';
        this.email = options['email'] || '';
        this.firstName = options['firstName'] || '';
        this.lastName = options['lastName'] || '';
        this.userName = options['userName'] || '';
        this.secEntityId = options['secEntityId'] || 0;
        this.sessionExpireMinutes = options['sessionExpireMinutes'] || 20;
        this.isBuiltIn = options['isBuiltIn'] || false;
    }
}

