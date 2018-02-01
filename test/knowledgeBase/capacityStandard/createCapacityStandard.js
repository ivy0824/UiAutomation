const path=('path');
const constant=require('../../../config/constant');
const init=require('../../../init');
const event=require('../../../utils/event');
const timeout=require('../../../utils/timeout');
const {assert}=require('chai');
const element = require('../../../config/element');
const public=require('../../../utils/public.js');

const pageUrl = element.pageUrl;
const common = element.common;
const capacityStandard = element.capacityStandard;

//const filename=path.resolve(__dirname,__filename.split('.')[0]);
const filename="创建产能标准"
let constance
describe("#knowledgeBase/createCapcityStandard",function(){
    beforeEach(async()=>{
        constance=await init();
    });
    afterEach(async()=>{
      const {browser}=constance;
      await browser.close();
    });

    it('create capcitystandard successfully',async()=>{
        await timeout(1000);
        const {page,browser}=constance;
        //click knowledgeBase and capcityStandard
        try{
            await event.goToPage(page,pageUrl.capacityStandard,capacityStandard.breakCrumb);
            
            //获取产能标准列表页面包屑
            const breakCrumbName = await page.$eval(capacityStandard.breakCrumb,x=>x.innerText);
            assert.equal(breakCrumbName,"产能标准")
            console.log('成功进入'+breakCrumbName+'页面')
        }catch(e){
            console.error('跳转产能标准页面错误');
            console.error(e);
        }
        
        //创建产能标准
        //click button“新建产能标准“,进入新建产能标准页面
        let button= await page.$('.ant-btn.ant-btn-primary')
        await button.click();
        await event.changeUrlWait(page);
;

        console.log("\n\n************* 页面初始化验证 Start **************")
        //验证新建产能标准面包屑存在“新建产能标准”
        const breakCrumbName=await page.evaluate(()=>
        document.getElementsByClassName("ant-breadcrumb-link")[1].innerText);
        assert.equal(breakCrumbName,"新建产能标准");
        console.log ('面包屑中存在'+breakCrumbName);

        //验证存在选择工位名称选项
        const workStationName=await page.evaluate(()=>
        document.getElementsByClassName("ant-form-item-required")[0].innerText)
        assert.equal(workStationName,"工位")
        console.log("工位名称验证成功")

        //验证选择工位默认显示
        const workStationDefualtDisplay=await page.evaluate(()=>
        document.getElementsByClassName("ant-select-selection__placeholder")[0].innerText)
        assert.equal(workStationDefualtDisplay,"选择工位")
        console.log("工位选择框默认显示值验证成功")

        //验证存在输入UPH（产能／小时）选项
        const  UPHName=await page.evaluate(()=>
        document.getElementsByClassName("ant-form-item-required")[1].innerText)
        assert.equal(UPHName,"UPH（产能/小时)")
        console.log("UPH名称验证成功")


        //验证输入UPH（产能／小时)默认显示
        const UPHDefualDisplay=await page.evaluate(()=>
        document.getElementsByClassName("ant-input-number-input")[0].placeholder)
        assert.equal(UPHDefualDisplay,"生产单位/小时")
        console.log("UPH输入框默认显示值验证成功")
        
        //验证新增物料按钮显示文本信息
        const addMaterialButtonContent=await page.evaluate(()=>
        document.getElementsByClassName("actionButtonContainer___1-xWx")[0].textContent)
        assert.equal(addMaterialButtonContent,"新增物料")
        console.log("新增物料button内容显示验证成功")

        //验证提交新建物料按钮显示文本
        const submitButtonContent=await page.evaluate(()=>
        document.getElementsByClassName("ant-btn ant-btn-primary")[0].textContent)
        assert.equal(submitButtonContent,"保 存")
        console.log("提交按钮内容显示验证成功")

        console.log("************* 页面初始化验证 Finish **************\n\n")
        //********************************** 业务逻辑验证 Start *********************************／
        
        //click保存按钮
        await event.clickElement(page,capacityStandard.completeButton,0);

        const result1 = await page.evaluate(()=>
        document.getElementsByClassName("ant-form-explain")[0].innerText)
        console.log('未选择工位报错信息:',result1);
        assert.equal(result1, '请选择工位','result1 = 请选择工位');

        const result2 = await page.evaluate(()=>
        document.getElementsByClassName("ant-form-explain")[1].innerText)
        console.log('未输入产能标准报错信息:',result2);
        assert.equal(result2, '请输入UPH','result2 = 请输入UPH');


        //选择工位
        try{
            await event.clickElement(page,'.ant-select-selection__placeholder', 0)
            //截图显示显示的工位选择下拉列表
            await timeout(500);
            await event.clickElement(page,'.ant-select-tree-node-content-wrapper.ant-select-tree-node-content-wrapper-normal',0)
            const workStationName=await page.evaluate(()=>
            document.getElementsByClassName("ant-select-selection-selected-value")[0].innerText)
        } catch(e){
            console.error=(选择工位失败);
            console.error(e)
        }

            let myNumber=Array();
            myNumber[0]="0";
            myNumber[1]="1000000000";
            myNumber[2]="99999999.9999999";
            myNumber[3]="100";
           for (x in myNumber){
                //输入产能标准数值
                try{
                    // rand=Math.random().toFixed(3);
                    await public.deleteFromLeft(page, '#uph')
                    await event.clickAndType(page,'#uph', myNumber[x]);

                    if(x==0){
                        const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
                        console.log('产能标准输入0:',rēsult);
                        assert.equal(rēsult, '数字必需大于0','rēsult = 数字必需大于0');
                    } else if(x==1){
                        const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
                        console.log('产能标准输入1000000000:',rēsult);
                        assert.equal(rēsult, '数字必需小于等于999999999','rēsult = 数字必需小于等于999999999');
                    } else if(x==2){
                        const rēsult = await page.$eval(capacityStandard.errorInformation,x=>x.innerText);
                        console.log('产能标准输入七位小数9999999999.9999999:',rēsult);

                        assert.equal(rēsult, '小数点后最多保留6位数字','rēsult = 小数点后最多保留6位数字');
                    }
                } catch(e){
                    console.error('产能标准输入不正确')
                    console.error(e)
                }
           }

            //新增物料
            await event.clickElement(page,capacityStandard.addMaterialButton,0)
            //点击物料button，显示右侧边栏
            await page.screenshot({path:'images/新增物料右侧边栏.png'});
            await event.clickElement(page,capacityStandard.choseMaterial,0);
            await event.clickElement(page,capacityStandard.choseMaterial,1);
            await page.screenshot({path:'images/物料选中.png'});

            //点击保存
            console.log(
                'case'+(x+1)+':\n'+
                '工位：'+workStationName+'\n'+
                'UPH：'+myNumber[x]+'\n'+
                '物料：...');

            await event.clickElement(page,capacityStandard.completeButton,0);
            await event.changeUrlWait(page);
            await page.screenshot({path:`images/${filename}.png`});
            console.log('产能标准创建成功');
        //********************************** 业务逻辑验证 End *********************************／
    });
});

