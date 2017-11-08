const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');
const puppeteer = require('puppeteer');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#knowledgeBase/createUnit', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create unit successfully', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //click knowledgeBase and unit
        await event.clickElement(page,'div.ant-menu-submenu-title',3);
        await event.clickElement(page,'li.ant-menu-item', 3);
        await event.changeUrlWait(page);
        console.log('click knowledgeBase and unit');

        //click 创建单位
        await page.click('.anticon.anticon-plus ');
        await event.changeUrlWait(page);

        var rand = Math.random().toFixed(6);
        //input name and note
        await event.clickAndType(page, '#name',`unit${rand}`);
        await event.clickAndType(page, '#note',`note${rand}`);

        //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 创建按钮 show up
	    await page.waitForSelector('.anticon.anticon-plus');
        //screenshot
        await page.screenshot({path: filename + '.png'});
        //assert
        const ths = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(ths);
        assert.equal(ths, `unit${rand}`,'ths = `unit${rand}`');
        console.log('test end');
    })

    });