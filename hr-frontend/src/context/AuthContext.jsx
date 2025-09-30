import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // ✅ registered users

  const register = (email, password) => {
    const exists = users.find((u) => u.email === email);
    if (exists) return false;

    const newUser = { email, password };
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
