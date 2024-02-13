const apiPrefix = 'api/';

const authServiceConfig = {
  signIn: apiPrefix + 'login',
  signUp: apiPrefix + 'register',
  userInfo: apiPrefix + 'me',
  signOut: apiPrefix + 'logout',
  updateUser: apiPrefix + 'update-profile',
  forgotPassword: apiPrefix + 'forgot-password',
  resetPassword: apiPrefix + 'reset-password'
};

export default authServiceConfig;
