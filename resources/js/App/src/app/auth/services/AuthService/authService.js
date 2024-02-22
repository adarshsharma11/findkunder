import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import authServiceConfig from "./authServiceConfig";
/* eslint-disable camelcase */

class AuthService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    const expirationTime = this.getTokenExpirationTime();

    if (!access_token || !expirationTime) {
      this.emit("onNoAccessToken");
      return;
    }

    if (this.isAuthTokenValid(access_token, expirationTime)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  updateUserData = (user) => {
    return axios.put(authServiceConfig.updateUser, {
      name: user.name || null,
      old_password: user.oldPassword || null,
      password: user.password || null,
    });
  };

  forgotPassword = (user) => {
    return axios.post(authServiceConfig.forgotPassword, {
      email: user.email,
    });
  };

  deleteProfile = (user) => {
    return axios.post(authServiceConfig.deleteUser);
  };

  resetPassword = (user) => {
    return axios.post(authServiceConfig.resetPassword, {
      token: user.token,
      password: user.password,
    });
  };

  createUser = (data) => {
    return new Promise((resolve, reject) => {
      axios.post(authServiceConfig.signUp, data).then((response) => {
        if (response.data.user) {
          const userInfo = response.data.user;
          if (
            userInfo &&
            response.data.accessToken &&
            response.data.expirationTime
          ) {
            this.setSession(
              response.data.accessToken,
              response.data.expirationTime
            );
            const newUser = {
              uuid: userInfo.id,
              from: "custom-db",
              role: response.data.role,
              data: {
                displayName: userInfo.name,
                photoURL: "assets/images/avatars/brian-hughes.jpg",
                email: userInfo.email,
                totalCompanies: userInfo.companies_count,
                totalProfiles: userInfo.customers_count,
                totalContactPersons: userInfo.contact_person_count,
                settings: {},
                shortcuts: [],
              },
            };
            resolve(newUser);
            this.emit("onLogin", newUser);
          }
        } else {
          reject(response.data.error);
        }
      });
    });
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post(authServiceConfig.signIn, {
          email,
          password,
        })
        .then((response) => {
          const userInfo = response.data.user;
          if (
            userInfo &&
            response.data.accessToken &&
            response.data.expirationTime
          ) {
            this.setSession(
              response.data.accessToken,
              response.data.expirationTime
            );
            const newUser = {
              uuid: userInfo.id,
              from: "custom-db",
              role: response.data.role,
              data: {
                displayName: userInfo.name,
                photoURL: "assets/images/avatars/brian-hughes.jpg",
                email: userInfo.email,
                totalCompanies: userInfo.companies_count,
                totalProfiles: userInfo.customers_count,
                totalContactPersons: userInfo.contact_person_count,
                settings: {},
                shortcuts: [],
              },
            };
            resolve(newUser);
            this.emit("onLogin", newUser);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      axios
        .post(authServiceConfig.userInfo)
        .then((response) => {
          const userInfo = response.data.user;
          if (response.data.user) {
            this.setSession(
              response.data.accessToken,
              response.data.expirationTime
            );
            const newUser = {
              uuid: userInfo.id,
              from: "custom-db",
              role: response.data.role,
              data: {
                displayName: userInfo.name,
                photoURL: "assets/images/avatars/brian-hughes.jpg",
                email: userInfo.email,
                totalCompanies: userInfo.companies_count,
                totalProfiles: userInfo.customers_count,
                totalContactPersons: userInfo.contact_person_count,
                settings: {},
                shortcuts: [],
              },
            };
            resolve(newUser);
          } else {
            this.logout();
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.logout();
          reject(new Error("Failed to login with token."));
        });
    });
  };

  setSession = (access_token, expiryTime) => {
    if (access_token && expiryTime) {
      localStorage.setItem("jwt_access_token", access_token);
      localStorage.setItem("access_token_expiration", expiryTime);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      localStorage.removeItem("access_token_expiration");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
  };

  // logout = () => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(authServiceConfig.signOut)
  //       .then((response) => {
  //         if (response.data.status) {
  //           this.setSession(null);
  //           this.emit("onLogout", "Logged out");
  //           const pastDate = new Date(0).toUTCString();
  //           document.cookie = "XSRF-TOKEN=; expires=" + pastDate + "; path=/";
  //           document.cookie =
  //             "laravel_session=; expires=" + pastDate + "; path=/";
  //           return;
  //         } else {
  //           this.setSession(null);
  //           this.emit("onLogout", "Logged out");
  //           reject(new Error("Failed to login with token."));
  //         }
  //       })
  //       .catch((error) => {
  //         this.setSession(null);
  //         this.emit("onLogout", "Logged out");
  //         reject(new Error("Failed to login with token."));
  //       });
  //   });
  // };

  isAuthTokenValid = (access_token, expirationTime) => {
    if (!access_token || !expirationTime) {
      return false;
    }
    const expirationTimestamp = new Date(expirationTime).getTime() / 1000;
    const currentTime = Date.now() / 1000;
    if (expirationTimestamp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };

  getTokenExpirationTime = () => {
    return window.localStorage.getItem("access_token_expiration");
  };
}

const instance = new AuthService();

export default instance;
