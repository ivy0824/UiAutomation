const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#knowledgeBase/createMachine', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create machine successfully', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        ///click knowledgeBase and machine
	await event.clickElement(page,'div.ant-menu-submenu-title',3);
	await event.clickElement(page,'li.ant-menu-item', 4);
	await event.changeUrlWait(page);
	console.log('click knowledgeBase and machine');

	//click 创建工位
	await page.click('.anticon.anticon-plus');
	await event.changeUrlWait(page);

	var rand = Math.random().toFixed(3);
	//input storage  
	await event.clickElementAndType(page,'.ant-select-search__field',0,`Sta1${rand}`);
	await event.clickElementAndType(page,'.ant-select-search__field',1,`Sta2${rand}`);

	//add second storage
	await page.click('.anticon.anticon-plus-square-o');
	await event.clickElementAndType(page,'.ant-select-search__field',2,`Sta3${rand}`);


	//submmit
	await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
	//wait for 创建工位按钮 show up
	await page.waitForSelector('.anticon.anticon-plus');
	//screenshot
	await page.screenshot({path: filename + '.png'});
	//assert
    const ths = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
    console.log(ths);
    assert.equal(ths, `Sta1${rand}`,'ths = `Sta1${rand}`');
	console.log('test end');
	
		})

    });