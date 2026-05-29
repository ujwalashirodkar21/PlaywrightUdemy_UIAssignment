const loginPage = require('./loginPage');
const eventsPage = require('./eventsPage');
const bookingsPage = require('./bookingsPage');

class POManager {

    constructor(page){
        this.page = page;
        this.loginPage = new loginPage(this.page);
        this.eventsPage = new eventsPage(this.page);
        this.bookingsPage = new bookingsPage(this.page);

    }

    getLoginPage(){
        return this.loginPage;
    }

    getEventsPage(){
        return this.eventsPage;
    }

    getBookingsPage(){
        return this.bookingsPage;
    }
    
}
module.exports = POManager;