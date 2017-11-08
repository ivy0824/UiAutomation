const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

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

        //click knowledgeBase and qcItem
        await event.clickElement(page,'div.ant-menu-submenu-title',3);
        await event.clickElement(page,'li.ant-menu-item', 5);
        await event.changeUrlWait(page);
        console.log('click knowledgeBase and qcItem');

         var rand = Math.random().toFixed(3);
        //add attation
        await event.clickElement(page,'.actionButtonContainer',1);
        await event.clickAndType(page,'#name-0',`atta${rand}`);
        await event.clickAndType(page,'#method-0',`meth${rand}`);
        await event.clickAndType(page,'#standard-0',`stand${rand}`);
        console.log('add attation');

        //add one more attation
        await event.clickElement(page,'.anticon.anticon-plus',2);
        await event.clickAndType(page,'#name-1',`atta${rand}`);
        await event.clickAndType(page,'#method-1',`meth${rand}`);
        await event.clickAndType(page,'#standard-1',`stand${rand}`);
        console.log('add one more attation');

        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 创建按钮 show up
	    await page.waitForSelector('.anticon.anticon-plus');
        //screenshot
        await page.screenshot({path: filename + '.png'});
        //assert
        const ths = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(ths);
        assert.equal(ths, `atta${rand}`,'ths = `atta${rand}`');
        console.log('test end');
	
		})

    });