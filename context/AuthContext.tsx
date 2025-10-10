import { currentUser, login, registerCliente } from "@/api/auth";
import * as api from "@/api/axiosConfig";
import { LoginDto } from "@/api/dto/login.dto";
import { RegisterClienteDto } from "@/api/dto/register-cliente.dto";
import { createContext, useState, type PropsWithChildren } from "react";
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

export const AuthContext = createContext<{
  login: (dto: LoginDto) => Promise<void>;
  registerCliente: (dto: RegisterClienteDto) => Promise<void>;
  logout: () => void;
  me: () => Promise<any>;
  accessToken?: string | null;
  isLoading: boolean;
  user?: User | null;
}>({
  login: async () => {},
  registerCliente: async () => {},
  logout: () => {},
  me: async () => {},
  accessToken: null,
  isLoading: false,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] =
    useStorageState("access_token");
  const [user, setUser] = useState<User | null>(null);

  // Configura el header global
  if (accessToken) {
    api.addHeaderAuthorization(accessToken);
  } else {
    api.removeHeaderAuthorization();
  }

  const me = async () => {
    try {
      const response = await currentUser();
      return response;
    } catch (err) {
      console.error("Error obtenieindo al usuario logueado:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        login: async (dto: LoginDto) => {
          const result = await login(dto);
          const token = result.data.access_token;
          setAccessToken(token);

          // Usar inicial del email como username temporal
          const fakeUsername = dto.email.split("@")[0];
          setUser({ username: fakeUsername, email: dto.email });
        },
        registerCliente: async (dto: RegisterClienteDto) => {
          const result = await registerCliente(dto);
          const token = result.data.access_token;
          setAccessToken(token);
          setUser({ username: dto.username, email: dto.email });
        },
        logout: () => {
          setAccessToken(null);
          setUser(null);
        },
        accessToken,
        isLoading,
        user,
        me,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
