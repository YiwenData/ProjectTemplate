export default {
  _id: 'industry',
  name: '行业',
  type: 'entity',
  properties: [
    {name: '名称', type: 'ID', is_name: true},
    {name: '英文名', type: 'string', is_name: true},
    {name: '简称', type: 'tag', is_name: true, isArray: true},
  ],
};
