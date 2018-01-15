//页面url
const pageUrl = {
    units :  'https://web-beta.blacklake.cn/knowledgeManagement/units',
    productivityStandards : 'https://web-beta.blacklake.cn/knowledgeManagement/productivityStandards',
}
//单位
//
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
    completeButton : '.ant-btn.ant-btn-primary',
    cancleButton : 'ant-btn.ant-btn-ghost',
    breakCrumb : '.ant-breadcrumb-link',
    search : '.ant-input',
    
}

// 单位
const unit = {
    createUnitButton : common.createButton,
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    name : '#name',
    note : '#note',
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    search : common.search,
    breakCrumb : common.breakCrumb,
    firstUnit : '.ant-table-row.myTableRowBordered.ant-table-row-level-0>td'
    // completeButton : `${common.completeButton}.aaaa`,

};
//产能标准
const productivityStandard = {
    createProductivityStandardButton : common.createButton,
    edit : '.anticon.anticon-edit.undefined',
    delete : '.anticon.anticon-delete.undefined',
}

const qcItem = {
    createQcItemButton : common.createButton,
    edit : common.edit,
    delete : common.delete,
    deleteAndYes : common.deleteAndYes,
    deleteAndNo : common.deleteAndNo,
    // 创建质检分类和创建关注点的输入框中名称的id
    name : '#name',
    completeButton : common.completeButton,
    cancleButton : common.cancleButton,
    breakCrumb : common.breakCrumb,
    attationInput : '.ant-input',
    addAttation : 'anticon.anticon-plus-circle-o.undefined',
    deleteAttation : '.anticon.anticon-minus-circle-o.delIcon___2mNrC'
}

module.exports = {
  pageUrl,
  common,
  unit,
  productivityStandard,
  qcItem,
};