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
const filename = "修改关注点"
const pageUrl = element.pageUrl;
const qcItem = element.qcItem;

let constance;
describe('#knowledgeBase/editAndDelectAttation', function () {
	before(async() => {
		constance = await init();		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('修改删除关注点', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	
        //创建一个关注点（默认会显示在第一行）
        const attationName = await precondition.createAttation(page);
        console.log('attationName is',attationName);
        const resultA = await page.$eval( '.ant-table-row.myTableRowBordered.ant-table-row-level-0>td',x=>x.innerText);
        console.log('resultA is',resultA);
        //点击编辑按钮
        await event.clickElement(page, qcItem.edit, 1);
        await page.screenshot({ path: `images/${filename}.png` });
        //wait for cancleButton appear
        await page.waitForSelector(qcItem.cancleButton);
        //change name 
        await event.clickAndType(page,qcItem.attationName_e,`ch`);
        await event.clickAndType(page,qcItem.attationMethod_e,`ch`);
        await event.clickAndType(page,qcItem.attationStandard_e,`ch`);
        await page.screenshot({ path: `images/${filename}.png` }); 
        //submmit
        await event.clickElement(page,qcItem.completeButton, 2);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,qcItem.cancleButton);
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log('result is', result);
        assert.equal(result,`${resultA}ch` ,'result = `${resultA}ch`');
        //删除关注点
        await event.clickElement(page, qcItem.delete, 1);
        await page.screenshot({ path: `images/${filename}.png` });
        await event.clickElement(page, qcItem.deleteAndYes, 0);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });  
        console.log('test end');
        
    })
});