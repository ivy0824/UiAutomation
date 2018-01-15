const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = "创建客户";

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
        await event.clickAndType(page,'#name',`cust${rand}`);
        console.log(`customer name is cust${rand}`);
        await event.clickAndType(page,'#note',`note${rand}`);

        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 2);
        
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(`result is ${result}`);
        assert.equal(result, `cust${rand}`,'result = `cust${rand}`');
        console.log('test end');
	
		})

    });