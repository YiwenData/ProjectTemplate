/**
 * 定义各种计算指标的地方
 */
export default [
  {
    schema: 'sales',
    name: '毛利率',
    propertyInfos: [
      {
        defaultName: () => `毛利率`,
        type: () => 'percentage',
      },
    ],
    returnType: 'value',
    params: [{name: 'query'}],
    sql: 'if(SUM(`销售额`) = 0, 0, SUM(`毛利`)/SUM(`销售额`))',
  },
];
