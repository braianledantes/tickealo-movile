import { ClienteDto } from "./comentario.dto";
import { EventoDto } from "./evento.dto";

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
  estado: "INICIADA" | "PENDIENTE" | "ACEPTADA" | "RECHAZADA" | string;
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
    | "COMPRA_PENDIENTE"
    | "PENDIENTE_VALIDACION"
    | "VALIDADA"
    | "ANULADA"
    | string;
  validatedBy?: {
    userId: string;
    nombre?: string;
  };
  createdAt: string;
  updatedAt: string;

  entrada: EntradaDto;
}
type EntradaDto = {
  id: number;
  nombre: string;
  precio: number;
  tipo: string;
  cantidad: number;
  evento: EventoDto;
};

export interface TransferenciaResponseDto {
  transferencias: TransferenciaDto[];
}

export interface TransferenciaDto {
  clienteEmisor: ClienteDto;
  clienteReceptor: ClienteDto;
  id: number;
  status: "pendiente" | string;
  ticket: TicketDto;
  createdAt: string;
  updatedAt: string;
}
