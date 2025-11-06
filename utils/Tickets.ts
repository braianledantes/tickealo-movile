export const mensajesTicket: Record<number, string> = {
  200: "Ticket validado correctamente",
  400: "Este ticket ya fue utilizado",
  401: "No autorizado",
  404: "Ticket no encontrado",
  500: "Error del servidor",
};

//Funcion para saber cuantos tikets estan para validar o no
export function resumenTickets(tickets: any[] | any) {
  const lista = Array.isArray(tickets) ? tickets : [tickets];

  const total = lista.length;
  const normalizar = (estado: string) => estado.toUpperCase().trim();

  const validados = lista.filter(
    (t) => normalizar(t.estado) === "VALIDADO",
  ).length;

  const pendientes = lista.filter(
    (t) => normalizar(t.estado) === "PENDIENTE_VALIDACION",
  ).length;

  // Helpers para singular/plural
  const s = (n: number) => (n === 1 ? "" : "s");
  const palabraTicket = (n: number) => `ticket${s(n)}`;
  const palabraValidado = (n: number) => `validado${s(n)}`;
  const palabraPendiente = (n: number) => `pendiente${s(n)}`;

  let mensaje = "";
  let color: string | undefined;

  if (validados === total) {
    // Todos validados
    mensaje = `${total} ${palabraTicket(total)} ${palabraValidado(total)}`;
    color = "#00ff9d";
  } else if (pendientes === total) {
    // Todos pendientes
    mensaje = `${total} ${palabraTicket(total)} ${palabraPendiente(total)}`;
  } else {
    // Mixto
    mensaje = `${validados} de ${total} ${palabraTicket(total)} ${palabraValidado(validados)}`;
  }

  return {
    total,
    validados,
    pendientes,
    mensaje,
    color,
  };
}
