import { useValidador } from "@/hooks/useValidador";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

export default function TicketScreen() {
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const { validarTicket } = useValidador();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validar = async () => {
      if (!ticketId) return;
      console.log(ticketId);

      try {
        await validarTicket(Number(ticketId));
        setValid(true);
      } catch (err) {
        console.error(err);
        setValid(false);
        Alert.alert("Error", "No se pudo validar el ticket.");
      } finally {
        setLoading(false);
      }
    };

    validar();
  }, [ticketId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4da6ff" />
        <Text style={{ marginTop: 10, color: "#fff" }}>
          Validando ticket...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff", fontSize: 20 }}>
        {valid ? "Ticket válido ✅" : "Ticket inválido ❌"}
      </Text>
    </View>
  );
}
