const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = "创建仓位";

let constance;
describe('#knowledgeBase/createStorage', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建仓位', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //click knowledgeBase and storage
        try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/storages", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转仓位页面错误');
            console.error(e);
                }
        console.log('进入创建仓位页面');
    
        var rand = Math.random().toFixed(8);
	    //创建仓位
        await event.clickElement(page,'.ant-btn.ant-btn-primary',0);
        await page.waitForSelector('.ant-btn.ant-btn-ghost');
        //输入一级仓位
        await event.clickElementAndType(page,'.ant-input',1,`Stor${rand}`);
        //输入二维码
		await event.clickAndType(page, '#linkCode', `linkCode0001${rand}`)
		//输入备注
		await event.clickAndType(page, '#note','我是创建仓位的备注');
	    //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 2);
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //assert 一级仓位名称长度
        const rēsult = await page.$eval('.ant-form-explain',x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '仓位长度不能超过15个字','rēsult = 仓位长度不能超过15个字');
        //assert 二维码长度
        const rēsult1 = await event.selectElement(page,'.ant-form-explain',1);
        console.log('rēsult1 is',rēsult1);
        assert.equal(rēsult1, '最多可输入20字，已超出2个字','rēsult1 = 最多可输入20字，已超出2个字');
        //assert 备注长度验证
        const rēsult2 = await event.selectElement(page,'.ant-form-explain',2);
        console.log('rēsult2 is',rēsult2);
        assert.equal(rēsult2, '最多可输入50字，已超出2个字','rēsult2 = 最多可输入50字，已超出2个字')
        console.log('test end');
	
		})

    });