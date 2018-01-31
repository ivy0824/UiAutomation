const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const element = require('../../../config/element');

const filename = "创建暂停原因";
const pageUrl = element.pageUrl;
const pauseCause = element.pauseCause;

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

        //go to pauseCauses page
        await event.goToPage(page, pageUrl.pauseCauses, pauseCause.breakCrumb)
        var rand = Math.random().toFixed(3);
        //创建停产原因
        await event.clickElement(page, pauseCause.createPauseCausesButton,0);
        await page.screenshot({path: `images/${filename}.png`});
        await event.clickAndType(page, pauseCause.name,`sRea${rand}`);
        //submit
        await event.clickElement(page, pauseCause.completeButton, 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page, pauseCause.cancleButton);
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