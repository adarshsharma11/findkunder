import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen";
import { showMessage } from "app/store/fuse/messageSlice";
import { logoutUser, setUser } from "app/store/userSlice";
import AuthService from "./services/AuthService";

const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [waitAuthCheck, setWaitAuthCheck] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    AuthService.on("onAutoLogin", () => {
      dispatch(showMessage({ message: "Signing in with JWT" }));

      /**
       * Sign in and retrieve user data with stored token
       */
      AuthService.signInWithToken()
        .then((user) => {
          success(user, "Signed in with JWT");
        })
        .catch((error) => {
          pass(error.message);
        });
    });

    AuthService.on("onLogin", (user) => {
      success(user, "Signed in");
    });

    AuthService.on("onLogout", () => {
      pass("Signed out");

      dispatch(logoutUser());
    });

    AuthService.on("onAutoLogout", (message) => {
      pass(message);

      dispatch(logoutUser());
    });

    AuthService.on("onNoAccessToken", () => {
      pass();
    });

    AuthService.init();

    function success(user, message) {
      if (message) {
        dispatch(showMessage({ message }));
      }

      Promise.all([
        dispatch(setUser(user)),
        // You can receive data in here before app initialization
      ]).then((values) => {
        setIsLoading(false);
        setWaitAuthCheck(false);
        setIsAuthenticated(true);
      });
    }

    function pass(message) {
      if (message) {
        dispatch(showMessage({ message }));
      }
      setIsLoading(false);
      setWaitAuthCheck(false);
      setIsAuthenticated(false);
    }
  }, [dispatch]);

  return waitAuthCheck ? (
    <FuseSplashScreen />
  ) : (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
