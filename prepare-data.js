/**
 * 项目初始化会调用的脚本
 * 执行npm run project-init --project=xxx
 */

import SemanticDB from 'semanticdb';
import Alisa from 'semanticdb-alisa';

// import geoSchema from './schemas/entity/geo.js';

const { Schema, Data } = SemanticDB;

/**
 * Prepare data
 */
export default async () => {
  // Schemas
  // await Schema.create(geoSchema);
  // await genTestData();
};

/**
 * 可以在这里生成一点测试数据
 */
const genTestData = async () => {
  await Data.create('distributor', [
    { ID: '001', 名称: '猪猪经销商', 地理位置: '310109' },
  ]);
};
