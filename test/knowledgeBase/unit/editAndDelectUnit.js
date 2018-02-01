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
const filename = "修改单位"
const pageUrl = element.pageUrl;
const unit = element.unit;

let constance;
describe('#knowledgeBase/editAndDelectUnit', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建单位', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	
        //创建一个单位（默认会显示在第一行）
        const unitName = await precondition.createUnit(page);
        console.log( 'unitName is',unitName);
        //点击编辑按钮
        await event.clickElement(page, unit.edit, 0);
        await page.screenshot({ path: `images/${filename}.png` });
       
        //change name and note
        await event.clickAndType(page, unit.name,`ch`); 
        await page.screenshot({ path: `images/${filename}.png` });
		await event.clickAndType(page, unit.note,'ch');
        //submmit
        await event.clickElement(page,unit.completeButton, 0);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,unit.cancleButton);
        //assert
        const result = await page.$eval( unit.firstUnit,x=>x.innerText);
        console.log('result is', result);
        assert.equal(result,`${unitName}ch` ,'result = `${unitName}ch`');
        //删除单位
        await event.clickElement(page, unit.delete, 0);
        await event.clickElement(page, unit.deleteAndYes, 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,unit.deleteAndNo);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        
        console.log('test end');
        
    })

    });