const puppeteer = require('puppeteer');
const constant = require('../config/constant');
const event = require('../utils/event')

const createMaterial = async (page) => {
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
        console.log('进入物料页面');

		//创建物料
		//click 创建物料
		await page.click('span[style="padding-left: 8px;"]');
		await event.changeUrlWait(page);
		console.log('click 创建物料');
		
		//input material name
		var rand = Math.random().toFixed(3);		
		await event.clickAndType(page,'#name',`materialName${rand}`);
		console.log(`material name is materialname${rand}`);

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
		//wait for window disappear
		await event.waitForDisappear(page, '.ant-radio-inner');
        console.log('create material successfully');
        return `materialName${rand}`;

}
    
const createAttation = async (page) => {
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
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 1);
        await event.clickAndType(page,'#name-0',`atta${rand}`);
        await event.clickAndType(page,'#method-0',`meth${rand}`);
        await event.clickAndType(page,'#standard-0',`stand${rand}`);
        console.log(`add attation is atta${rand}`);

        //add one more attation
        // await event.clickElement(page,'.anticon.anticon-plus',2);
        // await event.clickAndType(page,'#name-1',`atta1${rand}`);
        // await event.clickAndType(page,'#method-1',`meth${rand}`);
        // await event.clickAndType(page,'#standard-1',`stand${rand}`);
        // console.log(`add one more attation is atta1${rand}`);

        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        return `atta${rand}`;
}

const createAttationType = async (page) => {
    try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/qcItems", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转关注点页面错误');
            console.error(e);
                }
        console.log('进入质检关注点页面')
        
        var rand = Math.random().toFixed(3);
        //添加分类
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        await event.clickAndType(page,'#name',`class${rand}`);        
        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 2);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        //assert
        // const result = await page.$eval( '.ant-row',x=>x.innerText);
        // console.log(`result is ${result}`);
        // assert.equal(result, `class${rand}`,'result = `class${rand}`');
        return `class${rand}`;
}

const createCustomer = async (page) => {
    try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/customers", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转客户页面错误');
            console.error(e);
                }
        console.log('进入创建客户页面')

        var rand = Math.random().toFixed(3);
        //add customer
        await event.clickElement(page,'.anticon.anticon-plus',0);
        await event.changeUrlWait(page); 
        await event.clickAndType(page,'#name',`cust${rand}`);
        await event.clickAndType(page,'#note',`note${rand}`);
        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        return `cust${rand}`;
}

const createPauseCause = async (page) => {
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
        await event.clickElement(page,'.ant-btn.ant-btn-primary',0);
        await event.clickAndType(page,'#name',`sRea${rand}`);

        //submit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 1);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        return `sRea${rand}`;
}

const createUnit = async (page) => {
    const filename = "创建不合法单位1"
    try {
        await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/units", {
            timeout: 100000
        });
        await page.waitForSelector(".ant-breadcrumb-link", {
            timeout: 100000
        });
    } catch (e) {
        console.error('跳转单位页面错误');
        console.error(e);
            }
	console.log('进入单位页面')
            
    //click 创建单位
    await page.click('.anticon.anticon-plus ');
    await event.changeUrlWait(page);
    var rand = Math.random().toFixed(3);
    //input name and note
    await event.clickAndType(page, '#name',`unit${rand}`);
    await event.clickAndType(page, '#note',`note${rand}`); 
    //输入备注
    await event.clickAndType(page, '#note','我是创建单位的备注');
    await page.screenshot({ path: `images/${filename}.png` });
    //submmit
    await event.clickElement(page,'.ant-btn.ant-btn-primary', 2);
    
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
    return `unit${rand}`;
}

const createWorkStation = async (page) => {
    try {
            await page.goto("https://web-beta.blacklake.cn/knowledgeManagement/workStations", {
                timeout: 100000
            });
            await page.waitForSelector(".ant-breadcrumb-link", {
                timeout: 100000
            });
        } catch (e) {
            console.error('跳转工位页面错误');
            console.error(e);
				}
		console.log('进入工位页面')

		//click 创建工位
		await event.clickElement(page, '.ant-btn', 4)
		var rand = Math.random().toFixed(3);
		//input storage  
		await event.clickElementAndType(page, '.ant-input.ant-input-lg', 0, `sta1${rand}`)
		//输入二维码
		await event.clickElementAndType(page, '.ant-input.ant-input-lg', 1, `er${rand}`)
		//输入备注
		await event.clickAndType(page, '#note','我是创建工位的备注');
		//submit
		await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
		//wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        return `sta1${rand}`;
}

const createStorage = async (page) => {
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
        await event.clickElementAndType(page,'.ant-input.ant-input-lg', 0,`stor1${rand}`);
        //输入二维码
		await event.clickElementAndType(page, '.ant-input.ant-input-lg', 1, `er${rand}`)
		//输入备注
		await event.clickAndType(page, '#note','我是创建仓位的备注');
	
	    //submmit
        await event.clickElement(page,'.ant-btn.ant-btn-primary', 0);
        await event.waitForDisappear(page,'.ant-select-search__field');
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,'.ant-btn.ant-btn-ghost');
        return `stor1${rand}`;
}

module.exports = {
    createMaterial,
    createAttation,
    createAttationType,
    createCustomer,
    createPauseCause,
    createStorage,
    createUnit,
    createWorkStation,
};