import { Button } from "@/components/Button/Button";
import { EntradaCard } from "@/components/Entradas/EntradaCard";
import { HeaderBack } from "@/components/Layout/HeaderBack";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import defaultEvent from "../../assets/images/defaultEvent.jpg";

function formatARS(value: number) {
  try {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `$${value.toLocaleString("es-AR")}`;
  }
}

export default function InfoEntrada() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    entradaId?: string;
    nombre?: string;
    precio?: string;
    portadaUrl?: string;
    eventoId?: string;
  }>();

  const precioUnit = Number(params?.precio ?? 0);
  const [qty, setQty] = useState(1);
  const total = useMemo(() => precioUnit * qty, [precioUnit, qty]);

  const onMinus = () => setQty((q) => Math.max(1, q - 1));
  const onPlus = () => setQty((q) => q + 1);

  const banner =
    params.portadaUrl && params.portadaUrl.trim() !== ""
      ? { uri: params.portadaUrl }
      : defaultEvent;

  const RightQty = (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18 }}>
        {qty}
      </Text>
      <Text style={{ color: "#9aa3c7", fontSize: 12, marginTop: 2 }}>
        cantidad
      </Text>
    </View>
  );

  const onCheckout = () => {
    router.push({
      pathname: "/compra",
      params: {
        eventoId: String(params.eventoId ?? ""),
        entradaId: String(params.entradaId ?? ""),
        nombre: String(params.nombre ?? ""),
        precio: String(precioUnit),
        cantidad: String(qty),
        total: String(total),
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#05081b" }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 }}>
        <HeaderBack />
      </View>

      <ScrollView style={styles.container}>
        <Image source={banner} style={styles.image} />

        <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
          <EntradaCard
            tipo={String(params.nombre ?? "General")}
            precio={precioUnit}
            right={RightQty}
          />
        </View>

        {/* Controles cantidad */}
        <View style={styles.qtyRow}>
          <Pressable
            style={[styles.qtyBtn, qty === 1 && { opacity: 0.6 }]}
            onPress={onMinus}
            disabled={qty === 1}
          >
            <Ionicons name="remove" size={18} color="#fff" />
          </Pressable>

          <Text style={styles.qtyText}>{qty}</Text>

          <Pressable style={styles.qtyBtn} onPress={onPlus}>
            <Ionicons name="add" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL</Text>
          <Text style={styles.totalValue}>{formatARS(total)}</Text>
        </View>

        {/* CTA */}
        <View
          style={{ paddingHorizontal: 16, marginTop: 12, marginBottom: 24 }}
        >
          <Button title="Ir a la compra" onPress={onCheckout} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    maxHeight: 250,
    resizeMode: "cover",
  },
  qtyRow: {
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  qtyBtn: {
    width: 40,
    height: 40,
    backgroundColor: "#121A3D",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1d2a53",
  },
  qtyText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 18,
    paddingHorizontal: 10,
  },
  totalRow: {
    marginTop: 26,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { color: "#9AA3C7", fontWeight: "800", fontSize: 14 },
  totalValue: { color: "#fff", fontWeight: "800", fontSize: 18 },
});
