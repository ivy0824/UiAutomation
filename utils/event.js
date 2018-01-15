const puppeteer = require('puppeteer');
const constant = require('../config/constant');

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
let items = [];
    try {
        items = await page.$$(cssSelector);
  } catch (e) {
    console.error(`${cssSelector}寻找元素出错`);
    console.error(e);
    await page.screenshot({
        path: `images/寻找${cssSelector}.png`
    });
    console.error('截图已经存下');
  }
  if (items && items.length > 0) {
      try {
            await items[index].focus();
            await items[index].click();
    } catch (e) {
            console.error(`${items[index]}元素点击事件错误`);
            console.error(e);
    }
  } else {
    console.error(`${cssSelector}没有找到元素`);
    await page.screenshot({
      path: `images/${cssSelector}没有找到.png`
    });
    process.exit(1);
  }
};

const clickAndType = async(page, cssSelector, input) => {
    await page.click(cssSelector);
    await sleep(1000);
    await page.type(cssSelector, input);
}

const clickElementAndType = async(page, cssSelector, index, input) => {
    const items = await page.$$(cssSelector);
    if (items.length > 0) {
        await items[index].click();
        await items[index].type(input);
  } else {
        throw new Error("can't find element");
  }
};

const selectElement = async(page,cssSelector,index) => {
	const items = await page.$$eval(cssSelector ,x=>x.map(node => node.innerText));
	// console.log('items:'+items[0])
  	return items[index];
};

const waitForDisappear = async(page, cssSelector) => {
    let appear = true;
    while (appear) {
        const result = await page.$(cssSelector);
        if (result === null) {
      // await page.screenshot({path: filename + '.png'});
      appear = false;
    }
  }
}

const goToPage = async(page,url,cssSelector) => {
    try {
        await page.goto(url, {
                timeout: 100000
            });
            await page.waitForSelector(cssSelector, {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转页面错误');
            console.error(e);
				}
			console.log('进入页面成功')
}

module.exports = {
  sleep,
  changeUrlWait,
  clickElement,
  clickAndType,
  clickElementAndType,
  selectElement,
  waitForDisappear,
  goToPage,
};