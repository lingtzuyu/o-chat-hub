import * as request from 'supertest';

test('updateUserName in auth.service', () => {
  const testUpdateUserName1 = {
    username: 'Alex Ling',
    orgainization: 'AppWorks',
    userId: 300,
  };
  const testUpdateUserName2 = {
    username: '',
    orgainization: 'AppWorks',
    userId: 300,
  };
});
