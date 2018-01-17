//页面url
const pageUrl = {
    materials : 'https://web-beta.blacklake.cn/bom/materials/list',
    units :  'https://web-beta.blacklake.cn/knowledgeManagement/units',
    productivityStandards : 'https://web-beta.blacklake.cn/knowledgeManagement/productivityStandards',
    qcItems : 'https://web-beta.blacklake.cn/knowledgeManagement/qcItems',
    workStations : 'https://web-beta.blacklake.cn/knowledgeManagement/workStations',
    customers : 'https://web-beta.blacklake.cn/knowledgeManagement/customers',
    storages : 'https://web-beta.blacklake.cn/knowledgeManagement/storages',
    producePauseCauses : 'https://web-beta.blacklake.cn/knowledgeManagement/producePauseCauses',

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
    cancleButton : 'ant-btn.ant-btn-ghost',
    breakCrumb : '.ant-breadcrumb-link',
    search : '.ant-input',
    firstUnit : '.ant-table-row.myTableRowBordered.ant-table-row-level-0>td'
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
    firstUnit : common.firstUnit
    // completeButton : `${common.completeButton}.aaaa`,

};
//产能标准
const productivityStandard = {
    createProductivityStandardButton : common.createButton,
    edit : '.anticon.anticon-edit.undefined',
    delete : '.anticon.anticon-delete.undefined',
}

const workStation = {
    createWorkStationButton : common.createButton,
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
    firstUnit : common.firstUnit
}

const qcItem = {
    createQcItemButton : common.createButton,
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
    addAttation : 'anticon.anticon-plus-circle-o.undefined',
    deleteAttation : '.anticon.anticon-minus-circle-o.delIcon___2mNrC'
}

const customer = {
    createCustomerButton : common.createButton,
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
    firstUnit : common.firstUnit
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
    firstUnit : common.firstUnit
}

const producePauseCause = {
    createProducePauseCausesButton : common.createButton,
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    name : common.name,
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    search : common.search,
    breakCrumb : common.breakCrumb,
    firstUnit : common.firstUnit
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
  producePauseCause,
};