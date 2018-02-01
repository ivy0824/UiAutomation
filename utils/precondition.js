const puppeteer = require('puppeteer');
const timeout = require('./timeout');
const constant = require('../config/constant');
const event = require('../utils/event');
const element = require('../config/element');
const pageUrl = element.pageUrl;
const common = element.common;
const unit = element.unit;
const productivityStandard = element.productivityStandard;
const workStation = element.workStation;
const qcItem = element.qcItem;
const customer = element.customer;
const storage = element.storage;
const pauseCause = element.pauseCause;

const createMaterial = async (page) => {
	try {
            await page.goto(pageUrl.materials, {
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

const createUnit = async (page) => {
    const filename = "创建不合法单位1"
    //go to unit page
    await event.goToPage(page,pageUrl.units,unit.breakCrumb)         
    //click 创建单位
    await event.clickElement(page,unit.createUnitButton,0);
    await event.changeUrlWait(page);
    var rand = Math.random().toFixed(3);
    //input name and note
    await event.clickAndType(page, unit.name,`unit${rand}`);
    await event.clickAndType(page, unit.note,'我是创建单位的备注');
    await page.screenshot({ path: `images/${filename}.png` });
    //submmit
    await event.clickElement(page,unit.completeButton, 2);
    
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,unit.cancleButton);
    return `unit${rand}`;
}

const createWorkStation = async (page) => {
    //go to WorkStation page
    await event.goToPage(page,pageUrl.workStations,workStation.breakCrumb) 
    //click 创建工位
    await event.clickElement(page,workStation.createWorkStationButton, 4)
    var rand = Math.random().toFixed(3);
    //输入一级仓位 
    await event.clickAndType(page,workStation.name,`sta${rand}`)
    //输入二维码
    await event.clickAndType(page,workStation.QRCode,`linkCode${rand}`)
    //输入备注
    await event.clickAndType(page, workStation.note,'我是创建工位的备注');
    //submit
    await event.clickElement(page,workStation.completeButton, 2);
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,workStation.cancleButton);
    return `sta${rand}`;
}

const createAttationType = async (page) => {
    //go to attation page
    await event.goToPage(page,pageUrl.qcItems,qcItem.breakCrumb)      
    var rand = Math.random().toFixed(3);
    //添加分类
    await event.clickElement(page,qcItem.createQcItemButton, 0);
    //wait for cancleButton appear
    await page.waitForSelector(qcItem.cancleButton);
    await event.clickAndType(page,qcItem.typeName,`class${rand}`);        
    //submit
    await event.clickElement(page,qcItem.completeButton, 2);
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,qcItem.cancleButton);
    return `class${rand}`;
}
    
const createAttation = async (page) => {
    //go to attation page
    await event.goToPage(page,pageUrl.qcItems,qcItem.breakCrumb) 
    var rand = Math.random().toFixed(3);
    //add attation
    await event.clickElement(page,qcItem.createQcItemButton, 1);
    //wait for cancleButton appear
    await page.waitForSelector(qcItem.cancleButton);
    await event.clickAndType(page,qcItem.attationName,`atta${rand}`);
    await event.clickAndType(page,qcItem.attationMethod,`meth${rand}`);
    await event.clickAndType(page,qcItem.attationStandard,`stand${rand}`);

    //add one more attation
    // await event.clickElement(page,'.anticon.anticon-plus',2);
    // await event.clickAndType(page,'#name-1',`atta1${rand}`);
    // await event.clickAndType(page,'#method-1',`meth${rand}`);
    // await event.clickAndType(page,'#standard-1',`stand${rand}`);
    // console.log(`add one more attation is atta1${rand}`);

    //submit
    await event.clickElement(page,qcItem.completeButton, 2);
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,qcItem.cancleButton);
    return `atta${rand}`;
}

const createCustomer = async (page) => {
    //go to customer page
    await event.goToPage(page,pageUrl.customers,customer.breakCrumb) 
    var rand = Math.random().toFixed(3);
    //add customer
    await event.clickElement(page,customer.createCustomerButton,0);
    await page.waitForSelector(customer.cancleButton);
    await event.clickAndType(page,customer.name,`cust${rand}`);
    await event.clickAndType(page,customer.note,'我是客户的备注');
    //submit
    await event.clickElement(page,customer.completeButton, 2);
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,customer.cancleButton);
    return `cust${rand}`;
}

const createStorage = async (page) => {
    //go to storage page
    await event.goToPage(page,pageUrl.storages,customer.breakCrumb)  
    var rand = Math.random().toFixed(3);
    //创建仓位
    await event.clickElement(page,storage.createStorageButton,0);
    await page.waitForSelector(storage.cancleButton);
    //输入一级仓位
    await event.clickAndType(page,storage.name,`Stor${rand}`)
    //输入二维码
    await event.clickAndType(page, storage.QRCode, `linkCode${rand}`)
    //输入备注
    await event.clickAndType(page, storage.note,'我是创建仓位的备注');
    //submmit
    await event.clickElement(page,storage.completeButton, 2);
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,storage.cancleButton);
    return `stor${rand}`;
}

const createPauseCause = async (page) => {
    //go to PauseCause page
    await event.goToPage(page,pageUrl.pauseCauses, pauseCause.breakCrumb) 
    var rand = Math.random().toFixed(3);
    //创建停产原因
    await event.clickElement(page,pauseCause.createPauseCausesButton,0);
    await timeout(1000);
    await event.clickAndType(page,pauseCause.name,`sRea${rand}`);
    //submit
    await event.clickElement(page,pauseCause.completeButton, 1);
    //wait for 取消按钮 disappear
    await event.waitForDisappear(page,pauseCause.cancleButton);
    return `sRea${rand}`;
}

module.exports = {
    createMaterial,
    createUnit,
    createWorkStation,
    createAttationType,
    createAttation,
    createCustomer,
    createStorage,
    createPauseCause, 
};