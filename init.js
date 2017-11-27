// 初始化
// 登陆web页面

const puppeteer = require('puppeteer');
const timeout = require('./utils/timeout');
const constant = require('./config/constant');

const {
  host
} = constant.webUrl;
const init = async() => {
  let browser;
  try {
    browser = await puppeteer.launch();
  } catch (e) {
    console.error('browser对象没有得到');
    console.error(e);
    process.exit(1);
  }
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  })
  // login
  await page.goto(`${host}login`);
  await page.type('#username', '13000000000');
  await page.type('#password', 'woshilaohei');
  await page.click('.ant-btn.ant-btn-primary.ant-btn-lg');
  console.log('登陆成功')
   
  try {
    // 如果有面包导航说明页面已经加载成功
    await page.waitForSelector(".ant-breadcrumb-link", {
      timeout: 50000
    });
  } catch (e) {
    console.error('页面登录错误:');
    await page.screenshot({
      path: "images/登陆错误" + '.png'
    });
    console.log('登陆错误页面已经截图');
    process.exit(1);
  }
  await page.screenshot({
      path: "images/登陆成功" + '.png'
    });
  return {
    page,
    browser
  }
}

module.exports = init;