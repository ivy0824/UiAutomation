const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = "创建不合法客户";

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

        //click knowledgeBase and customer
        try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/customers", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转客户页面错误');
            console.error(e);
                }
        console.log('进入创建客户页面')
        await page.waitForSelector('.ant-btn.editable-add-btn.ant-btn-primary');
        var rand = Math.random().toFixed(3);
        //add customer
        await event.clickElement(page,'.ant-btn.editable-add-btn.ant-btn-primary',0);
        await page.waitForSelector('#name');
        await event.clickAndType(page,'#name',`customer${rand}`);
        console.log(`customer name is customer${rand}`);
        await event.clickAndType(page,'#note','我是个52个字的备注我是个52个字的备注我是个52个字的备注我是个52个字的备注我是个52个字的备注52');
        //assert 客户名称长度
        const rēsult = await page.$eval('.ant-form-explain',x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '单位长度不能超过12个字','rēsult = 单位长度不能超过12个字');
        //assert 备注长度验证
        const rēsult1 = await event.selectElement(page,'.ant-form-explain',1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入50字，已超出2个字','rēsult = 最多可输入50字，已超出2个字')
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        console.log('test end');
	
		})

    });