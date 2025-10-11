export interface ComprasResponse {
  data: CompraDTO[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

export interface CompraDTO {
  id: number;
  comprobanteTransferencia: string | null;
  monto: string;
  estado: "PENDIENTE" | "COMPLETADA" | "CANCELADA" | string;
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

  tickets: TicketDTO[];
}

export interface TicketDTO {
  id: number;
  codigoAlfanumerico: string;
  estado: "PENDIENTE_VALIDACION" | "COMPLETADA" | "ANULADA" | string;
  createdAt: string;
  updatedAt: string;

  entrada: {
    id: number;
    nombre: string;
    precio: number;
    tipo: string;
  };
}
