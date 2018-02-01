const path=require('path');
const {assert}=require('chai');
const init=require('../../../init');
const event=require('../../../utils/event.js');
const timeout=require('../../../utils/timeout.js');
const constant=require('../../../config/constant.js');
const element = require('../../../config/element');
const filename="查看变更记录"
const filename1="变更记录弹窗消失"
const pageUrl = element.pageUrl;
const common = element.common;
const capacityStandard = element.capacityStandard;

let constance
describe('knowldegeBase/changeRecord',function(){
        beforeEach(async()=>{
        constance = await init();
    })
    afterEach(async()=>{
        const {browser}=constance
        await browser.close();
    });
    it('viewChangeRecord successfully',async()=>{
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

        console.log("\n\n************* 编辑产能弹窗显示验证 Start **************");
       //查看产能标准第三条的变更记录弹窗
       await event.clickElement(page,'.link___3gc8F',2);
       const changeRecord=await page.$eval('.timeline',x=>x.innerText)
       console.log('变更记录展示：'+changeRecord);
       await page.screenshot({path:`images/${filename}.png`});
       
       //关闭变更记录页面
       await event.clickElement(page,'.anticon.anticon-close.undefined',0);
       await timeout(1000);
       await page.screenshot({path:`images/${filename1}.png`});
       console.log('查看变更记录完成');


    })
})