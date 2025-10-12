import api, {
  addHeaderAuthorization,
  removeHeaderAuthorization,
} from "./axiosConfig";
import { LoginDto } from "./dto/login.dto";
import { Me } from "./dto/me.dto";
import { RegisterClienteDto } from "./dto/register-cliente.dto";

export async function login(loginDto: LoginDto) {
  const response = await api.post("/auth/login", loginDto);

  // 👇 el backend devuelve { access_token: "..." }
  const token = response.data?.access_token;
  if (token) {
    await addHeaderAuthorization(token);
  }

  return response;
}

export async function registerCliente(dto: RegisterClienteDto) {
  const response = await api.post("/auth/register-cliente", dto);
  return response;
}

export async function currentUser(): Promise<Me> {
  const response = await api.get("/auth/me");
  return response.data;
}

export async function logout() {
  await removeHeaderAuthorization();
}

export async function actualizarPerfil(data: FormData) {
  const response = await api.patch("/auth/cliente-perfil", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
}
