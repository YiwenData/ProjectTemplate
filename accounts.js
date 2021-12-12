/**
 * 初始化账号
 */
export default async (DBConnector) => {
  await DBConnector.collection('roles').deleteMany({});
  await DBConnector.collection('accounts').deleteMany({});

  await DBConnector.collection('roles').insertOne({
    role: 'admin',
    resource: '*',
  });

  const accounts = [
    {
      name: 'admin',
      role: 'admin',
      rw: 'w',
      password: '12345678',
    },
  ];
  for (const account of accounts) {
    await DBConnector.collection('accounts').insertOne({
      username: account.name,
      password: account.password,
      role: account.role,
      name: account.name,
      avatar:
        'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    });
  }
};
