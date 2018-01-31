//页面url
const pageUrl = {
    materials : 'https://web-beta.blacklake.cn/bom/materials/list',
    units :  'https://web-beta.blacklake.cn/knowledgeManagement/units',
    productivityStandards : 'https://web-beta.blacklake.cn/knowledgeManagement/productivityStandards',
    qcItems : 'https://web-beta.blacklake.cn/knowledgeManagement/qcItems',
    workStations : 'https://web-beta.blacklake.cn/knowledgeManagement/workStations',
    customers : 'https://web-beta.blacklake.cn/knowledgeManagement/customers',
    storages : 'https://web-beta.blacklake.cn/knowledgeManagement/storages',
    pauseCauses : 'https://web-beta.blacklake.cn/knowledgeManagement/producePauseCauses',

}
//单位
//
//
//
//
//

// 知识库
const common = {
    createButton : '.ant-btn.button___3jJ6D.editable-add-btn.ant-btn-primary',
    edit : '.anticon.anticon-edit.undefined',
    delete : '.anticon.anticon-delete.undefined',
    deleteAndYes : '.ant-btn.ant-btn-primary.ant-btn-sm',
    deleteAndNo : '.ant-btn.ant-btn-sm',
    name : '#name',
    note : '#note',
    completeButton : '.ant-btn.ant-btn-primary',
    cancleButton : '.ant-btn.ant-btn-ghost',
    breakCrumb : '.ant-breadcrumb-link',
    search : '.ant-input',
    firstItem : '.ant-table-row.myTableRowBordered.ant-table-row-level-0>td'
}

// 单位
const unit = {
    createUnitButton : common.createButton,
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    name : common.name,
    note : common.note,
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    search : common.search,
    breakCrumb : common.breakCrumb,
    firstUnit : common.firstItem,
    invalidAssert : '.ant-form-explain'
    // completeButton : `${common.completeButton}.aaaa`,

};
//产能标准
const productivityStandard = {
    createProductivityStandardButton : common.createButton,
    edit : '.anticon.anticon-edit.undefined',
    delete : '.anticon.anticon-delete.undefined',
}

const workStation = {
    createWorkStationButton : '.ant-btn.button___3jJ6D.ant-btn-primary',
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    name : '#1_name',
    QRCode : '#linkcode',
    note : common.note,
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    search : common.search,
    breakCrumb : common.breakCrumb,
    firstWorkStation : common.firstItem
}

const qcItem = {
    createQcItemButton : '.ant-btn.button___3jJ6D.ant-btn-primary',
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    // 创建质检分类和创建关注点的输入框中名称的id
    typeName : common.name,
    attationName : '#name-0',
    attationMethod : '#method-0',
    attationStandard : '#standard-0',
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    breakCrumb : common.breakCrumb,
    attationInput : '.ant-input',
    addAttation : '.anticon.anticon-plus-circle-o.undefined',
    attationName1 : '#name-1',
    attationMethod1 : '#method-1',
    attationStandard1 : '#standard-1',
    deleteAttation : '.anticon.anticon-minus-circle-o.delIcon___3tBAo',
    //修改关注点的输入框元素
    attationName_e : '#name',
    attationMethod_e : '#method',
    attationStandard_e : '#standard',
    //修改分类的元素
    cancleButton_e : '.link___3gc8F',
    completeButton_e : '.link___3gc8F',
    typeName_e : '.ant-input',
}

const customer = {
    createCustomerButton : '.ant-btn.button___3jJ6D.ant-btn-primary',
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    name : common.name,
    note : common.note,
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    search : common.search,
    breakCrumb : common.breakCrumb,
    firstCustomer : common.firstItem
}

const storage ={
    createStorageButton : common.createButton,
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    name : '#1_name',
    QRCode : '#linkcode',
    note : common.note,
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    search : common.search,
    breakCrumb : common.breakCrumb,
    firstStorage : common.firstItem,
    
}

const pauseCause = {
    createPauseCausesButton : '.ant-btn.button___3jJ6D.ant-btn-primary',
    edit : '.link___3gc8F',
    disabled : '.link___3gc8F',
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    name : common.name,
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    search : common.search,
    breakCrumb : common.breakCrumb,
    firstProducePauseCause : common.firstItem,
    invalidAssert : '.ant-form-explain',
}


module.exports = {
  pageUrl,
  common,
  unit,
  productivityStandard,
  workStation,
  qcItem,
  customer,
  storage,
  pauseCause,
};