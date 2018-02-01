const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

const filename = "创建客户";
const pageUrl = element.pageUrl;
const customer = element.customer;

let constance;
describe('#knowledgeBase/createCustomer', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create customer successfully', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //go to customer page
        await event.goToPage(page,pageUrl.customers,customer.breakCrumb)
        var rand = Math.random().toFixed(3);
        //add customer
        await event.clickElement(page,customer.createCustomerButton,0);
        await page.waitForSelector(customer.cancleButton);
        await event.clickAndType(page,customer.name,`cust${rand}`);
        console.log(`customer name is cust${rand}`);
        await event.clickAndType(page,customer.note,`note${rand}`);
        //submit
        await event.clickElement(page,customer.completeButton, 2);       
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,customer.cancleButton);
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(`result is ${result}`);
        assert.equal(result, `cust${rand}`,'result = `cust${rand}`');
        console.log('test end');
		})

    });