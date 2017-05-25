import Userclasses = require("./userclasses");
import User = Userclasses.User;

export class UserObservation {
    public user: User;
    public feedId: number;
    public userId: number;

    constructor(options: {} = {}) {
        this.feedId = options['feedId'] || 0;
        this.userId = options['userId'] || 0;
        this.user = options['user'] || '';
    }
}