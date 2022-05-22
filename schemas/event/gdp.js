export default {
  _id: 'GDP',
  name: 'GDP表',
  syno: ['GDP数据'],
  type: 'event',
  properties: [
    /* 维度 */
    {name: '日期', type: 'timestamp', ui: {formatter: 'YYYY'}},
    {name: '地理位置', type: 'object', ref: 'geo'},

    /* 指标 */
    {name: 'GDP', syno: ['国内生产总值'], type: 'currency'},
  ],
};
