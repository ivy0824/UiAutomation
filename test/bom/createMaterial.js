const { assert } = require('chai');
const path = require('path');
const timeout = ('../../utils/timeout.js')
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');

const filename = "创建物料";

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
		try {
            await page.goto("https://web-beta.blacklake.cn/bom/materials/list", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转物料列表页面错误');
            console.error(e);
				}
					console.log('进入bom页面')

		//创建物料

		//click 创建物料
		await event.clickElement(page,'.ant-btn.ant-btn-primary',0);
		await event.changeUrlWait(page);
		console.log('click 创建物料1');

		//input material name

		var rand = Math.random().toFixed(6);

		await event.clickAndType(page,'#name',`material-name${rand}`);
		console.log(`add material name is material-name${rand}`);

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
		await event.clickElement(page,'.ant-btn.ant-btn-primary',2);
		//wait for window disappear
		await event.waitForDisappear(page, '.ant-btn.ant-btn-ghost');

		//screenshot
        await page.screenshot({ path: `images/${filename}.png`});

		})
	

  });
