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
const filename = "修改不合法客户";
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

	it('修改不合法客户', async() => {
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
        await event.clickAndType(page,customer.name,`chch`);
        await event.clickAndType(page,customer.note,`我是个52个字的备注我是个52个字的备注我是个52个字的备注我是个52个字的备注我是个52`);
        //submmit
        await event.clickElement(page,customer.completeButton, 2);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert 客户名称长度
        const rēsult = await page.$eval(customer.invalidAssert,x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '单位长度不能超过12个字','rēsult = 单位长度不能超过12个字');
        //assert 备注长度验证
        const rēsult1 = await event.selectElement(page,customer.invalidAssert,1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入50字，已超出2个字','rēsult = 最多可输入50字，已超出2个字')
        console.log('test end');
        
    })

    });