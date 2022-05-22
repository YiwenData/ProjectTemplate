export default {
  _id: 'company',
  name: '公司',
  syno: ['企业'],
  type: 'entity',
  properties: [
    {name: '名称', type: 'ID', is_name: true},
    {name: '英文名', type: 'string', is_name: true},
    {name: '简称', type: 'tag', is_name: true, isArray: true},
    {name: '地理位置', type: 'object', ref: 'geo'},
    {name: '行业', type: 'object', ref: 'industry'},
  ],
};
