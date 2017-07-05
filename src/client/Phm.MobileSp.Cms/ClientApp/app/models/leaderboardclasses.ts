import { User } from "./userclasses";

export class LeaderBoardData {
    currentUser: User;
    dealershipCode: string;
    regionName: string;
    roleName: string;
    zoneName: string;
    totalMLearningPoints: number;

    constructor(options: {} = {}) {
        this.currentUser = options['currentUser'];
        this.dealershipCode = options['dealershipCode'];
        this.regionName = options['regionName'];
        this.roleName = options['roleName'];
        this.zoneName = options['zoneName'];
        this.totalMLearningPoints = options['totalMLearningPoints'] || 0;
    }
}