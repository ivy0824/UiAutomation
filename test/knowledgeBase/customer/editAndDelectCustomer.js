const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const puppeteer = require('puppeteer');
const precondition = require('../../../utils/precondition');
const element = require('../../../config/element');


// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "修改客户";
const pageUrl = element.pageUrl;
const customer = element.customer;

let constance;
describe('#knowledgeBase/editAndDelectCustomer', function () {
	before(async() => {
		constance = await init();		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('修改单位', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	
        //创建一个单位（默认会显示在第一行）
        const customerName = await precondition.createCustomer(page);
        console.log('customerName is',customerName);
        //点击编辑按钮
        await event.clickElement(page, customer.edit, 0);
        //wait for 取消按钮 appear
        await page.waitForSelector(customer.cancleButton);
        //change name and note
        await event.clickAndType(page,customer.name,`ch`);
        await event.clickAndType(page,customer.note,`我是客户备注`);
        //submit
        await event.clickElement(page, customer.completeButton, 2);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log('result is', result);
        assert.equal(result,`${customerName}ch` ,'result = `${customerName}ch`');
        //删除单位
        await event.clickElement(page, customer.delete, 0);
        await page.screenshot({ path: `images/${filename}.png` });
        await event.clickElement(page, customer.deleteAndYes, 0);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });  
        console.log('test end');
        
    })

    });