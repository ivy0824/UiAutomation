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

	it('create storage successfully', async() => {
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
    
        var rand = Math.random().toFixed(3);
	    //创建仓位
        await event.clickElement(page,'.anticon.anticon-plus',0);
        //输入一级仓位
        await event.clickElementAndType(page,'.ant-input.ant-input-lg', 0,`Stor${rand}`);
        //输入二维码
		await event.clickElementAndType(page, '.ant-input.ant-input-lg', 1, `er${rand}`)
		//输入备注
		await event.clickAndType(page, '#note','我是创建仓位的备注');
	
	    //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        await event.waitForDisappear(page,'.ant-select-search__field');
        //screenshot
        await page.screenshot({path: `images/${filename}.png`});
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //assert
        const result = await page.$$eval('.ant-table-row.ant-table-row-level-0>td:nth-child(1)', (divs,rand) => {
            for(let i = 0;i <divs.length;i++){
                if (divs[i].innerText = `Stor${rand}`){
                    return divs[i].innerText;
                }
            }
                               
        },rand);
        console.log(`result is ${result}`);
        assert.equal(result, `Stor${rand}`,'result = `Stor${rand}`');
        console.log('test end');
	
		})

    });