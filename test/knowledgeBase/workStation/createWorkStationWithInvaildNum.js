const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = "创建工位";

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
		try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/workStations", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转工位页面错误');
            console.error(e);
				}
		console.log('进入工位页面')

		//click 创建工位
		await event.clickElement(page, '.ant-btn', 4)
		var rand = Math.random().toFixed(3);
		//input storage  
		await event.clickElementAndType(page, '.ant-input.ant-input-lg', 0, `Sta1${rand}`)
		//输入二维码
		await event.clickElementAndType(page, '.ant-input.ant-input-lg', 1, `er${rand}`)
		//输入备注
		await event.clickAndType(page, '#note','我是创建工位的备注');
		//submit
		await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
		//wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
		//screenshot
		await page.screenshot({ path: `images/${filename}.png` });
		//assert
		const ths = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
		console.log(ths);
		// assert.equal(ths, `Sta1${rand}`,'ths = `Sta1${rand}`');
		console.log('test end');
	
		})

    });