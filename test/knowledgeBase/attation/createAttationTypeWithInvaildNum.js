const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = "创建不合法质检分类";

let constance;
describe('#knowledgeBase/createAttaionTypeWithInvaildNum', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建不合法质检分类', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //click knowledgeBase and qcItem
        try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/qcItems", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转关注点页面错误');
            console.error(e);
                }
        console.log('进入质检关注点页面')
        
        var rand = Math.random().toFixed(6);
        //添加分类
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        await event.clickAndType(page,'#name',`class${rand}`);
        
        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //assert
        const result = await page.$eval( '.ant-form-explain',x=>x.innerText);
        console.log(`result is ${result}`);
        assert.equal(result, '分类长度不可超过12个字符','result = 分类长度不可超过12个字符');

        })
    

    });