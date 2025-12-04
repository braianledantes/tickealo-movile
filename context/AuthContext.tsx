import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

import {
  actualizarPerfil,
  currentUser,
  login,
  registerCliente,
} from "@/api/auth";
import { LoginDto } from "@/api/dto/login.dto";
import { useStorageState } from "../hooks/useStorageState";

import * as api from "@/api/axiosConfig";
import { Me } from "../api/dto/me.dto";

export const AuthContext = createContext<{
  login: (dto: LoginDto) => void;
  registerCliente: (data: FormData) => void;
  logout: () => void;
  accessToken?: string | null;
  user?: Me | null;
  isLoading: boolean;
  actualizarPerfilCliente: (data: FormData) => Promise<void>;
  refreshUser: () => Promise<void>;
}>({
  login: () => null,
  registerCliente: () => null,
  logout: () => null,
  accessToken: null,
  user: null,
  isLoading: false,
  actualizarPerfilCliente: async () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, accessToken], setAccessToken] =
    useStorageState("access_token");

  const [user, setUser] = useState<Me | null>(null);

  // TODO: Esto se puede mejorar
  // (ver porque con useEffect no funciona, se ejecutra
  // despues de reendirizar los otros componentes)
  // De esta manera se asegura que siempre este actualizado
  if (accessToken) {
    api.addHeaderAuthorization(accessToken);
  } else {
    api.removeHeaderAuthorization();
  }

  useEffect(() => {
    if (accessToken) {
      currentUser()
        .then((user) => {
          setUser(user);
        })
        .catch(() => {
          setUser(null);
          setAccessToken(null);
        });
    }
  }, [accessToken, setAccessToken]);

  return (
    <AuthContext
      value={{
        login: async (dto: LoginDto) => {
          const result = await login(dto);
          const token = result.data.access_token;
          setAccessToken(token);
        },
        registerCliente: async (data: FormData) => {
          const result = await registerCliente(data);
          const token = result.data.access_token;
          setAccessToken(token);
        },
        logout: () => {
          setAccessToken(null);
          setUser(null);
        },
        refreshUser: async () => {
          try {
            const updated = await currentUser();
            setUser(updated);
          } catch (err) {
            console.error("Error al refrescar usuario:", err);
          }
        },
        accessToken,
        user,
        isLoading,
        actualizarPerfilCliente: async (data: FormData) => {
          try {
            await actualizarPerfil(data);
            const updatedUser = await currentUser();
            setUser(updatedUser);
          } catch (error) {
            console.error("Error actualizando perfil:", error);
          }
        },
      }}
    >
      {children}
    </AuthContext>
  );
}
