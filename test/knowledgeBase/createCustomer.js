const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#knowledgeBase/createCustomer', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create customer successfully', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //click knowledgeBase and customer
        await event.clickElement(page,'div.ant-menu-submenu-title',3);
        await event.clickElement(page,'li.ant-menu-item', 6);
        await event.changeUrlWait(page);
        console.log('click knowledgeBase and customer');
        
        var rand = Math.random().toFixed(3);
        //add customer
        await event.clickElement(page,'.anticon.anticon-plus',0);
        await event.changeUrlWait(page); 
        await event.clickAndType(page,'#name',`customer${rand}`);
        await event.clickAndType(page,'#note',`note${rand}`);
        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 创建按钮 show up
	    await page.waitForSelector('.anticon.anticon-plus');
        //screenshot
        await page.screenshot({path: filename + '.png'});
        //assert
        const ths = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(ths);
        assert.equal(ths, `customer${rand}`,'ths = `customer${rand}`');
        console.log('test end');
	
		})

    });