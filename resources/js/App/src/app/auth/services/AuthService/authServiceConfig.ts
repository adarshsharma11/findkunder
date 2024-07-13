const apiPrefix = 'api/';

const authServiceConfig = {
  signIn: apiPrefix + 'login',
  signUp: apiPrefix + 'register',
  userInfo: apiPrefix + 'me',
  submitProfile: apiPrefix + 'submit-profile',
  signOut: apiPrefix + 'logout',
  updateUser: apiPrefix + 'update-profile',
  deleteUser: apiPrefix + 'delete-profile',
  forgotPassword: apiPrefix + 'forgot-password',
  resetPassword: apiPrefix + 'reset-password',
  customersCount: apiPrefix + 'customers/count',
};

export default authServiceConfig;
