const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "创建不合法关注点"
const pageUrl = element.pageUrl;
const qcItem = element.qcItem;

let constance;
describe('#knowledgeBase/createAttaionWithInvaildNum', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建不合法的质检关注点', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //go to qcItem page
        await event.goToPage(page, pageUrl.qcItems, qcItem.breakCrumb)
        var rand = Math.random().toFixed(6);
        //add attation
        await event.clickElement(page, qcItem.createQcItemButton, 1);
        await page.waitForSelector(qcItem.cancleButton);
        await event.clickAndType(page,qcItem.attationName,`attation${rand}`);
        await event.clickAndType(page,qcItem.attationMethod,`methodmethod1${rand}`);
        await event.clickAndType(page,qcItem.attationStandard,`standardstandardstandardstandardstandardstandard${rand}`);
        console.log(`add attation is atta${rand}`);
        //submit
        await event.clickElement(page,qcItem.completeButton, 2);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const rēsult = await page.$eval('.ant-form-explain',x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '关注点长度不可超过12个字符','rēsult = 关注点长度不能可过12个字符');
        console.log('test end');
	
		})

    });