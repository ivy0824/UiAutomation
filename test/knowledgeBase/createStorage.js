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

        //click knowledgeBase and storage
        await event.clickElement(page,'div.ant-menu-submenu-title',3);
        await event.clickElement(page,'li.ant-menu-item', 7);
        await event.changeUrlWait(page);
	    console.log('click knowledgeBase and storage');
    
        var rand = Math.random().toFixed(3);
	    //创建仓位
        await event.clickElement(page,'.anticon.anticon-plus',0);
        await event.changeUrlWait(page); 
        await event.clickElement(page,'.ant-select-search__field',0);
        await page.type('1thSpace1');
        await event.clickElement(page,'.ant-select-search__field',1);
        await page.type('2thSpace2');
        await event.clickElement(page,'.ant-select-search__field',2);
        await page.type('3thSpace3');
	
	    //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        event.sleep(3000)
        //screenshot
        await page.screenshot({path: filename + '.png'});
        //assert
        const ths = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(ths);
        assert.equal(ths, `customer${rand}`,'ths = `customer${rand}`');
        console.log('test end');
	
		})

    });