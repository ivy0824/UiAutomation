const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#knowledgeBase/createAttaionType', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create attation type successfully', async() => {
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
        //添加分类
        await event.clickElement(page,'.actionButtonContainer',0);
        await event.clickAndType(page,'#name',`class${rand}`);
        // const expect = `class${rand}`;
        // console.log('except='+expect);
        
        //submit
        await event.clickElement(page,'.actionButtonContainer', 0);
        //wait for 创建按钮 show up
	    await page.waitForSelector('.anticon.anticon-plus');
        //screenshot
        await page.screenshot({path: filename + '.png'});
        //assert
        const ths = await page.$eval( '.ant-row',x=>x.innerText);
        console.log(ths);
        assert.equal(ths, `class${rand}`,'ths = `class${rand}`');

        })
    

    });