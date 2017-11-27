const {assert} = require('chai');
const path = require('path');
const timeout = ('../../utils/timeout.js')
const init = require('../../init');
const constant = require('../../config/constant');
const event = require('../../utils/event');
const precondition = require('../../utils/precondition');

const filename = "添加质检信息"
let constance;

describe('给物料添加质检信息', function () {
    before(async() => {
        constance = await init();
    });

    after(async() => {
        const {
            browser
        } = constance;
        await browser.close();
    });
    

    it('添加质检信息操作', async() => {
        const {
            page,
            browser
        } = constance;
        
        //创建一个物料
        await precondition.createMaterial(page);

        //点击生产信息的补充按钮
        await event.clickElement(page, '.anticon.anticon-plus', 2);
        try {
            await page.waitForSelector('.ant-select-selection__placeholder', {
                timeout: 100000
            });
        } catch (e) {
            console.error('没有找到modal');
            console.error(e);
        }
        console.log('点击补充按钮');
        //打开第一个次品类型的下拉列表
        await event.clickElement(page, '.ant-select-selection__rendered', 0);
        try {
            await page.waitForSelector('.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root', {
                timeout: 100000
            });
        } catch (e) {
            console.error('没有找到下拉列表');
            console.error(e);
        }
        console.log('打开质检类型下拉列表');
        
        //选择第一个次品类型
        // await event.clickAndType(page, '.ant-select-search__field','首检');
        await event.clickElement(page, '.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', 0)
        
        
        //选择和输入质检数量的百分比
        // await event.clickElement(page, '.ant-radio-input', 0);
        // await event.clickAndType(page, '.ant-input-number-input', '10');
        //选择质检类型 2:关注点记录，3:单体记录，4:仅反馈结果
        await event.clickElement(page, '.ant-radio-input', 2);

        //选择关注点---打开下拉列表
        await event.clickElement(page, '.ant-select-selection__rendered', 1);
        try {
            await page.waitForSelector('.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root', {
                timeout: 100000
            });
        } catch (e) {
            console.error('没有找到下拉列表');
            console.error(e);
        }
        console.log('打开关注点下拉列表');
        //选择关注点类型
        await event.clickElement(page, '.ant-select-dropdown-menu.ant-select-dropdown-menu-vertical.ant-select-dropdown-menu-root>li', 6);


        
        //submit
        // await page.click('.ant-btn.ant-btn-primary');


        await page.screenshot({
            path: `images/${filename}.png`
        });
    })

})
