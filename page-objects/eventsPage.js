class eventsPage{

    constructor(page){

        this.page = page;
        this.eventDateTime;
        this.eventTitle = this.page.locator("#event-title-input");
        this.eventDesc = this.page.locator("div").filter({has: page.getByText("Description")}).locator("textarea");
        this.city = this.page.getByLabel("City");
        this.venue = this.page.getByLabel("Venue");
        this.eventDateNTime = this.page.getByLabel("Event Date & Time");
        this.price = this.page.getByLabel("Price ($)");
        this.seats = this.page.getByLabel("Total Seats");
        this.addEventBtn = this.page.locator("#add-event-btn");
        this.sucessToastMsg = this.page.getByText("Event created!");

        this.eventCards = this.page.locator("#event-card");
        this.bookTicketsHeader = this.page.getByText("Book Tickets");
    }

    async createEvent(baseURL, eventDetails) {

        await this.page.goto(baseURL+"/admin/events");
        await this.eventTitle.fill(eventDetails.title);
        await this.eventDesc.fill(eventDetails.description);
        await this.city.fill(eventDetails.city);
        await this.venue.fill(eventDetails.venue);
        await this.eventDateNTime.fill(eventDetails.eventDateTime);
        await this.price.fill(eventDetails.price);
        await this.seats.fill(eventDetails.seats);
        await this.addEventBtn.click();
    }

    async validateEvent(baseURL, eventTitle){

        await this.page.goto(baseURL+"/events");
        await this.eventCards.first().isVisible();
        this.myEventCard = this.eventCards.filter({has: this.page.locator("h3", {hasText: eventTitle})});
        await this.myEventCard.isVisible();
    }

    async getSeatCount(){

        const seatsAvailableStmnt = await this.myEventCard.locator("span", {hasText: "seats available"}).textContent();
        const seatsBeforeBooking = seatsAvailableStmnt.split(" ")[0].trim();
        return seatsBeforeBooking;
    }

    async bookEvent() {

        await this.myEventCard.locator("a[data-testid = 'book-now-btn']").click();
    }
}
module.exports = eventsPage;