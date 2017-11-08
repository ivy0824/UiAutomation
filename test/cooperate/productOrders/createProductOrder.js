const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#cooperate/productOrders/createProductOrder', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create product order successfully', async() => {
			await timeout(1000);
			const {
				page,
				browser
			} = constance;	
			//创建项目
			//click 创建项目
			await event.clickElement(page,'span[style="padding-left: 8px;"]',0);
			await event.changeUrlWait(page);

			//select purchaseOrder
			await event.clickElement(page, '.createProductOrderFormContainer .ant-select-selection__rendered', 0);
			
			await page.focus('.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root');
			// await page.type('1');
			await event.clickElement(page, '.ant-select-dropdown-menu-item', 1);
			
			console.log('purchaseOrder');


			//select material
			await event.clickElement(page, '.createProductOrderFormContainer .ant-select-selection__rendered', 1);
			// await page.focus('.createProductOrderFormContainer .ant-select-selection__rendered .ant-select-search__field');
			// await page.type('1');
			await event.clickElement(page, '.ant-select-dropdown-menu-item', 1);
			console.log('material');

			//input amount
			// await event.clickAndType(page,'#amount','23');
			await event.clickAndType(page, '#amount','23');
			// await page.focus('#amount');
			// await page.type('23');
			await page.screenshot({path: filename + '.png'});

			//select data
			await page.click('input[placeholder="开始日期"]');
			await page.click('td[title="2017年11月29日"]');
			await page.click('td[title="2017年11月30日"]');
			console.log('data');

			//select operator
			await event.clickElement(page, '.createProductOrderFormContainer .ant-select-selection__rendered', 2);
			await page.focus('.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root');
			// await page.type('1');
			await event.clickElement(page, '.ant-select-dropdown-menu-item', 1);
			console.log('operator');

			// submit
			await page.click('.ant-btn-primary');

			// assert.equal(ths.length, 1, 'ths = 11');
			await page.screenshot({path: filename + '.png'});
		})		
	
});