const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const puppeteer = require('puppeteer');
const precondition = require('../../../utils/precondition');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "修改关注点类型"

let constance;
describe('#knowledgeBase/editAndDelectAttation', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('修改删除关注点类型', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	
        //创建一个关注点（默认会显示在第一行）
        const attationType = await precondition.createAttationType(page);
        console.log('attationType is',attationType);
        await page.reload({});
        //点击编辑按钮
        await event.clickElement(page, '.anticon.anticon-edit.undefined', 0);
        await page.screenshot({ path: `images/${filename}.png` });
        //change name 
        await event.clickElementAndType(page, '.ant-input', 1, `ch`);
        await page.screenshot({ path: `images/${filename}.png` }); 
        //submmit
        await event.clickElement(page,'.actionButtonContainer', 3);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //wait for 取消按钮 disappear
        // await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log('result is', result);
        assert.equal(result,`${attationType}ch` ,'result = `${attationType}ch`');
        //删除关注点
        await event.clickElement(page, '.anticon.anticon-delete', 0);
        await page.screenshot({ path: `images/${filename}.png` });
        await event.clickElement(page, '.ant-btn.ant-btn-primary.ant-btn-sm', 0);
        //wait for 确定按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-primary.ant-btn-sm');
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });  
        console.log('test end');
        
    })

    });