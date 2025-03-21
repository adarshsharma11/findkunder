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
            !err.config.__isRetryRequest && err.response.data.message
          ) {
            // if you ever get an unauthorized response, logout the user
            const errorMessage = err.response.data.message || "Invalid access_token"
            this.emit("onAutoLogout", ` ${errorMessage}`);
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

  updateUserData = (user, is_profile_completed = undefined) => {
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
    const payload = {
      name: fullName || null,
      company: user.company || null,
      telephone: user.telephone,
      cvr: user.cvr,
      old_password: user.oldPassword || null,
      password: user.password || null,
      role: user.role
    };
  
    if (is_profile_completed !== undefined) {
      payload.is_profile_completed = is_profile_completed;
    }
  
    return axios.put(authServiceConfig.updateUser, payload);
  };

  forgotPassword = (user) => {
    return axios.post(authServiceConfig.forgotPassword, {
      email: user.email,
    });
  };

  getCustomersCount = () => {
    return axios.get(authServiceConfig.customersCount);
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
                email: userInfo.email,
                company: userInfo.company,
                cvr: userInfo.cvr,
                displayName: userInfo.name,
                telephone: userInfo.telephone,
                totalCompanies: userInfo.companies_count,
                totalProfiles: userInfo.customers_count,
                totalContactPersons: userInfo.contact_person_count,
                is_profile_completed: userInfo.is_profile_completed,
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
                email: userInfo.email,
                company: userInfo.company,
                cvr: userInfo.cvr,
                displayName: userInfo.name,
                telephone: userInfo.telephone,
                totalCompanies: userInfo.companies_count,
                totalProfiles: userInfo.customers_count,
                totalContactPersons: userInfo.contact_person_count,
                is_profile_completed: userInfo.is_profile_completed,
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
                email: userInfo.email,
                company: userInfo.company,
                cvr: userInfo.cvr,
                displayName: userInfo.name,
                telephone: userInfo.telephone,
                totalCompanies: userInfo.companies_count,
                totalProfiles: userInfo.customers_count,
                totalContactPersons: userInfo.contact_person_count,
                is_profile_completed: userInfo.is_profile_completed,
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

  submitProfile = (data) => {
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    if (data.contactImage) {
      formData.append("contactImage", data.contactImage);
    }
    Object.keys(data).forEach((key) => {
      if (key !== "image" && data[key] !== null || key !== 'contactImage' && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return new Promise((resolve, reject) => {
      axios
        .post(authServiceConfig.submitProfile, formData)
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
                email: userInfo.email,
                company: userInfo.company,
                cvr: userInfo.cvr,
                displayName: userInfo.name,
                telephone: userInfo.telephone,
                totalCompanies: userInfo.companies_count,
                totalProfiles: userInfo.customers_count,
                totalContactPersons: userInfo.contact_person_count,
                is_profile_completed: userInfo.is_profile_completed,
                settings: {},
                shortcuts: [],
              },
            };
            resolve(newUser);
            this.emit("onLogin", newUser);
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
    return new Promise((resolve, reject) => {
      axios
        .post(authServiceConfig.signOut)
        .then((response) => {
          if (response.data.status) {
            this.setSession(null);
            this.emit("onLogout", "Logged out");
          } else {
            this.setSession(null);
            this.emit("onLogout", "Logged out");
            reject(new Error("Failed to login with token."));
          }
        })
        .catch((error) => {
          this.setSession(null);
          this.emit("onLogout", "Logged out");
          reject(new Error("Failed to login with token."));
        });
    });
  };

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
