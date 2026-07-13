import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context.jsx";
import {
  login,
  register,
  logout,
  getMe,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  // Login
  const handleLogin = async ({ email, password }) => {
    setLoading(true);

    try {
      const data = await login({ email, password });

      if (!data) return false;

      setUser(data.user);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);

    try {
      const data = await register({
        username,
        email,
        password,
      });

      if (!data) return false;

      setUser(data.user);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    setLoading(true);

    try {
      const success = await logout();

      if (success) {
        setUser(null);
      }

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Get Logged In User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();

        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};  