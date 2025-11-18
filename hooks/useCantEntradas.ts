import { useCompras } from "@/hooks/context/useCompras";
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
    cantEntradas?: string;
    cantPuntos?: string;
  }>();

  const { comprar } = useCompras();

  const precioUnit = Number(params?.precio ?? 0);
  const stock = Number(params?.cantEntradas ?? 1);

  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = Boolean(error);

  const total = useMemo(() => precioUnit * qty, [precioUnit, qty]);

  const onMinus = () => {
    setError(null);
    setQty((q) => Math.max(1, q - 1));
  };

  const onPlus = () => {
    setError(null);

    setQty((q) => {
      if (q + 1 > stock) {
        setError(
          stock === 1
            ? "Solo queda 1 entrada disponible"
            : "Ya llegaste al máximo de entradas disponibles",
        );
        return q;
      }
      return q + 1;
    });
  };

  const onCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      if (qty > stock) {
        setError(
          stock === 1
            ? "Solo queda 1 entrada disponible"
            : `Solo quedan ${stock} entradas disponibles`,
        );
        setLoading(false);
        return;
      }

      const payload = {
        idEntrada: Number(params.entradaId ?? 0),
        cant: qty,
        cantPuntos: Number(params.cantPuntos ?? 0),
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
    stock,
    onMinus,
    onPlus,
    onCheckout,
    params,
    loading,
    error,
    disabled,
  };
}
