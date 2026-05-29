const {test, expect} = require('@playwright/test');
const POManager = require('../page-objects/POManager');

const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const loginCreds = {email: "ujwala.shirodkar21@gmail.com", password: "Ujwala@333"};
const eventTitle = "Test_Event_"+Date.now();
const eventDetails = {title: eventTitle, description: "This event is created as a part of Assignemnt 1", city: "Margao", venue: "Maria Hall", eventDateTime: "2026-08-21T15:30", price: "100", seats: "50"};
const bookingDetail = {fullName: "Anna Dsa", email: "annadsa21@gmail.com", phoneNumber: "9675434567"};

test('Full Booking Event Flow', async({page}) =>{

    //page object construction
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    
    // Step 1
    await loginPage.loginToPortal(BASE_URL, loginCreds);
    await expect(loginPage.browseEventsLink).toBeVisible();

    // Step 2
    const eventsPage = poManager.getEventsPage();
    await eventsPage.createEvent(BASE_URL, eventDetails);
    await expect(eventsPage.sucessToastMsg).toBeVisible();
    

    // Step 3
    await eventsPage.validateEvent(BASE_URL, eventTitle);
    const seatsBeforeBooking = parseInt(await eventsPage.getSeatCount(), 10);
    console.log("Seats before booking: " +seatsBeforeBooking);

    // Step 4
    await eventsPage.bookEvent();
    await expect(eventsPage.bookTicketsHeader).toBeVisible();

    // Step 5
    const bookingsPage = poManager.getBookingsPage();
    await expect(bookingsPage.ticketQty).toHaveText('1');
    await bookingsPage.createBooking(bookingDetail);
    await expect(bookingsPage.bookingConfirmedMsg).toBeVisible();

    // Step 6
    const bookingRef = await bookingsPage.getBookingRef();
    console.log(bookingRef);

    // Step 7
    await bookingsPage.viewMyBooking();
    await expect(page.waitForURL(BASE_URL+"/bookings")).toBeTruthy();
    await bookingsPage.validateBooking(bookingRef, eventTitle);

    // Step 8 
    await eventsPage.validateEvent(BASE_URL, eventTitle);
    const seatsAfterBooking = parseInt(await eventsPage.getSeatCount(), 10);
    console.log("Seats before booking: " +seatsAfterBooking);
    await expect(seatsAfterBooking).toBe(seatsBeforeBooking - 1);

});