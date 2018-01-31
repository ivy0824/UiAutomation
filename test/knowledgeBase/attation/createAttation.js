const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "创建关注点"
const pageUrl = element.pageUrl;
const qcItem = element.qcItem;

let constance;
describe('#knowledgeBase/createAttaion', function () {
	beforeEach(async() => {
		constance = await init();		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create attation successfully', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //go to qcItem page
        await event.goToPage(page, pageUrl.qcItems, qcItem.breakCrumb)
        //创建质检关注点
        var rand = Math.random().toFixed(3);
        //add attation
        await event.clickElement(page,qcItem.createQcItemButton,1);
        await page.waitForSelector(qcItem.cancleButton);
        await event.clickAndType(page,qcItem.attationName,`atta${rand}`);
        await event.clickAndType(page,qcItem.attationMethod,`meth${rand}`);
        await event.clickAndType(page,qcItem.attationStandard,`stand${rand}`);
        console.log(`add attation is atta${rand}`);

        //add one more attation
        await event.clickElement(page,qcItem.addAttation,0);
        await event.clickAndType(page,qcItem.attationName1,`atta1${rand}`);
        await event.clickAndType(page,qcItem.attationMethod1,`meth${rand}`);
        await event.clickAndType(page,qcItem.attationStandard1,`stand${rand}`);
        console.log(`add one more attation is atta1${rand}`);

        //submit
        await event.clickElement(page,qcItem.completeButton, 2);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,qcItem.cancleButton);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(`result is ${result}`);
        assert.equal(result, `atta${rand}`,'result = `atta${rand}`');
        console.log('test end');
	
		})

    });