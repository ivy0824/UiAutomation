const { assert } = require('chai');
const path = require('path');
const timeout = require('../../utils/timeout');
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "创建关注点"

let constance;
describe('#knowledgeBase/createAttaion', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create attation successfully', async() => {
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

        var rand = Math.random().toFixed(3);
        //add attation
        await event.clickElement(page,'.actionButtonContainer',1);
        await event.clickAndType(page,'#name-0',`atta${rand}`);
        await event.clickAndType(page,'#method-0',`meth${rand}`);
        await event.clickAndType(page,'#standard-0',`stand${rand}`);
        console.log(`add attation is atta${rand}`);

        //add one more attation
        await event.clickElement(page,'.anticon.anticon-plus',2);
        await event.clickAndType(page,'#name-1',`atta1${rand}`);
        await event.clickAndType(page,'#method-1',`meth${rand}`);
        await event.clickAndType(page,'#standard-1',`stand${rand}`);
        console.log(`add one more attation is atta1${rand}`);

        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert
        const result = await page.$eval( '.ant-table-row.ant-table-row-level-0>td',x=>x.innerText);
        console.log(`result is ${result}`);
        assert.equal(result, `atta${rand}`,'result = `atta${rand}`');
        console.log('test end');
	
		})

    });