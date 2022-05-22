/**
 * 项目初始化会调用的脚本
 * 执行npm run project-init --project=xxx
 */

import SemanticDB from 'semanticdb';
import Alisa from 'semanticdb-alisa';
import moment from 'moment';
import faker from 'faker';
import DBConnector from '../../src/db-connector';

import companySchema from './schemas/entity/company';
import industrySchema from './schemas/entity/industry';
import dashboardSchema from './schemas/entity/dashboard';

import gdpSchema from './schemas/event/gdp';
import researchSchema from './schemas/event/research';
import salesSchema from './schemas/event/sales';

const { Schema, Data, Buildins } = SemanticDB;
const {
  schemas: { Geo },
} = Buildins;

/**
 * Prepare data
 */
export default async () => {
  // Buildins
  const buildinGeoSchema = await Geo.getSchema();
  const buildinGeoData = await Geo.getData();
  await Schema.create(buildinGeoSchema);
  await Data.create(buildinGeoSchema, buildinGeoData);
  const buildinGeoSynonyms = await Geo.getSynonyms();
  await Alisa.SynonymController.create(buildinGeoSynonyms);

  // Schemas
  await Schema.create(companySchema);
  await Schema.create(industrySchema);
  await Schema.create(dashboardSchema);

  await Schema.create(gdpSchema);
  await Schema.create(researchSchema);
  await Schema.create(salesSchema);

  await genTestData();
};

/**
 * 可以在这里生成一点测试数据
 */
const genTestData = async () => {
  const countries = ['086', '840', '392', '826', '276', '250'];

  // 1. GDP数据
  const gdpData = [];
  for (const country of countries) {
    let lastGDP;
    for (let year = 1980; year < 2022; year++) {
      if (year === 1980) {
        lastGDP = faker.random.number({ min: 10000, max: 30000 });
      } else {
        lastGDP =
          lastGDP * (1 + 0.01 * faker.random.number({ min: 1, max: 12 }));
      }
      gdpData.push({
        日期: `${year}-01-01`,
        地理位置: country,
        GDP: lastGDP,
      });
    }
  }
  await Data.create('GDP', gdpData);
  console.log('gdp done');

  // 2. 行业
  await Data.create('industry', [{ 名称: '半导体' }]);

  // 3. 公司
  const companies = await Data.create('company', [
    { 名称: '公司1', 行业: '半导体', 地理位置: '086431' },
    { 名称: '公司2', 行业: '半导体', 地理位置: '086211' },
    { 名称: '公司3', 行业: '半导体', 地理位置: '840' },
    { 名称: '公司4', 行业: '半导体', 地理位置: '392' },
    { 名称: '公司5', 行业: '半导体', 地理位置: '826' },
    { 名称: '公司6', 行业: '半导体', 地理位置: '276' },
    { 名称: '公司7', 行业: '半导体', 地理位置: '250' },
  ]);
  console.log('company done');

  // 4. sales
  const parts = ['器件', '硅晶圆', '设备', '晶圆代工'];
  const parts2 = ['二级分类1', '二级分类2', '二级分类3', '二级分类4'];
  const parts3 = ['三级分类1', '三级分类2', '三级分类3', '三级分类4'];

  for (let year = 1980; year <= 2022; year++) {
    for (let month = 0; month < 12; month++) {
      if (year === 2022 && month >= 4) break;
      const sales = [];
      for (const company of companies) {
        for (let i = 0; i < 1000; i++) {
          const sale = {
            日期: moment().year(year).month(month).startOf('month'),
            公司: company._id,
            销售额: faker.random.number({ min: 1, max: 10 }),
            分类: faker.random.arrayElement(parts),
            三级分类: faker.random.arrayElement(parts3),
          };

          if (sale.分类 === '器件') {
            sale.二级分类 = faker.random.arrayElement(['DRAM', 'NAND']);
          } else {
            sale.二级分类 = faker.random.arrayElement(parts2);
          }

          (sale.毛利 =
            (sale.销售额 * faker.random.number({ min: 30, max: 80 })) / 100),
            sales.push(sale);
        }
      }
      await Data.create('sales', sales);
    }
  }
  console.log('sales done');

  // 系统热搜
  await DBConnector.collection('hot').remove({});
  await DBConnector.collection('hot').insertOne({
    hot: [
      '去年12月份DRAM毛利',
      '每年各国GDP',
      '中国每年GDP同比',
      '每年半导体行业销售额和GDP对比',
      '去年半导体行业各分类销售额',
      '近十年各公司销售额、销售额同比、毛利、毛利同比、毛利率',
      '近十年每季度DRAM、NAND各自的销售额',
      '上个季度各分类各二级分类销售额、毛利、毛利率',
    ].join('\n'),
  });
};
