const {assert} = require('chai');
const path = require('path');
const timeout = ('../../utils/timeout.js')
const init = require('../../init');
const constant = require('../../config/constant');
// import {createMaterial} from '../../utils/event'
const event = require('../../utils/event');
const precondition = require('../../utils/precondition.js')

const filename = "添加生产信息"
let constance;

describe('给物料添加生产信息', function () {
    before(async() => {
        constance = await init();
    });

    after(async() => {
        const {
            browser
        } = constance;
        await browser.close();
    });
    

    it('添加生产信息操作', async() => {
        const {
            page,
            browser
        } = constance;
        
        //创建一个物料
        await precondition.createMaterial(page);

        //点击生产信息的补充按钮
        await event.clickElement(page, '.anticon.anticon-plus', 1);
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
            await page.waitForSelector('.ant-select-tree-treenode-disabled>ul>li>.ant-select-tree-node-content-wrapper', {
                timeout: 100000
            });
        } catch (e) {
            console.error('没有找到下拉列表');
            console.error(e);
        }
        console.log('打开下拉列表');
        //选择第一个次品类型
        await event.clickElement(page, ".ant-select-tree-treenode-disabled>ul>li>.ant-select-tree-node-content-wrapper", 0);
        try {
            await page.waitForSelector('.ant-select-selection-selected-value', {
                timeout: 100000
            });
        } catch (e) {
            console.error('选择没有被填入');
            console.error(e);
        }
        //输入按钮录数的数量
        await event.clickAndType(page, '#defectAmount1', '2');
        //submit
        await page.click('.ant-btn.ant-btn-primary');

        await page.screenshot({
            path: `images/${filename}.png`
        });
    })

})
