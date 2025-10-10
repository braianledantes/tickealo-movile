import api from "@/api/axiosConfig";
import { Button } from "@/components/Button/Button";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { InputImageUpLoader } from "@/components/Input/InputImageUpLoader";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { useCompras } from "@/hooks/useCompras";
import * as ClipBoard from "expo-clipboard";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Entrada = {
  id: number;
  tipo: string;
  precio: number;
  cantidad: number;
  id_evento: number;
};

type DatosBancarios = {
  titular?: string;
  cuit?: string;
  cbu?: string;
  alias?: string;
  banco?: string;
  instrucciones?: string;
};

function BankRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  const copy = async () => {
    await ClipBoard.setStringAsync(value);
    Alert.alert("Copiado", `${label} copiado al portapapeles`);
  };
  return (
    <Pressable onLongPress={copy} style={{ marginTop: 6 }}>
      <Text style={styles.bankItem}>
        {label}: <Text style={styles.bankValue}>{value}</Text>
      </Text>
      <Text style={styles.copyHint}>Mantener presionado para copiar</Text>
    </Pressable>
  );
}

export default function Compra() {
  const { entradaId, eventoId, cantidad, total } = useLocalSearchParams<{
    entradaId?: string;
    eventoId?: string;
    cantidad?: string;
    total?: string;
  }>();

  const { comprar } = useCompras();
  const [comprobanteUri, setComprobanteUri] = useState<string | null>(null);
  const [entrada, setEntrada] = useState<Entrada | null>(null);
  const [loading, setLoading] = useState(true);
  const [datosBancarios, setDatosBancarios] = useState<DatosBancarios | null>(
    null,
  );

  const entradaIdNum = Number(entradaId);
  const cantNum = Number(cantidad ?? 1);
  const totalNum = Number(total ?? 0);

  // fallback por si no pasaron total: precio * cant
  const totalCalculado = useMemo(() => {
    if (totalNum > 0) return totalNum;
    if (entrada) return Number(entrada.precio) * cantNum;
    return 0;
  }, [totalNum, entrada, cantNum]);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await api.get(`/eventos/${eventoId}`);
        const eventoData = res.data;
        if (__DEV__) {
          //console.log("DEBUG eventoData:", JSON.stringify(eventoData, null, 2));
        }
        // Buscar la entrada específica
        const entradaSeleccionada = eventoData?.entradas?.find(
          (e: any) => Number(e.id) === entradaIdNum,
        );
        setEntrada(entradaSeleccionada ?? null);

        // Datos de evento.cuentaBancaria
        const cuenta = eventoData?.cuentaBancaria ?? {};
        const prod = eventoData?.productora ?? {};

        const bank: DatosBancarios = {
          titular: cuenta.nombreTitular ?? "",
          cuit: prod.cuit ?? "",
          cbu: cuenta.cbu ?? "",
          alias: cuenta.alias ?? "",
          banco: cuenta.nombreBanco ?? "",
          instrucciones: cuenta.instrucciones ?? "",
        };

        setDatosBancarios(bank);
      } catch (err) {
        console.error("Error cargando evento:", err);
      } finally {
        setLoading(false);
      }
    };
    if (eventoId) fetchEvento();
  }, [eventoId, entradaIdNum]);

  const handleComprar = async () => {
    if (!entrada) {
      Alert.alert("Error", "No se encontró la entrada seleccionada");
      return;
    }

    if (!comprobanteUri) {
      Alert.alert(
        "Falta comprobante",
        "Debes subir el comprobante de pago antes de continuar.",
      );
      return;
    }

    console.log("Entrada seleccionada:", entrada);

    try {
      const formData = new FormData();
      formData.append("idEntrada", String(entrada.id));
      formData.append("cant", String(cantNum));
      formData.append("comprobanteTransferencia", {
        uri: comprobanteUri,
        name: "comprobante.jpg",
        type: "image/jpeg",
      } as any);

      const response = await api.post("/compras/comprar-entrada", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Éxito", "Compra realizada correctamente ✅");
    } catch (err: any) {
      Alert.alert("Error", err.response?.data?.message || "Error en la compra");
    }
  };

  if (!entrada) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>No se encontró la entrada.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#05081b" }}>
      <HeaderBack />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <View style={styles.entradasContainer}>
          <EntradaCard
            key={entrada.id}
            tipo={entrada.tipo}
            precio={entrada.precio}
            priceValueOverride={totalCalculado}
            priceSuffixText="TOTAL"
            onPress={undefined}
          />

          {/* Datos bancarios de la productora */}
          <View style={styles.bankBox}>
            <Text style={styles.bankTitle}>Datos para la transferencia</Text>

            <BankRow label="Titular" value={datosBancarios?.titular} />
            <BankRow label="CUIT" value={datosBancarios?.cuit} />
            <BankRow label="CBU" value={datosBancarios?.cbu} />
            <BankRow label="Alias" value={datosBancarios?.alias} />
            <BankRow label="Banco" value={datosBancarios?.banco} />

            {datosBancarios?.instrucciones ? (
              <View style={{ marginTop: 10 }}>
                <Text style={styles.bankTitle}>Instrucciones</Text>
                <Text style={styles.instructions}>
                  {datosBancarios.instrucciones}
                </Text>
              </View>
            ) : null}

            {!datosBancarios?.titular &&
              !datosBancarios?.cuit &&
              !datosBancarios?.cbu &&
              !datosBancarios?.alias &&
              !datosBancarios?.banco &&
              !datosBancarios?.instrucciones && (
                <Text
                  style={[styles.bankItem, { color: "#ccc", marginTop: 6 }]}
                >
                  No hay datos bancarios cargados para esta productora.
                </Text>
              )}
          </View>

          {/* subir comprobante */}
          <InputImageUpLoader
            label="Subí el comprobante de transferencia"
            onFileSelect={(result) => {
              if (!result || result.canceled) return;

              const uri = result.assets?.[0]?.uri;
              if (uri) setComprobanteUri(uri);
            }}
          />
        </View>
      </ScrollView>

      <View style={styles.entradasConfirm}>
        <Button title="Confirmar compra" onPress={handleComprar} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  entradasContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 16,
  },
  bankBox: {
    backgroundColor: "#0b1030",
    borderWidth: 1,
    borderColor: "#1b1e5e",
    borderRadius: 12,
    padding: 14,
  },
  bankTitle: {
    color: "#90e0ef",
    fontWeight: "700",
    marginBottom: 8,
    fontSize: 14,
  },
  bankItem: {
    color: "#cbd5e1",
    marginTop: 6,
    fontSize: 14,
  },
  bankValue: {
    color: "#fff",
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#010030",
  },
  entradasConfirm: {
    marginBottom: 60,
    padding: 16,
  },
  copyHint: {
    color: "#7a86b6",
    fontSize: 11,
  },
  instructions: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
  },
});
