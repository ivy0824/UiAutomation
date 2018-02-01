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
const filename = "创建不合法单位"
const pageUrl = element.pageUrl;
const unit = element.unit;

let constance;
describe('#knowledgeBase/createUnitWithInvalidNum', function () {
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
        //go to unit page
        await event.goToPage(page,pageUrl.units,unit.breakCrumb)

        //click 创建单位
        await page.click(unit.createUnitButton);
        await event.changeUrlWait(page);
        var rand = Math.random().toFixed(7);
        //input name and note
        await event.clickAndType(page, unit.name,`unit${rand}`);
        // await event.clickAndType(page, '#note',`note${rand}`);  
		await event.clickAndType(page, unit.note,'我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注');
    
        //screenshot
        // await page.screenshot({ path: `images/${filename}.png` });
        //assert 单位长度验证
        const rēsult = await page.$eval(unit.invalidAssert,x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '单位长度不能超过12个字','rēsult = 单位长度不能超过12个字');
        //assert 备注长度验证
        const rēsult1 = await event.selectElement(page,unit.invalidAssert,1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入50字，已超出4个字','rēsult = 最多可输入50字，已超出4个字')
        //click cancel
        await page.screenshot({ path: `images/${filename}.png` });

    })
});