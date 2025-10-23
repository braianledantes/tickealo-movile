import { CompraDto } from "@/api/dto/compras.dto";
import { Button } from "@/components/Button/Button";
import { SecondaryButton } from "@/components/Button/SecondaryButton";
import CompraEstado from "@/components/Compras/CompraEstado";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { ComprobanteView } from "@/components/Modal/Comprobante";
import { CuentaBancaria } from "@/components/Productora/CuentaBancaria";
import { Texto } from "@/components/Texto";
import { useCompras } from "@/hooks/useCompras";
import { useEvento } from "@/hooks/useEvento";
import { formatARS, formatDate } from "@/utils/utils";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MiCompra() {
  const { compraId } = useLocalSearchParams<{ compraId: string }>();
  const { miCompra } = useCompras();
  const [loading, setLoading] = useState(true);
  const [compra, setCompra] = useState<CompraDto | undefined>(undefined);
  const [showComprobante, setShowComprobante] = useState(false);
  const { productora, cuentaBancaria } = useEvento(
    compra?.tickets[0].entrada.evento.id,
  );

  useEffect(() => {
    const fetchCompra = async () => {
      setLoading(true);
      try {
        const data = await miCompra(Number(compraId));
        setCompra(data);
      } catch (error) {
        console.error("Error al obtener compra:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompra();
  }, [miCompra, compraId]);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#4da6ff" />
      </View>
    );
  }

  if (!compra) {
    return (
      <View style={styles.loader}>
        <Text style={styles.textWhite}>
          No se encontró la compra asociada al usuario
        </Text>
      </View>
    );
  }

  const bannerUrl = compra.tickets[0]?.entrada?.evento?.bannerUrl;

  return (
    <View style={styles.container}>
      <HeaderBack />

      {bannerUrl && (
        <View style={styles.bannerContainer}>
          <ImageBackground
            source={{ uri: bannerUrl }}
            style={styles.bannerImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={[
                "rgba(5, 8, 27, 0)",
                "rgba(5, 8, 27, 0.3)",
                "rgba(5, 8, 27, 0.6)",
                "rgba(5, 8, 27, 0.85)",
                "#05081b",
              ]}
              style={styles.gradient}
            />
          </ImageBackground>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.content}>
        <View className="flex-1 items-center justify-center">
          <Texto bold className="text-white text-xl mb-3">
            DETALLE DE LA COMPRA
          </Texto>

          <CompraEstado compraEstado={compra.estado} align="center" />
        </View>

        <View className="my-2 border-b border-white/20 pb-5">
          <Texto bold className="text-[#cfe3ff] text-xl">
            DETALLE
          </Texto>

          <View className="flex-row justify-between mt-3">
            <Texto className="text-white text-md">Fecha de compra</Texto>
            <Texto className="text-white text-md">
              {formatDate(compra.createdAt)}
            </Texto>
          </View>

          <View className="flex-row justify-between mt-3">
            <Texto className="text-white text-md">Última actualización</Texto>
            <Texto className="text-white text-md">
              {formatDate(compra.updatedAt)}
            </Texto>
          </View>
        </View>

        <View className="my-2 border-b border-white/20 pb-5">
          <Texto bold className="text-[#cfe3ff] text-xl">
            RESUMEN
          </Texto>

          <View className="flex-row justify-between mt-3">
            <Texto bold className="text-white text-md">
              Cantidad
            </Texto>
            <Texto bold className="text-white text-md">
              Precio Unidad
            </Texto>
          </View>

          <View className="flex-row justify-between mt-3">
            <Texto className="text-white text-md">
              Entrada {compra.tickets[0]?.entrada?.tipo} x{" "}
              {compra.tickets.length}
            </Texto>
            <Texto className="text-white text-md">
              {formatARS(compra.tickets[0]?.entrada?.precio)}
            </Texto>
          </View>

          <View className="flex-row justify-between mt-3">
            <Texto bold className="text-[#90E0EF] text-xl tracking-wider">
              TOTAL
            </Texto>
            <Texto bold className="text-[#90E0EF] text-xl tracking-wider">
              {formatARS(compra.monto)}
            </Texto>
          </View>
        </View>

        <View className="flex-row justify-between my-2 border-b border-white/20 pb-5">
          <View>
            <Texto bold className="text-[#cfe3ff] flex-1 text-xl mb-3">
              COMPROBANTE
            </Texto>
            <Texto className="text-white text-md">
              Estado:{" "}
              {compra.comprobanteTransferencia ? "ENVIADA" : "SIN ENVIAR"}
            </Texto>
          </View>
          {compra.comprobanteTransferencia ? (
            <SecondaryButton
              title="Ver comprobante"
              onPress={() => setShowComprobante(true)}
            />
          ) : (
            <Button
              title="Subir comprobante"
              onPress={() => console.log("Subir comprobante")}
            />
          )}
        </View>

        <CuentaBancaria p={productora} c={cuentaBancaria} />

        <ComprobanteView
          comprobante={compra.comprobanteTransferencia}
          showComprobante={showComprobante}
          setShowComprobante={setShowComprobante}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#05081b" },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#05081b",
  },
  textWhite: { color: "#fff" },
  content: { padding: 16, paddingBottom: 50 },
  bannerContainer: {
    width: "100%",
    aspectRatio: 11 / 4,
    overflow: "hidden",
  },
  bannerImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
});
