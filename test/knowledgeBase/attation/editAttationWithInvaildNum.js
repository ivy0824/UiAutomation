const { assert } = require('chai');
const path = require('path');
const timeout = require('../../../utils/timeout');
const init = require('../../../init');
const constant = require('../../../config/constant');
const event = require('../../../utils/event');
const precondition = require('../../../utils/precondition');
const element = require('../../../config/element');

// const filename = path.resolve(__dirname, __filename.split('.')[0]);
const filename = "编辑不合法关注点"
const pageUrl = element.pageUrl;
const qcItem = element.qcItem;


let constance;
describe('#knowledgeBase/editAttaionWithInvaildNum', function () {
	beforeEach(async() => {
		constance = await init();
		
	});

	afterEach(async() => {
		const {browser} = constance;
		await browser.close();
	});

	it('编辑不合法的质检关注点', async() => {
		await timeout(1000);
		const {
			page,
			browser
        } = constance;	

        //click knowledgeBase and qcItem
        const attation = await precondition.createAttation(page);
        console.log('attation is',attation);
        //edit attation
        await event.clickElement(page, qcItem.edit, 1);
         //wait for 取消按钮 appear
        await page.waitForSelector(qcItem.cancleButton);
        //change name 
        await event.clickAndType(page,qcItem.attationName_e,`chch`);
        await event.clickAndType(page,qcItem.attationMethod_e,`chchchchchch`);
        await event.clickAndType(page,qcItem.attationStandard_e,`chchchchchchchchchchchchchchchchchchchch`);
        await page.screenshot({ path: `images/${filename}.png` }); 
        //submmit
        await event.clickElement(page,qcItem.completeButton, 2);

        //screenshot
        await page.screenshot({ path: `images/${filename}.png` });
        //assert关注点长度
        const rēsult = await page.$eval(qcItem.invalidAssert,x=>x.innerText);
        console.log('rēsult is',rēsult);
        assert.equal(rēsult, '长度不可超过12个字符','rēsult = 长度不能可过12个字符');
        //assert 备注长度验证
        // const rēsult1 = await event.selectElement(page,'.ant-form-explain',1);
        // console.log('rēsult1 is',rēsult1);
        // assert.equal(rēsult1, '最多可输入50字，已超出4个字','rēsult = 最多可输入50字，已超出4个字')
        console.log('test end');
	
		})

    });