export default {
  _id: 'sales',
  name: '销售表',
  syno: ['销售数据'],
  type: 'event',
  properties: [
    /* 维度 */
    {name: '日期', type: 'timestamp'},
    {name: '公司', type: 'object', ref: 'company'},
    {name: '分类', type: 'string', is_categorical: true, hierarchy: {down: '二级分类'}},
    {name: '二级分类', type: 'string', is_categorical: true, hierarchy: {down: '三级分类'}},
    {name: '三级分类', type: 'string', is_categorical: true},

    /* 指标 */
    {name: '销售额', syno: ['营收', '营业收入', '金额'], type: 'currency'},
    {name: '毛利', type: 'currency'},
  ],
};
