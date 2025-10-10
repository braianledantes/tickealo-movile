import { currentUser, login, registerCliente } from "@/api/auth";
import * as api from "@/api/axiosConfig";
import { LoginDto } from "@/api/dto/login.dto";
import { RegisterClienteDto } from "@/api/dto/register-cliente.dto";
import {
  createContext,
  useEffect,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "../hooks/useStorageState";

type User = {
  username: string;
  email?: string;
  image?: string;
  roles?: {
    name?: string;
    description?: string;
  };
};

type AuthContextValue = {
  login: (dto: LoginDto) => Promise<void>;
  registerCliente: (dto: RegisterClienteDto) => Promise<void>;
  logout: () => void;
  me: () => Promise<any>;
  accessToken?: string | null;
  isLoading: boolean;
  user?: User | null;
  authReady: boolean;
  headerReady: boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  login: async () => {},
  registerCliente: async () => {},
  logout: () => {},
  me: async () => {},
  accessToken: null,
  isLoading: false,
  user: null,
  authReady: false,
  headerReady: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] =
    useStorageState("access_token");
  const [user, setUser] = useState<User | null>(null);
  const [headerReady, setHeaderReady] = useState(false);

  useEffect(() => {
    if (accessToken) {
      api.addHeaderAuthorization(accessToken);
      setHeaderReady(true);
    } else {
      api.removeHeaderAuthorization();
      setHeaderReady(false);
    }
  }, [accessToken]);

  const rehydrateTried = useRef(false);
  useEffect(() => {
    if (rehydrateTried.current) return;
    if (accessToken && !user) {
      rehydrateTried.current = true;
      (async () => {
        try {
          const u = await currentUser();
          setUser(u);
        } catch {}
      })();
    }
  }, [accessToken, user]);

  const me = async () => {
    try {
      const u = await currentUser();
      setUser(u);
      return u;
    } catch (err) {
      console.error("Error obteniendo usuario logueado:", err);
    }
  };

  const authReady = !!accessToken;
  return (
    <AuthContext.Provider
      value={{
        // login: aplicar header → guardar token → pedir /auth/me → fallback mínimo
        login: async (dto: LoginDto) => {
          const res = await login(dto);
          const token = res.data.access_token;

          await api.addHeaderAuthorization(token);
          setAccessToken(token);
          setHeaderReady(true);

          try {
            const u = await currentUser();
            setUser(u);
          } catch {
            // fallback mínimo si /auth/me falla (p.ej. 404 "Profile not found")
            const fakeUsername = dto.email.split("@")[0];
            setUser({ username: fakeUsername, email: dto.email });
          }
        },

        registerCliente: async (dto: RegisterClienteDto) => {
          const res = await registerCliente(dto);
          const token = res.data.access_token;

          await api.addHeaderAuthorization(token);
          setAccessToken(token);
          setHeaderReady(true);

          try {
            const u = await currentUser();
            setUser(u);
          } catch {
            setUser({ username: dto.username, email: dto.email });
          }
        },

        logout: () => {
          setAccessToken(null);
          api.removeHeaderAuthorization();
          setHeaderReady(false);
          setUser(null);
          rehydrateTried.current = false;
        },

        accessToken,
        isLoading,
        user,
        authReady,
        headerReady,
        me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
