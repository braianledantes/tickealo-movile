export interface TicketDto {
  id: number;
  codigoAlfanumerico: string;
  estado: string;
  validatedBy?: {
    userId: number;
    nombre?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}
