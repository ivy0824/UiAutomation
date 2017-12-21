const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');

const filename = "创建暂停原因";

let constance;
describe('#knowledgeBase/createPauseCause', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('create pauseCause successfully', async() => {
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
    
        var rand = Math.random().toFixed(3);
        //创建停产原因
        await event.clickElement(page,'.anticon.anticon-plus',0);
        await event.clickAndType(page,'#name',`sRea${rand}`);

        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //assert
        const result = await page.$$eval('.ant-table-row.ant-table-row-level-0>td:nth-child(1)', (divs,rand) => {
            for(let i = 0;i <divs.length;i++){
                if (divs[i].innerText = `sRea${rand}`){
                    return divs[i].innerText;
                }
            }
                               
        },rand);
        console.log('result is', result);
        console.log('test end');
	
		})

    });