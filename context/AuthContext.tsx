import axios from "axios";
import * as SecureStore from "expo-secure-store";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (
    username: string,
    nombre: string,
    email: string,
    password: string,
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const API_URL = "https://tickealo-backend-nest-development.up.railway.app/api";
const TOKEN_KEY = "authToken";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({ token: null, authenticated: null });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (token) {
        setAuthState({ token, authenticated: true });
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      } else {
        setAuthState({ token: null, authenticated: false });
      }
    };
    loadToken();
  }, []);

  const register = async (
    username: string,
    nombre: string,
    email: string,
    password: string,
  ) => {
    try {
      return await axios.post(`${API_URL}/auth/register-validador`, {
        username,
        nombre,
        email,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const access_token = result.data.access_token;
      setAuthState({ token: access_token, authenticated: true });
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, access_token);

      return result;
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    axios.defaults.headers.common["Authorization"] = "";
    setAuthState({ token: null, authenticated: false });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
