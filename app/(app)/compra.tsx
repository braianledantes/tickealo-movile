import api from "@/api/axiosConfig";
import { Button } from "@/components/Button/Button";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { InputImageUpLoader } from "@/components/Input/InputImageUpLoader";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { useCompras } from "@/hooks/useCompras";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

type Entrada = {
  id: number;
  tipo: string;
  precio: number;
  cantidad: number;
  id_evento: number;
};

export default function Compra() {
  const { entradaId, eventoId } = useLocalSearchParams();
  const { comprar } = useCompras();
  const [entrada, setEntrada] = useState<Entrada | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const entradaIdNum = Number(entradaId);

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const res = await api.get(`/eventos/${eventoId}`);
        const eventoData = res.data;

        // Buscar la entrada específica
        const entradaSeleccionada = eventoData.entradas.find(
          (e: any) => e.id === entradaIdNum
        );

        setEntrada(entradaSeleccionada);
      } catch (err) {
        console.error("Error cargando evento:", err);
      } finally {
        setLoading(false);
      }
    };
    if (eventoId) fetchEvento();
  }, [eventoId]);

  const handleComprar = async () => {
    if (!entrada) return;

    try {
      const formData = new FormData();
      formData.append("idEntrada", entrada.id.toString());
      formData.append("cant", "1"); // cantidad

      // formData.append("comprobanteTransferencia", archivo); // si hay comprobante

      await comprar(formData);
      alert("Compra realizada con éxito");
      // router.push("/mis-compras");
    } catch (err) {
      console.error("Error realizando compra:", err);
      alert("Ocurrió un error al realizar la compra.");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

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

      <ScrollView style={styles.container}>
        {/* Muestra la entrada seleccionada */}
        <View style={styles.entradasContainer}>
          <EntradaCard
            key={entrada.id}
            tipo={entrada.tipo}
            precio={entrada.precio}
            onPress={() => {}} 
          />

          <InputImageUpLoader label="Sube el comprobante de Transferencia"/>
        </View>
      </ScrollView>

      <View style={styles.entradasConfirm}>
        <Button
          title="Confirmar compra"
          onPress={handleComprar}
        />
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
  },
  sinEntradas: {
    color: "#aaa",
    textAlign: "center",
    fontStyle: "italic",
    marginTop: 8,
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
});
