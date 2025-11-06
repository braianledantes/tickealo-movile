import api from "./axiosConfig";

// Obtengo una lista de clientes
export const getClientes = async () => {
  const response = await api.get(`/clientes`);
  return response.data;
};

//Envio un ticket a un usuario por su mail
export const postTransferencia = async (
  ticketId: number,
  receptorEmail: string,
) => {
  const encodedEmail = encodeURIComponent(receptorEmail);
  const response = await api.post(
    `/tickets/${ticketId}/transferir/${encodedEmail}`,
  );
  return response;
};

//Aceptar el ticket que transfirieron
export const postTransferenciaAccept = async (transferenciaId: number) => {
  const response = await api.post(
    `/tickets/transferencias/${transferenciaId}/aceptar`,
  );
  return response;
};

//Obtener una lista de tickets transferidos
export const getTransferencias = async () => {
  const response = await api.get(`/tickets/transferencias/recibidas`);
  return response.data;
};
