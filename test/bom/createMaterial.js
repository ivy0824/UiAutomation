const { assert } = require('chai');
const path = require('path');
const timeout = ('../../utils/timeout.js')
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

const filename = path.resolve(__dirname, __filename.split('.')[0]);

let constance;
describe('#bom/createMaterial', function () {
  before(async () => {
    constance = await init();
  });

  after(async () => {
    const { browser } = constance;
    await browser.close();
  });

    it('create material successfully', async () => {
		const { page, browser } = constance;//const page = constance.page

		// click Bom 
		await event.clickElement(page,'div.ant-menu-submenu-title',1);

		console.log('click bom');

		//click metarial
		await event.clickElement(page, 'li.ant-menu-item', 3);
		await event.changeUrlWait(page);
		console.log('click material');

		//创建物料

		//click 创建物料
		await page.click('span[style="padding-left: 8px;"]');
		await event.changeUrlWait(page);
		console.log('click 创建物料1');

		//input material name

		var rand = Math.random().toFixed(6);
		
		await event.clickAndType(page,'#name',`material-name${rand}`);
		console.log('input material name');

		//input code
		await event.clickAndType(page,'#code',`code${rand}`);
		console.log('input material code');

		//input des
		await event.clickAndType(page,'#desc','desc3');
		console.log('input material des');

		//select unit 
		await event.clickElement(page,'.ant-select-selection__placeholder',0);
		await event.clickElement(page,'.ant-select-dropdown-menu-item',0);
		console.log('input material unit');
		

		//select material type 0-原料；1-半成品；2-成品
		await event.clickElement(page,'.ant-radio-inner',constant.materialType);
		console.log('material type is '+constant.materialType);
		console.log('select material type');

		//click submit
		await event.clickElement(page,'.ant-btn.ant-btn-primary',0);
		await page.screenshot({path: filename + '.png'});
		console.log('test end');
  
    })
  });
