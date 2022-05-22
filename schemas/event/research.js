export default {
  _id: 'research',
  name: '研发支出表',
  syno: ['研发支出数据'],
  type: 'event',
  properties: [
    /* 维度 */
    {name: '日期', type: 'timestamp'},
    {name: '公司', type: 'object', ref: 'company'},

    /* 指标 */
    {name: '研发支出', syno: ['研发费', '研发费用'], type: 'currency'},
  ],
};
