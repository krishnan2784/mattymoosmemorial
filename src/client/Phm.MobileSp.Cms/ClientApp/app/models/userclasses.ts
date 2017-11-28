import Account = require("../interfaces/models/IUserAccount");
import Baseclasses = require("./baseclasses");
import { MediaInfo } from "./mediainfoclasses";
import BaseModel = Baseclasses.BaseModel;

export class UserAccount {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    role: string;
    dealershipCode: string;
    dealershipName: string;
    region: string;
    zone: string;
    market: string;
    createdDate: Date;

    constructor(options: {
        id?: number,
        firstName?: string,
        lastName?: string,
        userName?: string,
        email?: string,
        role?: string,
        dealershipCode?: string,
        dealershipName?: string,
        region?: string,
        zone?: string,
        market?: string,
        createdDate?: Date
    } = {}) {

        this.id = options.id || 0;
        this.firstName = options.firstName || '';
        this.lastName = options.lastName || '';
        this.userName = options.userName || '';
        this.email = options.email || '';
        this.role = options.role || 'Sales Manager';
        this.dealershipCode = options.dealershipCode || '';
        this.dealershipName = options.dealershipName || '';
        this.region = options.region || '';
        this.zone = options.zone || '';
        this.market = options.market || '';
        this.createdDate = options.createdDate;
    }
}

export class UserMarket {
    id: number;
    masterId: string;
	name: string;
    isDefault: boolean;
    isMaster: boolean;
    isLive: boolean;
    constructor(options: {
        id?: number,
        name?: string,
	    masterId?: string,
        isDefault?: boolean,
        isMaster?: boolean,
        isLive?: boolean

    } = {}) {

        this.id = options.id || null;
		this.masterId = options.masterId || '';
		this.name = options.name || '';
        this.isDefault = options.isDefault || false;
        this.isMaster = options.isMaster || false;
        this.isLive = options.isLive || false;
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
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    secEntityId: number;
    sessionExpireMinutes: number;
    isBuiltIn: boolean;

    constructor(options: {} = {}) {
        super(options);
        this.email = options['email'] || '';
        this.firstName = options['firstName'] || '';
        this.lastName = options['lastName'] || '';
        this.userName = options['userName'] || '';
        this.secEntityId = options['secEntityId'] || 0;
        this.sessionExpireMinutes = options['sessionExpireMinutes'] || 20;
        this.isBuiltIn = options['isBuiltIn'] || false;
    }
}

export class UserTemplate extends BaseModel {
    dealershipCode: string;
    dealershipName: string;
    areaCode: string;
    areaName: string;
    regionCode: string;
    regionName: string;
    zoneCode: string;
    zoneName: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    avatarId: number;
    avatar: MediaInfo;
    totalMLearningPoints: number;
    secGroup: { id: number, name: string };
    constructor(options: {} = {}) {
        super(options);
        this.dealershipCode = options['dealershipCode'] || '';
        this.dealershipName = options['dealershipName'] || '';
        this.areaCode = options['areaCode'] || '';
        this.areaName = options['areaName'] || '';
        this.regionCode = options['regionCode'] || '';
        this.regionName = options['regionName'] || '';
        this.zoneCode = options['zoneCode'] || '';
        this.zoneName = options['zoneName'] || '';
        this.email = options['email'] || '';
        this.firstName = options['firstName'] || '';
        this.lastName = options['lastName'] || '';
        this.userName = options['userName'] || '';
        this.avatarId = options['avatarId'];
        this.avatar = options['avatar'];
        this.totalMLearningPoints = options['totalMLearningPoints'] || 0;
        this.secGroup = options['secGroup'] || { id: 0, name: '' };
    }
}