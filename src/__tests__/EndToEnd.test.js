import puppeteer from "puppeteer";

describe("show/hide event details", () => {
    let browser;
    let page;
    beforeAll(async () => {
        // browser = await puppeteer.launch({
        //     headless: false,
        //     slowMo: 250, // slow down by 250ms,
        //     timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        // });
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".event");
    });

    afterAll(() => {
        browser.close();
    });

    test("An event element is collapsed by default", async () => {
        const eventDetails = await page.$(".event .show-details");
        expect(eventDetails).toBeNull();
    });

    test("User can expand an event to see details", async () => {
        await page.click(".event .details-btn");
        const eventDetails = await page.$(".event .show-details");
        expect(eventDetails).toBeDefined();
    });
    test("User can collapse an event to hide details", async () => {
        await page.click(".event .details-btn");
        const eventDetails = await page.$(".event .show-details");
        expect(eventDetails).toBeNull();
    });
});

describe("Specify Number of Events", () => {
    let browser;
    let page;

    beforeAll(async () => {
        // browser = await puppeteer.launch({
        //     headless: false,
        //     slowMo: 250, // slow down by 250ms,
        //     timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        // });
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
        await page.waitForSelector(".event");
    });

    afterAll(async () => {
        await browser.close();
    });

    test("User can specify the number of events", async () => {
        const numberOfEvents = "5";
        await page.type(".event-input", numberOfEvents);
        await page.click(".btnSubmit");

        const events = await page.$$(".event");
        expect(events.length).toBe(parseInt(numberOfEvents));
    });

    test("User enters invalid number inside input field", async () => {
        const numberOfEvents = "D";
        await page.type(".event-input", numberOfEvents);
        await page.click(".btnSubmit");

        // Wait for the error message to be rendered
        await page.waitForSelector(".error-message");

        // Assert that the error message is displayed
        const errorMessage = await page.$eval(".error-message", (element) => element.textContent);
        expect(errorMessage).toBe("Please enter a valid positive number.");
    });
});

describe("Filter Events by City", () => {
    let browser;
    let page;
    let cityToSelect;

    beforeAll(async () => {
        // browser = await puppeteer.launch({
        //     headless: false,
        //     slowMo: 250, // slow down by 250ms,
        //     timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
        // });
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await page.goto("http://localhost:3000/");
    });

    beforeEach(async () => {
        cityToSelect = "";
        await page.$eval(".city", (input) => (input.value = ""));
    });

    afterAll(async () => {
        await browser.close();
    });

    test("User can filter events by typing in a city", async () => {
        cityToSelect = "London, UK";
        await page.type(".city", cityToSelect);

        await page.waitForSelector(".suggestions");

        const suggestionsVisible = await page.$(".suggestions");
        expect(suggestionsVisible).toBeTruthy();

        const isLondonIncluded = await page.evaluate((city) => {
            const currentCity = document.querySelector(".city").value;
            return currentCity === "See all cities" || currentCity.includes(city);
        }, "London"); // Use "London" instead of cityToSelect

        expect(isLondonIncluded).toBeTruthy();
    });

    test("User can select a city from suggestions", async () => {
        cityToSelect = "Berlin, Germany";
        await page.type(".city", cityToSelect);

        await page.waitForTimeout(1000);

        await page.waitForSelector(".suggestions li");

        const suggestions = await page.$$eval(".suggestions li", (lis) =>
            lis.map((li) => li.textContent)
        );

        // console.log("City to Select:", cityToSelect);
        // console.log("Suggestions:", suggestions);

        const suggestionIndex = suggestions.findIndex((text) => text.includes(cityToSelect));
        // console.log("Suggestion Index:", suggestionIndex);

        await page.click(`.suggestions li:nth-child(${suggestionIndex + 1})`);
        await page.waitForSelector(`.city[value="${cityToSelect}"]`);

        // Check if the input field contains the selected city
        const selectedCityInput = await page.$(`.city[value="${cityToSelect}"]`);
        expect(selectedCityInput).toBeTruthy();
    });
});
