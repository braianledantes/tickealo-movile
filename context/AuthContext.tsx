import { createContext, use, type PropsWithChildren } from "react";

import { login, registerCliente } from "@/api/auth";
import { LoginDto } from "@/api/dto/login.dto";
import { RegisterClienteDto } from "@/api/dto/register-cliente.dto";
import { useStorageState } from "../hooks/useStorageState";

import * as api from "@/api/axiosConfig";

const AuthContext = createContext<{
  login: (dto: LoginDto) => void;
  registerCliente: (dto: RegisterClienteDto) => void;
  logout: () => void;
  accessToken?: string | null;
  isLoading: boolean;
}>({
  login: () => null,
  registerCliente: () => null,
  logout: () => null,
  accessToken: null,
  isLoading: false,
});

// Use this hook to access the user info.
export function useAuth() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <AuthProvider />");
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] =
    useStorageState("access_token");

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
        },
        registerCliente: async (dto: RegisterClienteDto) => {
          const result = await registerCliente(dto);
          const token = result.data.access_token;
          setAccessToken(token);
        },
        logout: () => {
          setAccessToken(null);
        },
        accessToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext>
  );
}
