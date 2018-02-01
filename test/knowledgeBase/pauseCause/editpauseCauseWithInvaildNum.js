const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const precondition = require('../../../utils/precondition');
const element = require('../../../config/element');

const filename = "修改不合法暂停原因";
const pageUrl = element.pageUrl;
const pauseCause = element.pauseCause;

let constance;
describe('#knowledgeBase/editPauseCauseWithInvaildNum', function () {
	  beforeEach(async() => {
		  constance = await init();	
	  });

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('修改不合法暂停原因', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

     //click knowledgeBase and pausecause
    const pauseCauseName = await precondition.createPauseCause(page);
    console.log('pauseCause is',pauseCauseName);

    //点击修改按钮
	await event.clickElement(page, pauseCause.edit, 0);
    //wait for 取消按钮 appear
    await page.waitForSelector(	pauseCause.cancleButton);
    //修改停产原因名称
    await event.clickAndType(page,pauseCause.name,'chchchchchch');
    //screenshot
    await page.screenshot({path: `images/${filename}.png`});
    //assert
    const rēsult = await event.selectElement(page,pauseCause.invalidAssert,0);
    console.log('rēsult is',rēsult);
    assert.equal(rēsult, '停产原因长度不能超过10个字','rēsult = 停产原因长度不能超过10个字')
    console.log('test end');

    })

});