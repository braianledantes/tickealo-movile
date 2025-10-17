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

  const total = useMemo(() => precioUnit * qty, [precioUnit, qty]);

  const onMinus = () => setQty((q) => Math.max(1, q - 1));
  const onPlus = () => setQty((q) => q + 1);

  const onCheckout = async () => {
    const payload = {
      idEntrada: Number(params.entradaId ?? 0),
      cant: qty,
    };
    const response = await comprar(payload);

    if (response) {
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
  };
}
