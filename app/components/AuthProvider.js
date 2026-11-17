"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

const profileKeys = [
  "userId",
  "email",
  "firstName",
  "lastName",
  "role",
  "continent",
  "course",
];

function readStorageValue(key) {
  return sessionStorage.getItem(key) || localStorage.getItem(key) || "";
}

function readStructuredValue(key) {
  const value = readStorageValue(key);

  if (!value) {
    return "";
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function readUser() {
  return {
    userId: readStorageValue("userId"),
    email: readStorageValue("email"),
    firstName: readStorageValue("firstName"),
    lastName: readStorageValue("lastName"),
    role: readStorageValue("role"),
    continent: readStructuredValue("continent"),
    course: readStructuredValue("course"),
  };
}

function getTokenExpiration(token) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    return 0;
  }

  try {
    const payload = parts[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
    const claims = JSON.parse(window.atob(payload));

    if (claims.exp === undefined) {
      return null;
    }

    const expiration = Number(claims.exp) * 1000;
    return Number.isFinite(expiration) ? expiration : 0;
  } catch {
    return 0;
  }
}

function clearStoredAuth() {
  ["authToken", ...profileKeys].forEach((key) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  });
}

function getInitialAuthState() {
  return {
    status: "loading",
    user: null,
    expiresAt: null,
  };
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(getInitialAuthState);

  const refreshAuth = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    const token = readStorageValue("authToken");
    const expiresAt = token ? getTokenExpiration(token) : null;

    if (!token || expiresAt === 0 || (expiresAt && expiresAt <= Date.now())) {
      if (token) {
        clearStoredAuth();
      }

      setAuthState({
        status: "unauthenticated",
        user: null,
        expiresAt: null,
      });
      return;
    }

    setAuthState({
      status: "authenticated",
      user: readUser(),
      expiresAt,
    });
  }, []);

  const login = useCallback((token, returnedUser) => {
    profileKeys.forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });
    sessionStorage.removeItem("authToken");
    localStorage.setItem("authToken", token);

    profileKeys.forEach((key) => {
      const value = returnedUser?.[key];

      if (value === undefined || value === null) {
        return;
      }

      localStorage.setItem(
        key,
        key === "continent" || key === "course"
          ? JSON.stringify(value)
          : String(value)
      );
    });

    setAuthState({
      status: "authenticated",
      user: readUser(),
      expiresAt: getTokenExpiration(token),
    });
    window.dispatchEvent(new Event("auth-changed"));
  }, []);

  const logout = useCallback(() => {
    clearStoredAuth();
    setAuthState({
      status: "unauthenticated",
      user: null,
      expiresAt: null,
    });
    window.dispatchEvent(new Event("auth-changed"));
  }, []);

  useEffect(() => {
    const handleAuthChange = () => refreshAuth();
    const handleStorageChange = (event) => {
      if (
        event.key === null ||
        (event.key === "authToken" && event.newValue === null)
      ) {
        sessionStorage.removeItem("authToken");
      }

      if (
        event.key === null ||
        event.key === "authToken" ||
        profileKeys.includes(event.key)
      ) {
        refreshAuth();
      }
    };

    window.addEventListener("auth-changed", handleAuthChange);
    window.addEventListener("storage", handleStorageChange);
    refreshAuth();

    return () => {
      window.removeEventListener("auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [refreshAuth]);

  useEffect(() => {
    if (authState.status !== "authenticated" || !authState.expiresAt) {
      return undefined;
    }

    const timeout = window.setTimeout(
      logout,
      Math.max(authState.expiresAt - Date.now(), 0)
    );

    return () => window.clearTimeout(timeout);
  }, [authState.expiresAt, authState.status, logout]);

  const value = useMemo(
    () => ({
      status: authState.status,
      isAuthenticated: authState.status === "authenticated",
      user: authState.user,
      login,
      logout,
      refreshAuth,
    }),
    [authState, login, logout, refreshAuth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}