const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

const filename = "创建不合法客户";
const pageUrl = element.pageUrl;
const customer = element.customer;

let constance;
describe('#knowledgeBase/createCustomerWithInvaildNum', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建不合法客户', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //go to customer page
        await event.goToPage(page,pageUrl.customers,customer.breakCrumb)
        var rand = Math.random().toFixed(6);
        //add customer
        await event.clickElement(page, customer.createCustomerButton,0);
        await page.waitForSelector(customer.cancleButton);
        await event.clickAndType(page, customer.name,`customer${rand}`);
        console.log(`customer name is customer${rand}`);
        await event.clickAndType(page, customer.note,'我是个52个字的备注我是个52个字的备注我是个52个字的备注我是个52个字的备注我是个52个字的备注52');
        //assert 客户名称长度
        const rēsult = await page.$eval(customer.invalidAssert,x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '客户名称长度不能超过12个字','rēsult = 客户名称长度不能超过12个字');
        //assert 备注长度验证
        const rēsult1 = await event.selectElement(page,customer.invalidAssert,1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入50字，已超出2个字','rēsult = 最多可输入50字，已超出2个字')
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        console.log('test end');
	
		})

    });