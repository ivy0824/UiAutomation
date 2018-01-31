const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

const filename = "创建不合法暂停原因";
const pageUrl = element.pageUrl;
const pauseCause = element.pauseCause;

let constance;
describe('#knowledgeBase/createPauseCauseWithInvaildNum', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建不合法暂停原因', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //go to pauseCauses page
        await event.goToPage(page, pageUrl.pauseCauses, pauseCause.breakCrumb)
        var rand = Math.random().toFixed(6);
        //创建停产原因
        await event.clickElement(page,pauseCause.createPauseCausesButton,0);
        await page.screenshot({path: `images/${filename}.png`});
        await event.clickAndType(page,pauseCause.name,`sRea${rand}`);
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //assert
        const rēsult = await event.selectElement(page,pauseCause.invalidAssert,0);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '停产原因长度不能超过10个字','rēsult = 停产原因长度不能超过10个字')
        console.log('test end');
	
		})

    });