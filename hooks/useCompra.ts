import { EventoDto } from "@/api/dto/evento.dto";
import { useCompras } from "@/hooks/useCompras";
import { useToast } from "@/hooks/useToast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Platform } from "react-native";
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
  const { terminarCompra } = useCompras();

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
  const [loading, setLoading] = useState(true);
  const [datosBancarios, setDatosBancarios] = useState<DatosBancarios | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
      (e: any) => Number(e.id) === entradaIdNum,
    );
    setEntrada(entradaSeleccionada ?? null);

    const cuenta =
      evento?.cuentaBancaria ?? ({} as Partial<EventoDto["cuentaBancaria"]>);
    const prod = evento?.productora ?? ({} as Partial<EventoDto["productora"]>);

    setDatosBancarios({
      titular: cuenta.nombreTitular ?? "",
      cuit: prod.cuit?.toString() ?? "",
      cbu: cuenta.cbu ?? "",
      alias: cuenta.alias ?? "",
      banco: cuenta.nombreBanco ?? "",
      instrucciones: cuenta.instrucciones ?? "",
    });

    setLoading(false);
  }, [evento, entradaIdNum]);

  const handleComprar = async () => {
    setErrorMsg(null);

    if (!entrada) {
      setErrorMsg("No se encontró la entrada seleccionada.");
      return;
    }

    if (!comprobanteUri) {
      showToast(
        "error",
        "Error",
        "Debes subir el comprobante de pago antes de continuar.",
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
      router.replace("/(app)/entradas/mis-entradas");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Error en la compra.");
    }
  };

  return {
    entrada,
    loading,
    datosBancarios,
    totalCalculado,
    cantNum,
    comprobanteUri,
    setComprobanteUri,
    errorMsg,
    handleComprar,
  };
}
