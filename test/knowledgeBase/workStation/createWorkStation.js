const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

const filename = "创建工位";
const pageUrl = element.pageUrl;
const workStation = element.workStation;

let constance;
describe('#knowledgeBase/createWorkStation', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create workStation successfully', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

		//go to workStation page
        await event.goToPage(page, pageUrl.workStations, workStation.breakCrumb)
		//click 创建工位
		await event.clickElement(page, workStation.createWorkStationButton, 0)
		var rand = Math.random().toFixed(3);
		//input workStation  
		await event.clickAndType(page, workStation.name, `Sta1${rand}`)
		//输入二维码
		await event.clickAndType(page, workStation.QRCode, `qr${rand}`)
		//输入备注
		await event.clickAndType(page, workStation.note, '我是创建工位的备注');
		//submit
		await event.clickElement(page, workStation.completeButton, 0);
		//wait for 取消按钮 disappear
        await event.waitForDisappear(page, workStation.cancleButton);
		//screenshot
		await page.screenshot({ path: `images/${filename}.png` });
		//assert
		const ths = await page.$eval( workStation.firstWorkStation,x=>x.innerText);
		console.log(ths);
		// assert.equal(ths, `Sta1${rand}`,'ths = `Sta1${rand}`');
		console.log('test end');
	
		})

    });