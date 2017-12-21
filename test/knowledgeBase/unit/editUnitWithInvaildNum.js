const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const puppeteer = require('puppeteer');
const precondition = require('../../../utils/precondition');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "编辑不合法单位"

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
        console.log( unitName);
        //点击编辑按钮
        await event.clickElement(page, '.anticon.anticon-edit.undefined', 0);
        await page.screenshot({ path: `images/${filename}.png` });
        //wait for 取消按钮 appear
        await page.waitForSelector('.ant-btn.ant-btn-ghost');
        var rand = Math.random().toFixed(6);
        //change name and note
        await event.clickAndType(page, '#name',`chchch`); 
		await event.clickAndType(page, '#note','我是创建单位的备注我是创建单位的备注我是创建单位的备注我是创建单位的备注');
        //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //assert 单位长度验证
        const rēsult = await page.$eval('.ant-form-explain',x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '单位长度不能超过12个字','rēsult = 单位长度不能超过12个字');
        //assert 备注长度验证
        const rēsult1 = await event.selectElement(page,'.ant-form-explain',1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入50字，已超出4个字','rēsult = 最多可输入50字，已超出4个字')
        console.log('test end');
    })
})
