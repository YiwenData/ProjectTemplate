/**
 * 定时器
 */

export default [
  // 本地关了，服务器上打开
  {
    name: 'syncData',
    cron: '0 0 8 * * *',
    script: async () => {
      console.log('syncing data...');

      console.log('sync data done.');
    },
  },
];
