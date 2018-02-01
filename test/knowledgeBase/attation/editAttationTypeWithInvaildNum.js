const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const puppeteer = require('puppeteer');
const precondition = require('../../../utils/precondition');
const element = require('../../../config/element');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "修改不合理关注点类型"
const pageUrl = element.pageUrl;
const qcItem = element.qcItem;

let constance;
describe('#knowledgeBase/editAttationTypeWithInvaildNum', function () {
	before(async() => {
		constance = await init();
		
	});

	after(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('修改不合理关注点类型', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	
        //创建一个关注点（默认会显示在第一行）
        const attationType = await precondition.createAttationType(page);
        console.log('attationType is',attationType);
        await page.screenshot({ path: `images/${filename}.png` });
        //点击编辑按钮
        await event.clickElement(page, qcItem.edit, 0);
        await page.screenshot({ path: `images/${filename}.png` });
        //change name 
        await event.clickElementAndType(page, qcItem.typeName_e, 1, `chch`);
        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });;
        //assert
        const result = await page.$eval( 'div[style="color: rgb(244, 51, 91);"]' ,x=>x.innerText);
        console.log('result is', result);
        assert.equal(result,'分类长度不可超过12个字符' ,'result = 分类长度不可超过12个字符');
        console.log('test end');
        
    })

    });