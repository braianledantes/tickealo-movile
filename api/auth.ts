import api from "./axiosConfig";
import { LoginDto } from "./dto/login.dto";
import { RegisterClienteDto } from "./dto/register-cliente.dto";
import { RegisterValidadorDto } from "./dto/register-validador.dto";

export async function login(loginDto: LoginDto) {
  const response = await api.post("/auth/login", loginDto);
  return response;
}

export async function registerValidador(dto: RegisterValidadorDto) {
  const response = await api.post("/auth/register-validador", dto);
  return response;
}

export async function registerCliente(dto: RegisterClienteDto) {
  const response = await api.post("/auth/register-cliente", dto);
  return response;
}

export async function currentUser() {
  const response = await api.get("/auth/me");
  return response;
}
