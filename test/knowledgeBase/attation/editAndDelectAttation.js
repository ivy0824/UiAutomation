const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const puppeteer = require('puppeteer');
const precondition = require('../../../utils/precondition');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "修改关注点"

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
        const attation = await precondition.createAttation(page);
        console.log('attation is',attation);
        //点击编辑按钮
        await event.clickElement(page, '.anticon.anticon-edit', 1);
         //wait for 取消 appear
        await page.waitForSelector('.ant-btn.ant-btn-ghost');
        //change name 
        await event.clickAndType(page,'#name',`ch`);
        await event.clickAndType(page,'#method',`ch`);
        await event.clickAndType(page,'#standard',`ch`);
        await page.screenshot({ path: `images/${filename}.png` }); 
        //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log('result is', result);
        assert.equal(result,`${attation}ch` ,'result = `${attation}ch`');
        //删除关注点
        await event.clickElement(page, '.anticon.anticon-delete', 1);
        await page.screenshot({ path: `images/${filename}.png` });
        await event.clickElement(page, '.ant-btn.ant-btn-primary.ant-btn-sm', 0);
        //wait for 确定按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-primary.ant-btn-sm');
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });  
        console.log('test end');
        
    })

    });