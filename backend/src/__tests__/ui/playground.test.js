// const { Capabilities, By, until, Builder, Key } = require("selenium-webdriver");

// // const chrome = require('selenium-webdriver/chrome')
// const { ServiceBuilder } = require("selenium-webdriver/chrome");

// // chrome.setDefaultService(new chrome.ServiceBuilder(chromeDriver.path).build())

// describe("Google search", () => {
//     let driver;
//   beforeAll(async () => {
    
//     let chromeCapabilities = Capabilities.chrome()

//     const chromeOptions = {
//       args: [],
//     };
//     chromeCapabilities.set("goog:chromeOptions", chromeOptions);

//     driver = await new Builder()
//       .forBrowser("chrome")
//       .withCapabilities(chromeCapabilities)
//         //   .setChromeService(new ServiceBuilder(chromeDriver.path))
//       .build();
      
//   });

//   afterAll(async() => {
//     await driver.close()
//   });

//   it('should return google page with search results',async () => { 

//     await driver.get("https://www.google.com");
//     await driver.findElement(By.name('q')).sendKeys('selenium', Key.RETURN)
//     await driver.wait(until.titleIs('selenium - Google Search'), 1000)

//    }, 10000)
// });
