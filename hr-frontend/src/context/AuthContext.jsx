import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";


const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);   
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const profile = localStorage.getItem("auth_profile");
    if (token && profile) {
      try {
        const parsed = JSON.parse(profile);
        setUser(parsed);
      } catch {}
    }
    setLoading(false);
  }, []);

  const register = async ({ email, password, fullName, role }) => {
    const res = await api.post("/api/auth/register", {
      email,
      password,
      fullName,
      role: role || "Candidate",
    });
    const { token, email: respEmail, fullName: respName, roles, expiresAtUtc } = res.data;

    localStorage.setItem("auth_token", token);
    localStorage.setItem(
      "auth_profile",
      JSON.stringify({ email: respEmail, fullName: respName, roles, expiresAtUtc })
    );
    setUser({ email: respEmail, fullName: respName, roles, expiresAtUtc });
    return true;
  };

  const login = async ({ email, password }) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token, email: respEmail, fullName, roles, expiresAtUtc } = res.data;

   
    try { jwtDecode(token); } catch {}

    localStorage.setItem("auth_token", token);
    localStorage.setItem(
      "auth_profile",
      JSON.stringify({ email: respEmail, fullName, roles, expiresAtUtc })
    );
    setUser({ email: respEmail, fullName, roles, expiresAtUtc });
    return true;
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_profile");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
