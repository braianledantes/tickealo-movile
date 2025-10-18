import { useCompras } from "@/hooks/useCompras";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo, useState } from "react";

export function useCantEntradas() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    compraId: string;
    entradaId?: string;
    nombre?: string;
    precio?: string;
    portadaUrl?: string;
    eventoId?: string;
  }>();
  const { comprar } = useCompras();

  const precioUnit = Number(params?.precio ?? 0);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(() => precioUnit * qty, [precioUnit, qty]);

  const onMinus = () => setQty((q) => Math.max(1, q - 1));
  const onPlus = () => setQty((q) => q + 1);

  const onCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        idEntrada: Number(params.entradaId ?? 0),
        cant: qty,
      };

      const response = await comprar(payload);

      if (!response) throw new Error("No se pudo crear la compra");

      router.push({
        pathname: "/(app)/compra/FinCompra",
        params: {
          compraId: String(response.id),
          eventoId: String(params.eventoId ?? ""),
          entradaId: String(params.entradaId ?? ""),
          nombre: String(params.nombre ?? ""),
          precio: String(precioUnit),
          cantidad: String(qty),
          total: String(total),
        },
      });
    } catch (err: any) {
      console.error("Error en checkout:", err);
      setError(err.message ?? "Error desconocido al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  return {
    qty,
    total,
    precioUnit,
    onMinus,
    onPlus,
    onCheckout,
    params,
    loading,
    error,
  };
}
