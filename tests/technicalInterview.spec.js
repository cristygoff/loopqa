// @ts-check
const { test, expect } = require('@playwright/test');
const { AsanaPage } = require('./pages/asanaPage');
const { LoginPage } = require('./pages/loginPage');

test.beforeEach('Log in', async({ page })=>{
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.logIn();
});

[
  { pageTitle: 'Web Application', cardTitle: 'Implement user authentication', expectedColumn: 'To Do', expectedTags: ['High Priority']},
  { pageTitle: 'Web Application', cardTitle: 'Fix navigation bug', expectedColumn: 'To Do', expectedTags: ['Bug']},
  { pageTitle: 'Web Application', cardTitle: 'Design system updates', expectedColumn: 'In Progress', expectedTags: ['Design']},
  { pageTitle: 'Mobile Application', cardTitle: 'Push notification system', expectedColumn: 'To Do', expectedTags: ['Feature']},
  { pageTitle: 'Mobile Application', cardTitle: 'Offline mode', expectedColumn: 'In Progress', expectedTags: ['Feature', 'High Priority']},
  { pageTitle: 'Mobile Application', cardTitle: 'App icon design', expectedColumn: 'Done', expectedTags: ['Design']},
  
].forEach(({ pageTitle, cardTitle, expectedColumn, expectedTags })=>{
  test(`${cardTitle} on the ${pageTitle} is in column ${expectedColumn} and has tag(s): ${expectedTags}`, async({ page })=>{
    const asanaPage = new AsanaPage(page);
    
    // Navigate to the required page
    if(pageTitle == 'Web Application'){
      await asanaPage.goToWebApp();
    }
    else if (pageTitle == "Mobile Application"){
      await asanaPage.goToMobileApp();
    }
    else if (pageTitle == "Marketing Campaign"){
      await asanaPage.goToMarketing();
    }

    // Assert card is in correct column
    if (expectedColumn == "To Do"){
      // await is necessary; ignore the intellisense
      const cards = await page.locator('main > div > div > div:nth-child(1) > div');
      searchCards(cards, cardTitle);
    }
    else if(expectedColumn == "In Progress"){
      const cards = await page.locator('main > div > div > div:nth-child(2) > div');
      searchCards(cards, cardTitle);
    }
    else if (expectedColumn == "Review"){
      const cards = await page.locator('main > div > div > div:nth-child(3) > div');
      searchCards(cards, cardTitle);
    }
    else if (expectedColumn == "Done"){
      const cards = await page.locator('main > div > div > div:nth-child(4) > div');
      searchCards(cards, cardTitle);
    }
    else {
      expect(false);
    };

    // Assert card has expected tags
    const parent = page.getByText(cardTitle).locator('xpath=..');
    for (let i=0; i<expectedTags.length; i++){
      expect(page.getByText(cardTitle).filter({ has: page.getByText(expectedTags[i])}));
    }

  });
});

async function searchCards(cards, cardTitle){
  let howMany = cards.count();
  expect(howMany > 0);
  
  let success = false;

  for(let i=0; i<howMany; i++){
    if (cards[i].innerText().includes(cardTitle)){
        success = true;
        break; 
    }
  }
  expect(success);
};