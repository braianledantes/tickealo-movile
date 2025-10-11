import { addHeaderAuthorization } from "@/api/axiosConfig";
import { useAuth } from "@/hooks/useAuth";
import { useValidador } from "@/hooks/useValidador";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function TicketScreen() {
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const { validarTicket } = useValidador();
  const { accessToken } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const alreadyValidated = useRef(false);

  useEffect(() => {
    const validar = async () => {
      if (alreadyValidated.current || !ticketId) return;
      alreadyValidated.current = true;

      try {
        if (accessToken) await addHeaderAuthorization(accessToken);
        await validarTicket(Number(ticketId));
        setValid(true);
      } catch (err) {
        console.error("❌ Error validando ticket:", err);
        setValid(false);
        Alert.alert("Error", "No se pudo validar el ticket.");
      } finally {
        setLoading(false);
      }
    };
    validar();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#05081b",
        }}
      >
        <ActivityIndicator size="large" color="#4da6ff" />
        <Text style={{ marginTop: 10, color: "#fff" }}>
          Validando ticket...
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#05081b",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          color: valid ? "#00ff99" : "#ff4d4d",
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        {valid ? "✅ Ticket válido" : "❌ Ticket inválido"}
      </Text>

      <TouchableOpacity
        onPress={() => router.push("/validar-entradas")}
        style={{
          backgroundColor: "#4da6ff",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
          Escanear otro QR
        </Text>
      </TouchableOpacity>
    </View>
  );
}
