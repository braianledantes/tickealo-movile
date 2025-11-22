import { EventoDto } from "@/api/dto/evento.dto";
import { useCompras } from "@/hooks/context/useCompras";
import { useToast } from "@/hooks/context/useToast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
import { useAuth } from "./context/useAuth";
import { useEvento } from "./useEvento";

export type Entrada = EventoDto["entradas"][number];
export type DatosBancarios = {
  titular?: string;
  cuit?: string;
  cbu?: string;
  alias?: string;
  banco?: string;
  instrucciones?: string;
};

export function useCompra() {
  const router = useRouter();
  const { showToast } = useToast();
  const { terminarCompra, loading, error } = useCompras();
  const { refreshUser } = useAuth();

  const { compraId, entradaId, eventoId, cantidad, total } =
    useLocalSearchParams<{
      compraId: string;
      entradaId?: string;
      eventoId?: string;
      cantidad?: string;
      total?: string;
    }>();

  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
  const [entrada, setEntrada] = useState<Entrada | null>(null);

  const { evento } = useEvento(eventoId);
  const entradaIdNum = Number(entradaId);
  const cantNum = Number(cantidad ?? 1);
  const totalNum = Number(total ?? 0);

  const totalCalculado = useMemo(() => {
    if (totalNum > 0) return totalNum;
    if (entrada) return Number(entrada.precio) * cantNum;
    return 0;
  }, [totalNum, entrada, cantNum]);

  // Efecto corregido: se ejecuta cuando cambia el evento
  useEffect(() => {
    if (!evento) return;

    const entradaSeleccionada = evento.entradas?.find(
      (e: any) => Number(e.id) === entradaIdNum
    );
    setEntrada(entradaSeleccionada ?? null);
  }, [evento, entradaIdNum]);

  const handleComprar = async () => {
    if (!comprobanteUri) {
      showToast(
        "error",
        "Error",
        "Debes subir el comprobante de pago antes de continuar."
      );
      return;
    }

    try {
      const formData: FormData = new FormData();
      let file: any;
      const ext = comprobanteUri.split(".").pop();

      if (Platform.OS === "web") {
        const response = await fetch(comprobanteUri);
        const blob = await response.blob();
        file = new File([blob], `comprobante.${ext}`, { type: blob.type });
      } else {
        file = {
          uri: comprobanteUri,
          name: `comprobante.${ext}`,
          type: `image/${ext === "jpg" ? "jpeg" : ext}`,
        } as any;
      }

      formData.append("comprobanteTransferencia", file);
      await terminarCompra(compraId as string, formData);
      await refreshUser();
      router.replace("/(app)/compra/mis-compras");
    } catch (err: any) {
      console.log("Error en la compra:", err.response?.data?.message);
    }
  };

  return {
    entrada,
    loading,
    error,
    totalCalculado,
    cantNum,
    comprobanteUri,
    setComprobanteUri,
    handleComprar,
  };
}
