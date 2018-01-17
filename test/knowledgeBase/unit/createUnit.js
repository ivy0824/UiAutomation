const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const puppeteer = require('puppeteer');
const element = require('../../element');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "创建单位"
const pageUrl = element.pageUrl;
const common = element.common;
const unit = element.unit;

let constance;
describe('#knowledgeBase/createUnit', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建单位', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //go to unit page
        await event.goToPage(page,pageUrl.units,unit.breakCrumb)
        //click 创建单位
        await page.click(unit.createUnitButton);
        await page.screenshot({ path: `images/${filename}.png` });          
        var rand = Math.random().toFixed(6);
        //input name and note
        await event.clickAndType(page, unit.name,`unit${rand}`);
        // await event.clickAndType(page, '#note',`note${rand}`);  
		await event.clickAndType(page, unit.note,'我是创建单位的备注');
        //submmit
        await event.clickElement(page,unit.completeButton, 2);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,unit.cancleButton);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const rēsult = await page.$eval(unit.firstUnit , x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, `unit${rand}`,'rēsult = `unit${rand}`');
        console.log('test end');
    })

    });