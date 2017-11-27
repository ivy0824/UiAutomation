const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

const filename = "创建质检分类";

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
        
        var rand = Math.random().toFixed(3);
        //添加分类
        await event.clickElement(page,'.actionButtonContainer',0);
        await event.clickAndType(page,'#name',`class${rand}`);
        // const expect = `class${rand}`;
        // console.log('except='+expect);
        
        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        await timeout(20000);
        //assert
        const result = await page.$eval( '.ant-row',x=>x.innerText);
        console.log(`result is ${result}`);
        assert.equal(result, `class${rand}`,'result = `class${rand}`');

        })
    

    });