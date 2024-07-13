import AddProfilePage from './AddProfilePage';
import authRoles from '../../auth/authRoles';

const AddProfileConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: 'add-profile',
      element: <AddProfilePage />,
    },
  ],
};

export default AddProfileConfig;
