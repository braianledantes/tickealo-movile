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
    totalFinal?: string;
  }>();

  const { comprar } = useCompras();

  const precioUnit = Number(params?.precio ?? 0);
  const stock = Number(params?.cantEntradas ?? 1);

  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = Boolean(error);

  //total sin el descuento del 25% por usar puntos
  const total = useMemo(() => precioUnit * qty, [precioUnit, qty]);
  //total con el 25
  const totalFinal = total;

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
            : `Solo quedan ${stock} entradas disponibles`
        );
        return q;
      }
      return q + 1;
    });
  };

  const onCheckout = async (usarPuntos: boolean, totalFinal: number) => {
    setLoading(true);
    setError(null);

    try {
      if (qty > stock) {
        setError(
          stock === 1
            ? "Solo queda 1 entrada disponible"
            : `Solo quedan ${stock} entradas disponibles`
        );
        setLoading(false);
        return;
      }
      const cantPuntosSafe = params.cantPuntos ? Number(params.cantPuntos) : 0;

      const payload = {
        idEntrada: Number(params.entradaId ?? 0),
        cant: qty,
        cantPuntos: cantPuntosSafe,
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
          total: String(totalFinal),
        },
      });
    } catch (err: any) {
      setError(err.message ?? "Error desconocido al procesar la compra");
    } finally {
      setLoading(false);
    }
  };

  return {
    qty,
    total,
    totalFinal,
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
