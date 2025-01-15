/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  owner: ['owner'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
