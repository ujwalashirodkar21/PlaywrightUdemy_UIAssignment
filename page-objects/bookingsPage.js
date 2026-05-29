class bookingsPage{

    constructor(page){

        this.page = page;
        this.ticketQty = this.page.locator("#ticket-count");
        this.fullName = this.page.getByLabel("Full Name");
        this.email = this.page.getByLabel("Email");
        this.phoneNumber = this.page.getByLabel("Phone Number");
        this.confirmBkngBtn = this.page.getByRole("button", {name: "Confirm Booking"});
        this.bookingConfirmedMsg = this.page.getByText("Booking Confirmed!");
        this.bookingRef = this.page.locator(".booking-ref");
        this.viewMyBkngBtn = this.page.getByRole("button", {name: "View My Bookings"});
        this.bookingCards = this.page.locator("#booking-card");
    }

    async createBooking(bookingDetails){

        await this.fullName.fill(bookingDetails.fullName);
        await this.email.fill(bookingDetails.email);
        await this.phoneNumber.fill(bookingDetails.phoneNumber);
        await this.confirmBkngBtn.click();
    }

    async getBookingRef(){

        await this.bookingRef.isVisible();
        return this.bookingRef.textContent();
    }

    async viewMyBooking(){
        
        await this.viewMyBkngBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async validateBooking(bookingRef, eventTittle){

        await this.bookingCards.first().isVisible();
        const myBookingCard = await this.bookingCards.filter({has: this.page.locator(".booking-ref", {hasText: bookingRef})});
        await myBookingCard.isVisible();
        await myBookingCard.filter({has: this.page.locator("h3", {hasText: eventTittle})}).isVisible();
    }


}
module.exports = bookingsPage;