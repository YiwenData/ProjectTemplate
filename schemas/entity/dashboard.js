export default {
  _id: 'dashboard',
  name: 'Dashboard',
  syno: ['仪表盘'],
  type: 'entity',
  editable: false,
  properties: [
    {
      'name': '名称',
      'type': 'ID',
      'is_name': true,
      'constraints': {
        required: true,
        unique: true,
      },
    },
    {
      'name': '简称',
      'type': 'string',
      'is_name': true,
      'isArray': true,
    },
    {
      'name': '标签',
      'type': 'tag',
      'is_categorical': true,
      'isArray': true,
    },
    {
      'name': 'uid',
      'description': 'website的用户id',
      'is_supplemantary': true,
      'type': 'string',
      'ui': {
        show_in_detail_only: true,
      },
      'udf': {
        function: (self) => self._user_id,
      },
    },
    {
      'name': 'data',
      'description': 'JSON化的ZEDashboard数据',
      'is_supplemantary': true,
      'type': 'string',
      'ui': {
        show_in_detail_only: true,
      },
    },
  ],
};
