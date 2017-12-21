const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const precondition = require('../../../utils/precondition');

const filename = "修改不合法暂停原因";

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
   const pauseCause = await precondition.createPauseCause(page);
   console.log('pauseCause is',pauseCause);

    //点击修改按钮
    await event.clickElement(page,'.anticon.anticon-edit.undefined',0);
    //wait for 取消按钮 appear
    await page.waitForSelector('.ant-btn.ant-btn-ghost');
    //修改停产原因名称
    await event.clickAndType(page,'#name','chchchchchch');
    //screenshot
    await page.screenshot({path: `images/${filename}.png`});
    //assert
    const rēsult = await event.selectElement(page,'.ant-form-explain',0);
    console.log('rēsult is',rēsult);
    assert.equal(rēsult, '停产原因长度不能超过10个字','rēsult = 停产原因长度不能超过10个字')
    console.log('test end');

    })

});