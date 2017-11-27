const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "创建项目"

let constance;
describe('#cooperate/productOrders/createProductOrder', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建项目', async() => {
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
		try {
            await page.waitForSelector('.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', {
                timeout: 100000
            });
        } catch (e) {
            console.error('没有找到下拉列表');
            console.error(e);
        }
	
		await event.clickElement(page, '.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', 1);
		try {
            await page.waitForSelector('.ant-select-selection-selected-value', {
                timeout: 100000
            });
        } catch (e) {
            console.error('选择没有被填入');
            console.error(e);
        }		
		console.log('选择关联订单');
		await timeout(10000);
		//select material
		await event.clickElement(page, '.createProductOrderFormContainer .ant-select-selection__rendered', 1);
		try {
            await page.waitForSelector('.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', {
                timeout: 100000
            });
        } catch (e) {
            console.error('没有找到下拉列表');
            console.error(e);
        }
		await event.clickElement(page, '.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', 12);
		try {
            await page.waitForSelector('.ant-select-selection-selected-value', {
                timeout: 100000
            });
        } catch (e) {
            console.error('选择没有被填入');
			console.error
		}
		console.log('选择产出物料');

		//input amount
		await event.clickAndType(page, '#amount','23');

		//select data
		await page.click('input[placeholder="开始日期"]');
		
		await page.click('td[title="2017年11月29日"]');
		console.log(1);
		await page.click('td[title="2017年11月30日"]');
		console.log('输入数量／选择时间');
		await timeout(10000);
		//select operator
		await event.clickElement(page, '.createProductOrderFormContainer .ant-select-selection__rendered', 2);
		try {
            await page.waitForSelector('.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', {
                timeout: 100000
            });
        } catch (e) {
            console.error('没有找到下拉列表');
            console.error(e);
		}
		
		await event.clickElement(page, '.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', 100);
		try {
            await page.waitForSelector('.ant-select-selection-selected-value', {
                timeout: 100000
            });
        } catch (e) {
            console.error('选择没有被填入');
			console.error
		}
		console.log('选择负责人');
		//input amount
		await event.clickAndType(page, '#amount','23');

		// // submit
		await page.click('.ant-btn-primary');

		// assert.equal(ths.length, 1, 'ths = 11');
		await page.screenshot({ path: `images/${filename}.png` });
		})		
	
});