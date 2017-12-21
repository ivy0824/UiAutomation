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
    //修改前停产原因名称
    const rēsultB = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
    console.log('resultB is',rēsultB);
    //点击修改按钮
    await event.clickElement(page,'.anticon.anticon-edit.undefined',0);
    //wait for 取消按钮 appear
    await page.waitForSelector('.ant-btn.ant-btn-ghost');
    //修改停产原因名称
    await event.clickAndType(page,'#name','ch');
    //sumnit
    await event.clickElement(page,'.ant-btn.ant-btn-primary',1);
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
    //screenshot
    await page.screenshot({path: `images/${filename}.png`});
    //assert
    const rēsultA = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
    console.log('rēsultA is',rēsultA);
    assert.equal(rēsultA, `${rēsultB}ch`,'rēsult = `${rēsultB}ch`');

    //stop pausecause
    await event.clickElement(page,'.component-link',1);
    //wait for 确定按钮 appear
    await page.waitForSelector('.ant-btn.ant-btn-primary.ant-btn-sm');
    //click 确定按钮 
    await event.clickElement(page, '.ant-btn.ant-btn-primary.ant-btn-sm',0);

    console.log('test end');

    })

});