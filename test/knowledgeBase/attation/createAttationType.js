const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

const filename = "创建质检分类";
const pageUrl = element.pageUrl;
const qcItem = element.qcItem;

let constance;
describe('#knowledgeBase/createAttaionType', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create attation type successfully', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //go to qcItem page
        await event.goToPage(page, pageUrl.qcItems, qcItem.breakCrumb);
        var rand = Math.random().toFixed(3);
        //添加分类 
        await event.clickElement(page,qcItem.createQcItemButton, 0);
        await page.screenshot({path: `images/${filename}.png`});
        await page.waitForSelector(qcItem.cancleButton);
        await event.clickAndType(page,qcItem.typeName,`class${rand}`);       
        //submit
        await event.clickElement(page, qcItem.completeButton, 2);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page, qcItem.cancleButton);
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        await timeout(20000);
        //assert
        const result = await page.$eval( '.ant-row',x=>x.innerText);
        console.log(`result is ${result}`);
        assert.equal(result, `class${rand}`,'result = `class${rand}`');

        })
    

    });