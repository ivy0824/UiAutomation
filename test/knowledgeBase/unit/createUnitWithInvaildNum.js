const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const puppeteer = require('puppeteer');
const precondition = require('../../../utils/precondition');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "创建不合法单位"

let constance;
describe('#knowledgeBase/createUnitWithInvaildNum', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
    });
    
	it('创建不合法单位', async() => {
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
        var rand = Math.random().toFixed(7);
        //input name and note
        await event.clickAndType(page, '#name',`unit${rand}`);
        // await event.clickAndType(page, '#note',`note${rand}`);  
		await event.clickAndType(page, '#note','我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注');
    
        //screenshot
        // await page.screenshot({ path: `images/${filename}.png` });
        //assert 单位长度验证
        const rēsult = await page.$eval('.ant-form-explain',x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '单位长度不能超过12个字','rēsult = 单位长度不能超过12个字');
        //assert 备注长度验证
        const rēsult1 = await event.selectElement(page,'.ant-form-explain',1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入50字，已超出4个字','rēsult = 最多可输入50字，已超出4个字')
        //click cancel
        await page.screenshot({ path: `images/${filename}.png` });
        await event.clickElement(page,'.ant-btn.ant-btn-ghost',0);

    })

    

    });