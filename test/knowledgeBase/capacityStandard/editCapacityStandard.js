const path=require('path');
const {assert}=require('chai');
const init=require('../../../init');
const event=require('../../../utils/event.js');
const timeout=require('../../../utils/timeout.js');
const constant=require('../../../config/constant.js');
const public=require('../../../utils/public.js');
const element = require('../../../config/element');
const filename="编辑产能标准默认值"
const filename1=" 编辑产能完成"
const pageUrl = element.pageUrl;
const common = element.common;
const capacityStandard = element.capacityStandard;

let constance
describe('knowldegeBase/editCapcityStandard',function(){
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

        console.log("\n\n************* 编辑产能弹窗显示验证 Start **************")


        //编辑产能标准

        //点击产能标准的编辑按钮，默认选择产能标准列表的第一个产能标准按钮
         await event.clickElement(page,capacityStandard.edit,0);
         await timeout(1000);
         await page.screenshot({path:`images/${filename}.png`});

         //显示产能标准弹窗标题“编辑产能标准”
         const editCapcityStandardName=await page.$eval('.ant-modal-title',x=>x.innerText);
         assert.equal(editCapcityStandardName,'编辑产能标准');
         console.log('成功进入'+editCapcityStandardName+'弹窗');


         // 验证弹窗显示信息
        
         //物料：物料编码，物料名称
         const materinalInformation=await page.evaluate(()=>
         document.getElementsByClassName("ant-row ant-form-item ant-form-item-no-colon formItem___3eTP9")[0].innerText);
         console.log('物料模块显示信息包括:'+'\n'+materinalInformation);

         //工位模块：工位名称
         const workStationInformation= await page.evaluate(()=>
         document.getElementsByClassName("ant-row ant-form-item ant-form-item-no-colon formItem___3eTP9")[1].innerText);
         console.log('工位模块显示信息包括:'+'\n'+workStationInformation);

         //产能标准模块：uph(产能标准),产能标准已经输入的数值
         const capcityInformation1= await page.evaluate(()=>
         document.getElementsByClassName("ant-form-item-required")[0].innerText);

         //获取产能标准原先输入的数值
         const capcityInformation2= await page.evaluate(()=>
         document.getElementsByClassName("ant-input-number-input")[0].defaultValue);
         console.log('原'+capcityInformation1+"的输入的数值是："+capcityInformation2);

         //验证取消按钮和确定按钮
         const cancelbutton=await page.$eval(capacityStandard.cancelButton,x=>x.innerText);
         assert.equal(cancelbutton,'取 消');
         const submit=await page.evaluate(()=>document.getElementsByClassName("ant-btn ant-btn-primary")[1].innerText);
         assert.equal(submit,'完 成');
         console.log('('+cancelbutton+')和('+submit+')按钮验证完成');
         console.log("************* 编辑产能显示验证 Finish **************\n\n");
        //********************************** 编辑产能业务逻辑验证 Start *********************************／
        // 清空产能标准输入框数据
        /** 
        let tagName='#uph'
        const input = await page.$eval(tagName, el => el.value);
        await  page.focus(tagName);
        console.log(input);
        await page.keyboard.down('Shift');
        for(let i= 0; i< input.length; i++){
              console.log('位移数', i)
              await page.keyboard.press('ArrowRight');
        }
        await page.keyboard.press('Delete');
        */
        
        await public.deleteFromRight(page, '#uph');
        
        //产能标准输入框数值为空时的报错信息
        const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
        console.log('产能标准输入框为空时的报错信息：',rēsult);
        assert.equal(rēsult, '请输入UPH！','rēsult = 请输入UPH！');
        
            let myNumber=Array();
            myNumber[0]= "0";
            myNumber[1]="1000000000";
            myNumber[2]="99999999.9999999";
            myNumber[3]="dd";
            myNumber[4]="100.123456";
          for (x in myNumber){
                try{
                    //await page.screenshot({path:`images/a_`+x+`.png`});
                    await public.deleteFromLeft(page, '#uph');
                    //await page.screenshot({path:`images/b_`+x+`.png`});
                    await event.clickAndType(page,'#uph', myNumber[x]);
                    if(x==0){
                         const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
                         console.log('产能标准输入0:',rēsult);
                         assert.equal(rēsult, '数字必需大于0','rēsult = 数字必需大于0');
                         //await page.screenshot({path:`images/12312314.png`});
                    }else if(x==1){
                        const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
                        console.log('产能标准输入1000000000:',rēsult);
                        assert.equal(rēsult, '数字必需小于等于999999999','rēsult = 数字必需小于等于999999999');
                    } else if(x==2){
                        const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
                        console.log('产能标准输入七位小数99999999.9999999:',rēsult);
                        assert.equal(rēsult, '小数点后最多保留6位数字','rēsult = 小数点后最多保留6位数字');
                    } else if(x==3){
                        const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
                        console.log('输入非数字字符dd:',rēsult);
                        assert.equal(rēsult, '必须是数字','rēsult = 必须是数字');   
                    }
                }
                catch(e){
                    console.error('产能标准输入不正确');
                    console.error(e);
                }  

            }          
            console.log('修改产能标准（UPH）：'+myNumber[x]+'\n');  
            await page.screenshot({path:`images/${filename1}.png`});
            await page.click('.ant-modal .ant-btn.ant-btn-primary');
            console.log('编辑产能标准成功');

    })
})