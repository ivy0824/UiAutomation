const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "创建不合法关注点"

let constance;
describe('#knowledgeBase/createAttaionWithInvaildNum', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('创建不合法的质检关注点', async() => {
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
            console.error('跳转质检关注点页面错误');
            console.error(e);
                }
        console.log('进入质检关注点页面')

        var rand = Math.random().toFixed(6);
        //add attation
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 1);
        await event.clickAndType(page,'#name-0',`attation${rand}`);
        await event.clickAndType(page,'#method-0',`methodmethod1${rand}`);
        await event.clickAndType(page,'#standard-0',`standardstandardstandardstandardstandardstandard${rand}`);
        console.log(`add attation is atta${rand}`);

        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 2);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const rēsult = await page.$eval('.ant-form-explain',x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '关注点长度不可超过12个字符','rēsult = 关注点长度不能可过12个字符');
        console.log('test end');
	
		})

    });