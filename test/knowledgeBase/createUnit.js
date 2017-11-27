const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');
const puppeteer = require('puppeteer');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "修改单位"

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

        //click knowledgeBase and unit
        try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/units", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转单位页面错误');
            console.error(e);
				}
			console.log('进入单位页面')

        //click 创建单位
        await page.click('.anticon.anticon-plus ');
        await event.changeUrlWait(page);
        var rand = Math.random().toFixed(6);
        //input name and note
        await event.clickAndType(page, '#name',`unit${rand}`);
        // await event.clickAndType(page, '#note',`note${rand}`);  
		await event.clickAndType(page, '#note','我是创建单位的备注');
        //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const rēsult = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, `unit${rand}`,'rēsult = `unit${rand}`');
        console.log('test end');
    })

    });