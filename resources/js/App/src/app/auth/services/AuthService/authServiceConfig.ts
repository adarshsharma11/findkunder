const apiPrefix = 'api/';

const authServiceConfig = {
  signIn: apiPrefix + 'login',
  userInfo: apiPrefix + 'me',
  signOut: apiPrefix + 'logout'
};

export default authServiceConfig;
