import { login, registerCliente } from "@/api/auth";
import * as api from "@/api/axiosConfig";
import { LoginDto } from "@/api/dto/login.dto";
import { RegisterClienteDto } from "@/api/dto/register-cliente.dto";
import { createContext, useState, type PropsWithChildren } from "react";
import { useStorageState } from "../hooks/useStorageState";

type User = {
  username: string;
  email?: string;
  image?: string;
};

export const AuthContext = createContext<{
  login: (dto: LoginDto) => void;
  registerCliente: (dto: RegisterClienteDto) => void;
  logout: () => void;
  accessToken?: string | null;
  isLoading: boolean;
  user?: User | null;
}>({
  login: () => null,
  registerCliente: () => null,
  logout: () => null,
  accessToken: null,
  isLoading: false,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] =
    useStorageState("access_token");

  const [user, setUser] = useState<User | null>(null);

  // TODO: Esto se puede mejorar
  // (ver porque con useEffect no funciona, se ejecutra
  // despues de reendirizar los otros componentes)
  // De esta manera se asegura que siempre este actualizado
  if (accessToken) {
    api.addHeaderAuthorization(accessToken);
  } else {
    api.removeHeaderAuthorization();
  }

  return (
    <AuthContext
      value={{
        login: async (dto: LoginDto) => {
          const result = await login(dto);
          const token = result.data.access_token;
          setAccessToken(token);
          //usamos la inicial del email como userName temporal si se loguea
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
      }}
    >
      {children}
    </AuthContext>
  );
}
