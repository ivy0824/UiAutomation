const path=require('path');
const {assert}=require('chai');
const init=require('../../../init');
const event=require('../../../utils/event.js');
const timeout=require('../../../utils/timeout.js');
const constant=require('../../../config/constant.js');
const element = require('../../element');
const filename1="删除产能标准前";
const filename2="删除产能标准后";
const pageUrl = element.pageUrl;
const common = element.common;
const capacityStandard = element.capacityStandard;


let constance
describe('knowldegeBase/deleteCapcityStandard',function(){
        beforeEach(async()=>{
        constance = await init();
    })
    afterEach(async()=>{
        const {browser}=constance
        await browser.close();
    });
    it('edit capcitystandard successfully',async()=>{
        await timeout(1000);
        const {page,browser}=constance
        //click knowledgeBase and capcityStandard
        try{
            await event.goToPage(page,pageUrl.capacityStandard,capacityStandard.breakCrumb);
            //获取产能标准列表页面包屑
        const breakCrumbName=await page.$eval(capacityStandard.breakCrumb,x=>x.innerText);
        assert.equal(breakCrumbName,"产能标准")
        console.log('成功进入'+breakCrumbName+'页面')
        }
        catch(e){
            console.error('跳转产能标准页面错误');
            console.error(e);
        }

        console.log("\n\n************* 删除产能弹窗显示验证 Start **************");
        //点击产能标准第一页的第二个删除按钮
        await event.clickElement(page,'.anticon.anticon-delete.undefined',1);
        await timeout(1000);

        //删除第二条产能标准前的screenshot
        await page.screenshot({path:`images/${filename1}.png`});
        // 验证删除弹窗文案信息
        const deleteInformation= await page.$eval('.ant-popover-message-title',x=>x.innerText);
        assert.equal(deleteInformation,"确定删除吗？")
        console.log(deleteInformation);
        // 删除第二条产能标准
        await event.clickElement(page,capacityStandard.deleteAndYes,0);
        //wait for 取消按钮 disappear
        await event.waitForDisappear(page,capacityStandard.deleteAndNo);
        //删除第二条产能标准后的screenshot
        await page.screenshot({path:`images/${filename2}.png`});
        console.log('删除第二条产能标准成功')

    });
});
