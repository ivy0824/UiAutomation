const puppeteer = require('puppeteer');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

//wait for url change
const changeUrlWait = async(page) => {
  // console.log(4.3);
  await page.waitForNavigation({
    waitUntil: 'networkidle',
    networkIdleInflight: 5,
    networkIdleTimeout: 5000
  })
}

const clickElement = async(page, cssSelector, index) => {
  await page.evaluate(async(cssSelector, index) => {
    const items = document.querySelectorAll(cssSelector);
    if (items.length > 0) {
      await items[index].click();
    } else {
      throw new Error("can't find element");
    }
  }, cssSelector, index);
};


const clickElementAndType = async(page, cssSelector, index, input) => {
  const items = await page.$$(cssSelector);
  if (items.length > 0) {
    await items[index].click();
    await items[index].type(input);
  } else {
    throw new Error("can't find element");
  }
};

  
const clickAndType = async(page, cssSelector, input) => {
	await page.click(cssSelector);
  await sleep(1000);
  // console.log('test');
  // console.log(cssSelector, input);
  await page.type(cssSelector, input);
  // console.log('1')
  // console.log(cssSelector);
  // console.log(input);
}

module.exports = {
	sleep,
	changeUrlWait,
  clickElement,
  clickAndType,
  clickElementAndType,
};