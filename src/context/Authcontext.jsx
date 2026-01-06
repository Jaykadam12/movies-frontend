import { createContext, useState, useContext, useEffect } from "react";
import { data } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [loginUser, setLoginUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = ({ user, token }) => {
    setLoginUser(user);
    localStorage.setItem("token", token);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false); // nothing to do
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const result = await res.json();
        setLoginUser(result.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("token"); // invalid token
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        login,
        loading,
        setLoginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
