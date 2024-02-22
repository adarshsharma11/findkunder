const apiPrefix = 'api/';

const authServiceConfig = {
  signIn: apiPrefix + 'login',
  signUp: apiPrefix + 'register',
  userInfo: apiPrefix + 'me',
  signOut: apiPrefix + 'logout',
  updateUser: apiPrefix + 'update-profile',
  deleteUser: apiPrefix + 'delete-profile',
  forgotPassword: apiPrefix + 'forgot-password',
  resetPassword: apiPrefix + 'reset-password'
};

export default authServiceConfig;
