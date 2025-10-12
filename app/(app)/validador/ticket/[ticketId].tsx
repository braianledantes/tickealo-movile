import { Header } from "@/components/Layout/Header";
import { useAuth } from "@/hooks/useAuth";
import { useValidador } from "@/hooks/useValidador";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { mensajesTicket } from "../../../../utils/ticketResponse";

const Tick = require("../../../../assets/images/tick.png");

export default function TicketScreen() {
  const { ticketId } = useLocalSearchParams<{ ticketId: string }>();
  const { validarTicket } = useValidador();
  const { accessToken } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState<boolean | null>(null);
  const [mensaje, setMensaje] = useState<string>("");

  const alreadyValidated = useRef(false);

  // Animaciones
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const validar = async () => {
      if (alreadyValidated.current || !ticketId) return;
      alreadyValidated.current = true;

      try {
        const codigo = await validarTicket(Number(ticketId));
        console.log(codigo);
        const texto = mensajesTicket[codigo] || "Ocurrió un error inesperado";

        setValid(codigo === 200);
        setMensaje(texto);
      } catch (err) {
        console.error("Error validando ticket:", err);
        setValid(false);
        setMensaje("No pudimos validar tu ticket. Intenta nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    validar();
  }, []);

  useEffect(() => {
    if (valid) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 600,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [valid]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#05081b]">
        <ActivityIndicator size="large" color="#4da6ff" />
        <Text className="mt-3 text-[#4da6ff] text-base">
          Escaneando tu ticket...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#05081b]">
      <Header />

      <View className="flex-1 justify-center items-center px-5">
        <Text
          style={{
            fontSize: 28,
            color: valid ? "white" : "#ff6b6b",
            fontWeight: "bold",
            marginBottom: 10,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {valid ? "¡Todo listo!" : "Algo salió mal"}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: valid ? "#999" : "#ffb3b3",
            marginBottom: 50,
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          {mensaje}
        </Text>

        {/* ✅ Tick animado o icono de error */}
        {valid ? (
          <Animated.Image
            source={Tick}
            style={{
              width: 220,
              height: 220,
              resizeMode: "contain",
              marginBottom: 80,
              opacity: opacityAnim,
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1],
                  }),
                },
              ],
            }}
          />
        ) : (
          <MaterialIcons
            name="error-outline"
            size={120}
            color="#ff6b6b"
            style={{ marginBottom: 40 }}
          />
        )}

        <TouchableOpacity
          onPress={() => router.push("/(app)/validador/validar-entradas")}
          style={{
            backgroundColor: valid ? "#03045E" : "#ff6b6b",
            paddingVertical: 14,
            paddingHorizontal: 30,
            borderRadius: 100,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {valid ? "Escanear otro QR" : "Reintentar"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
