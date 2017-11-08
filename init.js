const puppeteer = require('puppeteer');
const timeout = require('./utils/timeout');
const constant = require('./config/constant');

const { host } = constant.webUrl;
const init = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  })
  // login
  await page.goto(`${host}login`);
  await page.type('#username', '13000000001');
  await page.type('#password', 'woshilaohei');
  await page.click('.ant-form-item-control .ant-btn');
  await timeout(4000);
  return {
    page,
    browser
  }
}

module.exports = init;