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
const filename = "编辑不合法单位"
const pageUrl = element.pageUrl;
const unit = element.unit;

let constance;
describe('#knowledgeBase/editUnitWithInvaildNum', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
    });
    
    it('编辑不合法单位', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;
        //编辑单位时不合法输入验证
        const unitName = await precondition.createUnit(page);
        console.log( 'unitName is', unitName);
        //点击编辑按钮
        await event.clickElement(page, unit.edit, 0);
        await page.screenshot({ path: `images/${filename}.png` });
        //wait for 取消按钮 appear
        await page.waitForSelector(unit.cancleButton);
        var rand = Math.random().toFixed(6);
        //change name and note
        await event.clickAndType(page, unit.name,`chchch`); 
		await event.clickAndType(page, unit.note,'我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注');
        //submmit
        await event.clickElement(page,unit.completeButton, 0);
        //assert 单位长度验证
        const rēsult = await page.$eval(unit.invalidAssert,x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '单位长度不能超过12个字','rēsult = 单位长度不能超过12个字');
        //assert 备注长度验证
        const rēsult1 = await event.selectElement(page,unit.invalidAssert,1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入50字，已超出4个字','rēsult = 最多可输入50字，已超出4个字')
        console.log('test end');
    })
})
