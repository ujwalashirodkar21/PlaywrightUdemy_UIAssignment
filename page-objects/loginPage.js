class loginPage {

    constructor(page){
        this.page = page;
        this.email =  this.page.locator("#email"); 
        this.password = this.page.locator("#password"); 
        this.signInBtn = this.page.getByRole("button", {name: "Sign In"}); 
        this.browseEventsLink = this.page.getByText("Browse Events →");
    }

    async loginToPortal(baseURL, loginCreds){

        await this.page.goto(baseURL+"/login");
        await this.email.fill(loginCreds.email);
        await this.password.fill(loginCreds.password);
        await this.signInBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = loginPage;