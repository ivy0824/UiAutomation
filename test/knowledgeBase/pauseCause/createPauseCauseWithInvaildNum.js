const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = "创建不合法暂停原因";

let constance;
describe('#knowledgeBase/createPauseCauseWithInvaildNum', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建不合法暂停原因', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //click knowledgeBase and pausecause
        try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/producePauseCauses", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转暂停原因页面错误');
            console.error(e);
                }
        console.log('进入暂停原因页面');
    
        var rand = Math.random().toFixed(6);
        //创建停产原因
        await event.clickElement(page,'.ant-btn.ant-btn-primary',0);
        await event.clickAndType(page,'#name',`sRea${rand}`);
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //assert
        const rēsult = await event.selectElement(page,'.ant-form-explain',0);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '停产原因长度不能超过10个字','rēsult = 停产原因长度不能超过10个字')
        console.log('test end');
	
		})

    });