export interface ComprasResponse {
  data: CompraDto[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface CompraDto {
  id: number;
  comprobanteTransferencia: string | null;
  monto: string;
  estado: "INICIADA" | "PENDIENTE" | "COMPLETADA" | "CANCELADA" | string;
  createdAt: string;
  updatedAt: string;

  cliente: {
    userId: number;
    nombre: string;
    apellido: string;
    telefono: string;
    puntosAcumulados: number;
    imagenPerfilUrl: string | null;
  };

  tickets: TicketDto[];
}

export interface TicketDto {
  id: number;
  codigoAlfanumerico: string;
  estado:
    | "INICIADA"
    | "PENDIENTE_VALIDACION"
    | "COMPLETADA"
    | "ANULADA"
    | string;
  createdAt: string;
  updatedAt: string;

  entrada: {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;
    cantidad: number;
    evento: EventoDto;
  };
}

type EventoDto = {
  id: number;
  nombre: string;
  descripcion: string;
  inicioAt: string;
  finAt: string;
  bannerUrl?: string;
  portadaUrl?: string;
};
