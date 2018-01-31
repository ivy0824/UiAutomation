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
const filename = "修改关注点类型"
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

	it('修改删除关注点类型', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	
        //创建一个关注点（默认会显示在第一行）
        const attationType = await precondition.createAttationType(page);
        console.log('attationType is',attationType);
        // await page.reload({});
        //点击编辑按钮
        await event.clickElement(page, qcItem.edit, 0);
        //wait for cancleButton appear
        await page.waitForSelector(qcItem.cancleButton_e);
        await page.screenshot({ path: `images/${filename}.png` });
        //change name 
        await event.clickElementAndType(page, qcItem.typeName_e, 1, `ch`)
        await page.screenshot({ path: `images/${filename}.png` }); 
        //submmit
        await event.clickElement(page,qcItem.completeButton_e, 1);
        console.log(1)
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const result = await page.$eval( '.ant-col-20',x=>x.innerText);
        console.log('result is', result);
        assert.equal(result,`${attationType}ch` ,'result = `${attationType}ch`');
        //删除关注点
        await event.clickElement(page, qcItem.delete, 0);
        await page.screenshot({ path: `images/${filename}.png` });
        await event.clickElement(page, qcItem.deleteAndYes, 0);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });  
        console.log('test end');
        
    })

    });